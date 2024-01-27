// Define a variable to store the current book
let currentBook = null;

// Function to load a book
async function loadBook(filename) {
  // Load the book here
}

// Function to toggle red lettering for specific chapter and verses
async function toggleRedLettering(chapterIndex, startVerse, endVerse) {
  if (!currentBook) return; // Return if no book is loaded

  const chapter = currentBook.chapters[chapterIndex];
  if (!chapter) return; // Return if the chapter index is invalid

  const chapterToToggle = chapter.verses.slice(startVerse - 1, endVerse); // Extract verses to toggle
  for (const verse of chapterToToggle) {
    const span = document.getElementById(
      `verse_${chapterIndex}_${verse.verse}`
    ); // Get the span element by its ID
    if (span) {
      // Check if the span element exists
      span.classList.toggle("text-red-600");
    }
  }
}

// Function to select a chapter by index
function selectChapterByIndex(index) {
  const chapter = currentBook.chapters[index];
  const verses = chapter.verses;

  vContainer.innerText = "";

  for (const verse of verses) {
    let superscript = document.createElement("sup");
    const spanElem = document.createElement("span");
    const redLetterBtn = document.getElementById("redLetterBtn");
    const verseBtn = document.getElementById("verseBtn");

    // Toggles Red Lettering
    redLetterBtn.onclick = () => {
      toggleRedLettering(index, 1, 48); // Toggle red lettering for Chapter 5 verses 1-48
    };

    spanElem.classList.add("p-1");
    spanElem.appendChild(superscript);
    spanElem.appendChild(document.createTextNode(verse.text));

    superscript.innerText = verse.verse;
    superscript.classList.add("mr-1");

    spanElem.id = `verse_${index}_${verse.verse}`; // Set a unique ID for the span element
    vContainer.appendChild(spanElem);

    verseBtn.onclick = () => {
      vContainer.classList.toggle("grid");
    };
  }
}
