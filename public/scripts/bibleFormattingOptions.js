const verseBtn = document.getElementById('verseBtn')
const vContainer = document.getElementById('vContainer')
const redLetterBtn = document.getElementById('redLetterBtn')

const fontSizeElem = document.getElementById('fontSize')
const fontTypeElem = document.getElementById('fontType')

let verseByVerse = false
let isRed = true

// Grid toggle
verseBtn.addEventListener('click', () => {
	verseByVerse = !verseByVerse
	vContainer.classList.toggle('grid', verseByVerse)

	localStorage.setItem('verseByVerse', JSON.stringify(verseByVerse))
})

function loadSavedVerseByVerse() {
	const savedVerseByVerse = JSON.parse(localStorage.getItem('verseByVerse'))
	if (savedVerseByVerse !== null) {
		verseByVerse = savedVerseByVerse
		vContainer.classList.toggle('grid', verseByVerse)
	}
}
loadSavedVerseByVerse()

// Red lettering toggle
redLetterBtn.addEventListener('click', () => {
	isRed = !isRed
	const redLettering = document.querySelectorAll('#redLettering')

	localStorage.setItem('is_red', JSON.stringify(isRed))

	redLettering.forEach((redLettering) => {
		if (isRed) {
			redLettering.classList.remove('text-red-600', 'dark:text-red-500')
		} else {
			redLettering.classList.add('text-red-600', 'dark:text-red-500')
		}
	})

})

function loadSavedRedLettering() {
	const savedRedLettering = JSON.parse(localStorage.getItem('is_red'))
	const redLettering = document.querySelectorAll('#redLettering')

	if (savedRedLettering !== null) {
		isRed = savedRedLettering

		redLettering.forEach((redLettering) => {
			if (isRed) {
				redLettering.classList.remove('text-red-600', 'dark:text-red-500')
			} else {
				redLettering.classList.add('text-red-600', 'dark:text-red-500')
			}
		})
	}
}
loadSavedRedLettering()


// Font type and size
fontSizeElem.addEventListener('change', () => {
	let selectedFontSize = fontSizeElem.value
	vContainer.style.fontSize = selectedFontSize

	localStorage.setItem('fontSize', JSON.stringify(selectedFontSize))
})
fontTypeElem.addEventListener('change', () => {
	let selectedFontType = fontTypeElem.value
	vContainer.style.fontFamily = selectedFontType

	localStorage.setItem('fontType', JSON.stringify(selectedFontType))
})

function loadSavedFontOptions() {
	const savedFontType = JSON.parse(localStorage.getItem('fontType'))
	const savedFontSize = JSON.parse(localStorage.getItem('fontSize'))

	if (savedFontSize) {
		vContainer.style.fontFamily = savedFontType
	}
	if (savedFontSize) {
		vContainer.style.fontSize = savedFontSize
	}
}
loadSavedFontOptions()
