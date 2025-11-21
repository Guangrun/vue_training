// API客户端封装
class ApiClient {
  private baseURL: string
  private timeout: number

  constructor(baseURL: string = '/api', timeout: number = 5000) {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  // 基础请求方法
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP错误! 状态: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('请求超时')
        }
        throw error
      }
      
      throw new Error('未知错误')
    }
  }

  // GET请求
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = params 
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint
    
    return this.request<T>(url, { method: 'GET' })
  }

  // POST请求
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  // PUT请求
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  // DELETE请求
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// 创建API客户端实例
export const apiClient = new ApiClient()

// 模拟API响应
export function mockApiResponse<T>(data: T, delay: number = 500): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

// 模拟用户API
export const userApi = {
  // 获取用户列表
  async getUsers(params?: { page?: number; limit?: number; search?: string }) {
    const mockUsers = [
      { id: 1, name: '张三', email: 'zhang@example.com', age: 25 },
      { id: 2, name: '李四', email: 'li@example.com', age: 30 },
      { id: 3, name: '王五', email: 'wang@example.com', age: 35 },
      { id: 4, name: '赵六', email: 'zhao@example.com', age: 28 },
      { id: 5, name: '钱七', email: 'qian@example.com', age: 32 }
    ]

    let users = [...mockUsers]

    // 搜索过滤
    if (params?.search) {
      users = users.filter(user => 
        user.name.includes(params.search!) || 
        user.email.includes(params.search!)
      )
    }

    // 分页
    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const end = start + limit

    return mockApiResponse({
      users: users.slice(start, end),
      total: users.length,
      page,
      limit
    })
  },

  // 获取单个用户
  async getUser(id: number) {
    const users = [
      { id: 1, name: '张三', email: 'zhang@example.com', age: 25 },
      { id: 2, name: '李四', email: 'li@example.com', age: 30 },
      { id: 3, name: '王五', email: 'wang@example.com', age: 35 }
    ]
    
    const user = users.find(u => u.id === id)
    if (!user) {
      throw new Error('用户未找到')
    }
    
    return mockApiResponse(user)
  },

  // 创建用户
  async createUser(userData: { name: string; email: string; age: number }) {
    const newUser = {
      id: Date.now(),
      ...userData
    }
    
    return mockApiResponse(newUser, 1000)
  },

  // 更新用户
  async updateUser(id: number, userData: Partial<{ name: string; email: string; age: number }>) {
    return mockApiResponse({ id, ...userData }, 800)
  },

  // 删除用户
  async deleteUser(id: number) {
    return mockApiResponse({ success: true, id }, 600)
  }
}

// 模拟任务API
export const taskApi = {
  // 获取任务列表
  async getTasks(params?: { status?: string; priority?: string; page?: number }) {
    const mockTasks = [
      {
        id: 1,
        title: '学习Vue 3 Composition API',
        description: '掌握ref、reactive、computed等核心概念',
        status: 'completed',
        priority: 'high',
        createdAt: '2024-01-10',
        dueDate: '2024-01-15'
      },
      {
        id: 2,
        title: '实现任务管理功能',
        description: '创建一个完整的任务管理系统',
        status: 'in-progress',
        priority: 'medium',
        createdAt: '2024-01-12',
        dueDate: '2024-01-20'
      },
      {
        id: 3,
        title: '学习Pinia状态管理',
        description: '使用Pinia管理应用状态',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-01-14',
        dueDate: '2024-01-25'
      }
    ]

    let tasks = [...mockTasks]

    // 状态过滤
    if (params?.status) {
      tasks = tasks.filter(task => task.status === params.status)
    }

    // 优先级过滤
    if (params?.priority) {
      tasks = tasks.filter(task => task.priority === params.priority)
    }

    return mockApiResponse({
      tasks,
      total: tasks.length
    })
  },

  // 获取单个任务
  async getTask(id: number) {
    const tasks = [
      {
        id: 1,
        title: '学习Vue 3 Composition API',
        description: '掌握ref、reactive、computed等核心概念',
        status: 'completed',
        priority: 'high',
        createdAt: '2024-01-10',
        dueDate: '2024-01-15'
      }
    ]
    
    const task = tasks.find(t => t.id === id)
    if (!task) {
      throw new Error('任务未找到')
    }
    
    return mockApiResponse(task)
  }
}

// 错误处理
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}