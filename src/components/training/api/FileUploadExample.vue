<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">文件上传演示</h3>
      <p class="text-sm text-blue-800">学习文件上传、进度跟踪和错误处理</p>
    </div>

    <!-- 单文件上传 -->
    <div class="bg-white border rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">单文件上传</h4>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            选择文件
          </label>
          <input
            ref="singleFileInput"
            type="file"
            @change="handleSingleFileSelect"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            :accept="allowedFileTypes.join(',')"
            :disabled="singleFileUpload.uploading"
          >
          <p class="text-sm text-gray-500 mt-1">
            支持的格式: {{ allowedFileTypes.join(', ') }}
          </p>
        </div>

        <div v-if="singleFileUpload.file" class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ singleFileUpload.file.name }}</p>
                <p class="text-sm text-gray-500">{{ formatFileSize(singleFileUpload.file.size) }}</p>
              </div>
            </div>
            <button
              @click="removeSingleFile"
              class="text-red-600 hover:text-red-800"
              :disabled="singleFileUpload.uploading"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- 上传进度 -->
          <div v-if="singleFileUpload.uploading" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">上传进度</span>
              <span class="text-gray-900">{{ singleFileUpload.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: singleFileUpload.progress + '%' }"
              ></div>
            </div>
          </div>

          <!-- 上传结果 -->
          <div v-if="singleFileUpload.result" class="p-3 rounded-lg" :class="singleFileUpload.result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
            <div class="flex items-center space-x-2">
              <svg v-if="singleFileUpload.result.success" class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <svg v-else class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              <span class="font-medium" :class="singleFileUpload.result.success ? 'text-green-800' : 'text-red-800'">
                {{ singleFileUpload.result.message }}
              </span>
            </div>
          </div>

          <button
            @click="uploadSingleFile"
            :disabled="singleFileUpload.uploading"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {{ singleFileUpload.uploading ? '上传中...' : '开始上传' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 多文件上传 -->
    <div class="bg-white border rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">多文件上传</h4>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            选择多个文件
          </label>
          <input
            ref="multipleFileInput"
            type="file"
            multiple
            @change="handleMultipleFileSelect"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            :accept="allowedFileTypes.join(',')"
            :disabled="multipleFileUpload.uploading"
          >
        </div>

        <div v-if="multipleFileUpload.files.length > 0" class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">已选择 {{ multipleFileUpload.files.length }} 个文件</span>
            <button
              @click="clearMultipleFiles"
              class="text-red-600 hover:text-red-800 text-sm"
              :disabled="multipleFileUpload.uploading"
            >
              清除所有
            </button>
          </div>

          <div class="space-y-2 max-h-60 overflow-y-auto">
            <div 
              v-for="(file, index) in multipleFileUpload.files" 
              :key="index"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-medium text-gray-900 text-sm">{{ file.name }}</p>
                  <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
                </div>
              </div>
              <button
                @click="removeMultipleFile(index)"
                class="text-red-600 hover:text-red-800"
                :disabled="multipleFileUpload.uploading"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- 总体上传进度 -->
          <div v-if="multipleFileUpload.uploading" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">总体进度</span>
              <span class="text-gray-900">{{ multipleFileUpload.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-green-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: multipleFileUpload.progress + '%' }"
              ></div>
            </div>
            <p class="text-sm text-gray-600">
              正在上传: {{ multipleFileUpload.currentFileIndex + 1 }} / {{ multipleFileUpload.files.length }}
            </p>
          </div>

          <!-- 上传结果 -->
          <div v-if="multipleFileUpload.results.length > 0" class="space-y-2">
            <div 
              v-for="(result, index) in multipleFileUpload.results" 
              :key="index"
              class="p-2 rounded text-sm"
              :class="result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'"
            >
              {{ result.fileName }}: {{ result.message }}
            </div>
          </div>

          <button
            @click="uploadMultipleFiles"
            :disabled="multipleFileUpload.uploading"
            class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {{ multipleFileUpload.uploading ? '上传中...' : '批量上传' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 拖拽上传 -->
    <div class="bg-white border rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">拖拽上传</h4>
      
      <div 
        @drop="handleDrop"
        @dragover.prevent="isDragging = true"
        @dragenter.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        :class="[
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        ]"
      >
        <div class="space-y-4">
          <div class="mx-auto w-12 h-12 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          <div>
            <p class="text-gray-600">拖拽文件到这里或</p>
            <button
              @click="selectDragFiles"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              点击选择文件
            </button>
          </div>
          <p class="text-sm text-gray-500">
            支持拖拽多个文件，单个文件最大 {{ formatFileSize(maxFileSize) }}
          </p>
        </div>
      </div>

      <div v-if="dragFiles.length > 0" class="mt-4 space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">拖拽的文件 ({{ dragFiles.length }})</span>
          <button
            @click="clearDragFiles"
            class="text-red-600 hover:text-red-800 text-sm"
          >
            清除所有
          </button>
        </div>

        <div class="space-y-2">
          <div 
            v-for="(file, index) in dragFiles" 
            :key="index"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900 text-sm">{{ file.name }}</p>
                <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
              </div>
            </div>
            <button
              @click="removeDragFile(index)"
              class="text-red-600 hover:text-red-800"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <button
          @click="uploadDragFiles"
          class="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          上传拖拽的文件
        </button>
      </div>
    </div>

    <!-- 文件类型和大小限制说明 -->
    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">文件上传说明</h4>
      <ul class="text-sm text-yellow-800 space-y-1">
        <li>• 支持拖拽上传、点击上传和批量上传</li>
        <li>• 文件大小限制: 单个文件最大 {{ formatFileSize(maxFileSize) }}</li>
        <li>• 支持的格式: {{ allowedFileTypes.join(', ') }}</li>
        <li>• 上传过程中显示实时进度</li>
        <li>• 支持上传结果反馈和错误处理</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface FileUploadState {
  file: File | null
  uploading: boolean
  progress: number
  result: { success: boolean; message: string } | null
}

interface MultipleFileUploadState {
  files: File[]
  uploading: boolean
  progress: number
  currentFileIndex: number
  results: Array<{ fileName: string; success: boolean; message: string }>
}

const singleFileInput = ref<HTMLInputElement>()
const multipleFileInput = ref<HTMLInputElement>()
const isDragging = ref(false)

const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx', '.txt']
const maxFileSize = 10 * 1024 * 1024 // 10MB

const singleFileUpload = reactive<FileUploadState>({
  file: null,
  uploading: false,
  progress: 0,
  result: null
})

const multipleFileUpload = reactive<MultipleFileUploadState>({
  files: [],
  uploading: false,
  progress: 0,
  currentFileIndex: 0,
  results: []
})

const dragFiles = ref<File[]>([])

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 验证文件
const validateFile = (file: File): string | null => {
  if (file.size > maxFileSize) {
    return `文件大小超过限制 (${formatFileSize(maxFileSize)})`
  }
  
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
  if (!allowedFileTypes.includes(fileExtension)) {
    return `不支持的文件格式。支持的格式: ${allowedFileTypes.join(', ')}`
  }
  
  return null
}

// 单文件选择
const handleSingleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    const error = validateFile(file)
    if (error) {
      alert(error)
      return
    }
    
    singleFileUpload.file = file
    singleFileUpload.result = null
    singleFileUpload.progress = 0
  }
}

// 移除单文件
const removeSingleFile = () => {
  singleFileUpload.file = null
  singleFileUpload.result = null
  singleFileUpload.progress = 0
  if (singleFileInput.value) {
    singleFileInput.value.value = ''
  }
}

// 上传单文件
const uploadSingleFile = async () => {
  if (!singleFileUpload.file) return
  
  singleFileUpload.uploading = true
  singleFileUpload.result = null
  singleFileUpload.progress = 0
  
  try {
    // 模拟文件上传
    await simulateFileUpload(singleFileUpload.file, (progress) => {
      singleFileUpload.progress = progress
    })
    
    singleFileUpload.result = {
      success: true,
      message: `文件 "${singleFileUpload.file.name}" 上传成功！`
    }
    
    // 3秒后清除结果
    setTimeout(() => {
      singleFileUpload.result = null
    }, 3000)
    
  } catch (error) {
    singleFileUpload.result = {
      success: false,
      message: error instanceof Error ? error.message : '上传失败'
    }
  } finally {
    singleFileUpload.uploading = false
    singleFileUpload.progress = 0
  }
}

// 多文件选择
const handleMultipleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  
  const validFiles: File[] = []
  const errors: string[] = []
  
  files.forEach(file => {
    const error = validateFile(file)
    if (error) {
      errors.push(`${file.name}: ${error}`)
    } else {
      validFiles.push(file)
    }
  })
  
  if (errors.length > 0) {
    alert(`以下文件无法添加:\n${errors.join('\n')}`)
  }
  
  if (validFiles.length > 0) {
    multipleFileUpload.files.push(...validFiles)
    multipleFileUpload.results = []
    multipleFileUpload.progress = 0
  }
}

// 移除多文件
const removeMultipleFile = (index: number) => {
  multipleFileUpload.files.splice(index, 1)
}

// 清除所有多文件
const clearMultipleFiles = () => {
  multipleFileUpload.files = []
  multipleFileUpload.results = []
  multipleFileUpload.progress = 0
  if (multipleFileInput.value) {
    multipleFileInput.value.value = ''
  }
}

// 批量上传文件
const uploadMultipleFiles = async () => {
  if (multipleFileUpload.files.length === 0) return
  
  multipleFileUpload.uploading = true
  multipleFileUpload.results = []
  multipleFileUpload.progress = 0
  multipleFileUpload.currentFileIndex = 0
  
  try {
    const totalFiles = multipleFileUpload.files.length
    
    for (let i = 0; i < totalFiles; i++) {
      const file = multipleFileUpload.files[i]
      multipleFileUpload.currentFileIndex = i
      
      try {
        // 模拟文件上传
        await simulateFileUpload(file, (progress) => {
          // 计算总体进度
          const fileProgress = (i * 100 + progress) / totalFiles
          multipleFileUpload.progress = Math.round(fileProgress)
        })
        
        multipleFileUpload.results.push({
          fileName: file.name,
          success: true,
          message: '上传成功'
        })
        
      } catch (error) {
        multipleFileUpload.results.push({
          fileName: file.name,
          success: false,
          message: error instanceof Error ? error.message : '上传失败'
        })
      }
    }
    
    multipleFileUpload.progress = 100
    
  } catch (error) {
    console.error('批量上传失败:', error)
  } finally {
    multipleFileUpload.uploading = false
    multipleFileUpload.currentFileIndex = 0
  }
}

// 拖拽处理
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  
  const files = Array.from(event.dataTransfer?.files || [])
  
  const validFiles: File[] = []
  const errors: string[] = []
  
  files.forEach(file => {
    const error = validateFile(file)
    if (error) {
      errors.push(`${file.name}: ${error}`)
    } else {
      validFiles.push(file)
    }
  })
  
  if (errors.length > 0) {
    alert(`以下文件无法添加:\n${errors.join('\n')}`)
  }
  
  if (validFiles.length > 0) {
    dragFiles.value.push(...validFiles)
  }
}

// 选择拖拽文件
const selectDragFiles = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = allowedFileTypes.join(',')
  
  input.onchange = (event) => {
    const target = event.target as HTMLInputElement
    const files = Array.from(target.files || [])
    
    const validFiles: File[] = []
    const errors: string[] = []
    
    files.forEach(file => {
      const error = validateFile(file)
      if (error) {
        errors.push(`${file.name}: ${error}`)
      } else {
        validFiles.push(file)
      }
    })
    
    if (errors.length > 0) {
      alert(`以下文件无法添加:\n${errors.join('\n')}`)
    }
    
    if (validFiles.length > 0) {
      dragFiles.value.push(...validFiles)
    }
  }
  
  input.click()
}

