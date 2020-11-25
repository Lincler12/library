const plusButton = document.getElementById('plus');
const myModalElement = document.getElementById('my-modal');
plusButton.addEventListener('click', () => {
    myModalElement.style.display = 'block';
});

const closeModalButton = document.querySelector('div.close');
closeModalButton.addEventListener('click',()=>{
    myModalElement.style.display = 'none';
    resetModalInput();
})

function resetModalInput(){
    const inputTextElements = document.querySelectorAll('input[type="text"]');
    const inputNumberElement = document.querySelector('input[type="number"]');
    Array.from(inputTextElements).forEach(inputTextElement =>{
        inputTextElement.value = '';
    })
    inputNumberElement.value = '';
}
