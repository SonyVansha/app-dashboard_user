// add hovered class to selected list item
let list = document.querySelectorAll(".navigation-user li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle-user");
let navigation = document.querySelector(".navigation-user");
let main = document.querySelector(".main-user");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
