"use strict";

const myLibrary = [];

function Book(author, title, pages, genre, year, hasRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.genre = genre;
  this.year = year;
  this.hasRead = hasRead;
}

const btnAdd = document.querySelector(".btn-add");
const formOverlay = document.querySelector(".form-overlay");
const formClose = document.querySelector(".form-close");
const btnSubmit = document.querySelector(".btn-submit");
const placeholder = document.querySelector(".placeholder");

const inputAuthor = document.querySelector(".input-author").textContent;
const inputTitle = document.querySelector(".input-title").textContent;
const inputPages = document.querySelector(".input-pages").textContent;
const inputGenre = document.querySelector(".input-genre").textContent;
const inputYear = document.querySelector(".input-year").textContent;
const inputRead = document.querySelector(".input-read").checked;

btnAdd.addEventListener("click", () => {
  formOverlay.classList.remove("hidden");
});

formClose.addEventListener("click", () => {
  formOverlay.classList.add("hidden");
});

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  // formOverlay.classList.add("hidden");
  placeholder.classList.add("hidden");

  console.log(
    "hello",
    inputAuthor,
    inputTitle,
    inputPages,
    inputGenre,
    inputYear,
    inputRead
  );
});
