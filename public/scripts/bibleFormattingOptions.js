const verseBtn = document.getElementById("verseBtn");
const vContainer = document.getElementById("vContainer");

verseBtn.addEventListener("click", () => {
	vContainer.classList.toggle("grid");
});

// const redLetterBtn = document.getElementById("redLetterBtn");
// const redLettering = document.getElementById("redLettering");

// redLetterBtn.addEventListener("click", () => {
// 	redLettering.classList.toggle("text-2xl");
// 	console.log("worked");
// });

document.getElementById("redLetterBtn").addEventListener("click", async () => {
	const res = await fetch("/is_red", {
		method: "POST",
	});
	const result = await res.json();
	if (result.success) {
		location.reload();
	}
});
