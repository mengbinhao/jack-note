### 1 什么是webpack
构建就是把源代码转换成线上可执行的js、css、html.
- 代码转换ts->js、less->css等
- 文件优化,压缩js、css、html,合并图片
- 代码分割,提取多个页面的公共代码,提取首屏不需要执行的代码异步加载,路由按需加载
- 模块合并
- 监听本地源代码变化,自动重新构建,刷新浏览器
- 代码校验,在代码提交到仓库前校验代码,以及单元测试是否通过
- 自动发布,更新完代码后,自动构建出现上发布代码并传输给发布系统
- Tree-Shaking
- 利用CDN加速,在构建过程中,将引用的静态资源路径修改为CDN上对应的路径

### 2 核心概念
- entry：入口,可抽象成输入,单入口写成字符串,多入口写成对象

- output：输出结果,在webpack经过一系列处理并得出最终想要的代码后输出结果,单出口filename和path,多出口使用占位符`[name].js`

- loader：模块转换器,用于把原生不支持的模块转换成有效的模块,并添加到依赖图中,原生只支持js和json,其本质是一个函数

    > babel-loader
    >
    > css-loader
    >
    > less-loader
    >
    > ts-loader
    >
    > file-loader
    >
    > raw-loader
    >
    > thread-loader

- plugin：在Webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情,增强webpack功能,作用于整个构建过程,可以简单理解为webpack不能做的事情plugin做

    > CommonsChunkPlugin
    >
    > CleanWebpackPlugin
    >
    > ExractTextWebpackPlugin
    >
    > CopyWebpackPlugin
    >
    > HtmlWebpackPlugin
    >
    > UglifyjsWebpackPlugin
    >
    > ZipWebpackPlugin

- mode: production、development、none

- module：在webpack里一切皆模块,一个模块(css、font、image)对应着一个文件,webpack会从配置的entry开始递归找出所有依赖的模块

- chunk：代码块,一个chunk由多个模块组合而成,用于代码合并与分割


### 3 get started
1. mkdir webpack-demo

2. cd webpack-demo

3. npm init -y

4. `npm i webpack webpack-cli webpack-dev-server(自动打包、监视文件改变、刷新浏览器) -D`

5. 创建和配置webpack.config.js(可以修改名字)

6. 配置npm scripts

    ```bash
    "scripts": {
        //--open --hot --inline --port --config ./webpack.dev.config.js
        "build": "webpack --config webpack.config.js", 
        "dev": "webpack-dev-server --open --color --port 9999", 
        "dev-simple": "webpack-dev-server",
        "watch": "webpack --watch"
    }
    ```

7. 安装plugin和loader
    ```bash
    npm i html-webpack-plugin clean-webpack-plugin -D
    npm i babel-loader babel-core babel-preset-env (babel-loader)
    npm i babel-polyfill --D  (默认只转换语法,这个转换API )
    npm i babel-plugin-transform-runtime --D  (解决重复引用工具方法导致打包js过大的问题)
    npm i babel-runtime --save  (解决重复引用工具方法导致打包js过大的问题)
            cacheDirectory: true   //给babel增加打包缓存目录
    ```

    ```bash
    npm i --D style-loader css-loader  (css-loader)
    npm i --D npm i file-loader url-loader  (image-loader)
    npm i --D less-loader  less(less-loader)
    npm i --D vue-loader vue-template-compiler(vue-loader)
    ```

### 4 webpack使用

#### 1 resolve es6

- `npm i @babel/core @babel/preset-env babel-loader -D`

```
//.babelrc
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

```javascript
//webpack.config.js
module: {
    rules: [
        {
            test: /.js$/,
            use: 'babel-loader'
        }
    ]
}
```

#### 2 resolve jsx(@babel/core、babel-loader已安装,并且webpack.config.js配置)

- `npm i react react-dom @babel/preset-react -D`
- `"@babel/preset-react"`

#### 3 resolve css

- npm i style-loader css-loader -D`

```javascript
module: {
    rules: [
        {
            test: /.css$/,
            //注意顺序
            use: ['style-loader','css-loader']
        }
    ]
}
```

