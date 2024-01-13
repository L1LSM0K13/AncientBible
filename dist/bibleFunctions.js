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
    filename: "1Kingdoms.json",
    title: "1 Kingdoms (1 Samuel)",
  },
  {
    filename: "2Kingdoms.json",
    title: "2 Kingdoms (2 Samuel)",
  },
  {
    filename: "3Kingdoms.json",
    title: "3 Kingdoms (1 Kings)",
  },
  {
    filename: "4Kingdoms.json",
    title: "4 Kingdoms (2 Kings)",
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
    filename: "1Ezra.json",
    title: "1 Ezra (2 Esdras)",
  },
  {
    filename: "2Ezra.json",
    title: "2 Ezra (Ezra/2 Esdras)",
  },
  {
    filename: "Nehemiah.json",
    title: "Nehemiah",
  },
  {
    filename: "Tobit.json",
    title: "Tobit",
  },
  {
    filename: "Judith.json",
    title: "Judith",
  },
  {
    filename: "Esther.json",
    title: "Esther",
  },
  {
    filename: "1Maccabees.json",
    title: "1 Maccabees",
  },
  {
    filename: "2Maccabees.json",
    title: "2 Maccabees",
  },
  {
    filename: "3Maccabees.json",
    title: "3 Maccabees",
  },
  {
    filename: "Psalms.json",
    title: "Psalms",
  },
  {
    filename: "Job.json",
    title: "Job",
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
    filename: "Wisdom of Solomon.json",
    title: "Wisdom of Solomon",
  },
  {
    filename: "Wisdom of Sirach.json",
    title: "Wisdom of Sirach",
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
    filename: "Epistle of Jeremiah.json",
    title: "Epistle of Jeremiah",
  },
  {
    filename: "Ezekiel.json",
    title: "Ezekiel",
  },
  {
    filename: "Baruch.json",
    title: "Baruch",
  },
  {
    filename: "Daniel.json",
    title: "Daniel",
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

let currentBook = null;

const bSelector = document.getElementById("selectBook");
const cSelector = document.getElementById("selectChapter");
const vContainer = document.getElementById("verseContainer");

async function loadBook(filename) {
  const resp = await fetch("/dist/books/" + filename);

  if (resp.status !== 200) {
    throw new Error("Failed to fetch book, got HTTP status " + resp.status);
  }

  return await resp.json();
}

async function selectBookByFileName(filename) {
  currentBook = await loadBook(filename);

  document.getElementById(
    "bookTitle"
  ).innerText = `Book of ${currentBook.book}`;

  // Clear existing chapters
  cSelector.innerText = currentBook.book.chapter;

  // Populate chapterNumbers
  for (let i = 0; i < currentBook.chapters.length; i++) {
    const chapter = currentBook.chapters[i];
    const optionChapt = document.createElement("option");

    optionChapt.innerText = chapter.chapter;
    optionChapt.value = i;

    cSelector.appendChild(optionChapt);
  }
}
bSelector.innerText = "";

console.log(loadBook("genesis.json"));

// Populate book titles
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  const optionElem = document.createElement("option");

  optionElem.innerText = book.title;
  optionElem.value = book.filename;

  bSelector.appendChild(optionElem);
}

bSelector.onchange = () => {
  const filename = bSelector.value;

  cSelector.innerText = ""; // Clear chapter dropdown
  vContainer.innerText = ""; // Clear verse container
  selectBookByFileName(filename);
};

cSelector.onchange = () => {
  const chapterIndex = cSelector.value;
  const chapter = currentBook.chapters[chapterIndex];
  const verses = chapter.verses;

  vContainer.innerText = ""; // Clear verse container

  for (const verse of verses) {
    let superscript = document.createElement("sup");
    const spanElem = document.createElement("span");

    spanElem.classList.add("p-1");
    spanElem.appendChild(superscript);
    spanElem.appendChild(document.createTextNode(verse.text));

    superscript.innerText = verse.verse;
    superscript.classList.add("mr-1");

    vContainer.appendChild(spanElem);

    document.getElementById("verseBtn").onclick = () => {
      vContainer.classList.toggle("grid");
    };
  }
};
