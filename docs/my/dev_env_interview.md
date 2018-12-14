### git

#### 常用的 Git 命令
首先，通过git clone <项目远程地址>下载下来最新的代码，例如git clone git@git.coding.net:username/project-name.git，默认会下载master分支。

然后修改代码，修改过程中可以通过git status看到自己的修改情况，通过git diff <文件名>可查阅单个文件的差异。

最后，将修改的内容提交到远程服务器，做如下操作

```
git add .
git commit -m "xxx"
git push origin master
```
如果别人也提交了代码，你想同步别人提交的内容，执行`git pull origin master`即可。

#### 如何多人协作开发
多人协作开发，就不能使用master分支了，而是要每个开发者单独拉一个分支，使用git checkout -b `<branchname>`，运行git branch可以看到本地所有的分支名称。

自己的分支，如果想同步master分支的内容，可运行git merge master。切换分支可使用git checkout `<branchname>`。

在自己的分支上修改了内容，可以将自己的分支提交到远程服务器
```
git add .
git commit -m "xxx"
git push origin <branchname>
```

最后，待代码测试没问题，再将自己分支的内容合并到master分支，然后提交到远程服务器。

```
git checkout master
git merge <branchname>
git push origin master
```

### Linux 基础命令

#### 登录
入职之后，一般会有现有的用户名和密码给你，你拿来之后直接登录就行。运行`ssh name@server`然后输入密码即可登录。

#### 目录操作
- 创建目录 mkdir <目录名称>
- 删除目录 rm <目录名称>
- 定位目录 cd <目录名称>
- 查看目录文件 ls ll
- 修改目录名 mv <目录名称> <新目录名称>
- 拷贝目录 cp <目录名称> <新目录名称>
#### 文件操作
- 创建文件 touch <文件名称> vi <文件名称>
- 删除文件 rm <文件名称>
- 修改文件名 mv <文件名称> <新文件名称>
拷贝文件 cp <文件名称> <新文件名称>
#### 文件内容操作
- 查看文件 cat <文件名称> head <文件名称> tail <文件名称>
- 编辑文件内容 vi <文件名称>
- 查找文件内容 grep '关键字' <文件名称>

### 模块化
#### CommonJS
- 每个文件可当作一个模块
- 服务器端: 模块的加载同步   nodejs实现
- 浏览器端: 模块需要提前编译打包处理    browserify实现

```javascript
module.expoets = yyy
exports.xxx = yyy

require(xxx) //第三方 / 自定义
```

#### AMD
- 专门用于浏览器端，异步加载
- require.js实现


```javascript
//无依赖
define(function() {
    return xxx
})

//有依赖
define(['moudle1', 'module2'], function(m1, m2) {
    return xxx
})


requirejs(['moudle1', 'module2'], function(m1, m2) {
    //使用m1  m2
})
```
#### ES6 import
依赖模块需要编译打包处理
- export
- import

```javascript
//分多次导出模块的多个部分
export class Emp{  }
export function fun(){  }
export var person = {};

//一次导出模块的多个部分
class Emp{  }
function fun(){  }
var person = {};
export {Emp, fun, person}

//default导出(只能有一个)
export default {}

//导入模块
import xxx from './myModule';
import {Emp} from './myModule';
import {Emp, person} from './myModule';
import * as allFromModule from './myModule';
```


### 何为构建工具
“构建”也可理解为“编译”，就是将开发环境的代码转换成运行环境代码的过程。**开发环境的代码是为了更好地阅读，而运行环境的代码是为了更快地执行，两者目的不一样，因此代码形式也不一样**。例如，开发环境写的 JS 代码，要通过混淆压缩之后才能放在线上运行，因为这样代码体积更小，而且对代码执行不会有任何影响。总结一下需要构建工具处理的几种情况：

- 处理模块化：CSS 和 JS 的模块化语法，目前都无法被浏览器兼容。因此，开发环境可以使用既定的模块化语法，但是需要构建工具将模块化语法编译为浏览器可识别形式。例如，使用 webpack、Rollup 等处理 JS 模块化。
- 编译语法：编写 CSS 时使用 Less、Sass，编写 JS 时使用 ES6、TypeScript 等。这些标准目前也都无法被浏览器兼容，因此需要构建工具编译，例如使用 Babel 编译 ES6 语法。
- 代码压缩：将 CSS、JS 代码混淆压缩，为了让代码体积更小，加载更快。