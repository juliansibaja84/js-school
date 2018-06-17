# Week 3
This is a register (kind of a summary) of what I've learned during the week.

## VanillaJS

###  Comments
There are two types of comments. The Single line comments:

    // Some comment here
    var x = 0; // Another comment here 

are used to comment simple things. and the Block comments:

    /* 
    Comment this line
    Also comment this line
    */
  
which are used to comment many lines of code.

### Types
Javascript is a loosely typed language, so you dont have to declare the type of a variable, and they can mutate from one type to another. The types in Javascript are described next:

* **Boolean**: _true_ or _false_.
* **Number**: 64-bit floating point values, they can be negative. It can also be _NaN_ (Not a Number).
* **String**: Chain of Characters.
* **Null**: Nothing.
* **Undefined**: When no value is set.
* **Symbol**: ES6 new type, it is a primitive that is inmutable and unique.

### Hoisting
Hoisting means that all the declarations of the variables and functions are moved at the start of the code, but only the declarations not the initializations.

### Variable Declarations:
Since ES6 variables can be declared in 3 ways, with var, let and const. The sytax is almost the same for the three of them: 

    var someVar;
    let somevar1;
    const someVar2;

All of them can be inialized like this:

    var/let/const somevar = someValue;

The **var** identifier declares a variable and its scope will be its current context and the scope declared outside a function is global. The declarations are processed before the execution of the code. 

The **let** identifier declares a local variable in the block it is in. The _let_ keyword does not let you declare a variable two times in the same scope.

The **const**  identifier declares a variable that is defined once and it cannot be reassigned. The scope of a _const_ variable is similar to the _let_ keyword.

### Operators

Just the operators I do not know/ I'm not used to:

* variablename = **(condition) ?** value1 **:** value2 : Assign a value to a variable depending on the condition, _value1_ if it is true and _value2_ if it is not.

* **typeof** value: Returns the type.

* **delete** object.property: Deletes a property of an object.

* property **in** object: Returns true if the specified property is in the specified object.

* object **intaceof** Object: Returns true if the first object is an instance of the second.

### Interacting with DOM from Javascript
There are many methods used to modify te _document_ object. Here are some which are useful:

* document.getElementById("ID") : Gets an element by its id.
* document.createTextNode("String") : Creates a text node which can be passed as a parameter to other function.
* document_object.appendChild(value) :  Insert a new element inside the document_object object.
* document.createElement("type") : inserts a new element of the type that is specified.

> Avoid adding stuffs one at a time

Adding elements always cause what is called a  **Reflow** (Mozilla) or  a **Layout** (Webkit), which is a change to the structure of the page in any way. It also creates **Repaints** that is a change on the style or the adjustments of the window.

#### A solution??
Create a document fragment off-DOM and make all the changes there, a then load the fragment on the page and this is it, only one Reflow and one Reapaint.

Traversing the DOM can be done downwards, upwards and sideways.

#### Traversing the DOM: Downwards
Use _querySelector_, _querySelectorAll_ and _children_. for example:

Html:

    <div class="component">
        <h2 class="component__title">Component title</h2>
        <ul class="list">
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
        </ul>
    </div>

Javascript:

    // querySelector - querySlectorAll
    const component = document.querySelector('.component')
    const title = component.querySelector('.component__title')

    // children
    const list = document.querySelector('.list')
    const listItems = list.children

For the _querySelector - querySlectorAll_ exaple will select the _h2_ tag. The _children_ will select all the _li_ items, to select one of them you just have to index the list  as an Array.

#### Traversing the DOM: Upwards
Use _parentElement_, and _closest_. Next is an example using the html used for the Downward example:

Javascript:

    // parentElement
    const firstListItem = document.querySelector('li')
    const list = firstListItem.parentElement

    // closest
    const firstLink = document.querySelector('a')
    const list = firstLink.closest('.list')

The _ParentElement_ will select the list and the _closest_ too. The _closest_ method will search upwards until it reaches the given selector.

#### Traversing the DOM: Sideways

Use _nextElementSibling_, _previousElementSibling_, also by combining _parentElement_, _children_, and _index_. Next is an example using the html used for the Downward example:

    // nextElementSibling
    const firstListItem = document.querySelector('li')
    const secondListItem = firstListItem.nextElementSibling

    // previousElementSibling
    const secondListItem = document.querySelectorAll('li')[1]
    const firstListItem = secondListItem.previousElementSibling

    //  combining parentElement, children, and index
    const firstItem = document.querySelector('li')
    const list = firstItem.parentElement
    const allItems = list.children
    const fourthItem = allItems[3]

