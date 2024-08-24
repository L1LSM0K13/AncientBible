const verseBtn = document.getElementById('verseBtn')
const fontSizeElem = document.getElementById('fontSize')
const fontTypeElem = document.getElementById('fontType')

// let isRed = true
let verseByVerse = false

// Grid toggle
verseBtn.addEventListener('click', () => {
	verseByVerse = !verseByVerse
	vCont.classList.toggle('grid', verseByVerse)

	localStorage.setItem('verseByVerse', JSON.stringify(verseByVerse))
})
function loadSavedVerseByVerse() {
	const savedVerseByVerse = JSON.parse(localStorage.getItem('verseByVerse'))
	if (savedVerseByVerse !== null) {
		verseByVerse = savedVerseByVerse
		vCont.classList.toggle('grid', verseByVerse)
	}
}
loadSavedVerseByVerse()

// Font type and size
fontSizeElem.addEventListener('change', () => {
	let selectedFontSize = fontSizeElem.value
	vCont.style.fontSize = selectedFontSize

	localStorage.setItem('fontSize', JSON.stringify(selectedFontSize))
})
fontTypeElem.addEventListener('change', () => {
	let selectedFontType = fontTypeElem.value
	vCont.style.fontFamily = selectedFontType

	localStorage.setItem('fontType', JSON.stringify(selectedFontType))
})
function loadSavedFontOptions() {
	const savedFontType = JSON.parse(localStorage.getItem('fontType'))
	const savedFontSize = JSON.parse(localStorage.getItem('fontSize'))

	if (savedFontSize) {
		vCont.style.fontFamily = savedFontType
	}
	if (savedFontSize) {
		vCont.style.fontSize = savedFontSize
	}
}
loadSavedFontOptions()
