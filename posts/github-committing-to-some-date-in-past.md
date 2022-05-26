---
title: Git - Committing to some date in past
date: 2014-10-04
permalink: /blog/2014/10/04/github-committing-to-some-date-in-past/
---

Sometimes it may happen that you might want to commit to some previous date e.g. you did something yesterday and forgot to commit the changes and now you don’t want to make this commit to today but to yesterday. In that case you may use the following

```bash
git commit --date="`date --date='n day ago'`" -am "Commit Message"
```

Here *n* in the *n day ago* is to be replaced with the number of days to in the past and *Commit Message*
is of course the commit message.
