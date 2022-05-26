---
title: Dealing with route params in Angular-5
date: 2018-02-28
permalink: /blog/2018/02/28/dealing-with-route-params-in-angular-5/
---

It is quite common to have both the query and route parameters in any single page application. This post a quick tip sharing a little RxJS snippet that I wrote in order to read the query and route parameters at once. Before we talk about that, let us find out how to read any route/query parameters in your Angular 2+ application. There are multiple ways to achieve that. 

## Reading from the Snapshot

First and the simplest way to do that is reading them from the `snapshot` of the active route i.e. inject the instance of `ActivatedRoute` into your component's constructor or pull it from the `Injector` and read it from there i.e.

```javascript
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: 'user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
    constructor(private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        const queryParams = this.activeRoute.snapshot.queryParams
        const routeParams = this.activeRoute.snapshot.params;

        // do something with the parameters
        this.loadUserDetail(routeParams.id);
    }
}
```
But there is a little gotcha here. As the name `snapshot` specifies, these parameters are from the snapshot of the route at the first load of the component. These values will be calculated for the first load of the component and they won't change unless you reload the page.

Why could it be a problem? Well let's say you had a list of users on the sidebar and clicking any user loads this user detail component. It would work fine for the first time i.e. when none of the details were openend and you clicked any user and loaded the details for the first time. Now let's say you want to open the details of another user, if you try and click the other one, it won't work. Why? because the component is already loaded, angular is smart and won't reload the component; it will just change the route params, which won't have any affect on the component because we read from the initial snapshot and so we don't have access to the update routed params. 

So how can we fix this? Well we can do that by adding a listener to the route params.

## Reading via Subscriptions

As discussed above, the snapshot won't get updated if we try to reload the current route with different route parameters. Good news! apart from the snapshot, active route also provides the query and route parameters in the form of observables. We can subscribe to those observables and thus whenever the route params might get changed we will get notified in our subscriber and so we can load the user details. 

Here is how it would look like in code:

```javascript
ngOnInit() {
	this.activeRoute.queryParams.subscribe(queryParams => {
		// do something with the query params
	});

	this.activeRoute.params.subscribe(routeParams => {
		this.loadUserDetail(routeParams.id);
	});
}
```

Perfect! Now the query and route parameters are not bound to the snapshot and whenever you will click any user from the sidebar, the subscriber will get fired and the new details will be loaded.

## Reading them at once

But let's say that our situation has been a little changed and we need both the query and route params at once. We need to read one parameter from the query params and the other from the route params and we need to send them both in the `loadUserDetail` API call. How can we do that? 

## The Dirty Way

The immediate solution that might come to your mind would be to nest the subscribers like below:

```javascript
ngOnInit() {
	// Nest them together and
	this.activeRoute.queryParams.subscribe(queryParams => {
		this.activeRoute.params.subscribe(routeParams => {
			this.loadUserDetail(routeParams.id, queryParams.type);
		});
	});
}
```

Or you might be tempted to write a varied version of this i.e. move these nested callbacks to a helper function and then pass it yet another callback accepting query and route parameters i.e.

```javascript
ngOnInit() {
	this.readUrlParams((routeParams, queryParams) => {
		this.loadUserDetail(routeParams.id, queryParams.type);
	});
}

readUrlParams(callback) {
	// Nest them together and
	this.activeRoute.queryParams.subscribe(queryParams => {
		this.activeRoute.params.subscribe(routeParams => {
			callback(routeParams, queryParams);
		});
	});
}
```

none the less, still a dirty solution (). So how can we fix that? The answer is to use the functionality already provided by RxJS.

## Use RxJS

RxJS is a really powerful library and you can do it in [several different ways](https://www.learnrxjs.io/operators/combination/), but the one I like and find myself using the most is to use the `combineLatest` operator by using which we merge the route and query parameters and have a single observable giving us both in a single object. Here is how our updated example would look like

```javascript
import { ActivatedRoute } from '@angular/router';

// Add the observable and combineLatest
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-user-detail',
  templateUrl: 'user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
    constructor(private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
    	// Combine them both into a single observable
        const urlParams = Observable.combineLatest(
	      this.activatedRoute.params,
	      this.activatedRoute.queryParams,
	      (params, queryParams) => ({ ...params, ...queryParams})
	    );

	    // Subscribe to the single observable, giving us both
	    urlParams.subscribe(routeParams => {
	    	// routeParams containing both the query and route params
        	this.loadUserDetail(routeParams.id, routeParams.type);
	    });
    }
}
```

And that wraps up this little post on dealing with URL parameters. Do you have any tricks of your own, feel free to share them in the comments section below. Also if you would like to learn more about RxJS, here is a [nice little website](https://www.learnrxjs.io) that you may wat to check. 

Until next time, stay tuned!






