let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    let readString;
    if(this.read === true){
        readString = 'read';
    }else{
        readString = 'not read yet';
    }
    return `${this.title}, ${this.author}, ${this.pages}, ${readString}`;
}

function addBookToLibrary(userInput){
    if(!userInput){
        throw "wrong user input";
    }
    myLibrary.push(userInput);
}

