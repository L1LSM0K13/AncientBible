// const noteMenu = document.getElementById("createNoteMenu");

// const toggleNoteMenu = () => {
// 	console.log("this worked");
// 	noteMenu.classList.toggle("hidden");
// 	noteMenu.classList.toggle("flex");
// };

const toggleNoteMenu = (noteMenuId) => {
	const noteMenu = document.getElementById(noteMenuId);
	if (noteMenu) {
		console.log("this worked");
		noteMenu.classList.toggle("hidden");
		noteMenu.classList.toggle("flex");
	}
};
