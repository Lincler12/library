let myLibrary = [];
let id = 0;




function saveLocal() {
    if (myLibrary === 'undefined' || myLibrary.length === 0) {
        localStorage.removeItem('myLibrary');
        return;
    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

document.getElementById('save').addEventListener('click', saveLocal);

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        let readString;
        if (this.read === true) {
            readString = 'read';
        } else {
            readString = 'not read yet';
        }
        return `${this.title}, ${this.author}, ${this.pages}, ${readString}`;
    }

    toggleRead() {
        this.read = !this.read;
    }
}


const addBookToLibrary = function () {
    const bookTitleValue = document.getElementById('book-title').value;
    const authorNameValue = document.getElementById('author-name').value;
    const pageNumberValue = document.getElementById('page-number').value;
    let readValue;
    document.getElementsByName('read?').forEach(element => {
        if (element.checked) {
            readValue = true;
        } else {
            readValue = false;
        }
    })
    id++
    const book = new Book(id, bookTitleValue, authorNameValue, pageNumberValue, readValue);
    myLibrary.push(book);
    return book;
}

const generateElements = function (id, title, author, pages, read) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.id = `${id}`;

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    cardTitle.id = 'card-title';
    cardTitle.textContent = ` ${title}`;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const authorWrapper = document.createElement('div');
    authorWrapper.classList.add('value-wrapper');

    const authorLabel = document.createElement('span');
    authorLabel.classList.add('author-label');
    authorLabel.textContent = "Author:";

    const authorValue = document.createElement('span');
    authorValue.classList.add('author-value');
    authorValue.textContent = ` ${author}`;

    authorWrapper.appendChild(authorLabel);
    authorWrapper.appendChild(authorValue);

    const pagesWrapper = document.createElement('div');
    pagesWrapper.classList.add('value-wrapper');

    const pagesLabel = document.createElement('span');
    pagesLabel.classList.add('pages-label');
    pagesLabel.textContent = "Pages:";

    const pagesValue = document.createElement('span');
    pagesValue.classList.add('pages-value');
    pagesValue.textContent = ` ${pages}`;

    pagesWrapper.appendChild(pagesLabel);
    pagesWrapper.appendChild(pagesValue);

    const readWrapper = document.createElement('div');
    readWrapper.classList.add('value-wrapper');

    const readLabel = document.createElement('span');
    readLabel.classList.add('read-label');
    readLabel.textContent = "Read:";

    const readValue = document.createElement('span');
    readValue.classList.add('read-value');

    readValue.textContent = read ? ' yes' : ' no';


    readWrapper.appendChild(readLabel);
    readWrapper.appendChild(readValue);

    cardBody.appendChild(authorWrapper);
    cardBody.appendChild(pagesWrapper);
    cardBody.appendChild(readWrapper);

    card.appendChild(cardTitle);
    card.appendChild(cardBody);

    //remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.classList.add("remove");
    removeButton.dataset.cardId = `${id}`;
    const icon = document.createElement('span');
    icon.classList.add('fas');
    icon.classList.add('fa-minus');
    removeButton.appendChild(icon);
    cardBody.appendChild(removeButton);

    //toggle read state
    const toggle = document.createElement('button');
    toggle.dataset.cardId = `${id}`;
    toggle.dataset.button = 'toggle';
    toggle.classList.add('toggle-button');
    toggle.textContent = 'Read';
    cardBody.appendChild(toggle);

    id++;
    return card;
}
const addBookToContent = function (id, title, author, pages, read) {
    const mainContent = document.getElementById('main-content');
    const plus = document.getElementById('plus');
    const card = generateElements(id, title, author, pages, read);
    mainContent.insertBefore(card, plus);
}
const populateDisplay = function () {
    myLibrary.forEach(book => {
        addBookToContent(book.id, book.title, book.author, book.pages, book.read);
    })
}
populateDisplay();


function resetModalInput() {
    const inputTextElements = document.querySelectorAll('input[type="text"]');
    const inputNumberElement = document.querySelector('input[type="number"]');
    Array.from(inputTextElements).forEach(inputTextElement => {
        inputTextElement.value = '';
    })
    inputNumberElement.value = '';
    const radioElements = document.querySelectorAll('input[type="radio"]');
    radioElements.forEach(radioElement => {
        radioElement.checked = false;
    })
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.display = 'none';
    const book = addBookToLibrary();
    addBookToContent(book.id, book.title, book.author, book.pages, book.read);
    resetModalInput();
});

//content is dynamically generated so we need to check what is clicked on screen (event delegation)
document.querySelector('#main-content').addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'span' && e.target.parentElement.classList.contains('remove')) {

        const indexToRemove = myLibrary.findIndex(book => book.id === parseInt(e.target.parentElement.parentElement.parentElement.id));

        if (indexToRemove > -1) {
            myLibrary.splice(indexToRemove, 1);

        }
        document.getElementById(e.target.parentElement.dataset.cardId).remove();

    } else if (e.target.classList.contains('remove')) {
        const indexToRemove = myLibrary.findIndex(book => book.id === parseInt(e.target.parentElement.parentElement.id));

        if (indexToRemove > -1) {
            myLibrary.splice(indexToRemove, 1);

        }
        document.getElementById(e.target.dataset.cardId).remove();
    }

    if (e.target.dataset.button === 'toggle') { //when toggle button is clicked
        const cardElement = document.getElementById(`${e.target.dataset.cardId}`);
        const readValue = cardElement.querySelector('.read-value');
        if (readValue.textContent.toLowerCase().trim() === 'yes') {
            readValue.textContent = 'no';
        } else {
            readValue.textContent = 'yes';
        }
        myLibrary.map(book => {
            if (book.id === parseInt(cardElement.id)) {
                book.toggleRead();
            }
        })

    }
})



function populateDisplayFromDB() {
    if (!localStorage.getItem('myLibrary')) {
        return;
    }
    lib = JSON.parse(localStorage.getItem('myLibrary'));
    lib.forEach(bookElement => {
        myLibrary.push(new Book(bookElement.id, bookElement.title, bookElement.author, bookElement.pages, bookElement.read));
    })
    id = myLibrary[myLibrary.length - 1].id;
    populateDisplay();

}

populateDisplayFromDB();