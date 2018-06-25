/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _book = __webpack_require__(/*! ./modules/book */ \"./src/modules/book.js\");\n\nvar _book2 = _interopRequireDefault(_book);\n\nvar _misc = __webpack_require__(/*! ./modules/misc */ \"./src/modules/misc.js\");\n\nvar _misc2 = _interopRequireDefault(_misc);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar bookList = {};\nvar selectedBookshelf = 'quito';\nvar selectedLayout = 'block';\n\n// Function to insert the books depending on the specified layout\nfunction putBooksInThePageBookshelf() {\n  var layoutType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : selectedLayout;\n\n  document.getElementById('bookshelf').innerHTML = '';\n  if (layoutType === 'block') {\n    bookList[selectedBookshelf].forEach(function (book) {\n      var lended = '';\n      if (book.lended) {\n        lended = '<div class=\"lended\"><i class=\"lended-i fas fa-user-check\"></i></div>';\n      }\n      var template = '\\n        <div id=\"b' + book.isbn + '\" class=\"book-container\">\\n          <div class=\"image-container\">\\n            <img src=\"' + book.image + '\" alt=\"\">\\n          </div>\\n          ' + lended + '\\n          <div class=\"caption\">\\n            <p class=\"title\">' + book.title + '</p>\\n            <p class=\"authors\">' + book.authors + '</p>\\n            <div class=\"stars\">\\n              ' + _misc2.default[book.averageRating || 0] + '\\n            </div>\\n          </div>\\n        </div>\\n      ';\n      $('#bookshelf').append(template);\n      document.getElementById('b' + book.isbn).addEventListener('click', generatePopUp);\n    });\n  } else if (layoutType === 'list') {\n\n    bookList[selectedBookshelf].forEach(function (book) {\n      var lended = '<span class=\"available\">Available</span>';\n      var buttom = '<button href=\"#\" class=\"btn\" disabled>Borrow The Book</button>';\n      if (book.lended) {\n        lended = '<span class=\"not-available\">Lended</span>';\n        buttom = '';\n      }\n      var template = '\\n      <div id=\"b' + book.isbn + '\" class=\"book-container-list\">\\n        <div class=\"image-container\">\\n          <img src=\"' + book.image + '\" alt=\"\">\\n        </div>\\n        <div class=\"caption\">\\n          <p class=\"title\">' + book.title + ' <small>' + book.publishedDate + '</small></p>\\n          <p class=\"authors\">' + book.authors + '</p>\\n          <p class=\"pagination\">' + book.pageCount + '</p>\\n          <div class=\"stars\">\\n            ' + _misc2.default[book.averageRating || 0] + '\\n          </div>\\n          ' + lended + '\\n          ' + buttom + '\\n          <p class=\"description\">' + book.description + '</p>\\n        </div>\\n      </div>\\n      ';\n      $('#bookshelf').append(template);\n    });\n  }\n}\n\n// Function to get Books details and create a book\nasync function createBook(bookInfo) {\n  var response = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + bookInfo.isbn + '&key=AIzaSyAfzEECJPpjPRqCum-FsnGYHafaCrKnKKM');\n  var data = await response.json();\n  var newBook = await new _book2.default(bookInfo.isbn, bookInfo.lended, bookInfo.users, bookInfo.recommendedBy, data.items[0].volumeInfo.title, String(data.items[0].volumeInfo.authors), data.items[0].volumeInfo.imageLinks.thumbnail, data.items[0].volumeInfo.description, +data.items[0].volumeInfo.averageRating, data.items[0].volumeInfo.publishedDate, +data.items[0].volumeInfo.pageCount);\n  return newBook;\n}\n\n// CallBacks\nvar changeBookshelf = function changeBookshelf(ev) {\n  selectedBookshelf = ev.path[2].id;\n  putBooksInThePageBookshelf();\n  if (ev.path[2].id === 'quito') document.getElementById('selectedBookshelf').innerHTML = 'Quito';\n  if (ev.path[2].id === 'medellin') document.getElementById('selectedBookshelf').innerHTML = 'Medellín';\n  if (ev.path[2].id === 'cartagena') document.getElementById('selectedBookshelf').innerHTML = 'Cartagena';\n  if (ev.path[2].id === 'digital') document.getElementById('selectedBookshelf').innerHTML = 'Digital';\n};\n\nvar changeLayoutMode = function changeLayoutMode(ev) {\n  putBooksInThePageBookshelf(ev.path[0].id);\n  selectedLayout = ev.path[0].id;\n};\n\nvar generatePopUp = function generatePopUp(ev) {\n  var ISBN = ev.path[2].id.split('b')[1];\n  var BOOK = bookList[selectedBookshelf].find(function (bk) {\n    return bk.isbn === ISBN;\n  });\n  var popUpHTML = document.getElementById('popup');\n  var lended = '<span class=\"available\">Available</span>';\n  var buttom = '<button href=\"#\" class=\"btn\" disabled>Borrow The Book</button>';\n  if (BOOK.lended) {\n    lended = '<span class=\"not-available\">Lended</span>';\n    buttom = '';\n  }\n  var template = '\\n    <div class=\"book-window-popup\">\\n      <div class=\"image-container\">\\n        <img src=\"' + BOOK.image + '\" alt=\"\">\\n      </div>\\n      <div class=\"caption\">\\n        <p class=\"title\">' + BOOK.title + ' <small>' + BOOK.publishedDate + '</small></p>\\n        <p class=\"authors\">' + BOOK.authors + '</p>\\n        <p class=\"pagination\">' + BOOK.pageCount + '</p>\\n        <div class=\"stars\">\\n          ' + _misc2.default[BOOK.averageRating || 0] + '\\n        </div>\\n        ' + lended + '\\n        ' + buttom + '\\n        <p class=\"description\">' + BOOK.description + '</p>\\n      </div>\\n      <a href=\"#\" class=\"close\">&times;</a>\\n    </div>\\n  ';\n\n  popUpHTML.innerHTML = template;\n  window.location.href = '#popup';\n};\n\nvar BOOKSHELVES_LIST = document.getElementById('bookshelves-list');\nArray.from(BOOKSHELVES_LIST.children).forEach(function (li) {\n  li.addEventListener('click', changeBookshelf);\n});\n\nvar LAYOUT_MODES = document.getElementById('layout-modes');\nArray.from(LAYOUT_MODES.children).forEach(function (element) {\n  Array.from(element.children)[0].addEventListener('click', changeLayoutMode);\n});\n\n// Load Json Data\nfunction initialSet() {\n  $.getJSON('./src/bookshelves.json', function (data) {\n    var promises = [];\n    $.each(data, function (bookshelf, bookArray) {\n      bookList[bookshelf] = [];\n      var promisesarr = bookArray.map(function (bookInfo) {\n        return createBook(bookInfo).then(function (book) {\n          bookList[bookshelf].push(book);\n        });\n      });\n      promises = [].concat(_toConsumableArray(promises), _toConsumableArray(promisesarr));\n    });\n    Promise.all(promises).then(function () {\n      putBooksInThePageBookshelf();\n    });\n  });\n}\n\ninitialSet();\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/modules/book.js":
/*!*****************************!*\
  !*** ./src/modules/book.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Book = function Book(isbn) {\n  var lended = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  var user = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';\n  var recommendedBy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];\n  var title = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';\n  var authors = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';\n  var image = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';\n  var description = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';\n  var averageRating = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;\n  var publishedDate = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : '';\n  var pageCount = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;\n\n  _classCallCheck(this, Book);\n\n  this.isbn = isbn;\n  this.title = title;\n  this.authors = authors;\n  this.image = image;\n  this.description = description;\n  this.averageRating = averageRating;\n  this.publishedDate = publishedDate;\n  this.pageCount = pageCount;\n  this.lended = lended;\n  this.user = user;\n  this.recommendedBy = recommendedBy;\n};\n\nexports.default = Book;\n\n//# sourceURL=webpack:///./src/modules/book.js?");

/***/ }),

/***/ "./src/modules/misc.js":
/*!*****************************!*\
  !*** ./src/modules/misc.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar STARS = [\"<span class=\\\"far\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\", \"<span class=\\\"fas\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\", \"<span class=\\\"fas\\\">star</span>\\n  <span class=\\\"fas\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\", \"<span class=\\\"fas\\\">star</span>\\n  <span class=\\\"fas\\\">star</span>\\n  <span class=\\\"fas\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\", \"<span class=\\\"fas\\\">star</span>\\n  <span class=\\\"fas\\\">star</span>\\n  <span class=\\\"fas\\\">star</span>\\n  <span class=\\\"fas\\\">star</span>\\n  <span class=\\\"far\\\">star</span>\", \"<span class=\\\"fas\\\">star</span>\\n  <span class=\\\"fas\\\">star</span>\\n  <span class=\\\"fas\\\">star</span>\\n  <span class=\\\"fas\\\">star</span>\\n  <span class=\\\"fas\\\">star</span>\"];\nexports.default = STARS;\n\n//# sourceURL=webpack:///./src/modules/misc.js?");

/***/ })

/******/ });