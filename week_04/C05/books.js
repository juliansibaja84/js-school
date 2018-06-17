const isbnList = [
  '1491991690',
  '0201433311',
  '1783983299',
  '0130897930',
  '0133038637',
  '0763734233',
  '1785287451',
  '1430246235',
  '1846288630',
  '1410606384',
  '1785280104',
  '1846288630',
  '1410606384',
  '0763714313',
  '144712443X',
  '020177061X',
  '1849515735',
  '0131587382',
  '1849516375',
  '1590590287'
]

const stars = [
  `<i class="far fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>`,
  `<i class="fas fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>`,
  `<i class="fas fa-star fa-xs"></i>
  <i class="fas fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>`,
  `<i class="fas fa-star fa-xs"></i>
  <i class="fas fa-star fa-xs"></i>
  <i class="fas fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>`,
  `<i class="fas fa-star fa-xs"></i>
  <i class="fas fa-star fa-xs"></i>
  <i class="fas fa-star fa-xs"></i>
  <i class="fas fa-star fa-xs"></i>
  <i class="far fa-star fa-xs"></i>`,
  `<i class="fas fa-star fa-xs"></i>
  <i class="fas fa-star fa-xs"></i>
  <i class="fas fa-star fa-xs"></i>
  <i class="fas fa-star fa-xs"></i>
  <i class="fas fa-star fa-xs"></i>`

];

var bookList = [];

// Book Model ------------------------------------------------------------------

class Book {
  constructor(
    id,
    title = '',
    authors = '',
    image = '',
    description = '',
    averageRating = 0,
    publishedDate = '',
    pageCount = 0,
    lended = false,
  ){
    this.id = id;
    this.title = title;
    this.authors = authors;
    this.image = image;
    this.description = description;
    this.averageRating = averageRating;
    this.publishedDate = publishedDate;
    this.pageCount = pageCount;
    this.lended = lended;
  }
}

// CallBacks -------------------------------------------------------------------

const changeTitle = ev => {
  if(ev.path[1].id === 'quito') {
    document.getElementById('selectedBookshelf').innerHTML = 'Quito';
  } else if (ev.path[1].id === 'medellin') {
    document.getElementById('selectedBookshelf').innerHTML = 'Medellín';
  } else if (ev.path[1].id === 'cartagena') {
    document.getElementById('selectedBookshelf').innerHTML = 'Cartagena';
  } else if (ev.path[1].id === 'digital') {
    document.getElementById('selectedBookshelf').innerHTML = 'Digital';
  } else if (ev.path[1].id === 'personalLoans') {
    document.getElementById('selectedBookshelf').innerHTML = 'Personal Loans';
  } else if (ev.path[1].id === 'newReleases') {
    document.getElementById('selectedBookshelf').innerHTML = 'New Releases';
  }
};

const chLayout = ev => {
  if (ev.path[0].id === 'list') {
    setBooks(1);
  } else {
    setBooks(0);
  }
};

const generatePopUp = ev => {
  const id = ev.path[3].id.split("b")[1];
  let popUpHTML = document.getElementById("popup");
  let lended = '<span class="label label-info">Available</span>';
  let button = '<a href="#" class="btn btn-info" role="button">Borrow The Book</a>';

  if (bookList[id].lended) {
    lended = '<span class="label label-default">Lended</span>'
    button = '<a href="#" class="btn btn-info disabled" role="button">Borrow The Book</a>';
  }; 

  let template = `
    <div class="book-window-popup row">
        <img class="col-xs-12 col-sm-3 description-img" src="${bookList[id].image}" alt="">
        <div class="col-xs-12 col-sm-9">
            <h1>${bookList[id].title} <small>${bookList[id].publishedDate}</small></h1>
            <p><strong>Authors:</strong>  ${bookList[id].authors} </p>
            <div class="stars">
              ${stars[bookList[id].averageRating | 0]}
            </div>
            ${lended}${button}
            <p class="description"><strong>Description:</strong> ${bookList[id].description} </p>
        </div>
        <a href="#" class="close">&times;</a>
    </div>
  `;

  popUpHTML.innerHTML = template;
  window.location.href = '#popup';
}

