// const noteMenu = document.getElementById("createNoteMenu");

// const toggleNoteMenu = () => {
// 	console.log("this worked");
// 	noteMenu.classList.toggle("hidden");
// 	noteMenu.classList.toggle("flex");
// };

const toggleNoteMenu = (noteMenuId) => {
	const openMenus = document.querySelectorAll(".noteMenu.flex");

	openMenus.forEach((menu) => {
		if (menu.id !== noteMenuId) {
			console.log("this worked");
			menu.classList.add("hidden");
			menu.classList.remove("flex");
		}
	});

	const noteMenu = document.getElementById(noteMenuId);
	if (noteMenu) {
		console.log("this worked");
		noteMenu.classList.toggle("hidden");
		noteMenu.classList.toggle("flex");
	}
};