#### 4 resolve less or sass

- `npm i less less-loader -D`

```javascript
module: {
    rules: [
        {
            test: /.less$/,
            //注意顺序
            // [{loader: 'style-loader', options:{}}]
            //loader: 'style-loader!css-loader',
            //include:path.join(__dirname,'./src'),
            //exclude:/node_modules/
            use: ['style-loader','css-loader','less-loader']
        }
    ]
}
```

#### 5 file-loader

- `npm i file-loader -D`

```javascript
//resolve img and font
module: {
    rules: [
        {
            test: /.(png|jpg|gif|jpeg)$/,
            use: 'file-loader'
        },
        {
            test: /.(woff|woff2|eot|ttf|otf)$/,
            use: 'file-loader'
        }
    ]
}
```

#### 6 url-loader

```javascript
//也可以打包图片和字体,区别就是对小于一定体积的文件直接转成base64
module: {
    rules: [
        {
            test: /.(woff|woff2|eot|ttf|otf)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit:10240
                }
            }
        }
    ]
}
```

#### 7 resolve

- extensions

- alias

### 5 webpack.config.js

#### 1 watch(需要手动刷新浏览器)

- webpack.config.js -> watch:true

- package.js 加 --watch

    ```bash
    //只有开启watch,watchOptions才有意义
    watchOptions: {
        ignored: /node_modules/, //支持正则
        aggregateTimeout: 300, //默认等待时间
        poll: 1000 //默认每秒1000次
    }
    ```

#### 2 文件指纹

- Hash: 和整个项目构建相关,只要项目文件有修改,整个项目构建的hash就会改变
- Chunkhash: 和webpack打包的chunk有关,不同entry生成不同的chunkhash
- Contenthash: 根据文件内容定义hash,文件内容不变则Contenthash不变

```javascript
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    //相对路径
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        //绝对路径
        path: path.join(__dirname, 'dist'),
        //js文件指纹
        filename: '[name]_[chunkhash:8].js'
        //publicPath : 'dist/js/'  处理图片路径
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            //文件指纹
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            ////文件指纹
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            //文件指纹
            filename: '[name]_[contenthash:8].css'
        })
    ]
}
```

####  3 compress html/css/js

- 内置`uglifyjs-weabpack-plugin`

- `optimize-css-assets-webpack-plugin` + `cssnano`

- `html-webpack-plugin`

    ```javascript
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        filename: 'index.html',
        chunks: ['index'],
        inject: true,
        minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
        }
     })
    ```

#### 4 clear dist

- 通过npm scripts `rm -rf./dist && webpack` or `rimraf ./dist && webpack`
- `clean-webpack-plugin`

#### 5 postcss(autoprefixer插件)

- Trident(-ms)、Gek(-moz)、Webkit(-webkit)、Presto(-o)

```javascript
 {
     test: /.less$/,
     use: [
         MiniCssExtractPlugin.loader,
         'css-loader',
         'less-loader',
         {
             loader: 'postcss-loader',
             options: {
                 plugins: () => [
                     require('autoprefixer')({
                     browsers: ['last 2 version', '>1%', 'ios 7']
                     })
                 ]
             }
         }
     ]
 }
```

#### 6 px convert to rem
- @media
- `npm i px2rem-loader -D` `npm i lib-flexible -S`(动态计算根元素font-size,打开页面时就计算)

```javascript
{
    test: /.less$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader',
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    require('autoprefixer')({
                    browsers: ['last 2 version', '>1%', 'ios 7']
                })
                ]
            }
        },
        {
            loader: 'px2rem-loader',
            options: {
                remUnit: 75,
                remPrecision: 8 //小数位数
        	}
        }
    ]
}
```

- ` font-size: 12px; /*no*/` 不进行rem转换

#### 7 资源内联

##### 1 意义

- 代码层面
    - 页面框架的初始化脚本
    - 上报相关打点
    - css内联避免页面闪动
- 请求层面
    - 小图片或字体内联(url-loader)

