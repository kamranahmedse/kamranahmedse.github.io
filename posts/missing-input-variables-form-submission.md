---
title: Missing input variables upon form submission
date: 2015-02-10
permalink: /blog/2015/02/10/missing-input-variables-form-submission/
---
I recently came across this problem that when submitting a form with really large number of inputs, a few of the `POST` parameters were not reaching the server. After a little search, I found out that this [php.ini setting](http://php.net/manual/en/info.configuration.php#ini.max-input-vars) `max_input_vars` had put a restriction upon the number of input variables that were being submitted over a request and causing the truncation. Increasing the size of it (which is 1000 by default) worked.
