// Function declarations
const bList = document.getElementById('book-list')
const cList = document.getElementById('chapter-list')
const vCont = document.getElementById('vCont')
const bTitle = document.getElementById('bookTitle')
const redBtn = document.getElementById('redLetterBtn')

let isRed = JSON.parse(localStorage.getItem('isRed')) || false
/**
 *
 * @param filename {string}
 * @returns {Promise<string>}
 */
// Fetches book from server
async function fetchBook(filename) {
    const resp = await fetch(`../newBooks/${filename}`)
    if (resp.status !== 200) {
        throw new Error('Failed to fetch book, got HTTP status ' + resp.status)
    }
    return await resp.json()
}

/**
 *
 * @param chapters {number}
 * @returns {any}
 */
// Generates chapter options
function generateChapterOptions(chapters) {
    return chapters.map(/** @param chapter {number} @param index {number}  */(chapter, index) => {
        const chapterOption = document.createElement('option')
        chapterOption.innerText = chapter.chapter
        chapterOption.value = index
        return chapterOption
    })
}

/**
 *
 * @param verses {any}
 * @param container {any}
 */
// Loads verses into the container
function loadVerses(verses, container) {
    container.innerText = '' // Clear existing content
    verses.forEach((/** @type {{ isRed: any; id: string; verse: string; text: string; }} */ verse) => {
        const verseText = document.createElement('span')
        const verseNumber = document.createElement('strong')

        if (!isRed && verse.isRed) {
            verseText.classList.toggle("text-red-600")
        }

        // Class list for the elements
        verseText.classList.add('mx-2', 'my-1', 'p-1', 'verse')
        verseNumber.classList.add('p-1')

        verseNumber.id = verse.id
        verseNumber.innerText = verse.verse

        verseText.appendChild(verseNumber)
        verseText.appendChild(document.createTextNode(verse.text))

        container.appendChild(verseText)
    })
}

/**
 *
 * @param filename {string}
 * @returns {Promise<any>}
 */
// Loads book and sets up chapters
async function loadBook(filename) {
    const book = await fetchBook(filename)
    const chapterOptions = generateChapterOptions(book.chapters)

    cList.innerText = '' // Clear existing options
    chapterOptions.forEach(option => cList.appendChild(option))

    // @ts-ignore
    const savedChapter = parseInt(localStorage.getItem(`selectedChapter_${filename}`), 10) || 0
    cList.value = savedChapter

    await loadChapter(book, savedChapter)
}

/**
 *
 * @param book {string}
 * @param chapterIndex {number}
 * @returns {Promise<any>}
 */
// Loads chapter and stores chapter index
async function loadChapter(book, chapterIndex) {
    const filename = bList.value
    const chapter = book.chapters[chapterIndex]
    bTitle.innerText = `Book of ${book.book} - Chapter ${parseInt(chapterIndex) + 1}`

    loadVerses(chapter.verses, vCont)

    localStorage.setItem(`selectedChapter_${filename}`, chapterIndex)
}

/**
 *
 * @returns {Promise<any>}
 */
// Initializes the application
async function main() {

    await loadBook(bList.value)

    redBtn.addEventListener('click', async () => {
        isRed = !isRed
        localStorage.setItem('isRed', JSON.stringify(isRed))
        await loadChapter(await fetchBook(bList.value), cList.value)
    })

    bList.addEventListener('change', async () => {
        localStorage.removeItem(`selectedChapter_${bList.value}`)
        await loadBook(bList.value)
    })
    cList.addEventListener('change', async () => {
        await loadChapter(await fetchBook(bList.value), cList.value)
    })
}

main()