##### 2 html/js内联

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    ${ require('raw-loader!./meta.html')}
    <title>Document</title>
    <script>${ require('raw-loader!babel-loader!../../node_modules/lib-flexible/flexible.js')}</script>
</head>
<body>
    <div id="root"><!--HTML_PLACEHOLDER--></div>
    <!--INITIAL_DATA_PLACEHOLDER-->
</body>
</html>
```

##### 3 css内联

- style-loader

    ```javascript
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                insertAt: 'top', //插入head
                                singleton: true //合并所有style tag
                            }
                        },
                        'css-loader',
                        'scss-loader'
                    ]
                }
            ]
        }
    }
    ```

- `html-inline-css-webpack-plugin`(推荐)

#### 8 MPA bundle

```javascript
//simple example
entry: {
    index: './src/index.js',
    a: './src/a.js'
}
output: {
    filename: '[name].[hash:8].js',
}
plugins: [
    //./src/index.html需要存在
    new HtmlWebpackPlugin({
        filename: 'a.html', //default filename is index
        template: './src/index.html',
        title: 'test webpack',
        hash: true,
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true
        },
        chunks: ['index']
    }),
    new HtmlWebpackPlugin({
        filename: 'b.html',
        template: './src/index.html',
        title: 'test webpack',
        hash: true,
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true
        },
        chunks: ['a']
    })
]
```

```javascript
//通用
const glob = require('glob')
const path = require('path')

//动态获取entry和htmlWebpackPlugins,遵循目录结构
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            // '/Users/cpselvis/my-project/src/index/index.js'

            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inlineSource: '.css$',
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
		...
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins)
};
```

#### 9 source map

- eval: 使用eval包括模块代码
- source map: 产生.map文件
- cheap: 不包含列信息
- inline: 将.map作为DataURI嵌入,不单独生成.map
- module: 包含loader的source map

![](images/webpack-2.png)

#### 10 提取公共资源

 ##### 1 `html-webpack-externals-plugin`

```javascript
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

plugins: [
	...
    new HtmlWebpackExternalsPlugin({
        externals: [
            {
                module: 'react',
                entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
                global: 'React',
            },
            {
                module: 'react-dom',
                entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
                global: 'ReactDOM',
            },
        ]
    })
]
```

##### 2 SplitChunksPlugin(代替CommonsChunkPlugin)

```javascript
//分离基础包
module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: 'vendors',
                    chunks: 'all' //async initial all
                }
            }
        }
    }
}
```

```javascript
//分离页面公共文件
module.exports = {
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'all', //async initial all
                    minChunks: 2
                }
            }
        }
    }
}
```

#### 11 tree shaking

- DCE(代码不可到达,代码执行结果不会被用到,代码只影响死变量)
- 必须是ES6的语法,CJS不支持
- 函数必须是纯函数
- `mode:productio/none`
- 原理
    - 只能作为模块顶层的语句出现
    - import的模块名只能是字符串常量
    - import binding是immutable的
    - uglify阶段删除无用代码

#### 12 scope hoisting

- 现象：构建后的代码存在大量闭包
- 导致问题：大量作用域包裹代码体积变大,运行代码时创建的函数作用域变多,内存开销变大
- 原理：将所有模块的代码按照所引用顺序放在一个函数作用域里,然后适当的重命名一些变量以防止变量名冲突
- 必须是ES6语法,CJS不支持
- `mode:productio/none` +  `new webpack.optimize.ModuleConcatenationPlugin()`

#### 13 code split and dynamic import

##### 1 意义

- 抽离相同代码到一个chunk
- 脚本懒加载,初始化代码更小(比如首屏)

##### 2 方式

- CJS: require.ensure

- ES6: 动态import(需要babel支持)

    ```javascript
    //npm i @babel/plugin-syntax-dynamic-import -D
    {
        "plugins": ["@babel/plugin-syntax-dynamic-import"]
    }
    ```

    ![](images/webpack-3.png)

#### 14 combine eslint

- eslint-config-airbnb、eslint-config-airbnb-base

- CI/CD integrited

- webpack integrited

    ```javascript
    //webpack.config.js
    module.exports = {
        module: {
            rules: [
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ]
            ]
        }
    }
    
    //然后创建 .eslintrc.js
    module.exports = {
        parser: "babel-eslint",
        "extends": "airbnb",
        "env": {
            "browser": true,
            "node", true
        },
        "rules": {
            "semi": "error",
            //0 1 2
            "indent": ["error", 4]
        }
    }
    ```

- precommit hook

    ```javascript
    "script": {
        "precommit": "lint-staged"
    },
    "lint-stage": {
        "linters": {
            "*.{ja.css}": ["eslint --fix", "git add"]
        }
    }
    ```

#### 15 构建输出日志

- stats: 'error-only'  //none mininal normal verbose, devServer里面也需要加
- friendly-errors-webpack-plugin(`plugins: [new FriendlyErrorsWebpackPlugin()]`)  +  `stats: 'error-only'`

#### 16 other

- ProvidePlugin
- expose-loader

#### 17 some examples

##### 1 delete useless css

```javascript
//npm i purifycss-webpack purify-css glob -D
const PurifycssWebpack = require('purifycss-webpack')
const glob = require('glob')

