## git branch

```
#创建本地分支
git branch dev
git checkout dev
#创建不包含历史的分支
git checkout --orphan dev

#创建远程分支
git push origin dev

#也可以使用一句话创建并且切换本地分支
git chekcout -b dev --track
```

```
#删除本地分支
git branch -d dev
#删除远程分支
git branch -r -d origin/dev
git push origin :dev
#一句话删除远程分支
git push -d  origin dev
```

```
#合并dev分支到master分支
git checkout master
git merge dev
```