// Function to get Books data --------------------------------------------------

async function fetchBooks() {
  let fetchList = [];
  bookList = [];
  for (let i = 0; i < 20; i++) {
    fetchList.push(
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${isbnList[i]}&key=AIzaSyC8ynwkEpwoWM-RplhnnIEJgYs1XxLbR7w`)
    )
  }
  let response = await Promise.all(fetchList);
  let data = await Promise.all(response.map(item => item.json()));
  for (let i = 0; i < 20; i++) {
    let book = new Book(
      i,
      data[i].items[0].volumeInfo.title,
      String(data[i].items[0].volumeInfo.authors),
      data[i].items[0].volumeInfo.imageLinks.thumbnail,
      data[i].items[0].volumeInfo.description,
      +data[i].items[0].volumeInfo.averageRating,
      data[i].items[0].volumeInfo.publishedDate,
      +data[i].items[0].volumeInfo.pageCount,
      false
    );
    bookList.push(book);
  }
  setBooks(0);
}

// Function to insert the books depending on the specified layout---------------

function setBooks(layoutType = 0) {

  if (layoutType === 0) {
    for(let book of bookList) {
      let lended = '';
      if (book.lended) {
        lended = '<div class="lended"></div>'
    };
      let template = `
        <div class="col-sm-6 col-md-3">
          <div class="book thumbnail">
            <img src="${book.image}" alt="">
            ${lended}
            <div class="caption">
                <p class="title">${book.title}</p>
                <p class="authors">${book.authors}</p>
                <div class="stars">
                  ${stars[book.averageRating | 0]}
                </div>
            </div>
          </div>
        </div>
      `;
      let bookHTML = document.getElementById(`b${book.id}`);
      bookHTML.innerHTML = template;
    }

  } else if (layoutType === 1) {
    for (let book of bookList) {
      let lended = '<span class="label label-info">Available</span>';
      let button = '<a href="#" class="btn btn-info" role="button">Borrow The Book</a>';
      if (book.lended) {
        lended = '<span class="label label-default">Lended</span>'
        button = '<a href="#" class="btn btn-info disabled" role="button">Borrow The Book</a>';
      }; 
      let template = `
        <div class="container-fluid">
          <div class="book-list row">
            <img class="col-xs-12 col-sm-3" src="${book.image}" alt="">
            <div class="col-xs-12 col-sm-9">
              <p class="title">${book.title}</p>
              <p class="authors">${book.authors}</p>
              ${lended}${button}
              <div class="stars">
                ${stars[book.averageRating | 0]}
              </div>
              <p class="description">${book.description}</p>
            </div>
          </div>
        </div>
      `;
      let bookHTML = document.getElementById(`b${book.id}`);
      bookHTML.innerHTML = template;
    }

  }
}

// Set initial books
for (let i = 0; i < 20; i++) {
  let book = new Book(
    i,
    'Loading',
    'Loading',
    './assets/images/loading.gif',
    '',
    0,
    '0',
    0,
    false
    );
    bookList.push(book);
}

document.getElementById('quito').addEventListener('click', changeTitle);
document.getElementById('medellin').addEventListener('click', changeTitle);
document.getElementById('cartagena').addEventListener('click', changeTitle);
document.getElementById('digital').addEventListener('click', changeTitle);
document.getElementById('personalLoans').addEventListener('click', changeTitle);
document.getElementById('newReleases').addEventListener('click', changeTitle);
document.getElementById('blocks').addEventListener('click', chLayout);
document.getElementById('list').addEventListener('click', chLayout);

for (let i = 0; i < bookList.length;i++) {
  document.getElementById(`b${i}`).addEventListener('click', generatePopUp);
}

setBooks(0);
fetchBooks();


