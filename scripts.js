/* eslint-disable no-plusplus */
const btnAdd = document.querySelector(".btnAdd");
const btnClose = document.querySelector(".btnClose");
const popUpBack = document.querySelector(".popUpBack");
const popUpForm = document.querySelector(".popUpForm");
const btnConfirm = document.querySelector(".btnConfirm");
const cards = document.querySelector(".cards");
const btnGoUp = document.querySelector("#btnGoUp");
const recipientName = document.querySelector(".recipientName");
const imageLink = document.querySelector(".imageLink");
const holidayTypeSelect = document.querySelector(".holiday");

let i = 0;
let j = 0;
let l = 0;
let r = 0;

window.onscroll = function () {
  if (
    document.documentElement.scrollTop > 1500 ||
    document.body.scrollTop > 1500
  ) {
    btnGoUp.classList.add("show");
  } else {
    btnGoUp.classList.remove("show");
  }
};

btnGoUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function openForm() {
  popUpBack.style.display = "block";
  popUpForm.style.display = "block";
  recipientName.value = "";
  imageLink.value = "";
  holidayTypeSelect.value = "";
}

function closeForm() {
  popUpBack.style.display = "none";
  popUpForm.style.display = "none";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeForm();
  }
});

function hideButtons() {
  const cardButtons = document.querySelectorAll(".card .btnCardBottom button");
  cardButtons.forEach((button, index) => {
    if (index === 0 || index === cardButtons.length - 1) {
      button.classList.add("hide-btn");
    } else {
      button.classList.remove("hide-btn");
    }
  });
}

function addNewCard(event) {
  event.preventDefault();
  const div = document.createElement("div");
  div.classList.add("card");
  cards.appendChild(div);
  const html = `
      <div class="btnCardTop">
        <button class="btnStar" id="btnStar-${j}"><span class="fa fa-star"></span></button>
        <button class="btnDelete" id="btnDelete-${i}">x</button>
      </div>
      <div class="cardContent">
        <p class="message">${recipientName.value}</p>
        <img class="image" src="${
          imageLink.value ? imageLink.value : "assets/images/js.png"
        }" alt="Greeting Image">
        <p class="holidayType">${holidayTypeSelect.value}</p>
      </div>
      <div class="btnCardBottom">
        <button class="btnLeft" id="btnLeft-${l}">&#8592</button>
        <button class="btnRight" id="btnRight-${r}">&#8594</button>
      </div>
  `;

  div.insertAdjacentHTML("beforeend", html);

  const btnRight = document.querySelector(`#btnRight-${r}`);
  const btnLeft = document.querySelector(`#btnLeft-${l}`);

  // favorite card
  document
    .querySelector(`#btnStar-${j}`)
    .addEventListener("click", function () {
      const starIcon = this.querySelector(".fa-star");
      if (starIcon.classList.contains("filled")) {
        starIcon.classList.remove("filled");
      } else {
        starIcon.classList.add("filled");
        const card = this.closest(".card");
        cards.insertBefore(card, cards.firstChild);
        cards.prepend(btnAdd);
      }
      hideButtons();
    });

  // deleteCard
  document
    .querySelector(`#btnDelete-${i}`)
    .addEventListener("click", function () {
      const removeCard = this.parentNode;
      div.remove(removeCard);
      hideButtons();
    });

  // previous card
  btnLeft.addEventListener("click", function () {
    const left = this.parentNode.parentNode;
    if (
      left.previousElementSibling &&
      left.previousElementSibling.classList.contains("card")
    ) {
      left.after(left.previousElementSibling);
    }
    hideButtons();
  });

  // next card
  btnRight.addEventListener("click", function () {
    const right = this.parentNode.parentNode;
    if (
      right.nextElementSibling &&
      right.nextElementSibling.classList.contains("card")
    ) {
      right.before(right.nextElementSibling);
    }
    hideButtons();
  });

  i++;
  j++;
  l++;
  r++;

  closeForm();
  hideButtons();
}

btnAdd.addEventListener("click", openForm);
btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  popUpBack.style.display = "none";
  popUpForm.style.display = "none";
});
btnConfirm.addEventListener("click", addNewCard);
popUpBack.addEventListener("click", closeForm);
