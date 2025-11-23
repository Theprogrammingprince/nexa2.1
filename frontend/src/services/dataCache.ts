// Data caching and prefetching service
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // milliseconds
}

class DataCacheService {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private pendingRequests: Map<string, Promise<any>> = new Map();

  /**
   * Get data from cache or fetch it
   */
  async get<T>(
    key: string,
    fetchFn: () => Promise<T>,
    expiresIn: number = 5 * 60 * 1000 // 5 minutes default
  ): Promise<T> {
    // Check if data is in cache and not expired
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.expiresIn) {
      return cached.data;
    }

    // Check if request is already pending (prevent duplicate requests)
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)!;
    }

    // Fetch data
    const promise = fetchFn()
      .then((data) => {
        // Store in cache
        this.cache.set(key, {
          data,
          timestamp: Date.now(),
          expiresIn,
        });
        // Remove from pending
        this.pendingRequests.delete(key);
        return data;
      })
      .catch((error) => {
        // Remove from pending on error
        this.pendingRequests.delete(key);
        throw error;
      });

    // Store pending request
    this.pendingRequests.set(key, promise);
    return promise;
  }

  /**
   * Prefetch data in background
   */
  async prefetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    expiresIn?: number
  ): Promise<void> {
    // Don't prefetch if already cached and valid
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.expiresIn) {
      return;
    }

    // Prefetch in background (don't await)
    this.get(key, fetchFn, expiresIn).catch((error) => {
      console.warn(`Prefetch failed for ${key}:`, error);
    });
  }

  /**
   * Invalidate cache entry
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Invalidate all cache entries matching pattern
   */
  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    this.pendingRequests.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      pending: this.pendingRequests.size,
      entries: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const dataCache = new DataCacheService();

// Cache keys
export const CACHE_KEYS = {
  USER_PROFILE: (userId: string) => `profile:${userId}`,
  USER_STATS: (userId: string) => `stats:${userId}`,
  SUMMARIES: 'summaries:all',
  SUMMARY_DETAIL: (id: string) => `summary:${id}`,
  COURSES: 'courses:all',
  NOTIFICATIONS: (userId: string) => `notifications:${userId}`,
  SUBSCRIPTION: (userId: string) => `subscription:${userId}`,
  PERFORMANCE: (userId: string) => `performance:${userId}`,
  CALENDAR: (userId: string) => `calendar:${userId}`,
  CBT_COURSES: 'cbt:courses',
};

// Cache expiration times (in milliseconds)
export const CACHE_EXPIRY = {
  SHORT: 2 * 60 * 1000, // 2 minutes
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 15 * 60 * 1000, // 15 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
};
