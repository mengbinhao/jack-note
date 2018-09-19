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
git checkout -b <branch>

git merge <branch>

git branch -d <branch>
git branch -dr <remote/branch>

git show <tagname>
git tag <tagName> [commitid]
git tag -d <tagName>

git tag -a 'v0.0.1' -m '第一个版本'
git push origin 'v0.0.1'
```

### remote repository

```
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
git reset --hard HEAD
git checkout HEAD <file>

git revert \<commit>

git reset --hard <commitid>
git reset <commitid>
git reset --keep <commitid>
```

### .gitignore

### alias

```
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```
### stash

```
git status
git stash
git stash list
git stash pop
git stash list
git status
```



