# Do not use auto increments

"Integers are fast, take less space and ought to be preferred over using character types" is the first thing that junior developers are taught when learning about the databases and it is mostly right. Any datatype with fixed length is faster than variable length data type. But the problems start to lift their heads up when these are used in the places they shouldn't be; the auto incremented primary keys on tables, for example.

## Why are they bad? 

Well consider that you have built an app and it started to grow and the queries are getting too slow for a single database server to handle the load and you have to scale the load to a second. Most likely you will implement some sharding algorithm to distribute the data across the second or third database. Now consider the scenario where an item with auto incremented id `5` is created on database `A` and since database `B` has no way of know that what `A` is upto so the same happens on database `B` i.e. item with `id` 5 is created while giving birth to a conflicting situation where you won't be able to find out which is what.

Another case might be the app in which you had to incorporate the offline storage strategy where data could be stored locally when the user is offline and later on be synced to the server. What if there was some item created with the id `8` during the period when system was offline and in the mean time someone else created an item with the same ID online? There would be a problem while syncing this offline data.

## Solution

The answer is "do not use sequential values". Use [UUIDs](http://stackoverflow.com/questions/292965/what-is-a-uuid) that will [make sure of the uniqueness](http://stackoverflow.com/questions/1155008/how-unique-is-uuid) even if you generate it a trillion times. Also you might like [this article on how instagram handled this](https://engineering.instagram.com/sharding-ids-at-instagram-1cf5a71e5a5c#.svp0t7an7)
