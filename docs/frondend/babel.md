### babel
Babel是一个`JavaScript`的编译器,,借助转换器可以使用最新的语法,而不必等待浏览器支持。但是只支持语法转换，而不支持新增 API,因此使用 babel 就分为两方面：语法转码和 API 支持。你可能知道Babel可以将最新版的ES语法转为ES5，不过不只如此，它还可用于语法检查，编译，代码高亮，代码转换，优化，压缩等场景

### 单文件
```html
<div id="output"></div>
<!-- 加载 Babel -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<!-- 你的脚本代码 -->
<script type="text/babel">
// code...
</script>
```

### node
1. install
```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
```
2. 创建配置文件`babel.config.js`(也可以使用`.babelrc`)
```
const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'usage'
    }
  ]
]
module.exports = { presets }
```
其中 "useBuiltIns": "usage" 是预设插件组合 @babel/env 的选项，表示按需引入用到的 API，使用该选项要下载 @babel/polyfill 包

3. 创建源文件src/index.js
```
let f = x => x;
let p = Promise.resolve(1);
```

4. `npx babel src/index.js` or `npx babel src/index.js --out-dir lib`

### 在Webpack中配置babel-loader
```
module: {
    rules:[
    {
            test: /\.js$/,
            <!--引入的第三方模块不转码-->
            exclude: /node_modules/, 
            use: [{
                loader: 'babel-loader',
                options: {
                 <!--设置cache目录，加快转码速度，默认目录为 node_modules/.cache/babel-loader-->
                cacheDirectory: true,
                },
            }],
        },
    ]
},
<!--在开发模式下配置，通过chrome devtool/source/webpack-internal可以看到babel转码结果-->
devtool: 'cheap-module-eval-source-map'
```

```
//.babelrc
{
    "presets": [
    ["env", {
    <!--默认会将模块转换为commonjs, 设置为false 不转换-->
      "modules": false
    }],
    "stage-2"
  ],
  "plugins": [transform-runtime"]
}
```

### eslint配置babel
1. .eslintrc.js配置解析器`parser: 'babel-eslint'`

2. 另外如果在webpack中配置eslint,还要保证eslint的检查在babel转码之前,配置如下
```
module: {
    rules:[{
        // 保证先于 babel-loader 执行
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
    }]
}
```
### Babel配置presets和plugins
**Babel会先执行plugins再执行presets，其中plugins按指定顺序执行，presets逆序执行**

`babel-preset-es2015/es2016/es2017/latest & babel-preset-stage-x`
设置预设的插件集合，来配置babel能转换的ES语法的级别，stage 表示语法提案的不同阶段。现在全部不推荐使用了，请一律使用 `@babel/preset-env`

#### @babel/preset-env
默认配置相当于`babel-preset-latest`

配置文件`.babelrc`，可以写react语法和使用装饰器。装饰器还没有通过提案，浏览器一般也都不支持，需要使用babel进行转换。
```
{
    "presets":[
        "@babel/preset-react"
    ],
    "plugins":[
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy":true
            }
        ]
    ]
}
```

然后写`index.js`文件

```javascript
function createComponentWithHeader(WrappedComponent) {
    class Component extends React.Component {
        render() {
            return (
                <div>
                    <div>header</div>
                    <WrappedComponent />
                </div>
            );
        }
    }
    return Component;
}

@createComponentWithHeader
class App extends React.Component {
    render() {
        return (
            <div>hello react!</div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
```

`npx babel src/index.js --out-dir lib`

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
		<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
	</head>
	<body>
		<div id="app"></div>
		<script src="./lib/index.js"></script>
	</body>
</html>
```

### 基于环境配置Babel
```
{
    "presets": ["es2015"],
    "plugins": [],
    "env": {
        "development": {
            "plugins": [...]
        },
        "production": {
    	    "plugins": [...]
        }
    }
}
```

### Babel相关工具

#### @babel/polyfill
Babel在配置了上面的`babel-preset-env`之后，只能转换语法，而对于一些新的 API，如`Promise，Map`等，并没有实现，仍然需要引入。

引入`@babel/polyfill`（可以通过`require("@babel/polyfill");`或`import "@babel/polyfill";`）会把这些API 全部挂载到全局对象。缺点是会污染全局变量，同时如果只用到其中部分的话，会造成多余的引用。也可以在`@babel/preset-env`里通过设置`useBuiltIns`选项引入。

#### @babel/runtime & @babel/plugin-transform-runtime
`@babel/runtime`和`@babel/polyfill`解决相同的问题，不过 `@babel/runtime`是手动按需引用的。 不同于`@babel/polyfill`的挂载全局对象，`@babel/runtime`是以模块化方式包含函数实现的包。

引入`babel-plugin-transform-runtime`包实现多次引用相同API只加载一次。

注意：对于类似`"foobar".includes("foo") `的实例方法是不生效的，如需使用则仍要引用`@babel/polyfill`

#### @babel/cli
babel 的命令行工具，可以在命令行使用 Babel 编译文件，像前文演示的那样

#### @babel/register
`@babel/register`模块改写`require`命令，为它加上一个钩子。此后，每当使用`require`加载`.js、.jsx、.es 和 .es6`后缀名的文件，就会先用Babel进行转码。默认会忽略`node_modules`

#### @babel/node
`@babel/node`提供一个同`node`一样的命令行工具，不过它在运行代码之前会根据Babel配置进行编译。在Babel7中`@babel/node`不包含在`@babel/cli`中了

#### @babel/core
babel 编译器的核心。可以通过直接调用 API 来对代码、文件或 AST 进行转换

### Babel的插件编写

