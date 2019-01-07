![](./images/git.png)

- Workspace：工作区（clone或者原始内容）
- Index/Stage：暂存区（有增删改查后add到临时区）
- Repository：本地仓库（保存了本地的增删改查记录）
- Remote：远程仓库（git.code.oa.com，本地的记录提交到远端，供团队所有人查看使用）


### Fetch vs Pull
    - fetch：只是拉取到本地
    - pull：不仅拉取到本地，还merge到本地分支中
### Merge vs Rebase

![](./images/git_2.png)

merge

![](./images/git_3.png)

rebase

![](./images/git_4.png)

### Reset、Revert、 Checkout

- reset  将一个分支的末端指向另一个提交，可以用来移除当前分支的一些提交
    - --soft：stage和workspace都不会被改变
    - --mixed（默认）：stage和你指定的提交同步，但workspace不受影响
    - --hard：stage和workspace都同步到你指定的提交
- Checkout 提交层面上的checkout，可以切换分支，同一分支，可以切换当前HEAD。文件层面上，不会移动HEAD指针，也不会切换到其他分支上，只是更改workspace，而不是stage。
- Revert 撤销一个提交的同时会创建一个新的提交。

| 命令         | 作用域   | 常用情景                           |
| ------------ | -------- | ---------------------------------- |
| git reset    | 提交层面 | 在私有分支上舍弃一些没有提交的更改 |
| git reset    | 文件层面 | 将文件从缓存区中移除               |
| git checkout | 提交层面 | 切换分支或查看旧版本               |
| git checkout | 文件层面 | 舍弃工作目录中的更改               |
| git revert   | 提交层面 | 在公共分支上回滚更改               |
| git revert   | 文件层面 | （然而并没有）                     |

### 代码暂存Stash
    1. 使用git stash save 取代 git stash `git stash save "test stash"`
    2. git stash list查看stash列表
    3. git stash apply命令可以通过名字指定那个stash，默认指定最近的（stash@{0}）
    4. git stash pop将stash中第一个stash删除，并将对应修改应用到当前的工作目录中
    5. 使用git stash drop，后面加上stash名，可以移除相应的stash；或者使用git stash clear清空所有stash
    6. 默认情况下，git stash会缓存：

        添加到暂存区的修改（staged changes ）
        Git跟踪但并未添加到暂存区的修改（unstaged changes）
        但不会缓存：

        在工作目录中新的文件（untracked files）
        被忽略的文件（ignored files）

        此时，使用-u或者--include-untracked可以stash untracked 文件；使用-a或者--all可以stash当前目录下的所有修改（慎用）

### git 中部分选项解释
-f --force：强制
-d --delete：删除
-D --delete --force
-m --move：移动或重命名
-M --move --force
-r --remote：远程
-a --all：所有

### if meet unnormal
`git rm -r --cached .`


### git config
```
//create SSH key
ssh-keygen -t rsa -C "youremail@example.com"

git config [--global] -l
git config [--global] user.name
git config [--global] user.name "Your Name"

git config core.filemode false //忽略权限变更
git config --global core.autocrlf false
git config --global core.safecrlf true //为了保证文件的换行符是以安全的方法，避免windows与unix的换行符混用的情况，最好也加上这么一句
```

### init
```
# 在当前目录新建一个Git代码库
$ git init

# 新建一个目录，将其初始化为Git代码库
$ git init git_test

# 下载一个项目和它的整个代码历史
$ git clone xxxxxxxxxxxxxxx
```

### 增加/删除文件
```
# 添加指定文件到暂存区
$ git add file1 file2...

# 添加指定目录到暂存区，包括子目录
$ git add dir

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm file1 file2 ...
```

### 代码提交
```
# 提交暂存区到仓库区
$ git commit -m "message"

# 提交暂存区的指定文件到仓库区
$ git commit file1 file2 ... -m "message"

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m "message"

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend file1 file2 ...
```

### 分支
```
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch name

# 新建一个分支，并切换到该分支
$ git checkout -b branch

# 新建一个分支，指向指定commit
$ git branch name commit_SHA

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track name orgin/name

# 切换到指定分支，并更新工作区
$ git checkout name

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream name origin/name

# 合并指定分支到当前分支
$ git merge branch-name

# 选择一个commit，合并进当前分支
$ git cherry-pick commit_SHA

# 删除分支
$ git branch -d branch-name

# 删除远程分支
$ git push origin --delete branch-name
$ git branch -dr remote/branch
```

### tags
```
# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag tag-name

# 新建一个tag在指定commit
$ git tag tag-name commit-SHA

# 删除本地tag
$ git tag -d tag-name

# 删除远程tag
$ git push origin :refs/tags/tag-Name

# 查看tag信息
$ git show tag-name

# 提交指定tag
$ git push origin tag-name

# 提交所有tag
$ git push origin --tags

# 新建一个分支，指向某个tag
$ git checkout -b branch-name tag-name
```

### 查看信息
```
# 显示有变更的文件
$ git status

# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 显示某个commit之后的所有变动
$ git log (tag-name||commit-SHA) HEAD

# 显示某个文件的版本历史，包括文件改名
$ git log --follow file
$ git whatchanged file

# 显示指定文件相关的每一次diff
$ git log -p file

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame file

# 显示暂存区和工作区的代码差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached file

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 显示某次提交的元数据和内容变化
$ git show commit-SHA

# 显示某次提交发生变化的文件
$ git show --name-only commit-SHA

# 显示某次提交时，某个文件的内容
$ git show commit-SHA:filename

# 显示当前分支的最近几次提交
$ git reflog

# 从本地master拉取代码更新当前分支：branch 一般为master
$ git rebase branch-name
```

### 远程同步
```
# 下载远程仓库的所有变动
$ git fetch origin

# 显示所有远程仓库
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show origin

# 增加一个新的远程仓库，并命名
$ git remote add shortname url

# 取回远程仓库的变化，并与本地分支合并
$ git pull origin branch-name

# 上传本地指定分支到远程仓库
$ git push origin branch-name

# 强行推送当前分支到远程仓库，即使有冲突
$ git push origin --force

# 推送所有分支到远程仓库
$ git push origin --all
```

### 撤销
```
# 恢复暂存区的指定文件到工作区
$ git checkout file

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout commit-SHA file

# 恢复暂存区的所有文件到工作区
$ git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset file

# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset commit-SHA

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard commit-SHA

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep commit-SHA

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert commit-SHA

# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop
```

### 冲突解决
rebase过程中，也许会出现冲突（conflict）
- git会停止rebase，需要解决冲突
- 解决完，使用git add添加冲突的文件，更新暂存区
- git rebase --continue继续剩下的rebase
- git rebase --abort终止rebase行为，并且feature会回到rebase开始之前的状态
```
$ git rebase develop
CONFLICT (content): Rebase conflict in readme.txt
Automatic rebase failed; fix conflicts and then commit the result.

$ git status
On branch feature

You have unmerged paths.
  (fix conflicts and run "git rebase --continue")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

    both modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

查看readme.md 内容,选择保留HEAD或者feature的版本,再提交
```
$ git add readme.md
$ git rebase --contine
```

### .gitignore

### alias

```
git config --global alias.sta status    //使用git sta就等于git status了
git config --global alias.cmt commit    //git cmt等于git commit
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
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


