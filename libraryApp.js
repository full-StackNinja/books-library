// Call relevant DOM elements...
const addBookButton = document.querySelector(".add-book-button");
const formContainer = document.querySelector(".form-container");
const submitButton = document.querySelector("#submit-button");
const cancelButton = document.querySelector("#cancel-button");
const form = document.querySelector("form");
const booksContainer = document.querySelector(".books-container");

const myBooks = [];

// class for book objects...
class Book {
     constructor(title, author, pages, isRead) {
          this.title = title;
          this.author = author;
          this.pages = pages;
          this.isRead = isRead;
     }
     addBookToPage = function (bookIndex) {
          let newBook = document.createElement("p");
          let oneBookContainer = document.createElement("div");
          let removeBook = document.createElement("button");
          newBook.textContent = `${this.title} by ${this.author}, total pages ${this.pages}`;
          oneBookContainer.classList.add("one-book-data");
          oneBookContainer.setAttribute("data-index", bookIndex);
          removeBook.textContent = "Remove";
          removeBook.classList.add("remove-book");
          removeBook.setAttribute("data-index", bookIndex);
          oneBookContainer.appendChild(newBook);
          oneBookContainer.append(oneBookData(this.isRead, bookIndex));
          oneBookContainer.append(removeBook);
          booksContainer.append(oneBookContainer);
     };
     addBookToLibrary = function () {
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
     };
}

const oneBookData = function (readStatus, bookIndex) {
     let toggleReadStatus = document.createElement("button");
     let readText = document.createElement("span");
     let readTick = document.createElement("img");
     if (readStatus === "yes") {
          readText.textContent = "Read";
          readTick.src = "./icons/done-tick.svg";
          toggleReadStatus.setAttribute("data-read-status", "yes");
          toggleReadStatus.style.backgroundColor = "#0f766e";
     } else if (readStatus == "no") {
          readText.textContent = "Unread";
          readTick.src = "./icons/cross-icon.svg";
          toggleReadStatus.style.backgroundColor = "#7f1d1d";
          toggleReadStatus.setAttribute("data-read-status", "no");
     }
     readTick.style.width = "22px";
     toggleReadStatus.style.display = "inline-flex";
     toggleReadStatus.style.alignItems = "center";
     toggleReadStatus.style.justifyContent = "space-between";
     toggleReadStatus.append(readText);
     toggleReadStatus.append(readTick);

     toggleReadStatus.classList.add("read-status");
     toggleReadStatus.setAttribute("data-index", bookIndex);
     return toggleReadStatus;
};

addBookButton.addEventListener("click", () => {
     formContainer.setAttribute("id", "form-container");
});

// Submit book data form after filling it out. But prevent default behaviour of the submit button...
submitButton.addEventListener("click", (event) => {
     // do nothing on button click if any of the form field is missing...
     if (form.elements.title.value === "" || form.elements.author.value === "" || form.elements.pages.value === "") {
     } else {
          event.preventDefault();
          let book = new Book();
          book.addBookToLibrary();
          form.reset();
          formContainer.removeAttribute("id", "form-container");
     }
});

// Cancel out adding book data...
cancelButton.addEventListener("click", () => {
     formContainer.removeAttribute("id", "form-container");
});

booksContainer.addEventListener("click", (event) => {
     console.log(event.target)
     let currentBookIndex = Number(event.target.dataset["index"]);
     let currentBookReadStatus = event.target.dataset["readStatus"];
     let currentReadButton = document.querySelector(`.read-status[data-index=\"${currentBookIndex}\"]`);
     let updateReadButton;
     let currentEventClass = event.target.classList[0];
     if (currentEventClass === "remove-book") {
          myBooks[currentBookIndex] = undefined;
          event.target.parentNode.remove();
     } else if (currentEventClass === "read-status") {
          if (currentBookReadStatus === "yes") {
               currentBookReadStatus = "no";
          } else if (currentBookReadStatus === "no") {
               currentBookReadStatus = "yes";
          }
          updateReadButton = oneBookData(currentBookReadStatus, currentBookIndex);
          currentReadButton.replaceWith(updateReadButton);
     }
});
