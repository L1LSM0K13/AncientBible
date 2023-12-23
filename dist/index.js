'use strict'

// Toggling Parallel Bible
document.getElementById('parallelBtn').addEventListener('click', function() {
  let parallelBlock = document.getElementById('parallelBlock');
  let mainScripture = document.getElementById('mainScripture');

  if (parallelBlock.classList.contains('hidden')) {
    parallelBlock.classList.remove('hidden');
    parallelBlock.classList.add('grid', 'grid-cols-2');
  } else {
    parallelBlock.classList.add('hidden');
    parallelBlock.classList.remove('grid', 'grid-cols-2')
  }
});
