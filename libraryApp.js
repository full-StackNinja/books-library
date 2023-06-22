const addBookButton = document.querySelector(".add-book-button");
const formContainer = document.querySelector(".form-container");
const submitButton = document.querySelector("#submit-button");
const cancelButton = document.querySelector("#cancel-button");
const form = document.querySelector("form");
const booksContainer = document.querySelector(".books-container");

const myBooks = [];
const Book = function (title, author, pages, isRead) {
     this.title = title;
     this.author = author;
     this.pages = pages;
     this.isRead = isRead;
};

Book.prototype.addBookToPage = function () {
     let newBook = document.createElement("p");
     this.isRead === "yes" ? (newBook.textContent = `${this.title} by ${this.author}, total pages ${this.pages} has been read`) : (newBook.textContent = `${this.title} by ${this.author}, total pages ${this.pages} is not read yet`);
     booksContainer.appendChild(newBook);
};

Book.prototype.addBookToLibrary = function () {
     this.title = form.elements.title.value;
     this.author = form.elements.author.value;
     this.pages = form.elements.pages.value;
     this.isRead = form.elements["book-read"].value;
     console.log(this);
     myBooks.push(this);
     this.addBookToPage();
};

addBookButton.addEventListener("click", () => {
     formContainer.setAttribute("id", "form-container");
});

submitButton.addEventListener("click", (event) => {
     event.preventDefault();
     let book = new Book();
     book.addBookToLibrary();
     form.reset();
     formContainer.removeAttribute("id", "form-container");
});

cancelButton.addEventListener("click", () => {
     formContainer.removeAttribute("id", "form-container");
     console.log("cancel button clicked");
})