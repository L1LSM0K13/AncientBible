"use strict";

/**
 * Toggles parallel Bible
 * @returns {parallelText}
 */
document.getElementById("parallelBtn").addEventListener("click", () => {
  const mainText = document.getElementById("mainText");
  const parallelText = document.getElementById("parallelText");

  if (
    (mainText.classList.contains("col-span-2") &&
      parallelText.classList.contains("hidden")) ||
    !(
      mainText.classList.contains("col-span-2") &&
      parallelText.classList.contains("hidden")
    )
  ) {
    mainText.classList.toggle("col-span-2");
    parallelText.classList.toggle("hidden");

    mainText.classList.toggle("nodeMargins");
    mainText.classList.toggle("nodeMarginLeft");

    parallelText.classList.toggle("nodeMargins");
    parallelText.classList.toggle("nodeMarginRight");
  }
});

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

async function loadBook(filename) {
  const resp = await fetch("/dist/books/" + filename);

  if (resp.status !== 200) {
    throw new Error("Failed to fetch book, got HTTP status " + resp.status);
  }

  return await resp.json();
}

/**
 * The currently selected book, or null if none
 * @type {Book | null}
 */
let currentBook = null;

const bookSelector = document.getElementById("selectBook");
const chapterSelector = document.getElementById("selectChapter");

/**
 * Loads and displays a book by its filename
 * @param {string} fileName The book's filename (e.g. "James.json")
 */
async function selectBookByFileName(fileName) {
  const book = await loadBook(fileName);

  // Set book title text
  const bookTitle = document.getElementById("bookTitle");

  bookTitle.innerText = `Book of ${book.book}`;

  currentBook = book;

  // Clear existing chapters
  chapterSelector.innerText = "";

  // Populate chapterNumbers
  for (let i = 0; i < book.chapters.length; i++) {
    const chapter = book.chapters[i];

    const optionChapt = document.createElement("option");

    optionChapt.innerText = chapter.chapter;
    optionChapt.value = i;

    chapterSelector.appendChild(optionChapt);
  }
}
// Populate titles
for (let i = 0; i < books.length; i++) {
  const book = books[i];

  const optionElem = document.createElement("option");

  optionElem.innerText = book.title;
  optionElem.value = book.filename;

  bookSelector.appendChild(optionElem);
}

bookSelector.onchange = () => {
  const filename = bookSelector.value;
  selectBookByFileName(filename);
};

chapterSelector.onchange = () => {
  const container0 = document.getElementById("verseContainer0");
  const container1 = document.getElementById("verseContainer1");

  if (currentBook == null) {
    return;
  }

  container0.innerText = "";
  container1.innerText = "";

  const chapter = currentBook.chapters[chapterSelector.value];
  const verses = chapter.verses;

  function createElementForVerse(verse) {
    const superscript = document.createElement("sup");
    const textElem = document.createElement("span");

    superscript.innerText = verse.verse;
    textElem.appendChild(superscript);
    superscript.classList.add("mr-1");

    textElem.classList.add("p-1");
    textElem.appendChild(document.createTextNode(verse.text));

    return textElem;
  }

  for (const verse of verses) {
    // Append to both containers
    container0.appendChild(createElementForVerse(verse));
    container1.appendChild(createElementForVerse(verse));
  }

  document.getElementById("verseBtn").addEventListener("click", () => {
    container0.classList.toggle("grid");
    container1.classList.toggle("grid");
  });
};

/**
 * FONT SIZE DROPDOWN
 * @param {Array} fontSizes - Select list of font sizes
 * @returns {fontSizeElem} - Populates dropdown of font sizes
 *
 * FONT TYPE DROPDOWN
 * @param {Array} fontTypes - Select list of font types
 * @returns {fontTypeElem} - Populates dropdown of font types
 */
const fontSizeElem = document.getElementById("fontSize");
const fontTypeElem = document.getElementById("fontType");

const fontSizes = [16, 18, 20, 22];
const fontTypes = ["Arial", "Times New Roman", "Courier New"];

for (let i = 0; i < fontSizes.length; i++) {
  const optionSize = document.createElement("option");

  optionSize.innerText = fontSizes[i];
  fontSizeElem.appendChild(optionSize);
}

for (let i = 0; i < fontTypes.length; i++) {
  const optionType = document.createElement("option");

  optionType.innerText = fontTypes[i];
  fontTypeElem.appendChild(optionType);
}
