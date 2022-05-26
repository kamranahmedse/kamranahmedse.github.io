---
title: Random git tips
date: 2015-07-20
permalink: /blog/2015/07/20/random-git-tips-and-tricks/
---

This is going to be a small cheatsheet for random `git` commands that I find myself using *most* of the time. I am not going to get into the detail of any of the commands, if you would like to know more about any of them I would recommend going through [git](http://git-scm.com/docs/) [docs](https://www.kernel.org/pub/software/scm/git/docs/).

## Saving the credentials


Sometimes you might get offended by the git prompting for the credentials again and again i.e. whenever you are `pull`ing or `push`ing to the repository.

You can make `git` to stop asking for the credentials by either of the two ways (are there more?!) stated below

- You may [add an SSH key](https://help.github.com/articles/generating-ssh-keys/) so that *`git`* will trust your PC and won't ask for the credentials.
- Use git credential helper:

```bash
git config credential.helper store
```

By using this command, it would *cache* the credentials and you won't have to type them again. However, there might be some security concerns involved as this method stores them in plain text form. Have a look at this [stackoverflow question](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github) for `cache`, `wincred` or `osxkeychain` and some alternative ways to use this or visit [any of](http://git-scm.com/docs/gitcredentials) [these](http://git-scm.com/docs/technical/api-credentials.html)

## Rebasing the commits

`git rebase` is [really powerful](http://git-scm.com/docs/git-rebase) however I mostly find myself using it to rebase the commits in order to have a clean history. Here is how you rebase the commits i.e. merge the minor commits into one meaningful commit.

```bash
git rebase -i xxxxx
```

Where `xxxxx` is the hash of the commit immediately below the commit message till which you want to rebase the commits.


## Renaming a branch

You can do the following to rename a branch

```bash
git branch -m old_branch_name new_branch_name
```

Also, if you want to rename the branch which you are currently on, you can do the following

```bash
git branch -m new_branch_name
```

## Detached head problem

Sometimes you might get the problem of detached head. Most common cause for this to occur is, you checkout some specific commit and you start getting this detached head warning since you are not any branch. So how do you solve this?! You simply checkout the branch you were on. For example if you were doing some work upon the `develop` branch, when you started getting this warning, do

```bash
git checkout develop
```

If you forget about the branch you were on, you may simply `checkout` some (any) branch and the problem will be solved.

## Checking the log

This one is pretty straight forward. You simply do:

```bash
git log
```

This will give you the detailed versoin. However, if you just want to have a look at the commit messages (and hashes), simply do the following:

```bash
git log --oneline
```

## Resetting the changes

If you want to get all the staged changes back i.e. revert the `git add .`, you can do the following

```bash
git reset HEAD
```

If you want to revert all the changes since the last commit do the following

```bash
git reset --hard HEAD
```

followed by `git clean -fd` which will remove all the untracked files.

## That SSL Verification Error


Sometimes, you might get SSL certificate error when cloning, pulling or pushing. The simplest way to make it go away is turn off the SSL verification i.e.

```bash
git config --global http.sslVerify false
```

## Ignore the mode changes

Sometimes, for some odd reason, you might want to have different file modes on your local repository while having different file modes on the online version. Or you might have accidentally done `chmod -R 777`, like I did, which you do not want to push over to the server, you can simply ask git to ignore any kind of file mode changes:

```bash
git config core.fileMode false
```

## Get the last commit with message regex

If you want to find some commit having a specific message you may use the `git show :/regex` command where `regex` is the regular expression of the message. For example, if you want to find the containing the word `functionality`, you may try the following:

```bash
git show :/fix
```

That's about it. There is alot more to tell and there are many that I must have missed but stated are the ones that I find myself using most of the time. Do you have any of your own? feel free to share them by using the comments section below.
