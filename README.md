<!--
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-10 14:10:02
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-28 09:20:53
 * @message: 
-->
"# travel-server" 
"## egg创建"
$ npm i egg-init -g
$ egg-init egg-example --type=simple   //例如:egg-init 项目名称 --type=simple
$ cd egg-example
$ npm i
'## 结构'
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app(项目开发目录)
|   ├── router.js (用于配置 URL 路由规则)
│   ├── controller (用于解析用户的输入，处理后返回相应的结果)
│   |   └── home.js
│   ├── service (用于编写业务逻辑层)
│   |   └── user.js
│   ├── middleware (用于编写中间件)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (用于放置静态资源)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (用于框架的扩展)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config (用于编写配置文件)
|   ├── plugin.js(用于配置需要加载的插件)
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test (用于单元测试)
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
