# Week 4

This is a register (kind of a summary) of what I've learned during the week.
All the information here is for different sources.

## Content

+ [ES6](#ES6_/_ECMASCRIPT_2015)
  + [const](#const)
  + [Hoisting](#hoisting)
  + [Dinamic Values](#dinamic_Values)
  + [Destructuring](#destructuring)
  + [Objects](#objects)
  + [Promises](#promises)
  + [Async/Await](#async/Await)
  + [Classes](#classes)
  + [Maps](#maps)
  + [Sets](#sets)
  + [Others](#others)

## ES6 / ECMASCRIPT 2015

### const

If you make an array, an object or a function the constant will be the pointer
referencing to that object.

### Hoisting

The hoisting does not work with _let_ or _const_.

### Dinamic Values

Dinamic values can be passed to a object literal to generate a new pair of
**name:value**, to do soo we use a variable and pass as a name between
square brackets. Then the new name of the pair will be the value of the variable
that was passed, but a value has to be assigned as well. Next is the sintax
explained in a best way:

```js
aVar = "aName";
aObj = {
  [aVar]:30,
  someOtherName: "nameeeee"
}
```

The object **aObj** has then a property with the name _aVar_ and the value _30_.

### Destructuring

Destructuring allows to get values from arrrays and objects in a simplified
manner.

For Arrays:

```js
someArr = [1,2,3,4,5,6];
// this will make a=1,b=2,c=3,d=5
let [a,b,c, , d] = someArr;

// switch values between variables
x = 1;
y = 0;
[y, x] = [x, y];
```

For Objects:

```js
let someObj = {
  name: "Reina",
  age: 30,
  warCry(){
    console.log('Not this time, you Fool!');
  }
};

//This will make name=Reina,age=30;
let {name, age} = someObj;

// This will not work, we are referencing by name, not by an index
let {name, , warCry} = someObj;

// The names have to fit, but it is also possible use an alias
let {name, warCry: shout} = someObj;
```

### Objects

In **object literals** properties can be assigned to a previously defined
variable.Objects can be mixed to create another object with assign:

```js
//Mix two objects
let mixedObj = Object.assign({},obj1,obj2);

//Can also copy an object
let copyOfObj = Object.assign({},obj)
```

The _obj2_ (The last one) properties will override the repeated properties in
both objects. There could be more Objects than the shown there.

### Strict mode

Restrict the syntax and the behavior of some features of JS. To use strict mode
put thestring 'use strict' at the beginning of the file.

### Promises

It is an asynchronous method to handle a posible succes or failure of a process.
It works by creating a Promise object, and passing a callback function called
_executer function_ with two paramethers normally called _resolve_ and _reject_.

```js
let thePromise = new Promise((resolve,reject) => {
  setTimeout(() =>{
    resolve('Ready');
  },500);
  setTimeout(() => {
    reject('Something went wrong');
  },400);
});

thePromise.then((response) => {
  console.log(response);
}).catch((err) => {
  console.log('Error: '+err);
});
```

Here _thePromise_ is created, and next is used then to call an arrow function
when either it resolves or rejects. The callback used here (the arrow function)
with one parameter with the response of the promise. The catch is used to catch
an error in case the promise rejects.

```js
fetch('https://api.icndb.com/jokes/random/10')
  .then(res => {
    res.json().then((data) =>{
      console.log(data);
    });
  });
```

the fetch function here creates a promise from a URL. It is also run many
requests in parallel with **promises.all()**.

### Async/Await

Async and await were created in order to make the asynchronous process more
easy, overcome some errors and get rid of callbacks in some cases. This were
created on top of generators and promises. See the next example:

```js
async function fetchUsers() {
  const usersResponse = await fetch(`${apiUrl}/users`);
  const usersData = await usersResponse.json();
  console.log(usersData);
}
```

Here is needed to define a scope (function) as _async_ so we can use the await
keyword. Await keyword stops the block it is in and waits until the promise is
finished, the returned value is assigned to the variable at the left side, and
then continues the execution of the rest of the block.

Try and Catch can be used to catch errors:

```js
async function fetchUsers() {
  try {
    const usersResponse = await fetch(`${apiUrl}/users`);
    const usersData = await usersResponse.json();
  } catch (e) {
    console.error(e);
  }
}
```

**Note:** In Chrome await can be used in the global scope.

### Modules

### Classes

Classes are constructed on top of prototypes, classes syntac is similar to the
Java syntax. This is showed next:

```js
class TheClass extends otherClass{

  constructor(var1, var2, ...args){
    super(); // It is neeeded in order to this keyword to work when the class extends another
    this.attribute = var1;
  }
  
  aMethod(){
    this.attribute = 'someContent';
  }
  static aStaticMethod(){
    // Creates a static method so you can access it without an instance.
  }
}
```

### Maps

Maps are like dictionaries in Python and like maps(duuh) in Java. It is a set of
pairs of keys and values, so values can be accessed by a key. The differences
with objects are that the key can be whatever. The use of Maps is shown next:

```js
  let someMap = new Map([
    ['greetings', 'Hello i\'m a map item'],
    [1,{'somePropertyName': true}]
  ]);

  // The typic set, get and not that typical delete and clear
  someMap.set([someVar,anotherVar]);
  console.log(someMap.get('greetings'));
  someMap.delete(1); // deletes a entry
  someMap.clear(); // clear all the map

  // For iteration purposes
  for(let key of someMap.keys()){
    console.log(key) // show the keys
  }
  for(let value of someMap.values()){
    console.log(value) // show the value
  }
  for(let entry of someMap.entries()){
    console.log(entry) // show the pair [key,value]
  }
```

### Sets

A set is a collection of not repeated values. It can be used to get the unique items inside an array. It is used in the following way:

```js
  let items = ['1',2,{},4,'5',5,5,'6','6']
  const uniqueItems = new Set(items);
  console.log(uniqueItems); // set = ['1',2,{},4,'5',5,'6']
  uniqueItems.add(someVar);
  uniqueItems.delete(someVar);
```

Sets also have the same methods of maps for iteration purposes values, keys and entries, but the last two do not make any sense at all.

### Generators

A function type that allows to pause execution of the code. The way it works is
described next:

```js
  function* theGenerator(){
    // execute this when the next method is called the first time
    console.log('first time');

    yield // This is used when a pause is needed
    // Execute this when the next method is called the second time
    console.log('second time');
  }

  let awesomeGenerator = theGenerator();
  awesomeGenerator.next(); // {value: 'first time', done: false}
  awesomeGenerator.next(); // {value: 'second time', done: false}
  awesomeGenerator.next(); // {value: undefined, done: true}

  function* groceryList(){
    yield 'milk';
    yield 'eggs';
    yield 'cheese';
  }

  let shopping = groceryList();
  shopping.next(); // returns {value: 'milk', done: false}
  shopping.next(); // returns {value: 'eggs', done: false}
  shopping.next().value; // 'cheese'
  shopping.next(); // returns {value: undefined, done: true}

  // another way to get the values is through iteration
  for(let item of shopping){
    console.log(item.value);
  }
```

The generator object has a _done_ property that indicates if there is no more
code to execute in the function.

### Webpack

It is a module bundler, it basicaly organize and let the use of modules to go
smooth. The practice for the webpack is in my machine in
_projects/other/webpack_.

### Others

In **functions** can be added more paramethers than the amount the function
accepts, it just takes what it needs. Also default parameters can be used.