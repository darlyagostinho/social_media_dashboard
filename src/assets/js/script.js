let elm = document.getElementById("theme-mode");
let themeMode = document.querySelector('.mode');

elm.addEventListener('click', function(){
  elm.checked ? themeMode.textContent = 'Light Mode' : themeMode.textContent = 'Dark Mode';
});