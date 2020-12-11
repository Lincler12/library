const plusButton = document.getElementById("plus");
const myModalElement = document.getElementById("my-modal");

plusButton.addEventListener("click", () => {
  myModalElement.style.display = "block";
});

const closeModalButton = document.querySelector("div.close");
closeModalButton.addEventListener("click", () => {
  myModalElement.style.display = "none";
  resetModalInput();
});

function resetModalInput() {
  const radioButtons = document.querySelectorAll('input[name="read?"]');
  const inputTextElements = document.querySelectorAll('input[type="text"]');
  const inputNumberElement = document.querySelector('input[type="number"]');
  [...inputTextElements].forEach((inputTextElement) => {
    inputTextElement.value = "";
  });
  [...radioButtons].forEach((radioButton) => {
    radioButton.checked = false;
  });
  inputNumberElement.value = "";
}
