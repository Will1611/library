"use strict";

let myLibrary = [];

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

const elMain = document.querySelector(".main");

function Book(id, author, title, pages, genre, year, read) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.genre = genre;
  this.year = year;
  this.read = read;
}

function addBookToLibrary() {
  const book = new Book(
    myLibrary.length + 1,
    inputAuthor.value,
    inputTitle.value,
    inputPages.value,
    inputGenre.value,
    inputYear.value,
    inputRead.checked ? `\u2705` : `\u274c`
  );

  myLibrary.push(book);
}

function appendBookCard() {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("data-id", myLibrary.length);

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

  elMain.appendChild(bookCard);
}

function appendActions() {
  // Append card to body
  const bookActions = document.createElement("div");
  bookActions.classList.add("book-actions");
  bookActions.setAttribute("data-id", myLibrary.length);

  const span = document.createElement("span");
  span.textContent = "Actions: ";

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-delete");
  const btnRead = document.createElement("button");
  btnRead.classList.add("btn-read");
  btnDelete.textContent = "Delete book";
  btnRead.textContent = "Change read status";

  span.appendChild(btnDelete);
  span.appendChild(btnRead);
  bookActions.appendChild(span);
  elMain.appendChild(bookActions);

  // Add functionality to buttons

  // Refactor btnDelete
  btnDelete.addEventListener("click", (event) => {
    const allBookCards = Array.from(document.querySelectorAll(".book-card"));
    const allBookActions = Array.from(
      document.querySelectorAll(".book-actions")
    );
    allBookCards.forEach((card) => {
      if (
        event.target.parentElement.parentElement.attributes["data-id"].value ===
        card.attributes["data-id"].value
      ) {
        elMain.removeChild(card);
      }
    });
    allBookActions.forEach((card) => {
      if (
        event.target.parentElement.parentElement.attributes["data-id"].value ===
        card.attributes["data-id"].value
      ) {
        elMain.removeChild(card);
      }
    });

    myLibrary = myLibrary.filter((book) => {
      return (
        book.id !==
        Number(
          btnDelete.parentElement.parentElement.attributes["data-id"].value
        )
      );
    });

    if (myLibrary.length === 0) {
      placeholder.classList.remove("hidden");
    }
    console.log(myLibrary);
  });
  btnRead.addEventListener("click", () => {
    const dataRead = Array.from(document.querySelectorAll(".data-read"));

    dataRead.forEach((span) => {
      if (
        btnRead.parentElement.parentElement.attributes["data-id"].value ===
        span.parentElement.parentElement.attributes["data-id"].value
      ) {
        span.textContent === `\u2705`
          ? (span.textContent = `\u274c`)
          : (span.textContent = `\u2705`);
      }
    });
  });
}

function resetLibrary() {
  const books = Array.from(document.querySelectorAll(".book-card"));
  const allBookActions = Array.from(document.querySelectorAll(".book-actions"));
  myLibrary.length = 0;
  for (let book of books) {
    elMain.removeChild(book);
  }
  for (let div of allBookActions) {
    elMain.removeChild(div);
  }

  placeholder.classList.remove("hidden");
}

function showLibrary() {
  addBookToLibrary();
  appendBookCard();
  appendActions();
}

function closeForm() {
  inputs.forEach((input) => {
    input.value = "";
    if (input.type === "checkbox") input.checked = true;
  });

  formOverlay.classList.add("hidden");
}

function changeReadStatus() {}

// Event listeners

btnAdd.addEventListener("click", () => {
  formOverlay.classList.remove("hidden");
});

formClose.addEventListener("click", closeForm);

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  placeholder.classList.add("hidden");
  formOverlay.classList.add("hidden");

  showLibrary();
  closeForm();
});

btnReset.addEventListener("click", resetLibrary);
