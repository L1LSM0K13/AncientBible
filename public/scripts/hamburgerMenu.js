const toggleBtn = document.getElementById('toggleBtn');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');
const option5 = document.getElementById('option5');
const option6 = document.getElementById('option6');
const option7 = document.getElementById('option7');

// TODO improve this ungodly code

toggleBtn.addEventListener('click', () => {
    option1.classList.toggle('hidden');
    option2.classList.toggle('hidden');
    option3.classList.toggle('hidden');
    option4.classList.toggle('hidden');
    option5.classList.toggle('hidden');
    option6.classList.toggle('hidden');
    option7.classList.toggle('hidden');
})