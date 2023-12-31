'use strict'

// Toggling Parallel Bible
document.getElementById('parallelBtn').addEventListener('click', function() {
  const mainText = document.getElementById('mainText');
  const parallelText = document.getElementById('parallelText');

  if (!mainText.classList.contains('col-span-2') && !parallelText.classList.contains('hidden')) {
    mainText.classList.add('col-span-2');
    parallelText.classList.add('hidden');

    mainText.classList.add('xl:mx-52', 'lg:mx-40', 'md:mx-28', 'sm:mx-12');
    mainText.classList.remove('xl:ml-52', 'lg:ml-40', 'md:ml-28', 'sm:ml-12');

    parallelText.classList.add('xl:mx-52', 'lg:mx-40', 'md:mx-28', 'sm:mx-12');
    parallelText.classList.remove('xl:mr-52', 'lg:mr-40', 'md:mr-28', 'sm:mr-12');
  } else {
    mainText.classList.remove('col-span-2');
    parallelText.classList.remove('hidden');

    mainText.classList.remove('xl:mx-52', 'lg:mx-40', 'md:mx-28', 'sm:mx-12');
    mainText.classList.add('xl:ml-52', 'lg:ml-40', 'md:ml-28', 'sm:ml-12');

    parallelText.classList.remove('xl:mx-52', 'lg:mx-40', 'md:mx-28', 'sm:mx-12');
    parallelText.classList.add('xl:mr-52', 'lg:mr-40', 'md:mr-28', 'sm:mr-12');
  }
})

// Toggle Format Menu
document.getElementById('formatBtn').addEventListener('click', function() {
  const selectMenu = document.getElementById('selectMenu');
  const formatMenu = document.getElementById('formatMenu');

  if(!selectMenu.classList.contains('col-span-2') && !formatMenu.classList.contains('hidden')) {
    selectMenu.classList.add('col-span-2');
    formatMenu.classList.add('hidden');

    selectMenu.classList.add('xl:mx-52', 'lg:mx-40', 'md:mx-28', 'sm:mx-12');
    selectMenu.classList.remove('xl:ml-52', 'lg:ml-40', 'md:ml-28', 'sm:ml-12');

    formatMenu.classList.add('xl:mx-52', 'lg:mx-40', 'md:mx-28', 'sm:mx-12');
    formatMenu.classList.remove('xl:mr-52', 'lg:mr-40', 'md:mr-28', 'sm:mr-12');

    document.getElementById('formatBtn').textContent = 'Show Formatting'
  } else {
    selectMenu.classList.remove('col-span-2');
    formatMenu.classList.remove('hidden');

    selectMenu.classList.remove('xl:mx-52', 'lg:mx-40', 'md:mx-28', 'sm:mx-12');
    selectMenu.classList.add('xl:ml-52', 'lg:ml-40', 'md:ml-28', 'sm:ml-12');

    formatMenu.classList.remove('xl:mx-52', 'lg:mx-40', 'md:mx-28', 'sm:mx-12');
    formatMenu.classList.add('xl:mr-52', 'lg:mr-40', 'md:mr-28', 'sm:mr-12');

    document.getElementById('formatBtn').textContent = 'Hide Formatting'
  }
})

const books = [
  "Genesis.json",
  "Exodus.json",
  "Leviticus.json",
  "Numbers.json",
  "Deuteronomy.json",
  "Joshua.json",
  "Ruth.json",
  "Judges.json",
  "1Samuel.json",
  "2Samuel.json",
  "1Kings.json",
  "2Kings.json",
  "1Chronicles.json",
  "2Chronicles.json",
  "Ezra.json",
  "Nehemiah.json",
  "Esther.json",
  "Job.json",
  "Psalms.json",
  "Proverbs.json",
  "Ecclesiastes.json",
  "SongofSolomon.json",
  "Isaiah.json",
  "Jeremiah.json",
  "Lamentations.json",
  "Ezekiel.json",
  "Daniel.json",
  "Hosea.json",
  "Joel.json",
  "Amos.json",
  "Obadiah.json",
  "Jonah.json",
  "Micah.json",
  "Nahum.json",
  "Habakkuk.json",
  "Zephaniah.json",
  "Haggai.json",
  "Zechariah.json",
  "Malachi.json",
  "Matthew.json",
  "Mark.json",
  "Luke.json",
  "John.json",
  "Acts.json",
  "Romans.json",
  "1Corinthians.json",
  "2Corinthians.json",
  "Galatians.json",
  "Ephesians.json",
  "Philippians.json",
  "Colossians.json",
  "1Thessalonians.json",
  "2Thessalonians.json",
  "1Timothy.json",
  "2Timothy.json",
  "Titus.json",
  "Philemon.json",
  "Hebrews.json",
  "James.json",
  "1Peter.json",
  "2Peter.json",
  "1John.json",
  "2John.json",
  "3John.json",
  "Jude.json",
  "Revelation.json",
  "Books.json",
];

