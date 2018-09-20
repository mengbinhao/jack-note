### vue-cli中一些webpack的配置
1. `autoOpenBrowser改true`
2. change port
3. npm run build --report
4. proxyTable
    ```
    proxyTable: {
        '/api/**': {
            target: 'http://www.xxx.com', // 你接口的域名
            secure: false,      // 如果是https接口，需要配置这个参数
            changeOrigin: true,     // 如果接口跨域，需要进行这个参数配置
        }
    }
    ```
5. 配置组件里面的路径
    ```
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'common': resolve('src/common'),
            'components':  resolve('src/components'),
            'base': resolve('src/base'),
            'api': resolve('src/api')
        }
    }
    ```
    在组建里面使用就不用使用相对路径一直向上找了
    ```javascript
    import Scroll from 'base/scroll/scroll';
    import {prefixStyle} from 'common/js/dom'；
    import {getRecommend, getDiscList} from 'api/recommend'
    ```

6. 处理打包上线后生成的js和css文件加载404 `index.js   assetsPublicPath: './',`
7. 去掉打包后生成的map文件  `productionSourceMap: false`


### vue-cli debug
1. ccc
2. dd
3. 333
4. 4444