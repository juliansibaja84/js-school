# Week 5

This is a register (kind of a summary) of what I've learned during the week.
All the information here is for different sources.

## Content

+ [Node](#Node)
  + [Node Core](#node_core)

## Node

It is a runtime environment for javascript, created to been able to use
javascript in the server side, it is not blocking, event driven and have a high
concurrency.Node will be explained next. Node have modules to work with the
file system(fs), network(http), events(events), operative system(os) and many
other features to work with.

### Node Core

```js
console.log('hi'); // console is a global object

setTimeout(); // calls a function after a delay
clearTimeout(); // prevents the function set in setTimeout to execute

setInterval(); // calls a function every specified time
clearInterval(); // Self explanatory
```

Instead of window or document objects, in node can be used global. But the
variables declared outher of any function or object is not added to the global
object. Every file in node is a module. The way to export and import modules
is shown next:

```js
// If someVar is some object to be exported the following is done
module.exports.someVar = var;

// If we want to import something from a module
const aotherVar = require('path-to-the-module-file');
```

## MongoDB

Install mongodb-org package and run the service with _sudo service mongod start_
(depends on the OS). The service can be stopped or restarted changing start for
stop and restart respectively.

To open the shell once the service is running, simply type the command _mongo_,
or a host can be especified by running _mongo --host 127.0.0.1:27017_.

### Useful commnads

+ **cls**: clears the command line
+ **show dbs**: Shows a list of the DBs
+ **use dbname**: Creates a new db with the name _dbname_ and switches to that DB
+ **show collections**: Shows all of the collections in a db
+ **db**: Shows the actual DB
+ **db.collectionName.find().pretty**: shows all the documents in a collection (collectionName). The pretty is not needed.
+ **db.collectionName.update(matchObject, newDocumment)**: Here we specify the a match
  object that have properties of the documment we want to modify and then create a new documment
  to replace the old one. There in more info in the Collections and Documents section
+ ****:

### Collections

A **Collection** is like a table in a SQL database. To create a collection use:

```js
db.createCollection('collectionName')
```

To filter(one or various) documents:

```js
db.collectionName.find({first_name:'Julian'})
db.collectionName.find({$or:[{first_name:'Julian'},{first_name:'Atenogeno'}]})
```

To filter by **numeric values** using _greater than (lt)_ and _less than (gt)_, there
is also _greater and equal (gte)_ and _less and equal (lte)_. Next is the use:

```js
db.collectionName.find({age:{$lt:40}})
```

If an object has another **object inside**, we can filter to find all the documents
with that nested objects:

```js
db.collectionName.find({outer.inner:"someValue")
```

When the filter is searching for an **array**:

```js
db.collectionName.find({array:"array item")
```

To sort the results of the find(1 descending, -1 ascending):

```js
db.collectionName.find().sort({last_name:1})
```

To count the results of the find:

```js
db.collectionName.find().count()
```

To limit the find:

```js
db.collectionName.find().limit(4)
```

To iterate over the find:

```js
db.collectionName.find().forEach(function(doc){print("customer Name: "+doc.first_name)})
```

### Documment

A **document** is a json like data that can be estored inside collections. To insert a documment use:

```js
db.collectionName.insert({first_name:'Julian', last_name: 'Sibaja'})
db.collectionName.insert([
  {first_name:'Atenogeno', last_name: 'Rodriguez'},
  {first_name:'Juancho', last_name: 'Rodriguez'}
)
```

To **update** a documment(replacing all the documment):

```js
db.collectionName.update({first_name:'Atenogeno'}, {first_name:'Jose', last_name: 'Rodriguez'})
```

To **update** a documment(just updating a property):

```js
db.collectionName.update({first_name:'Atenogeno'}, {$set:{first_name:'Jose'}})
db.collectionName.update({first_name:'Atenogeno'}, {$set:{age:200}})
```

To **increment a numeric value**:

```js
db.collectionName.update({first_name:'Atenogeno'}, {$inc:{age:5}})
```

To **delete** a property from a documment:

```js
db.collectionName.update({first_name:'Atenogeno'}, {$unset:{age:1}})
```

If the match object do not find anything then nothing will happen but if is specified
in the options _upsert: true_, then if it do not find anything add it:

```js
db.collectionName.update({first_name:'Aleluya'}, {first_name:'Aleluya',last_name: 'Rodriguez'}, {ipsert: true})
```

To **rename** a property:

```js
db.collectionName.update({first_name:'Aleluya'}, {$rename:{"last_name":"second_name"})
```

To **delete** a documment(all):

```js
db.collectionName.remove({first_name:'Aleluya'})
```

To **delete** a documment(one):

```js
db.collectionName.remove({first_name:'Aleluya'}, {justOne: true})
```


### Users

To create an **user** for a db,  use db.createUser().
to this command is passed an object like is shown below. 

```js
db.createUser({
  user: "userName",
  pwd: "pass1234",
  roles: [
       { role: "read", db: "reporting" },
       { role: "read", db: "products" },
       { role: "read", db: "sales" },
       { role: "readWrite", db: "accounts" }
    ]
})
```