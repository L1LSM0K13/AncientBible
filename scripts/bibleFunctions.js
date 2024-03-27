"use strict";

// Function declarations
const bSelector = document.getElementById("selectBook");
const cSelector = document.getElementById("selectChapter");
const vContainer = document.getElementById("verseContainer");
const redLetterBtn = document.getElementById("redLetterBtn");
const bTitle = document.getElementById("bookTitle");
const verseBtn = document.getElementById("verseBtn");

//Stores book into an array
let currentBook;
const books = [
	{
		filename: "genesis.json",
		title: "Genesis",
	},
	{
		filename: "exodus.json",
		title: "Exodus",
	},
	{
		filename: "leviticus.json",
		title: "Leviticus",
	},
	{
		filename: "numbers.json",
		title: "Numbers",
	},
	{
		filename: "deuteronomy.json",
		title: "Deuteronomy",
	},
	{
		filename: "joshua.json",
		title: "Joshua",
	},
	{
		filename: "ruth.json",
		title: "Ruth",
	},
	{
		filename: "judges.json",
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
		filename: "1chronicles.json",
		title: "1 Chronicles",
	},
	{
		filename: "2chronicles.json",
		title: "2 Chronicles",
	},
	{
		filename: "1ezra.json",
		title: "1 Ezra (1 Esdras)",
	},
	{
		filename: "2ezra.json",
		title: "2 Ezra (Ezra/2 Esdras)",
	},
	{
		filename: "nehemiah.json",
		title: "Nehemiah",
	},
	{
		filename: "tobit.json",
		title: "Tobit",
	},
	{
		filename: "judith.json",
		title: "Judith",
	},
	{
		filename: "esther.json",
		title: "Esther",
	},
	{
		filename: "1maccabees.json",
		title: "1 Maccabees",
	},
	{
		filename: "2maccabees.json",
		title: "2 Maccabees",
	},
	{
		filename: "3maccabees.json",
		title: "3 Maccabees",
	},
	{
		filename: "4maccabees.json",
		title: "4 Maccabees",
	},
	{
		filename: "psalms.json",
		title: "Psalms",
	},
	{
		filename: "job.json",
		title: "Job",
	},
	{
		filename: "proverbs.json",
		title: "Proverbs",
	},
	{
		filename: "ecclesiastes.json",
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
		filename: "hosea.json",
		title: "Hosea",
	},
	{
		filename: "joel.json",
		title: "Joel",
	},
	{
		filename: "amos.json",
		title: "Amos",
	},
	{
		filename: "obadiah.json",
		title: "Obadiah",
	},
	{
		filename: "jonah.json",
		title: "Jonah",
	},
	{
		filename: "micah.json",
		title: "Micah",
	},
	{
		filename: "nahum.json",
		title: "Nahum",
	},
	{
		filename: "habakkuk.json",
		title: "Habakkuk",
	},
	{
		filename: "zephaniah.json",
		title: "Zephaniah",
	},
	{
		filename: "haggai.json",
		title: "Haggai",
	},
	{
		filename: "zechariah.json",
		title: "Zechariah",
	},
	{
		filename: "malachi.json",
		title: "Malachi",
	},
	{
		filename: "isaiah.json",
		title: "Isaiah",
	},
	{
		filename: "jeremiah.json",
		title: "Jeremiah",
	},
	{
		filename: "lamentations.json",
		title: "Lamentations",
	},
	{
		filename: "epistle.json",
		title: "Epistle of Jeremiah",
	},
	{
		filename: "ezekiel.json",
		title: "Ezekiel",
	},
	{
		filename: "baruch.json",
		title: "Baruch",
	},
	{
		filename: "daniel.json",
		title: "Daniel",
	},
	{
		filename: "matthew.json",
		title: "Matthew",
	},
	{
		filename: "mark.json",
		title: "Mark",
	},
	{
		filename: "luke.json",
		title: "Luke",
	},
	{
		filename: "john.json",
		title: "John",
	},
	{
		filename: "acts.json",
		title: "Acts",
	},
	{
		filename: "romans.json",
		title: "Romans",
	},
	{
		filename: "1corinthians.json",
		title: "1 Corinthians",
	},
	{
		filename: "2corinthians.json",
		title: "2 Corinthians",
	},
	{
		filename: "galatians.json",
		title: "Galatians",
	},
	{
		filename: "ephesians.json",
		title: "Ephesians",
	},
	{
		filename: "philippians.json",
		title: "Philippians",
	},
	{
		filename: "colossians.json",
		title: "Colossians",
	},
	{
		filename: "1thessalonians.json",
		title: "1 Thessalonians",
	},
	{
		filename: "2thessalonians.json",
		title: "2 Thessalonians",
	},
	{
		filename: "1timothy.json",
		title: "1 Timothy",
	},
	{
		filename: "2timothy.json",
		title: "2 Timothy",
	},
	{
		filename: "titus.json",
		title: "Titus",
	},
	{
		filename: "philemon.json",
		title: "Philemon",
	},
	{
		filename: "hebrews.json",
		title: "Hebrews",
	},
	{
		filename: "james.json",
		title: "James",
	},
	{
		filename: "1peter.json",
		title: "1 Peter",
	},
	{
		filename: "2peter.json",
		title: "2 Peter",
	},
	{
		filename: "1john.json",
		title: "1 John",
	},
	{
		filename: "2john.json",
		title: "2 John",
	},
	{
		filename: "3john.json",
		title: "3 John",
	},
	{
		filename: "jude.json",
		title: "Jude",
	},
	{
		filename: "revelation.json",
		title: "Revelation",
	},
];

