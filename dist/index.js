'use strict'

// Toggling Parallel Bible
document.getElementById('parallelBtn').addEventListener('click', function() {
  let scriptureBlock = document.getElementById('parallelToggle');
  let parallelScripture = document.getElementById('parallelScripture')

  if (scriptureBlock.classList.contains('grid-cols-2')) {
    scriptureBlock.classList.remove('grid-cols-2');
  } else {
    scriptureBlock.classList.add('grid-cols-2');
  };

  if(parallelScripture.classList.contains('hidden')) {
    parallelScripture.classList.remove('hidden');
  } else {
    parallelScripture.classList.add('hidden');
  }
})


// OLD

// document.getElementById('parallelBtn').addEventListener('click', function() {
//   let parallelBlock = document.getElementById('parallelBlock');
//   let mainScripture = document.getElementById('mainScripture');

//   if (parallelBlock.classList.contains('hidden')) {
//     parallelBlock.classList.remove('hidden');
//     parallelBlock.classList.add('grid', 'grid-cols-2');
//   } else {
//     parallelBlock.classList.add('hidden');
//     parallelBlock.classList.remove('grid', 'grid-cols-2')
//   }
// });
