export default {
  // Используем ts-jest для обработки TypeScript файлов
  preset: 'ts-jest',
  // Эмулируем браузер
  testEnvironment: 'jsdom',
  
  // Явно указываем, что трансформируем ts и tsx файлы с помощью ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Мокаем CSS (как в примере преподавателя)
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Подключаем файл настройки (для toBeInTheDocument и т.д.)
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // !!! САМОЕ ВАЖНОЕ: Явно говорим Jest искать тесты в папке src
  roots: ['<rootDir>/src'], 
  
  // Игнорируем node_modules
  testPathIgnorePatterns: ['/node_modules/'],
}
