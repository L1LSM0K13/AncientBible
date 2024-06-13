function getVerseId(id) {
	document.getElementById("<%= book.id %>").value = id;
}

document.addEventListener("click", () => {
	getVerseId("<%= book.id %>");
});
