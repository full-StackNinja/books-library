// Array for storing all the books objects...
const booksLibrary = [];

const Book = function (title, author, totalPages, isRead) {
     this.title = title;
     this.author = author;
     this.totalPages = totalPages;
     this.isRead =isRead;
}


const AddBookToLibrary = function () {
     let book = new Book();
     let inputMessages = ['Book Title?', 'Author Name?', 'Total Pages?', "Has been read? true/false"]; 
     let prop = Object.keys(book);
     let index = 0;
     for (let key of prop) {
          // book[key] = prompt(inputMessages[index], "")
          index++;
     }
     booksLibrary.push(book);
}
AddBookToLibrary();
console.log(booksLibrary);