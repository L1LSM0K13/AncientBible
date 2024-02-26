"use strict";

// Bible function declarations
const bSelector = document.getElementById("selectBook");
const cSelector = document.getElementById("selectChapter");
const vContainer = document.getElementById("verseContainer");
const redLetterBtn = document.getElementById("redLetterBtn");
const bTitle = document.getElementById("bookTitle");

let currentBook;
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
		filename: "1samuel.json",
		title: "1 Kingdoms (1 Samuel)",
	},
	{
		filename: "2samuel.json",
		title: "2 Kingdoms (2 Samuel)",
	},
	{
		filename: "1kings.json",
		title: "3 Kingdoms (1 Kings)",
	},
	{
		filename: "2kings.json",
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
		title: "1 Ezra (1 Esdras)",
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
		filename: "4Maccabees.json",
		title: "4 Maccabees",
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
		filename: "songs.json",
		title: "Songs of Solomon",
	},
	{
		filename: "wisdom.json",
		title: "Wisdom of Solomon",
	},
	{
		filename: "sirach.json",
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
		filename: "epistle.json",
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

// Fetches book
async function fetchBook(filename) {
	const resp = await fetch(`/dist/books_NEW_TRANSLATION/${filename}`);

	if (resp.status !== 200) {
		throw new Error("Failed to fetch book, got HTTP status " + resp.status);
	}

	return await resp.json();
}
loadBook("Genesis.json");

// Loads the verse container with the current chapter
async function loadChapter(chapterIndex) {
	const chapter = currentBook.chapters[chapterIndex];
	const verses = chapter.verses;

	// Clears verse container for new chapter or book
	vContainer.innerHTML = "";

	for (const verse of verses) {
		const verseText = document.createElement("span");
		const verseNumber = document.createElement("sup");

		verseText.appendChild(verseNumber);
		verseText.appendChild(document.createTextNode(verse.text));
		verseText.classList.add(
			"m-1",
			"p-1",
			"dark:hover:bg-[#202124]",
			"hover:bg-[#f8f8da]",
			"hover:border",
			"border-[#c4c4ad]",
			"dark:border-[#000000]",
			"rounded-sm"
		);

		verseNumber.classList.add(
			"pr-1",
			"font-semibold",
			"text-gray-800",
			"dark:text-[#d9dde0]"
		);
		verseNumber.innerText = verse.verse;

		vContainer.appendChild(verseText);

		document.getElementById("verseBtn").onclick = () => {
			vContainer.classList.toggle("grid");
		};

		// Red lettering
		const isRed = verse.isRed;
		if (isRed === true) {
			verseText.classList.add("text-red-500", "dark:text-red-400");
		}
	}
}

// Loads chapters of the selected book
async function loadBook(filename) {
	currentBook = await fetchBook(filename);

	bTitle.innerText = `Book of ${currentBook.book}`;

	// Clears existing chapters
	cSelector.innerText = currentBook.book.chapter;

	for (let i = 0; i < currentBook.chapters.length; i++) {
		const chapter = currentBook.chapters[i];
		const chapterOption = document.createElement("option");

		chapterOption.innerText = chapter.chapter;
		chapterOption.value = i;

		cSelector.appendChild(chapterOption);
	}
	loadChapter(0);
}

// Populates book titles
for (let i = 0; i < books.length; i++) {
	const bookTitles = books[i];
	const bookOptions = document.createElement("option");

	bookOptions.innerText = bookTitles.title;
	bookOptions.value = bookTitles.filename;

	bSelector.appendChild(bookOptions);
}

// Refreshes verse container and chapter list
bSelector.onchange = () => {
	const filename = bSelector.value;

	cSelector.innerText = "";
	vContainer.innertext = "";
	loadBook(filename);
};
cSelector.onchange = () => {
	loadChapter(cSelector.value);
};