plugins: [
    //删除没用到的css,一定绝对路径,一定放到HtmlWebpackPlugin之后
    new PurifycssWebpack({
        paths: glob.sync(path.resolve(src/*.html))
    })
]
```

##### 2 抽离style from js to css link文件

```javascript
//MiniCssExtractPlugin
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
module: {
    rules: [
        {
            test: /\.css$/,
            //顺序从右往左
            use: ExtractTextWebpackPlugin.extract({
                use: [
                    {loader: 'css-loader', options:{}}
                ]
            })
        },
        {
            test: /\.less$/,
            use: ExtractTextWebpackPlugin.extract({
                use: [
                    {loader: 'css-loader'},
                    {loader: 'less-loader'}
                ]
            })
        }
    ],
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css'
        })
    ]
}
```

##### 3 抽离css和less到单独文件

```javascript
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const lessExtract = new ExtractTextWebpackPlugin('css/less.css')
const cssExtract = new ExtractTextWebpackPlugin('css/css.css')
module: {
    rules: [
        {
            test: /\.css$/,
            use: cssExtract.extract({
                use: [
                    {loader: 'css-loader'}
                ]
            })
        },
        {
            test: /\.less$/,
            use: lessExtract.extract({
                use: [
                    {loader: 'css-loader'},
                    {loader: 'less-loader'}
                ]
            })
        }
    ],
    plugins: [
        lessExtract,
        cssExtract
    ]
}
```

##### 4 解决抽离后css不热更新问题,开发时需要

```javascript
const lessExtract = new ExtractTextWebpackPlugin({
    filename: 'css/less.css',
    disable: true
})
use: cssExtract.extract({
    fallback: 'style-loader',
    use: [
        {loader: 'css-loader', options:{}}
    ]
})
```

##### 5 拷贝静态图片

```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin')
plugins: [
    new CopyWebpackPlugin([
        {
            from: './src/doc',
            to: 'public'
        }
    ])
]
```

##### 6 在html中使用图片

```javascript
//npm i html-withimg-loader -D
<div class="img-container "><img src="./images/logo.png" alt="logo.png"></div>

{
    test:/\.(html|html)$/,
    use:'html-withimg-loader',
    include:path.join(__dirname,'./src'),
    exclude:/node_modules/
}
```

### 6 webpack-dev-server(只能hot组件和css)

```javascript
const webpack = require('webpack')
...
mode:development,
plugins: [
    new webpack.HotModuleReplacementPlugin()
],
devServer: {
    //path.join(__dirname, 'dist')
    contentBase: './dist',
    hot: true
    //port: 9000,
    //compress: true,
    //open: true
}
```

### 7 weppack-dev-middleware(将webpack输出的文件传输给服务器)

```javascript
const express = require('express')
const wepback = require('wepback')
const weppackDevMiddleware = require('weppack-dev-middleware')

const app = expess()
const config = require('./webpack.config.js')
const compile = wepback(config)

app.use(weppackDevMiddleware(compile, {
    publicPath:config.output.publicPath
}))

app.listen(3000, () => {
    console.log('server is runnning on 3000')
})
```

### 8 webpack-bundle-analyzer`npm run build --report`

![](./images/webpack-1.png)

### 9 webpack打包库和组件

![](images/webpack-4.png)

- 支持ESM `import * as xxx from 'yyy'`

- 支持CJS `const a = require(x)`

- 支持AMD `require([x], function(x) {...})`

- script引入

    ```javascript
    //webpack.config.js
    const TerserPlugin = require('terser-webpack-plugin');
    
    module.exports = {
        entry: {
            'large-number': './src/index.js',
            'large-number.min': './src/index.js'
        },
        output: {
            filename: '[name].js',
            library: 'largeNumber',
            libraryTarget: 'umd',
            libraryExport: 'default'
        },
        mode: 'none',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    include: /\.min\.js$/,
                })
            ]
        }
        
    }
    
    //script.json
    {
      "name": "large-number",
      "version": "1.0.1",
      "description": "大整数加法打包",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack",
        "prepublish": "webpack"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "terser-webpack-plugin": "^1.3.0",
        "webpack": "^4.34.0",
        "webpack-cli": "^3.3.4"
      }
    }
    
    //设置入口文件index.js
    if (process.env.NODE_ENV === 'production') {
        module.exports = require('./dist/large-number.min.js');
    } else {
        module.exports = require('./dist/large-number.js');
    }
    ```

### 10 SSR

- 客户端渲染：html->css / js -> data -> 渲染后的html 
- SSR: 一个html返回所有资源,减少请求数量,优化白屏时间,友好SEO

```javascript
//webpack.ssr.js
...
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            // '/Users/cpselvis/my-project/src/index/index.js'

            const match = entryFile.match(/src\/(.*)\/index-server\.js/);
            const pageName = match && match[1];

            if (pageName) {
                entry[pageName] = entryFile;
                htmlWebpackPlugins.push(
                    new HtmlWebpackPlugin({
                        inlineSource: '.css$',
                        template: path.join(__dirname, `src/${pageName}/index.html`),
                        filename: `${pageName}.html`,
                        chunks: ['vendors', pageName],
                        inject: true,
                        minify: {
                            html5: true,
                            collapseWhitespace: true,
                            preserveLineBreaks: false,
                            minifyCSS: true,
                            minifyJS: true,
                            removeComments: false
                        }
                    })
                );
            }
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}
...


//index-server.js
use strict';

// import React from 'react';
// import largeNumber from 'large-number';
// import logo from './images/logo.png';
// import './search.less';
const React = require('react');
const largeNumber = require('large-number');
const logo = require('./images/logo.png');
require('./search.less');

class Search extends React.Component {

    constructor() {
        super(...arguments);

        this.state = {
            Text: null
        };
    }

    loadComponent() {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            });
        });
    }

    render() {
        const { Text } = this.state;
        const addResult = largeNumber('999', '1');
        return <div className="search-text">
            {
                Text ? <Text /> : null
            }
            { addResult }
            搜索文字的内容<img src={ logo } onClick={ this.loadComponent.bind(this) } />
        </div>;
    }
}

module.exports = <Search />;


//server/index.js
if (typeof window === 'undefined') {
    global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server');
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
const data = require('./data.json');

const server = (port) => {
    const app = express();

    app.use(express.static('dist'));
    app.get('/search', (req, res) => {
        const html = renderMarkup(renderToString(SSR));
        res.status(200).send(html);
    });

    app.listen(port, () => {
        console.log('Server is running on port:' + port);
    });
};

server(process.env.PORT || 3000);

const renderMarkup = (str) => {
    const dataStr = JSON.stringify(data);
    return template.replace('<!--HTML_PLACEHOLDER-->', str)
        .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`);
}
```

### 11 构建是否成功

- echo $?

- compiler每次构建后触发done hook

    ```javascript
    plugins: [
        function() {
            //this.plugin('done'  webpack3写法,webpack3不会抛出错误码
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
                {
                    console.log('build error');
                    process.exit(1);
                }
            })
        }   
    ]
    ```
