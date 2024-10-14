"use strict";

const myLibrary = [];

const btnAdd = document.querySelector(".btn-add");
const formOverlay = document.querySelector(".form-overlay");
const formClose = document.querySelector(".form-close");

function Book(author, title, pages, genre, year, hasRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.genre = genre;
  this.year = year;
  this.hasRead = hasRead;
}

btnAdd.addEventListener("click", () => {
  formOverlay.classList.remove("hidden");
});

formClose.addEventListener("click", () => {
  formOverlay.classList.add("hidden");
});
