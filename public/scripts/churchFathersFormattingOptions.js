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
