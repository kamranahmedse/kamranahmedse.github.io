---
layout: post
title: Quick Guide to HTTP Caching
comments: true
---

In one of the previous posts, I discussed about [HTTP and where it stands at this point](/blog/2016/08/13/http-in-depth/). This is one is going to be specifically about the caching.

As users, we easily get frustrated by the buffering videos, the images that take seconds to load, pages that got stuck because the content is being loaded. Loading the resources from some cache is much faster than fetching the same from the originating server. It reduces latency, speeding up the loading of resources, decreases the load on server, cuts down the bandwidth costs etc. This is going  to be an in-depth guide about what web caching is, what are the different types of caching and how (and how not to implement it). 

## Introduction

First things first, what is web cache? It sits somewhere between the client and the server, continuously looking at the requests and their responses, looking for any responses that can be cached in order to decrease the time and resources consumed in subsequent requests. Have a look at the rough diagram representing the role of web cache

![Web Cache](http://i.imgur.com/xMHiYhJ.png)

> Note that this image is just to give you an idea. Depending upon the type of cache, the place where it is implemented could vary. More on this later.

Before we get into further details, let give you an overview of the terms that will be used, further in the article

- **Client** could be your browser or any application requesting the server for some resource
- **Origin Server**, the source of truth, houses all the content required by the client and is responsible for fulfilling the client requests.
- **Stale Content** is the cached but expired content
- **Fresh Content** is the content available in cache and hasn't expired yet
- **Cache Validation** is the process of contacting the server to check the validity of the cached content and get it updated for when it is going to expire maybe
- **Cache Invalidation** is the process of removing any stale content available in the cache

![Caching terms](http://i.imgur.com/vIMNEeD.png)

## Caching Locations

Web cache can be shared or depending upon the location where it exists. Below is the list of caching locations

### Browser Cache
You might have noticed that when you click the back button in your browser, it takes less time than the time that it took during the first load; this is the browser cache in play. Browser cache is the most common location for caching and browsers usually reserve some space for caching.

![Browser Cache](http://i.imgur.com/DL9HvLX.png)

A browser cache is limited to just one user and unlike other caches, it can store the "private" responses. More on it later.

### Proxy Cache

Unlike browser cache which serves a single user, proxy caches may serve hundreds of different users accessing the same content. They are usually implemented on a broader level by ISPs or any other independent entities for example.

![Proxy Cache](http://i.imgur.com/ndj9W6o.png)

### Reverse Proxy Cache

Reverse proxy cache or surrogate cache is implemented close to the origin servers in order to reduce the load on server. Unlike proxy caches which are implemented by ISPs etc to reduce the bandwidth usage in a network, surrogates or proxy caches are implemented near to the origin servers by the server administrators to reduce the load on server.

![Reverse Proxy Cache](http://i.imgur.com/Eg4Cru3.png)
 
## Caching Headers

Now that you know the different locations at which site data can be cached, you probably have got the idea that although you as a web developer can control the reverse proxy caches, you can not avoid browser and proxy caches. And if your website is not configured to use these caches properly, it will still be cached using whatever the defaults are set on these caches.

So, how do we control the web cache? you ask. Whenever the server emits some response, it is accompanied with some HTTP headers to control the cache. So content provider is the one that has to make sure to return proper HTTP headers to force the caches on how to cache the content.

### Expires

Before HTTP/1.1 and introduction of `Cache-Control`, there was `expires` header which is simply a timestamp telling the caches how long should some content is to be considered fresh. Possible value to this header is absolute expiry date and the date has to be in GMT. Below is the sample header

```

Expires: Mon, 13 Mar 2017 12:22:00 GMT
```

It should be noted that the date cannot be more than a year and if the date format is wrong, content will be considered stale

### Pragma

Another one from the old, pre HTTP/1.1 days, is `Pragma`. Everything that it could do is now possible using the cache-control header given below. However, one thing that I would like to point out about `pragma` is that it is a request header and HTTP specification does not discuss it in the response headers. It should be known that although it seems like `pragma: no-cache` is going to make the content not to be cached, it is not necessarily true and most of the caches might not honor this. Rather `Cache-Control` header should be used to control the caching.

### Cache-Control

Cache-Control specifies how long and in what manner should the content be cached. This family of headers was introduced in HTTP/1.1 to overcome the limitations of the `Expires` header.
  
Value for the `Cache-Control` header is composite i.e. it can have multiple directive/values. Let's look at the possible values that this header may contain. 

#### private
Setting the cache to `private` means that the content will not be cached in any of the proxies and it will only be cached by the client (i.e. browser)

```
  
Cache-Control: private
```

Having said that, don't let it fool you in to thinking that setting this header will make your data any secure; you still have to use SSL for that purpose. 

#### public

If set to `public`, apart from being cached by the client, it can also be cached by the proxies; serving many other users

```
  
Cache-Control: public
```

#### no-store
**`no-store`** specifies that the content is not to be cached by any of the caches
```
  
Cache-Control: no-store
```

#### no-cache
**`no-cache`** indicates that the cache can be maintained but the cached content is to be re-validated (using `ETag` for example) from the server before being served. That is, there is still a request to server but for validation and not to download the cached content.
```
  
Cache-Control: max-age=3600, no-cache, public
```

#### max-age: seconds
**`max-age`** specifies the number of seconds for which the content will be cached. For example, if the `cache-control` looks like below:
```
  
Cache-Control: max-age=3600, public
```
it would mean that the content is publicly cacheable and will be considered stale after 60 seconds

#### s-maxage: seconds
**`s-maxage`** here `s-` prefix stands for shared. This directive specifically targets the shared caches. Like `max-age` it also gets the number of seconds for which something is to be cached. If present, it will override `max-age` and `expires` headers for shared caching.
```
  
Cache-Control: s-maxage=3600, public
```

#### must-revalidate
**`must-revalidate`** it might happen sometimes that if you have network problems and the content cannot be retrieved from the server, browser may serve stale content without validation. `must-revalidate` avoids that. If this directive is present, it means that stale content cannot be served in any case and the data must be re-validated from the server before serving. 
```

Cache-Control: max-age=3600, public, must-revalidate
```

#### proxy-revalidate
**`proxy-revalidate`** is similar to `must-revalidate` but it specifies the same for shared or proxy caches. In other words `proxy-revalidate` is to `must-revalidate` as `s-maxage` is to `max-age`. But why did they not call it `s-revalidate`?. I have no idea why, if you have any clue please leave a comment below. 

#### Mixing Values

You can combine these directives in different ways to achieve different caching behaviors, however `no-cache/no-store` and `public/private` are mutually exclusive. 

If you specify both `no-store` and `no-cache`, `no-store` will be given precedence over `no-cache`.
```

; If specified both
Cache-Control: no-store, no-cache

; Below will be considered
Cache-Control: no-store
```
For `private/public`, for any unauthenticated requests cache is considered `public` and for any authenticated ones cache is considered `private`.

Up until now we discussed how the content is cached and how long the cached content is to be considered fresh but we did not discuss how the client does the validation from the server. Below we discuss the headers used for this purpose.
