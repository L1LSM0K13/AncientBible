// const noteMenu = document.getElementById("createNoteMenu");

// const toggleNoteMenu = () => {
// 	console.log("this worked");
// 	noteMenu.classList.toggle("hidden");
// 	noteMenu.classList.toggle("flex");
// };

// const toggleNoteMenu = (noteMenuId) => {
// 	const openMenus = document.querySelectorAll(".noteMenu.flex");

// 	openMenus.forEach((menu) => {
// 		if (menu.id !== noteMenuId) {
// 			console.log("this worked");
// 			menu.classList.add("hidden");
// 			menu.classList.remove("flex");
// 		}
// 	});

// 	const noteMenu = document.getElementById(noteMenuId);
// 	if (noteMenu) {
// 		console.log("this worked");
// 		noteMenu.classList.toggle("hidden");
// 		noteMenu.classList.toggle("flex");
// 	}
// };

const toggleNoteMenu = (noteMenuId) => {
	// Close any currently open menus
	const openMenus = document.querySelectorAll(".noteMenu.flex");
	openMenus.forEach((menu) => {
		if (menu.id !== noteMenuId) {
			menu.classList.remove("flex");
			menu.classList.add("hidden");
		}
	});

	// Toggle the selected menu
	const noteMenu = document.getElementById(noteMenuId);
	if (noteMenu) {
		console.log("Toggling menu for:", noteMenuId);
		noteMenu.classList.toggle("hidden");
		noteMenu.classList.toggle("flex");
	} else {
		console.error("Note menu not found for ID:", noteMenuId);
	}
};
