// 简单的内存缓存
class MemoryCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

  set(key: string, data: any, ttl: number = 5 * 60 * 1000) { // 默认5分钟
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    
    if (!item) return null
    
    // 检查是否过期
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  delete(key: string) {
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  // 获取缓存统计信息
  getStats() {
    const now = Date.now()
    let validItems = 0
    let expiredItems = 0
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        expiredItems++
      } else {
        validItems++
      }
    }
    
    return {
      total: this.cache.size,
      valid: validItems,
      expired: expiredItems
    }
  }
}

// 创建缓存实例
export const cache = new MemoryCache()

// 带缓存的API调用包装器
export function withCache<T>(
  key: string,
  apiCall: () => Promise<T>,
  ttl: number = 5 * 60 * 1000
): Promise<T> {
  const cached = cache.get(key)
  
  if (cached) {
    return Promise.resolve(cached)
  }
  
  return apiCall().then(data => {
    cache.set(key, data, ttl)
    return data
  })
}

// 缓存标签管理
class CacheTagManager {
  private tags = new Map<string, Set<string>>()

  addTag(tag: string, key: string) {
    if (!this.tags.has(tag)) {
      this.tags.set(tag, new Set())
    }
    this.tags.get(tag)!.add(key)
  }

  invalidateTag(tag: string) {
    const keys = this.tags.get(tag)
    if (keys) {
      for (const key of keys) {
        cache.delete(key)
      }
      this.tags.delete(tag)
    }
  }

  invalidateTags(tags: string[]) {
    tags.forEach(tag => this.invalidateTag(tag))
  }
}

export const cacheTags = new CacheTagManager()

// 本地存储缓存（持久化缓存）
export class LocalStorageCache {
  private prefix: string

  constructor(prefix: string = 'app-cache-') {
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  set(key: string, data: any, ttl: number = 24 * 60 * 60 * 1000) { // 默认24小时
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    }
    
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(item))
    } catch (error) {
      console.warn('LocalStorage缓存失败:', error)
    }
  }

  get(key: string): any | null {
    try {
      const itemStr = localStorage.getItem(this.getKey(key))
      
      if (!itemStr) return null
      
      const item = JSON.parse(itemStr)
      
      // 检查是否过期
      if (Date.now() - item.timestamp > item.ttl) {
        this.delete(key)
        return null
      }
      
      return item.data
    } catch (error) {
      console.warn('LocalStorage缓存读取失败:', error)
      return null
    }
  }

  delete(key: string) {
    try {
      localStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.warn('LocalStorage缓存删除失败:', error)
    }
  }

  clear() {
    try {
      const keys = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(this.prefix)) {
          keys.push(key)
        }
      }
      keys.forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.warn('LocalStorage缓存清空失败:', error)
    }
  }
}

export const localStorageCache = new LocalStorageCache()