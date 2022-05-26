---
title: MySQL - Pretty dates using date_format()
date: 2014-06-10
permalink: /blog/2014/06/10/mysql-pretty-dates-using-date_format/
---

I use dates on daily basis. For example in the ERP system that I have been working upon, dates are the most crucial part e.g. transactions, user logs, stock records, payments records etc. in fact each and every action that any user performs is governed by a date. So it won’t be wrong to say that, I use DATE and DATETIME datatypes as much as I use VARCHAR. The default format used by MySQL to store date and time is:

```sql
YYYY-MM-DD HH:MM:SS # e.g. 2014-06-10 06:11:00
```

Although this format works fine, I don’t consider it fair to put the user into thinking over it. The date time should be such that the user understands it in a glimpse. To format the dates, I use this nice MySQL function to format dates called `DATE_FORMAT()`. Example below shows, how you may use it:

```sql
DATE_FORMAT(NOW(),'%M %e, %Y @ %h:%i %p')
#generates 'June 10, 2014 @ 06:52 PM'
```

For further detail, let me refer you to the [official documentation for `DATE_FORMAT()`](http://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_date-format)
