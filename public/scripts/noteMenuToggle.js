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


module.exports = {toggleNoteMenu}