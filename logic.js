let myLibrary = [];

let book1 = new Book('Hobbit', 'J.R.R. Tolkien', 239, 'true');
myLibrary.push(book1);
let book2 = new Book('Of Mice And Men', 'John Steinbeck', 25, 'true');
myLibrary.push(book2);
let book3 = new Book('Frankenstein', 'Mary Shelley', 25, 'true');
myLibrary.push(book3);
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    let readString;
    if (this.read === true) {
        readString = 'read';
    } else {
        readString = 'not read yet';
    }
    return `${this.title}, ${this.author}, ${this.pages}, ${readString}`;
}

function addBookToLibrary() {
    const bookTitleValue = document.getElementById('book-title').value;
    const authorNameValue = document.getElementById('author-name').value;
    const pageNumberValue = document.getElementById('page-number').value;
    let readValue;
    document.getElementsByName('read?').forEach(element => {
        if (element.checked) {
            readValue = element.value;
        }
    })
    const book = new Book(bookTitleValue, authorNameValue, pageNumberValue, readValue);
    myLibrary.push(book);
    return book;
}


myLibrary.forEach(book => {
    addBookToContent(book.title, book.author, book.pages, book.read);
})


function addBookToContent(title, author, pages, read) {
    const mainContent = document.getElementById('main-content');
    const plus = document.getElementById('plus');
    const card = generateElements(title, author, pages, read);
    mainContent.insertBefore(card, plus);
}

function generateElements(title, author, pages, read) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = ` ${title}`;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const authorWrapper = document.createElement('div');
    authorWrapper.classList.add('author-wrapper');

    const authorLabel = document.createElement('span');
    authorLabel.classList.add('author-label');
    authorLabel.textContent = "Author:";

    const authorValue = document.createElement('span');
    authorValue.classList.add('author-value');
    authorValue.textContent = ` ${author}`;

    authorWrapper.appendChild(authorLabel);
    authorWrapper.appendChild(authorValue);

    const pagesWrapper = document.createElement('div');
    pagesWrapper.classList.add('pages-wrapper');

    const pagesLabel = document.createElement('span');
    pagesLabel.classList.add('pages-label');
    pagesLabel.textContent = "Pages:";

    const pagesValue = document.createElement('span');
    pagesValue.classList.add('pages-value');
    pagesValue.textContent = ` ${pages}`;

    pagesWrapper.appendChild(pagesLabel);
    pagesWrapper.appendChild(pagesValue);

    const readWrapper = document.createElement('div');
    readWrapper.classList.add('read-wrapper');

    const readLabel = document.createElement('span');
    readLabel.classList.add('read-label');
    readLabel.textContent = "Read:";

    const readValue = document.createElement('span');
    readValue.classList.add('read-value');
    readValue.textContent = ` ${read}`;

    readWrapper.appendChild(readLabel);
    readWrapper.appendChild(readValue);

    cardBody.appendChild(authorWrapper);
    cardBody.appendChild(pagesWrapper);
    cardBody.appendChild(readWrapper);

    card.appendChild(cardTitle);
    card.appendChild(cardBody);

    return card;
}

function resetModalInput(){
    const inputTextElements = document.querySelectorAll('input[type="text"]');
    const inputNumberElement = document.querySelector('input[type="number"]');
    Array.from(inputTextElements).forEach(inputTextElement =>{
        inputTextElement.value = '';
    })
    inputNumberElement.value = '';
    const radioElements = document.querySelectorAll('input[type="radio"]');
    radioElements.forEach(radioElement =>{
        radioElement.checked = false;
    })
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.display = 'none';
    const book = addBookToLibrary();
    addBookToContent(book.title, book.author, book.pages, book.read);
    resetModalInput();
});



