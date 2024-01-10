"use strict";
/**
 * Toggles format menu
 * @returns {formatMenu}
 */
document.getElementById("formatBtn").addEventListener("click", () => {
  const selectMenu = document.getElementById("selectMenu");
  const formatMenu = document.getElementById("formatMenu");

  if (
    selectMenu.classList.contains("col-span-2") &&
    formatMenu.classList.contains("hidden")
  ) {
    selectMenu.classList.remove("col-span-2", "nodeMargins");
    formatMenu.classList.remove("hidden", "nodeMargins");

    selectMenu.classList.add("nodeMarginLeft");
    formatMenu.classList.add("nodeMarginRight");

    document.getElementById("formatBtn").innerText = "Hide Formatting";
  } else {
    selectMenu.classList.add("col-span-2", "nodeMargins");
    formatMenu.classList.add("hidden", "nodeMargins");

    selectMenu.classList.remove("nodeMarginLeft");
    formatMenu.classList.remove("nodeMarginRight");

    document.getElementById("formatBtn").innerText = "Show Formatting";
  }
});

// Font size and type
const fontSizeElem = document.getElementById("fontSize");
const fontTypeElem = document.getElementById("fontType");

fontSizeElem.addEventListener("change", () => {
  const selectedValue = fontSizeElem.value;
  vContainer.style.fontSize = selectedValue;
});
fontTypeElem.addEventListener("change", () => {
  const selectedValue = fontTypeElem.value;
  vContainer.style.fontFamily = selectedValue;
});

/**
 * List of books in an array and its order
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
 *
 * Loads a book based on its filename (e.g. "Luke.json")
 * @param {string} filename The book filename
 * @returns {Promise<Book>} The book that was read from JSON
 */

// List of Books
const books = [
  {
    filename: "Genesis.json",
    title: "Genesis",
  },
  {
    filename: "Exodus.json",
    title: "Exodus",
  },
  {
    filename: "Leviticus.json",
    title: "Leviticus",
  },
  {
    filename: "Numbers.json",
    title: "Numbers",
  },
  {
    filename: "Deuteronomy.json",
    title: "Deuteronomy",
  },
  {
    filename: "Joshua.json",
    title: "Joshua",
  },
  {
    filename: "Ruth.json",
    title: "Ruth",
  },
  {
    filename: "Judges.json",
    title: "Judges",
  },
  {
    filename: "1Samuel.json",
    title: "1 Samuel",
  },
  {
    filename: "2Samuel.json",
    title: "2 Samuel",
  },
  {
    filename: "1Kings.json",
    title: "1 Kings",
  },
  {
    filename: "2Kings.json",
    title: "2 Kings",
  },
  {
    filename: "1Chronicles.json",
    title: "1 Chronicles",
  },
  {
    filename: "2Chronicles.json",
    title: "2 Chronicles",
  },
  {
    filename: "Ezra.json",
    title: "Ezra",
  },
  {
    filename: "Nehemiah.json",
    title: "Nehemiah",
  },
  {
    filename: "Esther.json",
    title: "Esther",
  },
  {
    filename: "Job.json",
    title: "Job",
  },
  {
    filename: "Psalms.json",
    title: "Psalms",
  },
  {
    filename: "Proverbs.json",
    title: "Proverbs",
  },
  {
    filename: "Ecclesiastes.json",
    title: "Ecclesiastes",
  },
  {
    filename: "SongofSolomon.json",
    title: "Song of Solomon",
  },
  {
    filename: "Isaiah.json",
    title: "Isaiah",
  },
  {
    filename: "Jeremiah.json",
    title: "Jeremiah",
  },
  {
    filename: "Lamentations.json",
    title: "Lamentations",
  },
  {
    filename: "Ezekiel.json",
    title: "Ezekiel",
  },
  {
    filename: "Daniel.json",
    title: "Daniel",
  },
  {
    filename: "Hosea.json",
    title: "Hosea",
  },
  {
    filename: "Joel.json",
    title: "Joel",
  },
  {
    filename: "Amos.json",
    title: "Amos",
  },
  {
    filename: "Obadiah.json",
    title: "Obadiah",
  },
  {
    filename: "Jonah.json",
    title: "Jonah",
  },
  {
    filename: "Micah.json",
    title: "Micah",
  },
  {
    filename: "Nahum.json",
    title: "Nahum",
  },
  {
    filename: "Habakkuk.json",
    title: "Habakkuk",
  },
  {
    filename: "Zephaniah.json",
    title: "Zephaniah",
  },
  {
    filename: "Haggai.json",
    title: "Haggai",
  },
  {
    filename: "Zechariah.json",
    title: "Zechariah",
  },
  {
    filename: "Malachi.json",
    title: "Malachi",
  },
  {
    filename: "Matthew.json",
    title: "Matthew",
  },
  {
    filename: "Mark.json",
    title: "Mark",
  },
  {
    filename: "Luke.json",
    title: "Luke",
  },
  {
    filename: "John.json",
    title: "John",
  },
  {
    filename: "Acts.json",
    title: "Acts",
  },
  {
    filename: "Romans.json",
    title: "Romans",
  },
  {
    filename: "1Corinthians.json",
    title: "1 Corinthians",
  },
  {
    filename: "2Corinthians.json",
    title: "2 Corinthians",
  },
  {
    filename: "Galatians.json",
    title: "Galatians",
  },
  {
    filename: "Ephesians.json",
    title: "Ephesians",
  },
  {
    filename: "Philippians.json",
    title: "Philippians",
  },
  {
    filename: "Colossians.json",
    title: "Colossians",
  },
  {
    filename: "1Thessalonians.json",
    title: "1 Thessalonians",
  },
  {
    filename: "2Thessalonians.json",
    title: "2 Thessalonians",
  },
  {
    filename: "1Timothy.json",
    title: "1 Timothy",
  },
  {
    filename: "2Timothy.json",
    title: "2 Timothy",
  },
  {
    filename: "Titus.json",
    title: "Titus",
  },
  {
    filename: "Philemon.json",
    title: "Philemon",
  },
  {
    filename: "Hebrews.json",
    title: "Hebrews",
  },
  {
    filename: "James.json",
    title: "James",
  },
  {
    filename: "1Peter.json",
    title: "1 Peter",
  },
  {
    filename: "2Peter.json",
    title: "2 Peter",
  },
  {
    filename: "1John.json",
    title: "1 John",
  },
  {
    filename: "2John.json",
    title: "2 John",
  },
  {
    filename: "3John.json",
    title: "3 John",
  },
  {
    filename: "Jude.json",
    title: "Jude",
  },
  {
    filename: "Revelation.json",
    title: "Revelation",
  },
];

