interface configs {
  production: object,
  development: object,
  test: object
}
// 一些全局的config配置
const modeUrlObj: configs = {
  // 生产环境
  'production': {
    baseURL: 'http://114.132.235.185/pro',
    authBaseURL: ''
  },
  // 开发环境
  'development': {
    baseURL: 'http://127.0.0.1:8080/dev',
    // baseURL: 'http://192.168.1.101:8080/dev',
    authBaseURL: ''
  },
  // 测试环境
  'test': {
    baseURL: 'http://192.168.1.136:8080/test/',
    authBaseURL: ''
  }
};
export default modeUrlObj[process.env.NODE_ENV as ('production' | 'development' | 'test')];
