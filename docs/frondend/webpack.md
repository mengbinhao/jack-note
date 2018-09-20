### webpack(webpack.confg.js)
1. 模块化
2. 自定义文件或npm install
3. 静态文件模块化   （nodejs可以模块化js 但静态文件不可以）

      `npm install css-loader style-loader --save-dev`
4. 借助于插件和加载器

### 优势
  1. 代码分离
  2. 装载器 css sass jsx等
  3. 智能解析   require("./template" + names + .ejs)
  4. 打包（js  其他成员css less sass img由加载器实现 es6转es5）
        AMD
        CMD
        CommonJS
        ES6   都可以打包
  5. 开发工具  http服务器
  6. 代码改变自动刷新浏览器  自动编译
  7. 压缩代码

### how to use
1. mkdir webpack-demo
2. cd webpack-demo
3. npm init -y
4. npm i webpack webpack-cli webpack-dev-server(自动打包 监视文件改变 刷新浏览器) -D
5. 创建和配置 webpack.config.js
6. 配置npm scripts
    ```
    "scripts": {
        "build": "webpack --config webpack.config.js",
        "dev": "webpack-dev-server --open --color --port 3333",
        "watch": "webpack --watch"
    }
    ```
7. 安装plugin和loader
    ```
    npm i html-webpack-plugin clean-webpack-plugin -D

    npm i babel-loader babel-core babel-preset-env (babel-loader)
    npm i babel-polyfill --D  (默认只转换语法,这个转换API )
    npm i babel-plugin-transform-runtime --D  (解决重复引用工具方法导致打包js过大的问题)
    npm i babel-runtime --save  (解决重复引用工具方法导致打包js过大的问题)
            cacheDirectory: true   //给babel增加打包缓存目录


    npm i --D style-loader css-loader  (css-loader)

    npm i --D file-loader  (image-loader)

    npm i --D less-loader  less(less-loader)

    npm i --D vue-loader vue-template-compiler(vue-loader)
    ```
8. npm run build    npm run dev  npm [run] start (只有start可以省略)
9. 代码规范校验
10. npx webpack   （全局命令）
    npx webpack --config webpack.config.js(全局命令使用配置文件)

### 不打包第三方js
    1. jQuery引入到index.html 注意:这里引入目录以dist为基准
    2. 配置文件不要打包jquery到main.js
        externals: {
            //key 包名
            //value 全局jQuery导出的接口对象
            jquery: 'jQuery',
        }
    1. 需要通过import引入



### 热更新（只能更新组件和css）
    const webpack = require('webpack');
    hot: true
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()


### //webpack.config.js
 ```
    const HtmlWebpacjPlugin = requiew('html-webpack-plugin'); //install first
      module.exports = {
          entry
          output
          module: {
              //属性名后面版本roles
              loaders: [
                  {
                      test: /\.css$/,
                      //顺序相反的
                      loader: 'style-loader!css-loader'
                  },
                  {
                      test: /\.(jpg|png|gif|svg)$/,
                      //?后面加属性
                      //若图片大于limit 生成文件
                      //若图片小于生成base64,会有30%增大
                      //建议比较小的图片用base64
                      loader: 'url-loader?limit=4096'
                  },
                  {
                      test: /\.less$/,
                      loader: 'style-loader!css-loader!less-loader'
                  },
                   {
                      test: /\.js$/,
                      loader: 'babel-loader',
                      exclude: /node_modules/,
                      options: {
                          presets: ['env'], //处理关键字
                          plugins: ['transform-runtime'] //处理函数
                      }
                  },
                  {
                      test: /\.vue$/,
                      loader: 'vue-loader'
                  }
              ]
          },
          plugins: [
              new HtmlWebpacjPlugin({
                  template:''  //参照物
              })
          ]
      }
      import './xxx.css'
      import xxx from './xxx.js'
      import img from './xxx.jpg'
    ```

  - package.json

    ```
    "script": {
    	//--open --hot --inline --port
    	"dev": "webpack-dev-server --open --config ./webpack.dev.config.js"
        "dev": "webpack --config ./webpack.dev.config.js"
        "prod": "webpack --config ./webpack.prod.config.js"
    }
    ```




