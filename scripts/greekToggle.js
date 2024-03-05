"use strict";
const greekBtn = document.getElementById("greekBtn");
const greekVersesContainer = document.getElementById("greekVerseContainer");
const doubleContainer = document.getElementById("doubleContainer");
const verseContainer = document.getElementById("verseContainer");

greekBtn.onclick = () => {
	if (doubleContainer.classList.contains("grid")) {
		doubleContainer.classList.remove("grid");
		greekVersesContainer.classList.add("hidden");
	} else {
		doubleContainer.classList.add("grid");
		greekVersesContainer.classList.remove("hidden");
	}
};