The nextElementSibling and the previousElementSibling will select the second and the first respectively.

### Spread Operator
It is a helpful operator used to take the elements in an array, pass them as parameters or insert them in another array. The sintax is (**...** array). 

    function sumThemAll(v1,v2,v3,v4,v5){
        return v1+v2+v3+v4+v5;
    }
    let array = [5,6,7,8,9,10];
    sumThemAll(...array);    // Here is used to pass parameters from an array
    let completeArray = [1,2,3,4,5,...array,11,12,13,14,15];  // Here is used to construct an array from another


### Conditionals
The same _if_, _else_ _else if_ of all the time. Also switch:


    switch (expression) {
    case choice1:
        run this code
        break;
    case choice2:
        run this code instead
        break;        
    // include as many cases as you like
    default:
        actually, just run this code
    }

The operators changes for the equal and not equal (in value and type), now they are **===** and **!==** respectively. The old **==** and **!=** are just for the value. So try to use always the first two.

#### Ternary operator
It can be used when you only have 2 conditionals and the block of code you want to run is small.
    
    ( condition ) ? run this code : run this code instead

### Arrays methods
* **.push(item)**: insert a element at the end of the array
* **.pop(index)**: gea an item out of the array
* **.unshift(item)/shift(index)**: The same as push/pop but at the beginning of the array, avoid its use
* **.sort()**: The default is aphabetical, but you can pass a function that receives 2 parameters, and depending on the returned value the sort method will change
* **.reverse()**: Reverse the array
* **.foreach(function(item,index){})**: will execute the function for each of the elements in the array
* **.map(function(item){})**: It copies an array but uses the function to change each element
* **.reduce(function(acumulator, presentValue),initialvalue)**: applies a function against an acumulator to reduce it to a single value.
* **.filter(function(item){})**: Returns an array with the items that pass the filter
* **.join()**: Joint the items in the array, it creates a copy of the array.
* **.concat(array)**: joins 2 arrays
* **.slice(index0,index1)**: Returns a cut off of an array.
* **.splice(start, howmany, args...)**: Removes or inserts items.(The first parameter is where to start, the second is how many insert and the following are what is going o be inserted).


### Event handlers
Events can be triggered when a action is performed over an element of the DOM. It can be added changing directly the property of the event in the element object, though this is **not recommended**. 

The other way is to use a method called _addEventListener(event:string, callback:function)_ (the event is set without the 'on' preceding it, for example "onclick" will be just 'click'). This method does not change the actual object, because it is been handled by the native code. Also you can add various functions to the same event. If you want to be able to remove a function from a event of an element you must not pass an annonimous or inline function to the addEventListener, so you have to create the function outside of the method and then pass it as a parameter to the addEventListener method. Then you have to use _removeEventListener(event:string, function)_

### Closure
Functions have the ability to preserve its variables. With the following example it becomes more clear.

    function someFunction(outerVar){
        function add(innerVar){
            return outerVar+innerVar;
        }
        return add;
    }
    var addToOne = new someFunction(1);
    var addToTwo = new someFunction(1);

    addToOne(1); // Output: 2
    addToOne(3); // Output: 4
    addToTwo(1);"_. The second one is the same, but with single quotes // Output: 3
    addToTwo(3); // Output: 5

This can happen because javascript have something called Lexical scoping, which let the variables from a parent scope enter a child scope, and because a function in javascipt is also an object, and as an object it can have another objects(functions) inside it as well.

### Strings
There are many ways to make a string in javascript. The first one can be implemented by putting the text inside double quote _"  _' '_. The one that is used in javascript most is the single quote. 

There is a new way of making a string and that is with the template strings that are made with the _\` \`_ which let you make multi-line strings. Also it can be used to make interpolation, convert types , tagged strings by placing a function name before the template string.


    //Interpolation
    var x = `Bond`;
    var movieLine = `my name is ${x}, James ${x}`; // movieLine = 'my name is Bond, James Bond'

    // Convert types
    var one = 1;
    var two = 2;
    var numberLine = `${one} + ${two} = ${one + two}`; // numberLine = '1 + 2 = 3'

    // Tagged Strings
    function tagged(strArr, ...vals){ // note the spread operator
        console.log(strArr);
        console.log(vals);
    }

    tagged´${one} + ${two} = ${one + two}´ // This will print first " + "," = " and then print 1,2,3

#### Methods

* **.startsWith(string)**: Returns a true if it starts with the specified string
* **.endsWith(string)**: Returns a true if it ends with the specified string
* **.repeat(N)**: Repeats the same string N times
* **String.raw\`someString with \\n`**: Takes the string as it is, it does not matter if it have scape characters.

