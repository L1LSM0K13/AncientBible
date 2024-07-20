"use strict";

const verseBtn = document.getElementById("verseBtn");
const vContainer = document.getElementById("vContainer");
const redLetterBtn = document.getElementById("redLetterBtn");

let verseByVerse = false;
let isRed = true;

// Grid toggle
verseBtn.addEventListener("click", () => {
	verseByVerse = !verseByVerse;
	vContainer.classList.toggle("grid", verseByVerse);

	localStorage.setItem('verseByVerse', JSON.stringify(verseByVerse));
});

function loadSavedVerseByVerse() {
	const savedVerseByVerse = JSON.parse(localStorage.getItem("verseByVerse"));
	if (savedVerseByVerse !== null) {
		verseByVerse = savedVerseByVerse;
		vContainer.classList.toggle("grid", verseByVerse);
	}
}
loadSavedVerseByVerse()

// Red lettering toggle
redLetterBtn.addEventListener("click", () => {
	const redLettering = document.querySelectorAll("#redLettering");

	isRed = !isRed;

	redLettering.forEach((redLettering) => {
		if (redLettering.classList.contains("dark:text-red-500" && "text-red-600")) {
			redLettering.classList.remove("text-red-600", "dark:text-red-500");
		} else {
			redLettering.classList.add("text-red-600", "dark:text-red-500");
		}
	})

	localStorage.setItem('isRed', JSON.stringify(isRed));
})

// TODO
async function loadSavedRedLettering() {
	const savedRedLettering = JSON.parse(localStorage.getItem("isRed"));

	isRed = savedRedLettering;
}
loadSavedRedLettering()