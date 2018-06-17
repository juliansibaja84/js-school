# Week 4

This is a register (kind of a summary) of what I've learned during the week. All the information here is for different sources.

## Content

+ [ES6](#ES6_/_ECMASCRIPT_2015)
  + [const](#const)
  + [Hoisting](#hoisting)
  + [Dinamic Values](#Dinamic_Values)
  + [Destructuring](#Destructuring)
  + [Objects](#objects)
  + [Promises](#promises)
  + [Async/Await](#Async/Await)
  + []()
  + []()
  + []()
  + []()
  + []()
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
    super(); // It is neeeded in order to this keyword to work when 
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

### Others

In **functions** can be added more paramethers than the amount the function
accepts, it just takes what it needs. Also default parameters can be used.