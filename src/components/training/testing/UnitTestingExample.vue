<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">单元测试演示</h3>
      <p class="text-sm text-blue-800">学习如何编写和运行Vue.js组件的单元测试</p>
    </div>

    <!-- 计算器组件 -->
    <div class="bg-white border rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">计算器组件（测试示例）</h4>
      
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">数字 A</label>
            <input
              v-model.number="calculator.a"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="calculator-input-a"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">数字 B</label>
            <input
              v-model.number="calculator.b"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="calculator-input-b"
            >
          </div>
        </div>

        <div class="grid grid-cols-4 gap-2">
          <button
            @click="calculator.add()"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            data-testid="calculator-add"
          >
            +
          </button>
          <button
            @click="calculator.subtract()"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            data-testid="calculator-subtract"
          >
            -
          </button>
          <button
            @click="calculator.multiply()"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            data-testid="calculator-multiply"
          >
            ×
          </button>
          <button
            @click="calculator.divide()"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            data-testid="calculator-divide"
          >
            ÷
          </button>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg">
          <div class="flex justify-between items-center">
            <span class="text-gray-700">结果:</span>
            <span 
              class="text-2xl font-bold text-gray-900"
              data-testid="calculator-result"
            >
              {{ calculator.result }}
            </span>
          </div>
          <div v-if="calculator.error" class="mt-2 text-red-600 text-sm" data-testid="calculator-error">
            {{ calculator.error }}
          </div>
        </div>

        <button
          @click="calculator.reset()"
          class="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          data-testid="calculator-reset"
        >
          重置
        </button>
      </div>
    </div>

    <!-- 测试用例展示 -->
    <div class="bg-white border rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">测试用例示例</h4>
      
      <div class="space-y-4">
        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h5 class="font-medium text-green-900 mb-2">✅ 通过的测试</h5>
          <ul class="text-sm text-green-800 space-y-1">
            <li>• 加法运算: 2 + 3 = 5</li>
            <li>• 减法运算: 10 - 4 = 6</li>
            <li>• 乘法运算: 3 × 4 = 12</li>
            <li>• 除法运算: 15 ÷ 3 = 5</li>
            <li>• 重置功能: 清除所有值</li>
          </ul>
        </div>

        <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h5 class="font-medium text-red-900 mb-2">❌ 边界情况测试</h5>
          <ul class="text-sm text-red-800 space-y-1">
            <li>• 除以零: 应该显示错误信息</li>
            <li>• 空值处理: 应该默认为0</li>
            <li>• 大数字: 应该正确处理</li>
            <li>• 负数: 应该支持负数运算</li>
          </ul>
        </div>

        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 class="font-medium text-blue-900 mb-2">🔧 测试代码示例</h5>
          <pre class="text-xs bg-gray-100 p-3 rounded overflow-x-auto"><code>// 计算器组件测试示例
