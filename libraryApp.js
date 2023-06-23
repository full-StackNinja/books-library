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

Book.prototype.addBookToPage = function (bookIndex) {
     let oneBookData = document.createElement("div");
     let newBook = document.createElement("p");
     let removeBook = document.createElement("button");
     let toggleReadStatus = document.createElement("button");
     if (this.isRead === "yes") {
          newBook.textContent = `${this.title} by ${this.author}, total pages ${this.pages}`;
          toggleReadStatus.textContent = "Read";
          toggleReadStatus.style.backgroundColor = "#0f766e";
     } else {
          newBook.textContent = `${this.title} by ${this.author}, total pages ${this.pages}`;
          toggleReadStatus.textContent = "Unread";
          toggleReadStatus.style.backgroundColor = "#7f1d1d";
     }
     oneBookData.classList.add("one-book-data");
     oneBookData.setAttribute("data-index", bookIndex);
     toggleReadStatus.classList.add("read-status");
     toggleReadStatus.setAttribute("data-index", bookIndex);
     removeBook.textContent = "Remove";
     removeBook.classList.add("remove-book");
     removeBook.setAttribute("data-index", bookIndex);
     oneBookData.append(newBook);
     oneBookData.append(toggleReadStatus);
     oneBookData.append(removeBook);
     booksContainer.append(oneBookData);
};

Book.prototype.addBookToLibrary = function () {
     this.title = form.elements.title.value;
     this.author = form.elements.author.value;
     this.pages = form.elements.pages.value;
     this.isRead = form.elements["book-read"].value;
     let undefinedIndex = myBooks.indexOf(undefined);
     if (undefinedIndex !== -1) {
          myBooks[undefinedIndex] = this;
          this.addBookToPage(undefinedIndex);
     } else {
          myBooks.push(this);
          this.addBookToPage(myBooks.length - 1);
     }
     console.log(myBooks);
};

addBookButton.addEventListener("click", () => {
     formContainer.setAttribute("id", "form-container");
});

submitButton.addEventListener("click", (event) => {
     if ((form.elements.title.value === "") || (form.elements.author.value === "") ||
          (form.elements.pages.value === "")) {
          
     }
     else {
          event.preventDefault();
          let book = new Book();
          book.addBookToLibrary();
          form.reset();
          formContainer.removeAttribute("id", "form-container");
     }
});

cancelButton.addEventListener("click", () => {
     formContainer.removeAttribute("id", "form-container");
});

booksContainer.addEventListener("click", (event) => {
     if (event.target.classList[0] === "remove-book") {
          myBooks[Number(event.target.dataset["index"])] = undefined;
          event.target.parentNode.remove();
     } else if (event.target.classList[0] === "read-status") {
          if (event.target.innerHTML === "Read") {
               event.target.innerHTML = "Unread";
               event.target.style.backgroundColor = "#7f1d1d";
          } else if (event.target.innerHTML === "Unread") {
               event.target.innerHTML = "Read";
               event.target.style.backgroundColor = "#0f766e";
          }
     }
});
