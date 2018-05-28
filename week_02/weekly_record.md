# Week 2
This is a register of what I've learned during the week.

## JSON
We can store data , it is indeed:
> A collection of human-readable data that can be accesed in a very logical manner.

    JSON Data format:
    data = {"name1":"value1",
    "name2":"value2",
    ...,
    "nameN": "valueN"}

The values can be another objects, so it becomes a tree in the sense that it stores nested objects.  To access one value, for example **"value1"** we use **data.name1**.

Also is possible to store _Arrays_ like so:

    data = {"name1":"value1",
    "array":["item1","item2","item3],
    ...,
    "nameN": "valueN"}

The array can be accesed like **data.array[i]**. The items inside the array can be objects too.

### Types
* number
* string
* boolean
* Array
* Object

Null is used when there is no value.

## REST APIs
An **API (Application Program Interface)** is a contract provided by a piece of software to another piece of software.
The API stablishes a given protocol and format for requesting some information from a source.

**REST (Representational State Transfer)** is an arquitecture style for designing networked applications. REST relies on HTTP so it can run in virtualy in any language. 

> The API is the messenger and the REST let us use the HTTP requests to format those messages.

### HTTP Methods
* **GET**: Ask for a resource
* **POST**: Submit data that will be used by a resource
* **PUT**: Edit/Update resource
* **DELETE**: Delete resource

* **HEAD**: The same as _GET_ but without the body
* **OPTIONS**: Return the suppored HTTP methods
* **PATH**: Update path resources

**Endpoits** Are URI/URL where the API/Service can be accessed by a client App. Some APIs require authentication, the format of the _authentication_ depends on the API.






