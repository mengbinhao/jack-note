1. `npm --help`
2. set init parameter value
```bash
npm config set init.author.email "mengbinhao2018@gmail.com"
npm config set init.author.name "jack"
npm config set init.author.url "http://github.com/mengbinhao"
npm config set init.license "MIT"
npm config set init.version "0.0.1"
```
3. `npm cache clean [--force]` 慎用该命令execute when meet strange error
4. install path
```bash
# macos
/usr/local/lib/node_modules

# windows
C:\Users\xxx\AppData\Roaming\npm\node_modules
```
5. command
   1. config
   ```bash
    npm set xxx
    npm config set registry=https://registry.npm.taobao.org
    npm config get registry
    npm config delete registry
    npm [config] list [-g] [<pkg>...]
   ```
   2. init
   ```bash
    npm -v
    npm init [-y]
   ```
   3. install/uninstall
   ```bash
    npm install <package> [-g]
    npm install <package>@latest
    npm install <package1> <package2>...
    npm install <package> --save-dev | -S | -D | --save
    npm uninstall <package>
    # 清除未用到的包
    npm prune
   ```
   4. update
   ```bash
    npm update [-g] <pkg>...
    npm update [-g] <package>@version
    npm outdated [-g] <pkg>...
   ```
   5. list
   ```bash
    npm list [-g]
    npm list --depth=0
   ```
   6. publish
   ```bash
    npm adduser
    npm whoami
    npm version patch
    npm version minor
    npm version major
    npm publish
   ```
   7. others
   ```bash
    npm root [-g]
    # 某个包属性查看
    # 包名是否存在
    npm search <package>

    # 包所有信息
    npm view <package>

    # 包的属性
    npm view <package> dependencies

    # 包源文件地址
    npm view <package> repository.url

    # 包依赖 node 最低版本号
    npm view <package> engines

    # 包当前版本号
    npm view <package> version

    # 包历史版本号
    npm view <package> versions

    # 包作者信息
    npm view <package> maintainers

    # 包仓库地址
    npm repo <package>

    # 包文档地址
    npm docs <package>

    # 包主页
    npm home <package>

    # 包bugs
    npm bugs <package>

    # 当前项目bugs
    npm bugs
   ```