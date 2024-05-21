const verseBtn = document.getElementById("verseBtn");
const vContainer = document.getElementById("vContainer");

verseBtn.addEventListener("click", () => {
	vContainer.classList.toggle("grid");
});
