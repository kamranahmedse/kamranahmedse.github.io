---
title: LPAD() and CONCAT() in MySQL
date: 2014-05-14
permalink: /blog/2014/05/14/lpad-and-concat-in-mysql/
---

In the the web based ERP system that I am working upon, there is an account_id attached to each party added to the application. Account ID needs to be of the form `01-04-01-0023` and the 4 parts in it are level1, level2, level3 and party_id values of the party respectively. Again, account_id needs to be of the form `level1`-`level2`-`level3`-`party_id`. Note that level1, level2 and level3 are the IDs of the account levels attached to each party. This account_id generation is being handled through PHP. But today, I was assigned the task to import the data for parties from Excel to MySQL. I use this wonderful tool called MySQL for Excel to import the data to the parties table. Now the challenge was, how could I populate the account_id values for each party. Now there were three options:

* Fetch and Update each party through the application and make the PHP generate account_id for me. But that’d would have been time taking and tedious (there were about ~100 parties)
* Update each party row in the table by hand (Extremely poor idea)
* Write a SQL query

I went with the third option, writing a MySQL query. Now the database structure was like the following:

![Table Structure](http://i.imgur.com/uwTeg7D.png)

i.e. `party` having only `level3` saved in it. Each `level3` has a `level2` and each `level2` has a `level1`. I wrote the following query to generate the `account_id` for each party:

```sql
SELECT
    party_id,
    CONCAT(LPAD(level1.l1, 2, 0), '-', LPAD(level2.l2, 2, 0), '-', LPAD(level3.l3, 2, 0), '-', LPAD(party.party_id, 4, 0)) as account_id
FROM
    party
       INNER JOIN
    level3 ON party.level3 = level3.l3
       INNER JOIN
    level2 ON level3.l2 = level2.l2
       INNER JOIN level1 ON level2.l1 = level1.l1
```

As you can see, I used `LPAD(pad_to_what, number_of_digits_required, pad_what)` to generate the 2 digit leve1, level2 and level3 each and 4 digit party_id. `CONCAT()` was used to concatenate the  values and some INNER JOINs to generate the final `account_id`

Now the next thing was to update each party with it’s respective account_id. For that, I came up with the following query:

```sql
UPDATE party as pp SET account_id = (
    SELECT account_id
    FROM (
        SELECT
            party_id,
            CONCAT(LPAD(level1.l1, 2, 0), '-', LPAD(level2.l2, 2, 0), '-', LPAD(level3.l3, 2, 0), '-', LPAD(party.party_id, 4, 0)) as account_id
        FROM
            party
                INNER JOIN
            level3 ON party.level3 = level3.l3
                INNER JOIN
            level2 ON level3.l2 = level2.l2
                INNER JOIN
            level1 ON level2.l1 = level1.l1
     ) as pids
     WHERE pids.party_id = pp.party_id
);
```

And there it is! All the parties have the correct account ids attached to them.

![Final Result](http://i.imgur.com/6mZremK.png)
