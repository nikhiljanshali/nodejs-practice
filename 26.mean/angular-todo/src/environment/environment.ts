export const environment = {
  production: false,
  name: 'development',
  apiUrl: 'http://localhost:5000',
  middleware: '/api/v1',
  endpoints: {
    auth: '/auth',
    todos: '/todos',
    patient: '/patient',
    doctor: '/doctor',
    appointment: '/appointment',
    common: '/common'
  },
  features: {
    enableNotifications: true,
    enableLogging: true,
    debugMode: true
  },
  timeout: 30000,
  retryAttempts: 3
};
