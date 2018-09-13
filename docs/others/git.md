##### 1 git config(global / special **repository** )

```
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
git config --global user.name
git config --global user.email
```

##### 2 create repository

```
mkdir learngit  
cd learngit
pwd   // do not use chinese
git init  //create hidden .git folder
```
##### 3 add / status / commit / diff

```
git add readme.txt
git status
git commit -m "first commit"
git commit -a
git commit --date="`date --date='n day ago'`" -am "Commit Message"
git commit --amend
//chang readme.txt
git diff readme.txt
git add readme.txt
git status
git commit -m "second commit"
```

##### 4 log / HEAD

```
git log --pretty=oneline [--graph] [--abbrev-commit]
git log --oneline
git log --author="username"
git log -p <file>
git reset --hard HEAD^
git reset --hard xxxxx
git reset --hard <commit>
git reset <commit>
git reset --keep <commit>
git reflog
```

##### 5 暂存区stage

```
git diff HEAD -- readme.txt  //比较工作区与暂存区的区别
```

##### 6 revert change

​       场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

​       场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。

​     场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，`git reset --hard HEAD^`，不过前提是没有推送到远程库。

```
git revert <commit>
```



##### 7 delete file

```
git rm test.txt
git checkout -- test.txt
```

##### 8 remote repository

```
//create SSH key
ssh-keygen -t rsa -C "youremail@example.com"
//add pub to github account setting

git remote [-v]// to see the remote address
git remote add origin xxxxxxxxxxx   //https or ssh
git remote show <remote>
git pull --rebase origin master //asyn remote to local 
git push -u origin master  //push local to remote first time
git push origin master

git fetch <remote>
git remote pull <remote> <url>
git pull origin master
git push remote <remote> <branch>
git push <remote> --delete <branch> (since Git v1.7.0)

//clone from github
git clone git@github.com:mengbinhao/learngin2.git
```

##### 9 branch

```
查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>
创建+切换分支：git checkout -b <name>
              git branch --track <new-branch> <remote-branch>
合并某分支到当前分支：git merge <name>
                    git merge --no-ff -m "merged bug fix 101" issue-101
删除分支：git branch -d <name>
         git branch -D <name>

//暂存
git status
git stash
git stash list
git stash pop
git stash list
git status

//多人协作
首先，可以试图用git push origin <branch-name>推送自己的修改；
如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
如果合并有冲突，则解决冲突，并在本地提交；
没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！
如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。
```

##### 10 rebase

```
 git rebase <branch>
 git rebase --abort
 git rebase --continue
 
 git mergetool
```



##### 11 tag

```
git tag <name>  //用于新建一个标签，默认为HEAD，也可以指定一个commit id
git tag -a v0.1 -m "version 0.1 released" 1094adb
git tag   
git show <tagname>
git log --pretty=oneline --abbrev-commit
git tag v0.9 commit_id

git tag -d v0.1
git push origin v1.0
git push origin --tags
git push origin :refs/tags/v0.9 //删除远程tag
git push --tags
```

##### 12 .gitignore 

see [template](https://github.com/github/gitignore)

1. 忽略操作系统自动生成的文件，比如缩略图等；
2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的`.class`文件；
3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

```
git add -f App.class
git check-ignore
```

##### 13 alias

```
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
git config --global alias.unstage 'reset HEAD'
git config --global alias.last 'log -1'
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

##### 14 grep

```
git grep "Hello"
git grep "Hello" v2.5
```

##### 15 blame

```
git blame <file>
```