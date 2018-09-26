### git config

```
//create SSH key
ssh-keygen -t rsa -C "youremail@example.com"

git config [--global] -l
git config [--global] user.name
git config [--global] user.name "Your Name"
```

### create repository

1. new repository

   ```
   mkdir dirName && cd dirName
   pwd   // do not use chinese
   git init
   ```
2. existing repository

   ```
   git clone xxx
   git init
   ```
### local change

```
git add .
git status
git commit -m "first commit"
git diff xxx
```

### commit history

```
git reflog
git log --pretty=oneline --abbrev-commit
git log --pretty=oneline --author="Jack"
git log -p <file>
git blame <file>
```

### brach & tag

```
git branch
git branch <branch>
git checkout <branch>
git checkout -b dev origin/dev    //在本地创建远程的dev分支，然后就可以在dev分支创建自己的工作分支了
git checkout -b <branch>

git merge <branch>  //合并 name 分支到当前分支
git merge --no-ff -m "这里合并了dev分支" dev    //使用普通模式合并分支，使其有据可查

git branch -d <branch>
git branch -dr <remote/branch>

//为了方便管理，可以为每次提交打一个标签，比如版本号
git tag v1.0    //为当前分支创建标签
git tag    //查看所有标签
git tag v0.9 0536a    //如果忘了打标签，可以指定使用git log查到该分支版本的 commit id 打标签
git show v1.0    //显示标签信息
git tag -a v1.0 -m "标签描述" 03366b    //创建带说明的标签

//标签都是创建在本地的，不会自动推送到远程
git tag -d v1.0    //删除本地标签
git push origin v1.0    //推送一个标签到远程
git push origin --tags    //推送所有本地标签到远程
git push origin :refs/tags/v1.0    //删除远程标签
```

### remote repository

```
git remote
git remote -v
git remote show <remote>
git remote add <shortname> <url>

git pull <remote> <branch>
git push [-u] <remote> <branch>

git fetch <remote>

git branch -dr <remote/branch>

git push <shortname> <tagName>
git push tags
```

### merge & rebase

```
git merge <branch>

git rebase <branch>
git rebase --abort
git rebase --continue
```

### reset

```
//local
git reset HEAD .
git reset HEAD -filename

//remote
git reset --hard HEAD~1
git reset HEAD~1
git reset --soft HEAD~1
git checkout HEAD <file> ////撤销对file的修改
git reset HEAD <file> //撤销对暂存区中test.txt的修改

git revert \<commit>

git reflog    //查看命令记录
git reset --hard <commitid>    //回退到指定版本

git reset <commitid>
git reset --keep <commitid>
```

### .gitignore

### alias

```
git config --global alias.sta status    //使用git sta就等于git status了
git config --global alias.cmt commit    //git cmt等于git commit
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```
### stash

```
git status
git stash
git stash list
git stash pop  //恢复工作区并删除暂存的stash
git stash apply    //恢复工作区，不删stash
git stash drop    //删除stash
```

### 搭建Git服务器
//其实就是搭建私有仓库
//推荐使用Linux服务器如Ubuntu或Debian
//假设你有sudo权限的账号
第一步：sudo apt-get install git    //安装Git
第二步：sudo adduser git    //创建一个Git用户，用来运行Git服务
第三步：创建证书登录：///收集所有需要登录的用户的公钥，就是他们自己的id_rsa.pub文件，把所有公钥导入到/home/git/.ssh/authorized_keys文件里，一行一个
第四步，初始化Git仓库://先选定一个目录作为Git仓库,在该目录下输入命令（比如目录：/srv）：
sudo git init --bare sample.git
sudo chown -R git:git sample.git
第五步：禁用shell登录，通过编辑/etc/passwd文件完成
git:x:1001:1001:,,,:/home/git:/bin/bash
改为：
git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell
第六步，克隆远程仓库：
git clone git@server:/srv/sample.git