describe('Calculator', () => {
  it('应该正确执行加法运算', () => {
    const result = calculator.add(2, 3)
    expect(result).toBe(5)
  })

  it('应该处理除以零的情况', () => {
    const result = calculator.divide(10, 0)
    expect(result).toBeNull()
    expect(calculator.error).toBe('不能除以零')
  })

  it('应该支持负数运算', () => {
    const result = calculator.add(-5, 3)
    expect(result).toBe(-2)
  })
})</code></pre>
        </div>
      </div>
    </div>

    <!-- 测试运行器 -->
    <div class="bg-white border rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">测试运行器</h4>
      
      <div class="space-y-4">
        <div class="flex space-x-4">
          <button
            @click="runTests"
            :disabled="testRunner.running"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {{ testRunner.running ? '运行中...' : '运行测试' }}
          </button>
          <button
            @click="clearTestResults"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            清除结果
          </button>
        </div>

        <div v-if="testRunner.results.length > 0" class="space-y-2">
          <div class="flex justify-between items-center text-sm text-gray-600">
            <span>测试结果 ({{ testRunner.results.length }} 个测试)</span>
            <span>
              通过: <span class="text-green-600">{{ passedTests }}</span> |
              失败: <span class="text-red-600">{{ failedTests }}</span>
            </span>
          </div>

          <div class="space-y-1 max-h-60 overflow-y-auto">
            <div 
              v-for="(result, index) in testRunner.results" 
              :key="index"
              class="p-3 rounded text-sm"
              :class="result.passed ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'"
            >
              <div class="flex items-center space-x-2">
                <span class="font-mono">{{ result.passed ? '✓' : '✗' }}</span>
                <span class="font-medium">{{ result.name }}</span>
                <span class="text-xs opacity-75">{{ result.duration }}ms</span>
              </div>
              <div v-if="!result.passed && result.error" class="mt-1 text-xs opacity-75">
                {{ result.error }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 测试最佳实践 -->
    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">测试最佳实践</h4>
      <ul class="text-sm text-yellow-800 space-y-1">
        <li>• 使用 data-testid 属性来定位元素，避免依赖CSS类名</li>
        <li>• 测试组件的行为，而不是实现细节</li>
        <li>• 编写独立的测试，避免测试之间的依赖</li>
        <li>• 使用模拟数据和函数来隔离外部依赖</li>
        <li>• 测试边界情况和错误处理</li>
        <li>• 保持测试简单、可读和可维护</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

interface CalculatorState {
  a: number
  b: number
  result: number
  error: string | null
}

interface TestResult {
  name: string
  passed: boolean
  duration: number
  error?: string
}

interface TestRunnerState {
  running: boolean
  results: TestResult[]
}

// 计算器状态
const calculator = reactive<CalculatorState>({
  a: 0,
  b: 0,
  result: 0,
  error: null
})

// 测试运行器状态
const testRunner = reactive<TestRunnerState>({
  running: false,
  results: []
})

// 计算器方法
const calculatorMethods = {
  add() {
    calculator.error = null
    calculator.result = calculator.a + calculator.b
    return calculator.result
  },

  subtract() {
    calculator.error = null
    calculator.result = calculator.a - calculator.b
    return calculator.result
  },

  multiply() {
    calculator.error = null
    calculator.result = calculator.a * calculator.b
    return calculator.result
  },

  divide() {
    calculator.error = null
    if (calculator.b === 0) {
      calculator.error = '不能除以零'
      return null
    }
    calculator.result = calculator.a / calculator.b
    return calculator.result
  },

  reset() {
    calculator.a = 0
    calculator.b = 0
    calculator.result = 0
    calculator.error = null
  }
}

// 将方法绑定到计算器对象
Object.assign(calculator, calculatorMethods)

// 计算通过的测试数量
const passedTests = computed(() => {
  return testRunner.results.filter(r => r.passed).length
})

// 计算失败的测试数量
const failedTests = computed(() => {
  return testRunner.results.filter(r => !r.passed).length
})

// 模拟测试运行
const runTests = async () => {
  testRunner.running = true
  testRunner.results = []

  const tests = [
    {
      name: '加法运算测试',
      test: () => {
        calculator.a = 2
        calculator.b = 3
        const result = calculator.add()
        if (result !== 5) throw new Error(`期望 5，但得到 ${result}`)
      }
    },
    {
      name: '减法运算测试',
      test: () => {
        calculator.a = 10
        calculator.b = 4
        const result = calculator.subtract()
        if (result !== 6) throw new Error(`期望 6，但得到 ${result}`)
      }
    },
    {
      name: '乘法运算测试',
      test: () => {
        calculator.a = 3
        calculator.b = 4
        const result = calculator.multiply()
        if (result !== 12) throw new Error(`期望 12，但得到 ${result}`)
      }
    },
    {
      name: '除法运算测试',
      test: () => {
        calculator.a = 15
        calculator.b = 3
        const result = calculator.divide()
        if (result !== 5) throw new Error(`期望 5，但得到 ${result}`)
      }
    },
    {
      name: '除以零测试',
      test: () => {
        calculator.a = 10
        calculator.b = 0
        const result = calculator.divide()
        if (result !== null) throw new Error('应该返回 null')
        if (calculator.error !== '不能除以零') throw new Error('应该显示错误信息')
      }
    },
    {
      name: '负数加法测试',
      test: () => {
        calculator.a = -5
        calculator.b = 3
        const result = calculator.add()
        if (result !== -2) throw new Error(`期望 -2，但得到 ${result}`)
      }
    },
    {
      name: '重置功能测试',
      test: () => {
        calculator.a = 10
        calculator.b = 20
        calculator.result = 30
        calculator.reset()
        if (calculator.a !== 0 || calculator.b !== 0 || calculator.result !== 0) {
          throw new Error('重置功能不正确')
        }
        if (calculator.error !== null) throw new Error('错误信息应该被清除')
      }
    },
    {
      name: '大数字测试',
      test: () => {
        calculator.a = 1000000
        calculator.b = 2000000
        const result = calculator.add()
        if (result !== 3000000) throw new Error(`期望 3000000，但得到 ${result}`)
      }
    }
  ]

  // 运行每个测试
  for (const testCase of tests) {
    const startTime = Date.now()
    let passed = false
    let error: string | undefined

    try {
      testCase.test()
      passed = true
    } catch (e) {
      error = e instanceof Error ? e.message : '未知错误'
      passed = false
    }

    const duration = Date.now() - startTime
    testRunner.results.push({
      name: testCase.name,
      passed,
      duration,
      error
    })

    // 添加延迟以模拟真实测试
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  testRunner.running = false
}

// 清除测试结果
const clearTestResults = () => {
  testRunner.results = []
}
</script>