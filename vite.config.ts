import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const config = {
  // HOST: '192.168.1.101',                              //监听地址，与src/config/index内的配置相同
  // REAL_PATH: 'http://192.168.1.101:8090',             //代理api接口地址

  HOST: 'localhost',                              //监听地址，与src/config/index内的配置相同
  REAL_PATH: 'http://localhost:8090',             //代理api接口地址
  PORT: 8080,                                     //监听端口，与src/config/index内的配置相同
  PUBLIC_PATH: '/manage/',           //自定义publicpath /site/vue-demo/
}
//使用defineConfig 获取类型提示
export default defineConfig({
  // root:'',//项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
  // base:'/',//开发或生产环境服务的公共基础路径
  // mode:'','development' 用于开发，'production' 用于构建//在配置中指明将会把 serve 和 build 时的模式 都 覆盖掉。也可以通过命令行 --mode 选项来重写。
  // define //没看明白
  define: {
    'process.env': {
      'BASE_API': "/"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // '@import "assets/scss/globalVar.scss";@import "assets/scss/globalMixin.scss";'
        additionalData: '@import "src/assets/css/common.scss";'
      }
    }
  },
  //publicDir:string | false 默认： "public"
  // cacheDir:'./',//默认： "node_modules/.vite" 缓存路径
  plugins: [vue()],//需要用到的插件数组。Falsy 虚值的插件将被忽略，插件数组将被扁平化（flatten）
  resolve: {
    // alias当使用文件系统路径的别名时，请始终使用绝对路径
    alias: {
      '@': path.resolve(__dirname, './src')
    }
    // dedupe如果你在你的应用程序中有相同依赖的副本（比如 monorepos），请使用此选项强制 Vite 始终将列出的依赖项解析为同一副本（从项目根目录）。
    // conditions指定其他允许场景“允许的情景”列表，并且会匹配列表中第一个情景。默认允许的情景是：import，module，browser，default 和基于当前情景为 production/development
    // mainFields package.json 中，在解析包的入口点时尝试的字段列表。注意：这比从 exports 字段解析的情景导出优先级低：如果一个入口点从 exports 成功解析，resolve.mainFields 将被忽略。
    // extensions 导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
    // preserveSymlinks 启用此选项会使 Vite 通过原始文件路径（即不跟随符号链接的路径）而不是真正的文件路径（即跟随符号链接后的路径）确定文件身份。

  },
  //开发服务器配置选项
  server: {
    host: '127.0.0.1',          //设置为 0.0.0.0 或 true 会监听所有地址，包括局域网和公共地址,例如：localhost/本机ip；也可以通过 CLI 使用 --host 0.0.0.0 或 --host 来设置。
    port: 8080,                 //如果设置的端口已被使用，Vite 将自动尝试下一个可用端口
    strictPort: false,          //设置为 true 时，如果端口已被使用，则直接退出，而不会再进行后续端口的尝试。
    // https: true,             //boolean | https.ServerOptions启用 TLS + HTTP/2。注意，只有在与 server.proxy 选项 同时使用时，才会降级为 TLS。
    open: true,                 //自动在浏览器中打开应用程序。当此值为字符串时，会被用作 URL 的路径名；设置/docs/index.html会打开http://127.0.0.1:8080/docs/index.html
    proxy: {                  //为开发服务器配置自定义代理规则。其值的结构为 { key: options } 的对象。如果 key 以 ^ 开头，它将被识别为 RegExp，其中 configure 选项可用于访问代理实例。

      '/dev': {                                         // 请求的代称，写在Axios里的BaseUrl
        target: config.REAL_PATH,                        // 真实请求URl
        changeOrigin: true,                             // 允许跨域
        // ws: true,                                    // websocket支持
        secure: false,                                  // 如果想要使用证书，关闭安全检测；默认情况下如果请求的服务是https的，并且证书是未认证的，则该未认证证书默认无法使用。
        rewrite: (path) => path.replace(/^\/dev/, '/'),
      }
    },
    //   // 字符串简写写法
    //   '/foo': 'http://localhost:4567',
    //   // 选项写法
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    //   // 正则表达式写法
    //   '^/fallback/.*': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/fallback/, '')
    //   },
    //   // 使用 proxy 实例
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     configure: (proxy, options) => {
    //       // proxy 是 'http-proxy' 的实例
    //     }
    //   },
    //   // Proxying websockets or socket.io
    //   '/socket.io': {
    //     target: 'ws://localhost:3000',
    //     ws: true
    //   }
    // },   
    // cors: false                 //为开发服务器配置 CORS。此功能默认启用，支持任何来源。可传递一个 options 对象 来进行配置，或者传递 false 来禁用此行为。
    // headers: OutgoingHttpHeaders,                     //指定服务器响应的 header。


  },
  //预览配置选项 ，相应配置同server
  preview: {
    host: '127.0.0.1',
    port: 8088,
    strictPort: false,
    // https: true,           
    open: true,
    // proxy: { key: options },   
    // cors: false,
  },
  //依赖优化选项
  optimizeDeps: {
    // entries: string | string[]         //默认只有 node_modules 和 build.outDir 文件夹会被忽略。如果还需忽略其他文件夹，你可以在模式列表中使用以 ! 为前缀的、用来匹配忽略项的模式
    // exclude: []                        //在预构建中强制排除的依赖项。
    // include: []                        //强制预构建链接的包 CommonJS 的依赖不应该排除在优化外。如果一个 ESM 依赖被排除在优化外，但是却有一个嵌套的 CommonJS 依赖，则应该为该 CommonJS 依赖添加 optimizeDeps.include
    // esbuildOptions:                    //在部署扫描和优化过程中传递给 esbuild 的选项。
    // force:                             //设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖。
  },
  //Worker 选项
  worker: {
    format: 'iife',                     //worker 打包时的输出类型。'es' | 'iife'
    // plugins: (Plugin | Plugin[])[]                           //应用于 worker 打包的 Vite 插件。注意 config.plugins 不会应用于 worker，而是应该在这里配置所用到的插件。
    // rollupOptions:rollupOptions          //用于打包 worker 的 Rollup 配置项。
  }
})
