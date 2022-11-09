# vue3_vite_pinia_ts
    系统使用官方推荐的vite生成
    风格：vue3.0 setup（组合式）
    全局状态管理：pinia
    静态类型验证：typeScript
    UI:element-plus
# 进度
    系统整体已经构建完成（除plugins模块正在改造）
# 系统简介
    主要用途：快速构建cms系统
    功能开箱即用：登录、注册、发邮件重置密码、token控制、（用户-角色-菜单-按钮）一整套权限控制体系、字典管理
    自定义组合：表单、列表、路由、弹窗；引入组合快速生成，预留更多的时间用于处理业务逻辑
    插件封装集成（优化集成中...）：可视化d3、echart...地图、动画.....
# 目录
    api：存储api请求相关。封装了axios请求；包含全部api接口地址；需要的话可以随意拆分index文件
    assets：存储静态文件。存储有css、svg、img、地图json文件等静态文件
    components：全局通用组件。包含页面整体架构相关组件layouts、全局svg组件、全局loading组件、websocket组件（暂不可用）
    composables：自定义组合文件。dialog组合、form组合、list组合、page组合、router组合
    router：路由相关
    store：pinia全局状态管理
    utils（有些文件无用可删除）：通用的工具方法封装，请求访问拦截、表单验证、水印、ts接口等
    views：页面目录
    根目录下vite.config.js用于配置vite
# 使用方法
    git拿到代码，npm install即可运行进入登录页；
    若想使用系统需要服务端和数据库支持：
        本站api-system项目是对应的服务端，采用node.js搭建，若需要，请查看此项目。

