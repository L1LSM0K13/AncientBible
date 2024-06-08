// const noteMenu = document.getElementById("createNoteMenu");

// const toggleNoteMenu = () => {
// 	console.log("this worked");
// 	noteMenu.classList.toggle("hidden");
// 	noteMenu.classList.toggle("flex");
// };

const toggleNoteMenu = (noteMenuId) => {
	const openMenus = document.querySelectorAll(".noteMenu.flex");
	const noteMenu = document.getElementById(noteMenuId);

	openMenus.forEach((menu) => {
		if (menu.id !== noteMenuId) {
			console.log("this worked");
			menu.classList.toggle("hidden");
			menu.classList.toggle("flex");
		}
	});

	if (noteMenu) {
		console.log("this worked");
		noteMenu.classList.toggle("hidden");
		noteMenu.classList.toggle("flex");
	}
};