/**
 *
 * @param {string} filename
 * @returns {resp} fetches book
 */
async function loadBook(filename) {
  const resp = await fetch("/dist/books/" + filename);

  if (resp.status !== 200) {
    throw new Error("Failed to fetch book, got HTTP status " + resp.status);
  } else {
    console.log("data fetched");
  }

  return await resp.json();
}

let currentBook = null;

const vContainer = document.getElementById("verseContainer");
const bSelector = document.getElementById("selectBook");
const cSelector = document.getElementById("selectChapter");

async function SelectBookByFile(filename) {
  const book = await loadBook(filename);

  cSelector.innerText = currentBook;

  // Populates chapter numbers
  for (let i = 0; i < book.chapters.length; i++) {
    const chapter = book.chapter[i];
    const chaptOpt = document.createElement("option");

    chaptOpt.innerText = chapter.chapter;
    chaptOpt.value = i;

    cSelector.appendChild(chaptOpt);
  }

  // Populates book titles
  for (let i = 0; i < book.length; i++) {
    const bookValue = book[i];
    const bookOpt = document.createElement("option");

    bookOpt.innerText = bookValue.book;
    bookOpt.value = i;

    bSelector.appendChild(bookOpt);
  }
}

function createElementForVerse(verse) {
  const chapter = currentBook.chapters[cSelector.value];
  const verses = chapter.verses;

  vContainer.innerText = "";

  const superscript = document.createElement("sup");
  const spanElem = document.createElement("span");

  superscript.innerText = verse.verse;
  spanElem.appendChild(superscript);
  superscript.classList.add("mr-1");

  spanElem.classList.add("p-1");
  spanElem.appendChild(document.createTextNode(verse.text));

  for (const verse of verses) {
    vContainer.appendChild(createElementForVerse(verse));
  }
  return spanElem;
}
