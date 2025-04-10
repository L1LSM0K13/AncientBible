// Function declarations
// const {toggleNoteMenu} = require("./noteMenuToggle");
const bList = document.getElementById('book-list')
const cList = document.getElementById('chapter-list')
const vCont = document.getElementById('vCont')
const bTitle = document.getElementById('bookTitle')
const bTitle2 = document.getElementById('bookTitle2')
const redBtn = document.getElementById('redLetterBtn')
const numberBtn = document.getElementById('numberBtn')
const nextChapterBtn = document.getElementById('nextChapterBtn1')
const prevChapterBtn = document.getElementById('prevChapterBtn1')

const nextChapterBtn2 = document.getElementById('nextChapterBtn2')
const prevChapterBtn2 = document.getElementById('prevChapterBtn2')


let isRed = JSON.parse(localStorage.getItem('isRed')) || false
let verseNumberShown = JSON.parse(localStorage.getItem('verseNumberShown')) || false

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
        if (!verseNumberShown) {
            verseNumber.classList.toggle("hidden")
        }

        verseNumber.classList.add('p-1')
        verseNumber.innerText = verse.verse

        verseText.id = verse.id
        verseText.classList.add('my-2', 'mx-2', 'verse', 'break-word')
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
    bTitle2.innerText = `Book of ${book.book} - Chapter ${parseInt(chapterIndex) + 1}`

    loadVerses(chapter.verses, vCont)

    localStorage.setItem(`selectedChapter_${filename}`, chapterIndex)
}


/**
 *
 * @returns {Promise<any>}
 */
// Initializes the application
async function main() {

    function nextChapter(chapter, length) {
        const next = parseInt(chapter) + 1
        return next < length ? next : null
    }
    function prevChapter(chapter) {
        const prev = parseInt(chapter) - 1
        return prev >= 0 ? prev : null // Return null if it's the first chapter
    }
    nextChapterBtn.addEventListener('click', async () => {
        const currentChapter = parseInt(cList.value)
        const book = await fetchBook(bList.value)

        const newChapter = nextChapter(currentChapter, book.chapters.length)

        if (newChapter !== null) {
            cList.value = newChapter
            await loadChapter(book, newChapter)
        } else {
            const currentBook = parseInt(bList.selectedIndex)
            const nextBook = currentBook + 1

            if (nextBook < bList.options.length) {
                bList.selectedIndex = nextBook
                await loadBook(bList.value)
            }
        }

    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1);

    })
    prevChapterBtn.addEventListener('click', async () => {
        const currentChapter = parseInt(cList.value)
        const currentBookIndex = bList.selectedIndex

        // Get the current book
        const book = await fetchBook(bList.value)

        const prevChap = prevChapter(currentChapter)

        if (prevChap !== null) {
            // If it's not the first chapter, load the previous chapter
            cList.value = prevChap // Update the selected option in the dropdown
            await loadChapter(book, prevChap)
        } else if (currentBookIndex > 0) {
            // If it's the first chapter, go to the previous book
            const prevBookIndex = currentBookIndex - 1
            bList.selectedIndex = prevBookIndex

            // Load the previous book
            const prevBook = await fetchBook(bList.value)
            const lastChapterIndex = prevBook.chapters.length - 1 // Get the last chapter of the previous book

            // Clear and reload the chapter list for the new book
            cList.innerText = '' // Clear old chapter options
            const chapterOptions = generateChapterOptions(prevBook.chapters)
            chapterOptions.forEach(option => cList.appendChild(option))

            // Set the last chapter as the current chapter in the dropdown
            cList.value = lastChapterIndex

            // Load the last chapter of the previous book
            await loadChapter(prevBook, lastChapterIndex)
        }

    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1);

    })
    nextChapterBtn2.addEventListener('click', async () => {
        const currentChapter = parseInt(cList.value)
        const book = await fetchBook(bList.value)

        const newChapter = nextChapter(currentChapter, book.chapters.length)

        if (newChapter !== null) {
            cList.value = newChapter
            await loadChapter(book, newChapter)
        } else {
            const currentBook = parseInt(bList.selectedIndex)
            const nextBook = currentBook + 1

            if (nextBook < bList.options.length) {
                bList.selectedIndex = nextBook
                await loadBook(bList.value)
            }
        }

    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1);

    })
    prevChapterBtn2.addEventListener('click', async () => {
        const currentChapter = parseInt(cList.value)
        const currentBookIndex = bList.selectedIndex

        // Get the current book
        const book = await fetchBook(bList.value)

        const prevChap = prevChapter(currentChapter)

        if (prevChap !== null) {
            // If it's not the first chapter, load the previous chapter
            cList.value = prevChap // Update the selected option in the dropdown
            await loadChapter(book, prevChap)
        } else if (currentBookIndex > 0) {
            // If it's the first chapter, go to the previous book
            const prevBookIndex = currentBookIndex - 1
            bList.selectedIndex = prevBookIndex

            // Load the previous book
            const prevBook = await fetchBook(bList.value)
            const lastChapterIndex = prevBook.chapters.length - 1 // Get the last chapter of the previous book

            // Clear and reload the chapter list for the new book
            cList.innerText = '' // Clear old chapter options
            const chapterOptions = generateChapterOptions(prevBook.chapters)
            chapterOptions.forEach(option => cList.appendChild(option))

            // Set the last chapter as the current chapter in the dropdown
            cList.value = lastChapterIndex

            // Load the last chapter of the previous book
            await loadChapter(prevBook, lastChapterIndex)
        }

    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1);

    })

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

    numberBtn.addEventListener('click', async () => {
        verseNumberShown = !verseNumberShown
        localStorage.setItem('verseNumberShown', JSON.stringify(verseNumberShown))
        await loadChapter(await fetchBook(bList.value), cList.value)
    })
}

main()
