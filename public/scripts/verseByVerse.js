const verseBtn = document.getElementById("verseBtn");

document.addEventListener("DOMContentLoaded", () => {
	verseBtn.addEventListener("click", () => {
		verseBtn.classList.toggle("grid");
	});
});
