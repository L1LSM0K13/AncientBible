const toggleBtn = document.getElementById('toggleBtn');
const menuOptions = document.querySelectorAll('.menuOption');

toggleBtn.addEventListener('click', () => {
    menuOptions.forEach((option) => {
        if (option) {
            option.classList.toggle('hidden');
        }
    })
})

