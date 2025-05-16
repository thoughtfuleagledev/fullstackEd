window.onload = function() {
  alert("Welcome to my bio page!");
};

document.querySelector("h1").addEventListener("click", function() {
  this.style.color = "#ff0000";
});

function toggleSkills() {
  const skillsList = document.querySelector("#skillsList");
  skillsList.style.display = skillsList.style.display === "none" ? "block" : "none";
}