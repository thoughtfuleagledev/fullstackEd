function toggleSkills() {
  const skillsList = document.querySelector("#skillsList");
  skillsList.style.display = skillsList.style.display === "none" ? "block" : "none";
}

const toggleButton = document.getElementById('toggleMode');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('darkMode');
    toggleButton.textContent = document.body.classList.contains('darkMode') ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});