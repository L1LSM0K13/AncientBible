"use strict";

// Dark mode toggle declarations
const sunEnabledIcon = document.querySelector(".sunEnabled");
const sunDisabledIcon = document.querySelector(".sunDisabled");

// Local storage
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Toggles icon mode
const iconToggle = () => {
	sunDisabledIcon.classList.toggle("hidden");
	sunEnabledIcon.classList.toggle("hidden");
};

// Checks for theme on system or browser
function themeCheck() {
	if (userTheme === "dark" || !(userTheme && systemTheme)) {
		document.documentElement.classList.add("dark");
		sunDisabledIcon.classList.add("hidden");
		return;
	} else {
		sunEnabledIcon.classList.add("hidden");
	}
}

// Switches theme
function themeSwtich() {
	if (document.documentElement.classList.contains("dark")) {
		document.documentElement.classList.remove("dark");
		localStorage.setItem("theme", "light");
		iconToggle();
		return;
	} else {
		document.documentElement.classList.add("dark");
		localStorage.setItem("theme", "dark");
		iconToggle();
	}
}

// Click Events
sunEnabledIcon.onclick = () => {
	themeSwtich();
};
sunDisabledIcon.onclick = () => {
	themeSwtich();
};
themeCheck();
