---
title: Basic usage of `git stash`
date: 2014-10-07
permalink: /blog/2014/10/07/how-to-use-git-stash/
---

Consider this, you were busy working on some functionality that hasn’t been completed yet but something urgent came up. Now you may never want to `commit` this half baked functionality along with that urgent feature that you added. To deal with this kind of situations, there are a few things that you can do.

# Few horrible decisions

..reset all the changes you made since last commit using

```bash
# Reset all the changes
git reset HEAD --hard
# Clean out everything un-tracked
git clean -fd
```

Well, you can do this if you just started working and there isn’t much that you have done since the last commit. But what if you have spent hours working on it and you are about to complete that? Not a good idea then. Right?

..you may backup the changes you made, by copying the changed files maybe. But once again, what’s the point of using `git`, if we still have to copy the files around.

# The right way – Use `git-stash`

You should use `git-stash`

```bash
git stash
```

It’s like a clipboard, running this command would move all your changes to stash. After doing so you can start working upon that urgent feature that came up, commit that and once you are ready to start working upon that half baked feature that you were working upon back at the point when you had to stash the changes, you can get your stashed changes back to your working copy by

```bash
git stash apply
```

>You should note that `git-stash` doesn’t stash the untracked files

To stash untracked files as well, you need to do

```bash
git stash -u
```

You can clear your stash at any time by using

```bash
git stash clear
```

But don’t forget to apply your changes first, if necessary, otherwise you’ll lose them *forever*.

*Note that this article demonstrated a very basic usage of git-stash. For further detail regarding `git-stash`, [follow the manual](https://www.kernel.org/pub/software/scm/git/docs/git-stash.html)*
