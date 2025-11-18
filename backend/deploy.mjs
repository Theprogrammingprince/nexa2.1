import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import crypto from 'crypto';
import readline from 'readline';

const execPromise = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Supabase project reference
const PROJECT_REF = 'pyepvpdvlwcwhjwctiuw';

// Functions directory
const FUNCTIONS_DIR = path.join(__dirname, 'supabase', 'functions');

// Deployment tracking file
const DEPLOYMENT_TRACK_FILE = path.join(__dirname, '.deployment-track.json');

// Get all function directories
function getFunctionDirectories() {
  const items = fs.readdirSync(FUNCTIONS_DIR);
  return items.filter(item => {
    const itemPath = path.join(FUNCTIONS_DIR, item);
    return fs.statSync(itemPath).isDirectory() && 
           fs.existsSync(path.join(itemPath, 'index.ts'));
  });
}

// Calculate hash of a file
function calculateFileHash(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(fileContent).digest('hex');
  } catch (error) {
    console.error(`Error calculating hash for ${filePath}:`, error.message);
    return null;
  }
}

// Calculate hash for entire directory
function calculateDirectoryHash(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    const hashes = {};
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      if (fs.statSync(filePath).isFile()) {
        hashes[file] = calculateFileHash(filePath);
      }
    }
    
    return JSON.stringify(hashes);
  } catch (error) {
    console.error(`Error calculating directory hash for ${directoryPath}:`, error.message);
    return null;
  }
}

