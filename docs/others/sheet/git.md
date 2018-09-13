### Create

- git clone sssssssss
- git init

### Local Changes

- git status
- git diff
- git add -p file
- git commit [-a]

### Commit History

- git log
- git log -p file
- git blame file

### Branche & Tag

- git branch -av    --> list all existing branchs
- git checkout branchName
- git branch newBranch
- git checkout --track <remote/branch>
- git branch -d \<branch>
- git tag tagName

### Update & Publish

- git remote -v --> list remotes
- git remote  show \<remote>
- git remote add \<shortname> \<url>
- git fetch \<remote>  --> do not merge into HEAD
- git pull \<remote> \<branch> --> merge into HEAD
- git publish \<remote> \<branch>
- git branch -dr \<remote/branch>
- git push --tags

### Merge & Rebase

- git merge \<branch>
- git rebase \<branch>
- git rebase --abort
- git rebase --continue
- git mergetool
- git add \<resolved-file>
- git rm \<resolved-file>

Undo

- git reset - -hard HEAD
- git checkout HEAD \<file>
- git revert \<commit>
- git reset --hard \<commit>
- git reset \<commit>
- git reset --keep \<commit>