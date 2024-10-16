"use strict";

const myLibrary = [
  // {
  //   author: "J.R.R Tolkien",
  //   title: "The Hobbit",
  //   pages: 5000,
  //   genre: "Fantasy",
  //   year: 1952,
  //   read: false,
  // },
];

const btnAdd = document.querySelector(".btn-add");
const btnSubmit = document.querySelector(".btn-submit");
const btnReset = document.querySelector(".btn-reset");
const formOverlay = document.querySelector(".form-overlay");
const formClose = document.querySelector(".form-close");
const placeholder = document.querySelector(".placeholder");

const inputAuthor = document.getElementById("author");
const inputTitle = document.getElementById("title");
const inputPages = document.getElementById("pages");
const inputGenre = document.getElementById("genre");
const inputYear = document.getElementById("year");
const inputRead = document.getElementById("read");

const inputs = Array.from(document.querySelectorAll(".form-input"));

function Book(author, title, pages, genre, year, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.genre = genre;
  this.year = year;
  this.read = read;
}

function addBookToLibrary() {
  const book = new Book(
    inputAuthor.value,
    inputTitle.value,
    inputPages.value,
    inputGenre.value,
    inputYear.value,
    inputRead.checked
  );

  myLibrary.push(book);
}

// Refactor code to work with myLibrary
function appendBookCard() {
  const bookCard = document.createElement("div");
  const bookActions = document.createElement("div");

  bookCard.classList.add("book-card" /*"hidden" */);
  bookActions.classList.add("book-actions");

  for (let i = 1; i <= 6; i++) {
    const bookObjKey = inputs[i - 1].id;

    const col = document.createElement("div");
    col.classList.add("col");
    bookCard.appendChild(col);

    const showData = document.createElement("span");
    showData.classList.add("show-data");
    showData.classList.add(`show-${bookObjKey}`);
    showData.textContent = `${
      bookObjKey.charAt(0).toUpperCase() + bookObjKey.slice(1)
    }:`;
    col.appendChild(showData);

    const data = document.createElement("span");
    data.classList.add("data");
    data.classList.add(`data-${bookObjKey}`);
    data.textContent = myLibrary[myLibrary.length - 1][bookObjKey];
    col.appendChild(data);
  }
  const span = document.createElement("span");
  span.textContent = "Actions: ";
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Delete book";
  const btnRead = document.createElement("button");
  btnRead.textContent = "Change read status";
  span.appendChild(btnDelete);
  span.appendChild(btnRead);
  bookActions.appendChild(span);

  document.querySelector(".main").appendChild(bookCard);
  document.querySelector(".main").appendChild(bookActions);
}

// appendBookCard();

function showLibrary() {}

function resetForm() {
  inputs.forEach((input) => {
    input.value = "";
    if (input.type === "checkbox") input.checked = true;
  });
}

// Event listeners

btnAdd.addEventListener("click", () => {
  formOverlay.classList.remove("hidden");
});

formClose.addEventListener("click", () => {
  resetForm();

  formOverlay.classList.add("hidden");
});

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  placeholder.classList.add("hidden");
  formOverlay.classList.add("hidden");

  addBookToLibrary();
  appendBookCard();
  resetForm();
});

btnReset.addEventListener("click", () => {
  const books = Array.from(document.querySelectorAll(".book-card"));
  const allBookActions = Array.from(document.querySelectorAll(".book-actions"));
  myLibrary.length = 0;
  for (let book of books) {
    document.querySelector(".main").removeChild(book);
  }
  for (let div of allBookActions) {
    document.querySelector(".main").removeChild(div);
  }

  placeholder.classList.remove("hidden");
});