### The Date Object
**Date** can be used to get the current Date & time. To make use of it, make a instance of the object, like this:

    const now = new Date();
    // now = "Wed Oct 18 2017 12:41:34 GMT+0000 (UTC)"

    //To get the timestamp (ms since January 1st 1970)
    now.getTime();

Once an instance is obtained its methods(getters and setters) can be called. 

### Truthy and False Values
Next is a table explaining the values in boolean that the types can take when a boolean is expeced but is is passed another type.

<center>

| Value | Converted to boolean |
|:-------:|:---------------------:|
| undefined | false |
| null | false |
| boolean  | Nothing to convert |
| number | 0, NaN : false |
|        | everything else: true |
| string | '' : false |
|        | everything else: true |
| Object| true |

</center>

To convert one object to boolean manually use one of the following:

* **Boolean(value)**: (Invoked as a function, not as a constructor)

* **value ? true : false**:  Self explanatory

* **!!value**: A single “not” converts to negated boolean; use twice for the nonnegated conversion.

#### The or(||) , and(&&) and not(!) operators
The or (||) returns the first operand if it can be converted to true, otherwise returns the second. The and (&&) returns the first operand if it can be converted to false, otherwise returns the second.

The or can be used to set a default value to a variable putting the default value in the second side of the expression.
    
    var a = value || defaultValue

### Numbers
In javascript you can use decimal, octal(appeding 0 at the start), hexadecimal (appending 0x at the start) numbers. They have some useful methods:

* **.toExponential()**: Returns the number in exponential form.
* **.toPresicion(n)**: Returns the number with n digits to show.
* **.toFixed(n)**: Returns the number with n digits after the decimal point.
* ****:

### Objects Properties
All in javascript is an Object. The objects have _properties_ which are values associated to that object, they can be added, changed or removed. The properties have _attributes_ like the value of that property, also if it is enumerable, configurable, and writable, all can be read but only the value can be changed. 

### THIS
When a variable is created globally, _this_ is the window object, so then all the global variables are properties of the window object. When a variable is created inside a **top level function** _this_ is still the window object no matter what, but if the function is a **property of the one object** then _this_ is the object containing the function. Inside **constructors** this is the object created by the constructor. The **.bind(thisArg)** can tie the specified _this_ to a value, it is useful when you pass a function as a callback. **Arrow functions** capute the _this_ of the current context. There are methods to pass _this_ among functions:

* **.call (thisArg, arg1, arg2)**: Calls the function making the _this_ inside the function equal to the _thisArg_ passed.
* **.apply (thisArg, [arg1, arg2])**: Calls the function making the _this_ inside the function equal to the _thisArg_ passed.


### Method definitions
Methods of an object (now), can be defined like this:

    var object = {
        method1(){},
        * method2(){},
        async method3(){},
        async* method3(){},
        ['foo' + 2]() {},
        someOtherProperty,
    };

Method definitions are not constructors, so an error pops if you are trying to instantiate them.

### Object Constructor functions
Used to create multiple similar objects with the same properties and methods. The constructors are created when a function is called with the new keyword, there is not other way to do so. when the constructor is called an object is created an then _this_ inside the function will refer to the object created. Then _this_ is returned by the constructor as default, unless some other object (it has to be an object) is specified to return.

### Arrow functions
These are single purpose functions that are shorter and they cannot be named. The behavior of _this_ inside them changes, in the sense that it catches the context the function is in, so it is used mostly like callbacks function. The sintax of this function is the following:

    (...args) => {
        //function statements
    }

    // If just 1 statement
    (...args) => //function statement;

    // If Just 1 aargument
    arg => //function statement;

    //Object literals,parenthesis just for not forget
    arg => ({ id: id, name: name });

### Storage
There will be a time when is necessary to store data in the client side. There are two ways to do this, using **sessionStorage** and using **localStorage**, the first just store data during the current session (until the tab of the browser is closed) and the second one stores the data even if the session is closed. To save data, the next methods are used indistinctly:

* **.setItem(key,value)**: Stores some item, the parameters have to be strings. 
* **.getValue(key)**: Get an item, the parameter has to be a string.
* **.removeItem(key)**: Removes an item.
* **.clear()**: Removes all the items in the storage.

### Javascript selectors
The document object have some methods to get the elements which are part of it, and _selectors_ can be passed to them to filter elements for id or for class o just a tag name. Some of these methods are getElementsByClassName, getElementByID, querySelector and querySelectorAll. When an element is selected it can be changed using other methods like innerHTML, className and classList.