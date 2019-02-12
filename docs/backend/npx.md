### npx 使用教程
Node 自带 npm 模块，所以可以直接使用 npx 命令。万一不能用，就要手动安装一下
`npm install -g npx`

#### 调用项目安装的模块
一般来说，调用 Mocha ，只能在项目脚本和 package.json 的scripts字段里面， 如果想在命令行下调用，必须像下面这样

```BASH
# 项目的根目录下执行
node-modules/.bin/mocha --version
```

npx 就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面这样调用就行了

`npx mocha --version`

npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。

由于 npx 会检查环境变量$PATH，所以系统命令也可以调用`npx ls`

**注意，Bash 内置的命令不在$PATH里面，所以不能用。比如，cd是 Bash 命令，因此就不能用npx cd。**

#### 避免全局安装模块
`npx create-react-app my-react-app`

上面代码运行时，npx 将create-react-app下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载create-react-app。

下载全局模块时，npx 允许指定版本`npx uglify-js@3.1.0 main.js -o ./dist/main.js`

**注意，只要 npx 后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装http-server模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务**

`npx http-server`

#### --no-install 参数和--ignore-existing
`npx --no-install http-server` 强制使用本地模块，不下载远程模块

`npx --ignore-existing create-react-app my-react-app`如果忽略本地的同名模块，强制安装使用远程模块

#### 使用不同版本的node
`npx node@0.12.8 -v`

上面命令会使用 0.12.8 版本的 Node 执行脚本。原理是从 npm 下载这个版本的 node，使用后再删掉。某些场景下，这个方法用来切换 Node 版本，要比 nvm 那样的版本管理器方便一些。

#### -p参数
-p参数用于指定 npx 所要安装的模块，所以上一节的命令可以写成下面这样

`npx -p node@0.12.8 node -v `指定安装node@0.12.8，然后再执行node -v命令。

-p参数对于需要安装多个模块的场景很有用。

`npx -p lolcatjs -p cowsay [command]`

#### -c 参数
如果 npx 安装多个模块，默认情况下，所执行的命令之中，只有第一个可执行项会使用 npx 安装的模块，后面的可执行项还是会交给 Shell 解释。
`npx -p lolcatjs -p cowsay 'cowsay hello | lolcatjs'`

上面代码中，cowsay hello | lolcatjs执行时会报错，原因是第一项cowsay由 npx 解释，而第二项命令localcatjs由 Shell 解释，但是lolcatjs并没有全局安装，所以报错。

-c参数可以将所有命令都用 npx 解释。有了它，下面代码就可以正常执行了。

`npx -p lolcatjs -p cowsay -c 'cowsay hello | lolcatjs'`

-c参数的另一个作用，是将环境变量带入所要执行的命令。举例来说，npm 提供当前项目的一些环境变量，可以用下面的命令查看

`npm run env | grep npm_`

-c参数可以把这些 npm 的环境变量带入 npx 命令。

`npx -c 'echo "$npm_package_name"'`

#### 执行 GitHub 源码
注意，远程代码必须是一个模块，即必须包含package.json和入口脚本。
```bash
# 执行 Gist 代码
$ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32

# 执行仓库代码
$ npx github:piuccio/cowsay hello
```



