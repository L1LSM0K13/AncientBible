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

let currentOpenMenuId = null;

const toggleNoteMenu = (noteMenuId) => {
	// Close the currently open menu if it's not the same as the one being toggled
	if (currentOpenMenuId && currentOpenMenuId !== noteMenuId) {
		const currentOpenMenu = document.getElementById(currentOpenMenuId);
		if (currentOpenMenu) {
			currentOpenMenu.classList.add("hidden");
			currentOpenMenu.classList.remove("flex");
		}
	}

	// Toggle the selected menu
	const noteMenu = document.getElementById(noteMenuId);
	if (noteMenu) {
		noteMenu.classList.toggle("hidden");
		noteMenu.classList.toggle("flex");

		// Update the current open menu ID
		if (noteMenu.classList.contains("flex")) {
			currentOpenMenuId = noteMenuId;
		} else {
			currentOpenMenuId = null;
		}
	} else {
		console.error("Note menu not found for ID:", noteMenuId);
	}
};
