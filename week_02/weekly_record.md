# Week 2
This is a register (kind of a summary) of what I've learned during the week.

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

### RESTful constraints
* **Client-Server architecture**: RESTful APIs do not care about the UI
* **Stateless**: No client context is stored on the server
* **Cacheability**: HTTP responses must define themselves cacheables or non-cacheable
* **Layerd System**: Intermediate servers can be used without the user knowing about it
* **Uniform Interface**: Clearly identify the resources in the request, transfered data is decoupled from db schema. Is good to have resources linked/related to other useful resources inside of them.
* **Code on demand(Optional)**: The API could execute some code instead of respond only with data.

## HTML/CSS

There will be some topics that I not going to write here because I am familiar with them. So I will only make a list with the non-familiar content or the ones that I think can be useful.


### In-page Links
Just let some tag have an **id** let's say: _id="link-to-here"_, then inside of an **a** tag use the href pointing to the id and put the number symbol _#_ before the id name (like: href="#link-to-here"). If the link is inside another page put the path to the another page like before the _#_.

### Tags
section, article, nav, header, footer, aside,  audio, video, mark, figure, figcaption, data, time, output, progress, meter, main, iframe, 

### Connectivity

**Web Sockets:** Alternative to sent messages to the server which are handled by with events, and receive responses based on that.

**Server-sent event:** The server can send events to the client.

**WebRTC** Videoconferences without plugins or external apps.

### CSS animations/transformation
We need to use browser prefixes to change some attributes, these are:

*   **moz** : Firefox
*   **o** : Opera
*   **ms** : IE
*   **webkit** : Chrome or Safari

The use of the prefixes is described by the syntax **-prefix-atribute: some_value**. Next is a list of common usages:
*   -webkit-transform: scale(2);
*   -o-transform: rotate(45deg);
*   -moz-transform: skew(20deg,10deg);
*   -ms-transform: translate(20px,20px)

To make transitions, we can stablish a time for the trasition and how it can change. for exmple:

*   -o-transition: (#)s (change option);

Where **(#)** is a number of seconds and **(change option)** can be one of the following:

*   **ease:** Increasing change
*   **ease-in:** Inscrease at start
*   **ease-out:** Decrease at the end
*   **ease-in-out:** Increase at the start, Decrease at the end
*   **linear:** Constant change

Another way to make animations is with keyframes, the content is a little long so i will leave the link [here](https://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp), for the case i need it in a future.

### SASS
 Basicaly Sass let you make some things that css dont. Some of the things that make it so useful are variables, inheritance, mixins, partials etc.
 
### Flexbox
Used to make a layout but is intended to make it in 1 dimentional way. A two dimentional way can be created with this as well but it is not very fancy. Aside of that flexbox offers a good way to sort the items in you page.

To use Flexbox just add the property display with the value flex in a parent element. Then the child elements inside the parent will be able to use the Flexbox properties which can be seen [here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

### Grid
Like Flexbox but the items are organized in a 2 dimesional way. To start using Grid we do almost the same we did with Flexbox, but instead of putting _flex_ in the **display property**, the value _grid_  is placed. It is a good idea to stablish a number of columns with **grid-template-columns** and the rows with almost the same sintax **grid-template-rows**, they can receive %, px, pt, em etc... but it can receive **fr** that stands for fraction, and it works in the same way flex works.

Grid Terminology:
*   [container](#grid-container)
*   [item](#grid-item)
*   [line](#grid-line)
*   [cell](#grid-cell)
*   [area](#grid-area)
*   [track](#grid-track)
*   [gap](#grid-gap)

#### Grid Container
An element in which you make a grid inside, you just have use in the element style:

    display: grid;

#### Grid Item
An element that is a direct descendant of the grid container.

#### Grid Line
The lines that separates the grid into sections and they can be vertial(column) or horizontal(row) The lines count from 1 to (#rows/columns)+1, because the lines at the borders also count. 

#### Grid Cell
The interception between a grid row and a grid column, it is just a section.

#### Grid Area
Rectangular area which covers 4 grid lines,

#### Grid track
It can be an entire column or a entire row.

#### Grid Gap
A separation between grid tracks.

#### Grid Not supported?
You have options, use:
> @support (display:grid){}


[This place](https://css-tricks.com/snippets/css/complete-guide-grid/) is a good resource of information about the options and about what grid is capable of. I think i will end my relationships with frameworks like bootstrap and materialize after this.

### Media Queries
Media Queries are used to show diferent content depending on the media that is been used. It can be used in CSS in this way:

> @media media_type0 (option){}

The options used typically are min-width/height, max-width/height  to specify breakpoints, which specify when you want the content of the page to change.

## Design Frameworks
Frameworks helps make your life easier by doing a lot of work when you the design of your application. They have a lot of tools and custom page Elements that are already made and you can make changes to them to make them look like you wnat.

This is not a person have to know exactly all components and layouts the famework offers, you just have know how to use them. The documentation is practically the only thing you need.

Here is the documentation for [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/) and for [Material Design](https://material.io/design/).