/**
 * @typedef {{
*   book: string,
*   chapters: {
*     chapter: string,
*     verses: {
*       verse: string,
*       text: string,
*     }[],
*   }[],
* }} Book
*/

/**
 * Loads a book based on its filename (e.g. "Luke.json")
 * @param {string} filename The book filename
 * @returns {Promise<Book>} The book that was read from JSON
 */
async function loadBook(filename) {
  const resp = await fetch('/dist/books/' + filename)
  return await resp.json()
}

async function loadParallel(filename) {
  const resp = await fetch('/dist/books/' + filename)
  return await resp.json()
}

// Loads main text
loadBook(books[41]).then(function (book) {
  console.log(book)

  const container = document.getElementById('verseContainer0');

  const verses = book.chapters[0].verses;
  for (const verse of verses) {
    const elem = document.createElement('p');
    elem.classList.add('p-1');
    elem.innerText = verse.verse + '. ' + verse.text;
    container.appendChild(elem);
  }

})

// Loads parallel text
loadParallel(books[41]).then(function (book) {
  console.log(book)

  const container = document.getElementById('verseContainer1');

  const verses = book.chapters[0].verses;
  for (const verse of verses) {
    const elem = document.createElement('p');
    elem.classList.add('p-1');
    elem.innerText = verse.verse + '. ' + verse.text;
    container.appendChild(elem);
  }

  document.getElementById('BookTitleNumber').innerText = '';
})








// OLD, THIS IS FROM PARALLEL BRANCH

// document.getElementById('parallelBtn').addEventListener('click', function() {
//   let scriptureBlock = document.getElementById('parallelToggle');
//   let mainScripture = document.getElementById('mainScripture');
//   let parallelScripture = document.getElementById('parallelScripture')

//   if (scriptureBlock.classList.contains('grid-cols-2')) {
//     scriptureBlock.classList.remove('grid-cols-2');
//   } else {
//     scriptureBlock.classList.add('grid-cols-2');
//   };

//   if(parallelScripture.classList.contains('hidden')) {
//     parallelScripture.classList.remove('hidden');
//   } else {
//     parallelScripture.classList.add('hidden');
//   }
//   // FIX THIS ASAP
//   if(mainScripture.classList.contains('xl:mx-52', 'lg:mx-40', 'md:mx-28', 'sm:mx-12')) {
//     mainScripture.classList.add('xl:mr-0', 'lg:mr-0', 'md:mr-0', 'sm:mr-0');
//   } else if (mainScripture.classList.contains('xl:mx-52', 'lg:mx-40', 'md:mx-28', 'sm:mx-12')) {
//     mainScripture.classList.remove('xl:mr-0', 'lg:mr-0', 'md:mr-0', 'sm:mr-0')
//   }
// })

// OLD, THIS IS FROM MASTER BRANCH

// document.getElementById('parallelBtn').addEventListener('click', function() {
//   let parallelBlock = document.getElementById('parallelBlock');
//   let mainScripture = document.getElementById('mainScripture');

//   if (parallelBlock.classList.contains('hidden')) {
//     parallelBlock.classList.remove('hidden');
//     parallelBlock.classList.add('grid', 'grid-cols-2');
//   } else {
//     parallelBlock.classList.add('hidden');
//     parallelBlock.classList.remove('grid', 'grid-cols-2')
//   }
// });
