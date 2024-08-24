const verseBtn = document.getElementById('verseBtn')


const fontSizeElem = document.getElementById('fontSize')
const fontTypeElem = document.getElementById('fontType')

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

// Red lettering toggle
// redLetterBtn.addEventListener('click', () => {
// 	isRed = !isRed
// 	const verses = document.querySelectorAll('#vCont span')
//
// 	localStorage.setItem('is_red', JSON.stringify(isRed))
//
// 	verses.forEach((verse) => {
// 		if (verse.classList.contains('text-red-600') && verse.classList.contains('dark:text-red-500')) {
// 			if (isRed) {
// 				if (!verse.classList.contains('text-red-600')) {
// 					verse.classList.add('text-red-600', 'dark:text-red-500')
// 				}
// 			} else {
// 				if (verse.classList.contains('text-red-600')) {
// 					verse.classList.remove('text-red-600', 'dark:text-red-500');
// 				}
// 			}
// 		}
// 	})
// console.log(isRed)
// })
// function loadSavedRedLettering() {
// 	const savedRedLettering = JSON.parse(localStorage.getItem('is_red'))
// 	const verses = document.querySelectorAll('#vCont span')
//
// 	if (savedRedLettering !== null) {
// 		isRed = savedRedLettering
//
// 		verses.forEach((verse) => {
// 			if (isRed) {
// 				// Only add classes if they are not already present
// 				if (!verse.classList.contains('text-red-600')) {
// 					verse.classList.add('text-red-600', 'dark:text-red-500');
// 				}
// 			} else {
// 				// Only remove classes if they are present
// 				if (verse.classList.contains('text-red-600')) {
// 					verse.classList.remove('text-red-600', 'dark:text-red-500');
// 				}
// 			}
// 		})
// 	}
// }
// loadSavedRedLettering()

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
