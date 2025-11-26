/**
 * Input Validation & Sanitization Utilities
 * Prevents XSS, SQL Injection, and other security vulnerabilities
 */

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

// Password strength validation
export interface PasswordStrength {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
}

export const validatePassword = (password: string): PasswordStrength => {
  const errors: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Calculate strength
  if (errors.length === 0) {
    if (password.length >= 12) {
      strength = 'strong';
    } else {
      strength = 'medium';
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength
  };
};

// Sanitize HTML to prevent XSS
export const sanitizeHTML = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Sanitize user input for display
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate phone number (Nigerian format)
export const validatePhone = (phone: string): boolean => {
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  
  // Nigerian phone number patterns
  const patterns = [
    /^(\+234|234|0)[789]\d{9}$/, // Standard Nigerian format
    /^[789]\d{9}$/ // Without country code
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
};

// Validate student ID
export const validateStudentId = (id: string): boolean => {
  // Alphanumeric, 6-15 characters
  const regex = /^[A-Z0-9]{6,15}$/i;
  return regex.test(id.trim());
};

// Validate URL
export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Sanitize filename for upload
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
};

// Validate file type
export const validateFileType = (
  filename: string,
  allowedTypes: string[]
): boolean => {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? allowedTypes.includes(ext) : false;
};

// Validate file size (in bytes)
export const validateFileSize = (size: number, maxSize: number): boolean => {
  return size <= maxSize;
};

// Rate limiting helper (client-side)
interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  check(key: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(
      time => now - time < config.windowMs
    );
    
    if (validAttempts.length >= config.maxAttempts) {
      return false; // Rate limit exceeded
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

// Validate JSON input
export const validateJSON = (input: string): boolean => {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
};

// Sanitize object for API submission
export const sanitizeObject = <T extends Record<string, any>>(
  obj: T,
  allowedKeys: (keyof T)[]
): Partial<T> => {
  const sanitized: Partial<T> = {};
  
  allowedKeys.forEach(key => {
    if (key in obj) {
      const value = obj[key];
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(value) as T[keyof T];
      } else {
        sanitized[key] = value;
      }
    }
  });
  
  return sanitized;
};

// Validate course code format
export const validateCourseCode = (code: string): boolean => {
  // Format: ABC123 or ABC 123
  const regex = /^[A-Z]{3}\s?\d{3}$/i;
  return regex.test(code.trim());
};

// Validate numeric input
export const validateNumeric = (
  value: string,
  min?: number,
  max?: number
): boolean => {
  const num = parseFloat(value);
  
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  
  return true;
};

// Check for SQL injection patterns (basic)
export const hasSQLInjection = (input: string): boolean => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(--|\*|;|'|"|\||&)/,
    /(\bOR\b|\bAND\b).*=/i,
    /\bUNION\b.*\bSELECT\b/i
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
};

// Validate date format
export const validateDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

// Sanitize search query
export const sanitizeSearchQuery = (query: string): string => {
  return query
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, ' ') // Normalize spaces
    .substring(0, 100); // Limit length
};

// Validate hex color
export const validateHexColor = (color: string): boolean => {
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return regex.test(color);
};

// Export all validators as a namespace
export const Validators = {
  email: validateEmail,
  password: validatePassword,
  phone: validatePhone,
  studentId: validateStudentId,
  url: validateURL,
  fileType: validateFileType,
  fileSize: validateFileSize,
  json: validateJSON,
  courseCode: validateCourseCode,
  numeric: validateNumeric,
  date: validateDate,
  hexColor: validateHexColor,
  hasSQLInjection
};

// Export all sanitizers as a namespace
export const Sanitizers = {
  html: sanitizeHTML,
  input: sanitizeInput,
  filename: sanitizeFilename,
  object: sanitizeObject,
  searchQuery: sanitizeSearchQuery
};