// Fetches book
async function fetchBook(filename) {
	const resp = await fetch(`/dist/books/${filename}`);

	if (resp.status !== 200) {
		throw new Error("Failed to fetch book, got HTTP status " + resp.status);
	}

	return await resp.json();
}
loadBook("genesis.json");

// Declares verse-by-verse option
let verseByVerse = false;

// Loads the verse container with the current chapter
async function loadChapter(chapterIndex) {
	const chapter = currentBook.chapters[chapterIndex];
	const verses = chapter.verses;

	// Clears verse container for new chapter or book
	vContainer.innerText = "";

	for (const verse of verses) {
		const verseText = document.createElement("span");
		const verseNumber = document.createElement("sup");

		// Verse text classes
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
		// Verse number classes
		verseNumber.classList.add(
			"pr-1",
			"font-semibold",
			"text-gray-800",
			"dark:text-[#d9dde0]"
		);
		verseNumber.innerText = verse.verse;
		vContainer.appendChild(verseText);

		// Toggles verse-by-verse
		verseBtn.onclick = () => {
			verseByVerse = !verseByVerse;
			vContainer.classList.toggle("grid", verseByVerse);

			localStorage.setItem("verseGrid", JSON.stringify(verseByVerse));
		};

		// Red lettering
		if (verse.isRed === true && isRed) {
			verseText.classList.add("text-red-500", "dark:text-red-400");
		}
	}
}

// Call verse by verse
function loadSavedVerseByVerse() {
	const savedVerseByVerse = JSON.parse(localStorage.getItem("verseGrid"));
	if (savedVerseByVerse !== null) {
		verseByVerse = savedVerseByVerse;
		vContainer.classList.toggle("grid", verseByVerse);
	}
}
loadSavedVerseByVerse();

/**
 * Declares red lettering as true by default
 * Saves the state of the red lettering
 */
let isRed = true;
redLetterBtn.onclick = async () => {
	isRed = !isRed;
	await loadChapter(cSelector.value);

	localStorage.setItem("isRed", JSON.stringify(isRed));
};

// Stores red lettering option
async function loadSavedRedLettering() {
	const savedRedLettering = JSON.parse(localStorage.getItem("isRed"));

	isRed = savedRedLettering;
}
loadSavedRedLettering();

// Loads chapters of the selected book
async function loadBook(filename) {
	currentBook = await fetchBook(filename);

	// Store Book info
	localStorage.setItem("currentBook", JSON.stringify(currentBook));
	localStorage.setItem("bTitle", JSON.stringify(currentBook.book));

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
