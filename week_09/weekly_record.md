# Week 9

This is a register (kind of a summary) of what I've learned during the week.
All the information here is for different sources.

## Reactive JS

Programming that works with *asynchronous data streams*. That data streams can
be created by many things like UI events, HTTP requests, file sistems, array-like objects and memory/cache.

A **Stream** is a sequence of ongoing events ordered in time. This stream emits a value, an error and a complete signal. we can interact with this data streams as any regular array

An **Observable** is used to watch these streams and emit functions when a value or error or completed signal is returned. It can be subscribed to an observer. Observables can be created with ```Rx.Observable.method()``` where _method()_ can be "create(function)" which pass a function called observer that creates the observable; "from(object)" which pass a object that can be a promise,  a string, array, set, map and others iterables; "fromPromise(promise)", which pass a promise; "of(...objects)" which takes some objects and emits the one after the other; "fromEvent(DOMnode, eventString)" which is self explanatory.

In a **Cold observable** the emited values are generated inside the observable.

In a **Hot observable** the emited values are generated outside the observable.

To create a hot from a cold observable use:

```js
newHotObservable = coldObservable.publish()
```

It will make that the new hot boservable to only emit data is if an ```observable.connect()``` method is called, so it will trigger any _subscribe_ method in stand by.


Once an observable is completed you can run a 
### Operators

Most of the operators are inside a folder I use to test new features, and are explained there also their use is common and I will be using them frequently. For that reason I will not put them here, but I will put the ones that are not there.

+ map: does the same thing that the javascript map, it is used to transform the value that is emited by the observable.
+ do: Is similar to map but it won't change the undelying observable.
+ filter: It receives a function that accepts an item emited by the observable, and then only let pass the values that meet the condition returned in that function.
+ first/last: will only take the first/last elemented emited by the observable.
+ throttle: emits a value and ignores the following emitions until a time determined by a time set by an observable.
+ throttleTime: emits a value and ignores the following emitions until a time passed as parameter is reached.
+ debounce: emits a  value only after a time determined by a time set by an observable.
+ debounceTime: emits a  value only after a time passed as parameter is reached.
+ scan: is the same as the reducer method of the arrays in js.
+ switchMap: It is useful when you have an obsrvable and it emits a data that will be used by another observable.
+ takeUntil: completes an observable based on the valuo of another observable.
+ takeWhile: completes an observable based on the condition returned in the callback passed.
+ zip: combines two observables with the same length
+ forkJoin: the same as zip, but waits until all observables finish
+ catch. catch any error
+ retry: retry as many times is especified
+ 
