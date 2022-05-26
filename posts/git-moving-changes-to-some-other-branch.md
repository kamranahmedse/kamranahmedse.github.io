---
title: Git - Moving changes from one branch to another
date: 2014-09-23
permalink: /blog/2014/09/23/git-moving-changes-to-some-other-branch/
---

Sometimes it may happen that you accidentally start working upon a wrong branch and only find about that when you are about to commit, at least this happened to me today. Or it may happen that you make some changes and later on realize that you better create a separate branch for this.

In situations similar to above said, you may want to move your changes to some separate branch. If it is so, you should do this:

```bash
git stash
git checkout someBranch
git stash pop
```

Here is what’s happening, you stash your changes, checkout the other branch i.e. someBranch in this case upon which you wanted the changes and get the changes off of the stash.

That’s it and all your uncommitted changes will now be on `someBranch`.
