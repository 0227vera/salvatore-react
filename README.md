# react 学习

## 直接说明吧

1. 目录没什么好说明的，自己可以看

2. 使用create-react-app之前请一定先对react的知识进行了解，至少要有写过react代码，或者有维护过react项目的经验否则请您先去熟悉react的相关语法

3. `npm i create-react-app -g`

4. `npm run eject | yarn eject` (npm没什么好说的，如果使用yarn请先确定您的电脑上面安装了yarn)

5. `npm start | yarn start`

6. `npm run build` (建议用完脚手架之后看一下webpack的配置是怎么写的，再之后的开发中需要修改打包相关的信息的时候会快很多)

## 相关文档

1. [react](https://react.docschina.org/)

2. [create-react-app的git地址](https://github.com/facebook/create-react-app)

3. [redux的git地址](https://github.com/reduxjs/redux)

  `npm i redux -S`

  `npm i redux-thunk -S` 处理异步问题

  `npm i react-redux -S` 根据接口来使用store

  使用:

      * Provider: 组件再应用的最外层,传入store即可,只用一次
      
      * Connect:负责从外部获取组件需要的参数 `npm install babel-plugin-transform-decorators-legacy -D` 装饰器方便connect的书写,在package里面添加`"plugins": [ ["@babel/plugin-proposal-decorators", { "legacy": true }]]`(babel的配置)

4. [react-router中文文档](http://react-guide.github.io/react-router-cn/)

## node相关的文档和包(server文件夹)

1. `npm i -g nodemon`(node修改代码，不需要重启项目)

2. `npm i -g mongoose -S`(node连接mongodb)

## mongodb

1. [mongodb官网](https://www.mongodb.com)

## vue和react快速模板生成

1. vue

  * `Ctrl + Shift + P` --> `snippets` ---> 点击`首选项：配置用户代码片段`----> 选择`vue.json`
  *  复制下面的json

```json
{
  "Print to vue": {
    "prefix": "vue",
    "body": [
      "<template>",
      "  <div class=\"$TM_FILENAME_BASE\">\n",
      "  </div>",
      "</template>\n",
      "<script>",
      "export default {",
      "  name: '$TM_FILENAME_BASE',",
      "  data () {",
      "    return {\n",
      "    }",
      "  },",
      "  mounted () {",
      "  },",
      "  methods: {\n",
      "  },",
      "  components: {\n",
      "  }",
      "}",
      "</script>\n",
      "<style lang=\"scss\" scoped>\n",
      "</style>",
      "$2"
    ],
    "description": "快速构建vue各个基本块"
  }
}
```

2. react

  * 安装vdcode插件`ES7 React/Redux/GraphQL/React-Native snippets`
  * rcc---->有状态组件代码块
  * rfc---->无状态组件代码块

## 下面的是脚手架自带的readme，搂一眼

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
