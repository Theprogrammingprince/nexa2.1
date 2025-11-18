import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FUNCTIONS_DIR = path.join(__dirname, 'supabase', 'functions');

// Get all function directories
function getFunctionDirectories() {
  const items = fs.readdirSync(FUNCTIONS_DIR);
  return items.filter(item => {
    const itemPath = path.join(FUNCTIONS_DIR, item);
    return fs.statSync(itemPath).isDirectory() && 
           fs.existsSync(path.join(itemPath, 'index.ts'));
  });
}

// Fix imports in a file
function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Replace the esm.sh import with the import map version
  content = content.replace(
    /import\s+{([^}]+)}\s+from\s+["']https:\/\/esm\.sh\/@supabase\/supabase-js@2["'];?/g,
    'import {$1} from "@supabase/supabase-js";'
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Main function
function main() {
  console.log('🔧 Fixing imports in Supabase Edge Functions...\n');
  
  const functionDirs = getFunctionDirectories();
  let fixedCount = 0;
  
  for (const functionName of functionDirs) {
    const indexPath = path.join(FUNCTIONS_DIR, functionName, 'index.ts');
    
    if (fixImports(indexPath)) {
      console.log(`✅ Fixed: ${functionName}`);
      fixedCount++;
    } else {
      console.log(`⏭️  Skipped: ${functionName} (no changes needed)`);
    }
  }
  
  console.log(`\n📊 Summary: Fixed ${fixedCount} of ${functionDirs.length} functions`);
}

main();
