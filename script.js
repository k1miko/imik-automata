/* connecting the keyboard to the text area */
const buttons = document.querySelectorAll('.btn')
const textarea = document.querySelector('textarea')

/* when deleting text from the text area */
const delete_button = document.querySelector('.delete')

/* when putting space in the text area */
const space_button = document.querySelector('.space')

// for the dropdown function
const dropdowns = document.querySelectorAll('.dropdown-container'),
      inputLangDropdown = document.querySelector('#input-script'),
      outputLangDropdown = document.querySelector('#output-script');

/* empty array, necessary for getting the chars typed in the text area, wherein it splits each character typed into individual characters. Ex., chars = ['A', 'BA'] assuming they r the baybayin script*/
let chars = []

/* click event for da script buttons */
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        textarea.value += btn.innerText
        chars = textarea.value.split('')
        console.log(chars); // to see if it works go to the console log in the website
    })
})

/* click event for the delete button */
delete_button.addEventListener('click', () => {
    chars.pop() // if we click the delete button, the last character will be deleted
    textarea.value = chars.join('') // it will update the text area
})

// click event for the space
space_button.addEventListener('click', () => {
    chars.push(' ') // alows the space to be added at the end of the array
    textarea.value = chars.join('')
})

// for the dropdown to function
function populateDropdown(dropdown, options){
    dropdown.querySelector("ul").innerHTML = "";
    options.forEach(option => {
        const li = document.createElement("li");
        const title = option.name + " (" + option.native + ")";
        li.innerHTML = title;
        li.dataset.value = option.code;
        li.classList.add("option")
        dropdown.querySelector("ul").appendChild(li);
    })
}

// for the functionality of the input dropdown
populateDropdown(inputLangDropdown, languages);
populateDropdown(outputLangDropdown, languages);

// when clicking the dropdown
dropdowns.forEach(dropdown => {
    dropdown.addEventListener("click", (e) => {
        dropdown.classList.toggle("active");
    })

    dropdown.querySelectorAll(".option").forEach(item => {
        item.addEventListener("click", (e) => {
            dropdown.querySelectorAll(".option").forEach(item => { // for removing what's currently selected
                item.classList.remove("active");
            })

            // then add or display the selected as the active now
            item.classList.add("active");
            const selected = dropdown.querySelector(".selected-script");
            selected.innerHTML = item.innerHTML;
            selected.dataset.value = item.dataset.value;
        })
})
})

// for the dropdown too hehe
document.addEventListener("click", (e) => {
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    })
})

/* swapping from one script to another
const inputText = document.querySelector("#input-text")
const outputText = document.querySelector("#output-text")
const outputLanguage = inputLangDropdown.querySelector(".selected-script")
const swapButton = document.querySelector(".swap-position")

!! NOTE: Swap button won't be able to work bec
we have yet  to add the transliteration between latin script to baybayin and vice versa 
swapButton.addEventListener("click", (e) => {
    const temp = inputLanguage.innerHTML;
    inputLanguage.innerHTML = outputLanguage.innerHTML;
    outputLanguage.innerHTML = temp;

    const tempValue = inputLanguage.dataset.value
    inputLanguage.dataset.value = outputLanguage.dataset.value
    outputLanguage.dataset.value = tempValue

    const tempInputText = inputTextElem.value
    inputTextElem.value = outputTextElem.value
    outputTextElem.value = tempIntputText
}) !!*/

// for uploading the photo
// for copying the text