// 移除拖拽文件
const removeDragFile = (index: number) => {
  dragFiles.value.splice(index, 1)
}

// 清除所有拖拽文件
const clearDragFiles = () => {
  dragFiles.value = []
}

// 上传拖拽文件
const uploadDragFiles = async () => {
  if (dragFiles.value.length === 0) return
  
  try {
    // 模拟批量上传
    for (let i = 0; i < dragFiles.value.length; i++) {
      const file = dragFiles.value[i]
      await simulateFileUpload(file)
    }
    
    alert(`成功上传 ${dragFiles.value.length} 个文件！`)
    dragFiles.value = []
    
  } catch (error) {
    alert('上传失败: ' + (error instanceof Error ? error.message : '未知错误'))
  }
}

// 模拟文件上传
const simulateFileUpload = (file: File, onProgress?: (progress: number) => void): Promise<void> => {
  return new Promise((resolve, reject) => {
    let progress = 0
    
    const interval = setInterval(() => {
      progress += Math.random() * 20
      
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        // 模拟随机失败（10%概率）
        if (Math.random() < 0.1) {
          reject(new Error(`文件 "${file.name}" 上传失败`))
        } else {
          resolve()
        }
      } else {
        if (onProgress) {
          onProgress(Math.round(progress))
        }
      }
    }, 200)
  })
}
</script>