// Load deployment tracking data
function loadDeploymentTrack() {
  try {
    if (fs.existsSync(DEPLOYMENT_TRACK_FILE)) {
      const data = fs.readFileSync(DEPLOYMENT_TRACK_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading deployment tracking data:', error.message);
  }
  
  return {
    lastDeployed: {}
  };
}

// Save deployment tracking data
function saveDeploymentTrack(data) {
  try {
    fs.writeFileSync(DEPLOYMENT_TRACK_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving deployment tracking data:', error.message);
  }
}

// Check if a function has changed since last deployment
function hasFunctionChanged(functionName, deploymentTrack) {
  const functionDir = path.join(FUNCTIONS_DIR, functionName);
  const currentHash = calculateDirectoryHash(functionDir);
  
  // If we don't have a previous hash, consider it changed
  if (!deploymentTrack.lastDeployed[functionName]) {
    return true;
  }
  
  // Compare current hash with stored hash
  return currentHash !== deploymentTrack.lastDeployed[functionName];
}

// Deploy a single function
async function deployFunction(functionName) {
  console.log(`\n📦 Deploying function: ${functionName}`);
  
  try {
    const command = `supabase functions deploy ${functionName} --no-verify-jwt`;
    console.log(`   Running: ${command}`);
    
    const { stdout, stderr } = await execPromise(command);
    
    if (stderr && !stderr.includes('Deployed') && !stderr.includes('version')) {
      console.error(`   ⚠️  Warnings: ${stderr}`);
    }
    
    if (stdout) {
      console.log(`   ${stdout.trim()}`);
    }
    
    console.log(`   ✅ Successfully deployed ${functionName}`);
    return true;
  } catch (error) {
    console.error(`   ❌ Failed to deploy ${functionName}`);
    console.error(`   Error: ${error.message}`);
    return false;
  }
}

// Run database migrations
async function runMigrations() {
  console.log('\n📊 Running database migrations...');
  
  try {
    const command = `supabase db push`;
    const { stdout, stderr } = await execPromise(command);
    
    if (stdout) {
      console.log(stdout.trim());
    }
    
    if (stderr && !stderr.includes('Finished')) {
      console.error(`⚠️  Migration warnings: ${stderr}`);
    }
    
    console.log('✅ Migrations completed');
    return true;
  } catch (error) {
    console.error('❌ Migration failed');
    console.error(error.message);
    return false;
  }
}

// Simple yes/no prompt
function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise(resolve => {
    rl.question(question + ' ', answer => {
      rl.close();
      resolve(answer.toLowerCase().trim());
    });
  });
}

// Main deployment function
async function deployFunctions() {
  console.log('🚀 Nexa Backend Deployment Script');
  console.log('=================================\n');
  
  // Check if Supabase CLI is installed
  try {
    await execPromise('supabase --version');
    console.log('✅ Supabase CLI found\n');
  } catch (error) {
    console.error('❌ Supabase CLI is not installed.');
    console.error('Please install it from: https://supabase.com/docs/guides/cli\n');
    process.exit(1);
  }
  
  // Load deployment tracking data
  const deploymentTrack = loadDeploymentTrack();
  
  // Get all function directories
  const allFunctionDirs = getFunctionDirectories();
  
  // Find which functions have changed
  const changedFunctions = [];
  
  for (const functionName of allFunctionDirs) {
    if (hasFunctionChanged(functionName, deploymentTrack)) {
      changedFunctions.push(functionName);
    }
  }
  
  console.log(`📋 Found ${allFunctionDirs.length} total functions`);
  console.log(`📝 Found ${changedFunctions.length} changed functions\n`);
  
  if (changedFunctions.length > 0) {
    console.log('Changed functions:');
    changedFunctions.forEach(fn => console.log(`   - ${fn}`));
    console.log('');
  } else {
    console.log('✨ No functions have changed since last deployment.\n');
  }
  
  // Ask what to deploy
  const answer = await askQuestion('Deploy (a)ll, (c)hanged only, (m)igrations only, or (s)kip? [a/c/m/s]:');
  
  let functionsToDeploy = [];
  let runMigs = false;
  
  if (answer === 'a') {
    functionsToDeploy = allFunctionDirs;
    runMigs = true;
  } else if (answer === 'c') {
    functionsToDeploy = changedFunctions;
    runMigs = true;
  } else if (answer === 'm') {
    runMigs = true;
  } else {
    console.log('Deployment cancelled.');
    process.exit(0);
  }
  
  // Run migrations if requested
  if (runMigs) {
    const migSuccess = await runMigrations();
    if (!migSuccess) {
      console.log('\n⚠️  Migrations failed. Continue with function deployment?');
      const continueAnswer = await askQuestion('Continue? (y/N):');
      if (continueAnswer !== 'y') {
        process.exit(1);
      }
    }
  }
  
  // Deploy functions
  if (functionsToDeploy.length === 0) {
    console.log('\n✨ No functions to deploy.');
    process.exit(0);
  }
  
  console.log(`\n🔧 Deploying ${functionsToDeploy.length} functions...`);
  
  let successCount = 0;
  for (const functionName of functionsToDeploy) {
    const success = await deployFunction(functionName);
    if (success) {
      // Update the hash in our tracking data
      const functionDir = path.join(FUNCTIONS_DIR, functionName);
      deploymentTrack.lastDeployed[functionName] = calculateDirectoryHash(functionDir);
      successCount++;
    }
  }
  
  // Save the updated tracking data
  saveDeploymentTrack(deploymentTrack);
  
  // Summary
  console.log('\n=================================');
  console.log('📊 Deployment Summary');
  console.log('=================================');
  console.log(`✅ Successfully deployed: ${successCount}`);
  console.log(`❌ Failed: ${functionsToDeploy.length - successCount}`);
  
  if (successCount === functionsToDeploy.length) {
    console.log('\n🎉 All functions deployed successfully!');
  } else {
    console.log('\n⚠️  Some functions failed to deploy. Check the logs above.');
    process.exit(1);
  }
  
  console.log('\n🔗 Useful commands:');
  console.log('   supabase functions list          - List all functions');
  console.log('   supabase functions logs <name>   - View function logs');
  console.log('   supabase db reset                - Reset database\n');
}

// Run the deployment
deployFunctions().catch(error => {
  console.error('\n❌ Deployment failed:', error.message);
  process.exit(1);
});
