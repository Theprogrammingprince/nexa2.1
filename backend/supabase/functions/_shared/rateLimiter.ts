/**
 * Rate Limiter for Supabase Edge Functions
 * Prevents brute force attacks and API abuse
 */

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

interface RateLimitEntry {
  attempts: number;
  resetAt: number;
}

// In-memory store (for production, use Redis or Supabase table)
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Check if a request should be rate limited
 * @param key - Unique identifier (e.g., IP address, user ID, email)
 * @param config - Rate limit configuration
 * @returns true if allowed, false if rate limited
 */
export const checkRateLimit = (
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetAt: number } => {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  // No previous attempts or window expired
  if (!entry || now > entry.resetAt) {
    const resetAt = now + config.windowMs;
    rateLimitStore.set(key, {
      attempts: 1,
      resetAt
    });
    
    return {
      allowed: true,
      remaining: config.maxAttempts - 1,
      resetAt
    };
  }

  // Within window
  if (entry.attempts >= config.maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt
    };
  }

  // Increment attempts
  entry.attempts++;
  rateLimitStore.set(key, entry);

  return {
    allowed: true,
    remaining: config.maxAttempts - entry.attempts,
    resetAt: entry.resetAt
  };
};

/**
 * Reset rate limit for a key
 */
export const resetRateLimit = (key: string): void => {
  rateLimitStore.delete(key);
};

/**
 * Clean up expired entries (call periodically)
 */
export const cleanupExpiredEntries = (): void => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
};

/**
 * Get rate limit headers for response
 */
export const getRateLimitHeaders = (
  remaining: number,
  resetAt: number
): Record<string, string> => {
  return {
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': new Date(resetAt).toISOString(),
    'Retry-After': Math.ceil((resetAt - Date.now()) / 1000).toString()
  };
};

/**
 * Predefined rate limit configs
 */
export const RateLimitConfigs = {
  // Authentication endpoints
  AUTH: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000 // 15 minutes
  },
  
  // Password reset
  PASSWORD_RESET: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000 // 1 hour
  },
  
  // API endpoints
  API: {
    maxAttempts: 100,
    windowMs: 60 * 1000 // 1 minute
  },
  
  // Payment endpoints
  PAYMENT: {
    maxAttempts: 10,
    windowMs: 60 * 60 * 1000 // 1 hour
  },
  
  // Contact form
  CONTACT: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000 // 1 hour
  }
};

// Clean up expired entries every 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
