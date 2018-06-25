import Book from './modules/book';
import STARS from './modules/misc';

let bookList = {};
let selectedBookshelf = 'quito';
let selectedLayout = 'block';

// Function to insert the books depending on the specified layout
function putBooksInThePageBookshelf(layoutType = selectedLayout) {
  document.getElementById('bookshelf').innerHTML = '';
  if (layoutType === 'block') {
    bookList[selectedBookshelf].forEach((book) => {
      let lended = '';
      if (book.lended) {
        lended = '<div class="lended"><i class="lended-i fas fa-user-check"></i></div>';
      }
      const template = `
        <div id="b${book.isbn}" class="book-container">
          <div class="image-container">
            <img src="${book.image}" alt="">
          </div>
          ${lended}
          <div class="caption">
            <p class="title">${book.title}</p>
            <p class="authors">${book.authors}</p>
            <div class="stars">
              ${STARS[book.averageRating || 0]}
            </div>
          </div>
        </div>
      `;
      $('#bookshelf').append(template);
      document.getElementById(`b${book.isbn}`).addEventListener('click', generatePopUp);
    });
  } else if (layoutType === 'list') {

    bookList[selectedBookshelf].forEach((book) => {
      let lended = '<span class="available">Available</span>';
      let buttom = '<button href="#" class="btn" disabled>Borrow The Book</button>';
      if (book.lended) {
        lended = '<span class="not-available">Lended</span>';
        buttom = '';
      }
      const template = `
      <div id="b${book.isbn}" class="book-container-list">
        <div class="image-container">
          <img src="${book.image}" alt="">
        </div>
        <div class="caption">
          <p class="title">${book.title} <small>${book.publishedDate}</small></p>
          <p class="authors">${book.authors}</p>
          <p class="pagination">${book.pageCount}</p>
          <div class="stars">
            ${STARS[book.averageRating || 0]}
          </div>
          ${lended}
          ${buttom}
          <p class="description">${book.description}</p>
        </div>
      </div>
      `;
      $('#bookshelf').append(template);
    });
  }
}

// Function to get Books details and create a book
async function createBook(bookInfo) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookInfo.isbn}&key=AIzaSyAfzEECJPpjPRqCum-FsnGYHafaCrKnKKM`);
  const data = await response.json();
  const newBook = await new Book(
    bookInfo.isbn,
    bookInfo.lended,
    bookInfo.users,
    bookInfo.recommendedBy,
    data.items[0].volumeInfo.title,
    String(data.items[0].volumeInfo.authors),
    data.items[0].volumeInfo.imageLinks.thumbnail,
    data.items[0].volumeInfo.description,
    +data.items[0].volumeInfo.averageRating,
    data.items[0].volumeInfo.publishedDate,
    +data.items[0].volumeInfo.pageCount,
  );
  return newBook;
}

// CallBacks
const changeBookshelf = (ev) => {
  selectedBookshelf = ev.path[2].id;
  putBooksInThePageBookshelf();
  if (ev.path[2].id === 'quito') document.getElementById('selectedBookshelf').innerHTML = 'Quito';
  if (ev.path[2].id === 'medellin') document.getElementById('selectedBookshelf').innerHTML = 'Medellín';
  if (ev.path[2].id === 'cartagena') document.getElementById('selectedBookshelf').innerHTML = 'Cartagena';
  if (ev.path[2].id === 'digital') document.getElementById('selectedBookshelf').innerHTML = 'Digital';
};

const changeLayoutMode = (ev) => {
  putBooksInThePageBookshelf(ev.path[0].id);
  selectedLayout = ev.path[0].id;
};

const generatePopUp = (ev) => {
  const ISBN = ev.path[2].id.split('b')[1];
  const BOOK = bookList[selectedBookshelf].find(bk => bk.isbn === ISBN);
  const popUpHTML = document.getElementById('popup');
  let lended = '<span class="available">Available</span>';
  let buttom = '<button href="#" class="btn" disabled>Borrow The Book</button>';
  if (BOOK.lended) {
    lended = '<span class="not-available">Lended</span>';
    buttom = '';
  }
  const template = `
    <div class="book-window-popup">
      <div class="image-container">
        <img src="${BOOK.image}" alt="">
      </div>
      <div class="caption">
        <p class="title">${BOOK.title} <small>${BOOK.publishedDate}</small></p>
        <p class="authors">${BOOK.authors}</p>
        <p class="pagination">${BOOK.pageCount}</p>
        <div class="stars">
          ${STARS[BOOK.averageRating || 0]}
        </div>
        ${lended}
        ${buttom}
        <p class="description">${BOOK.description}</p>
      </div>
      <a href="#" class="close">&times;</a>
    </div>
  `;

  popUpHTML.innerHTML = template;
  window.location.href = '#popup';
};

const BOOKSHELVES_LIST = document.getElementById('bookshelves-list');
Array.from(BOOKSHELVES_LIST.children).forEach((li) => {
  li.addEventListener('click', changeBookshelf);
});

const LAYOUT_MODES = document.getElementById('layout-modes');
Array.from(LAYOUT_MODES.children).forEach((element) => {
  Array.from(element.children)[0].addEventListener('click', changeLayoutMode);
});


// Load Json Data
function initialSet() {
  $.getJSON('./src/bookshelves.json', (data) => {
    let promises = [];
    $.each(data, (bookshelf, bookArray) => {
      bookList[bookshelf] = [];
      const promisesarr = bookArray.map((bookInfo) => {
        return createBook(bookInfo).then((book) => {
          bookList[bookshelf].push(book);
        });
      });
      promises = [...promises, ...promisesarr];
    });
    Promise.all(promises).then(() => {
      putBooksInThePageBookshelf();
    });
  });
}

initialSet();
