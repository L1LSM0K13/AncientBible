'use strict'

// Toggling Parallel Bible
function toggleParallel() {
  let parallelBlock = document.getElementById("");
  if (parallelBlock.style.display == hidden || parallelBlock.style.display == null) {
    parallelBlock.style.display == "";
  } else {
    parallelBlock.style.display = "";
  }
}



// Book loading functions

/**
 * @typedef {{
 * book: string,
 *  chapters: {
 *    chapter: string,
 *    verses: {
 *      verse: string,
 *      text: string,
 *    }[],
 *   }[],
 * }} Book
 */

/**
 * Loads a book based on its filename (e.g. 'Luke.json)
 * @param {string} filename The book filename
 * @returns {Promise<Book>} The book that was read from JSON
*/

async function loadBook(filename) {
  const resp = await fetch('dist/KJV Bible/' + filename)
  return await resp.json()
}

// Example: Load the first book
loadBook(books[i]).then(function (book) {
  console.log(book)

  const container = document.getElementById('verse-container');

  const verses = book.chapters[0].verses;
  for (const verse of verses) {
    const elem = document.createElement('p');
    elem.classList.add('verse');
    elem.innerText = verse.verse + '. ' + verse.text;
    container.appendChild(elem);
  }
})
