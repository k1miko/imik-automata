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
        const baybayinCharContent = btn.querySelector('.baybayin-char').textContent;
        textarea.value += baybayinCharContent
        chars = textarea.value.split('')
        console.log(chars); // to see if it works go to the console log in the website
    })
})

/* click event for the delete button */
delete_button.addEventListener('click', () => {
    chars.pop() // if we click the delete button, the last character will be deleted
    textarea.value = chars.join('') // it will update the text area
})

let holdDeleter;

delete_button.addEventListener('mousedown', () => {
    holdDeleter = setInterval(() => {
        chars.pop(); // Delete the last character
        textarea.value = chars.join(''); // Update the textarea
    }, 100); // Adjust the interval as needed
});

delete_button.addEventListener('mouseup', () => {
    clearInterval(holdDeleter); // Stop the continuous deletion when the button is released
});

// click event for the space
space_button.addEventListener('click', () => {
    chars.push('||') // alows the space to be added at the end of the array
    textarea.value = chars.join('')
})

document.addEventListener("DOMContentLoaded", function() {
    const inputLangDropdown = document.getElementById("input-script");
    const outputLangDropdown = document.getElementById("output-script");
    const inputText = document.getElementById("input-text");
    const outputText = document.getElementById("output-text");
    const swapButton = document.querySelector(".swap-position");

    // Populate dropdowns with language options
    populateDropdown(inputLangDropdown, languages);
    populateDropdown(outputLangDropdown, languages);

    const inputDropdownOptions = inputLangDropdown.querySelectorAll(".option");
    const outputDropdownOptions = outputLangDropdown.querySelectorAll(".option");

    // Function to deactivate all options in a dropdown
    function deactivateOptions(dropdownOptions) {
        dropdownOptions.forEach(option => {
            option.classList.remove("active");
        });
    }

    // Function to swap input and output dropdowns
    function swapDropdowns() {
        // Swap dropdown values
        const tempValue = inputLangDropdown.querySelector(".selected-script").dataset.value;
        inputLangDropdown.querySelector(".selected-script").dataset.value = outputLangDropdown.querySelector(".selected-script").dataset.value;
        outputLangDropdown.querySelector(".selected-script").dataset.value = tempValue;

        // Swap dropdown states
        const tempInnerHTML = inputLangDropdown.querySelector(".selected-script").innerHTML;
        inputLangDropdown.querySelector(".selected-script").innerHTML = outputLangDropdown.querySelector(".selected-script").innerHTML;
        outputLangDropdown.querySelector(".selected-script").innerHTML = tempInnerHTML;

        // Swap active values
        const tempActiveValue = inputLangDropdown.querySelector(".option.active").dataset.value;
        inputLangDropdown.querySelector(".option.active").classList.remove("active");
        outputLangDropdown.querySelector(`.option[data-value="${tempValue}"]`).classList.add("active");

        outputLangDropdown.querySelector(".option.active").classList.remove("active");
        inputLangDropdown.querySelector(`.option[data-value="${tempActiveValue}"]`).classList.add("active");

        // Swap input and output text
        const tempText = inputText.value;
        inputText.value = outputText.value;
        outputText.value = tempText;
    }

    swapButton.addEventListener("click", () => {
        swapDropdowns();
    });

    inputLangDropdown.addEventListener("click", () => {
        inputLangDropdown.classList.toggle("active");
    });

    inputDropdownOptions.forEach(item => {
        item.addEventListener("click", () => {
            deactivateOptions(inputDropdownOptions);
            item.classList.add("active");

            const selected = inputLangDropdown.querySelector(".selected-script");
            selected.innerHTML = item.innerHTML;
            selected.dataset.value = item.dataset.value;

            // Find the corresponding option in the output dropdown
            const outputOption = outputLangDropdown.querySelector(`.option[data-value="${item.dataset.value === "lat" ? "byn" : "lat"}"]`);
            deactivateOptions(outputDropdownOptions);
            outputOption.classList.add("active");

            const outputSelected = outputLangDropdown.querySelector(".selected-script");
            outputSelected.innerHTML = outputOption.innerHTML;
            outputSelected.dataset.value = outputOption.dataset.value;
        });
    });

    outputLangDropdown.addEventListener("click", () => {
        outputLangDropdown.classList.toggle("active");
    });

    outputDropdownOptions.forEach(item => {
        item.addEventListener("click", () => {
            deactivateOptions(outputDropdownOptions);
            item.classList.add("active");

            const selected = outputLangDropdown.querySelector(".selected-script");
            selected.innerHTML = item.innerHTML;
            selected.dataset.value = item.dataset.value;

            // Find the corresponding option in the input dropdown
            const inputOption = inputLangDropdown.querySelector(`.option[data-value="${item.dataset.value === "lat" ? "byn" : "lat"}"]`);
            deactivateOptions(inputDropdownOptions);
            inputOption.classList.add("active");

            const inputSelected = inputLangDropdown.querySelector(".selected-script");
            inputSelected.innerHTML = inputOption.innerHTML;
            inputSelected.dataset.value = inputOption.dataset.value;
        });
    });
});

// Function to populate the dropdown with language options
function populateDropdown(dropdown, languages) {
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    languages.forEach(language => {
        const option = document.createElement("li");
        option.classList.add("option");
        option.dataset.value = language.code;
        option.textContent = language.name;
        dropdownMenu.appendChild(option);
    });
}



document.addEventListener("DOMContentLoaded", function() {
    // Set the placeholder text in its original case
    var placeholderText = "Enter Latin Script text here...";
    document.getElementById("input-text").setAttribute("placeholder", placeholderText);
});

document.addEventListener("DOMContentLoaded", function () {
    var baybayinKeyboard = document.querySelector('.card-baybayin-keyboard');
    var toggleButton = document.getElementById('keyboard-display');

    // Add click event listener to the toggle button
    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            // Toggle the visibility of the keyboard by adding/removing the 'visible' class
            baybayinKeyboard.classList.toggle('visible');
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Your existing script code

    const transliterateButton = document.getElementById("transliterate-button");

    transliterateButton.addEventListener("click", () => {
        const inputLangDropdown = document.getElementById("input-script");
        const outputLangDropdown = document.getElementById("output-script");
        
        const inputSelectedValue = inputLangDropdown.querySelector(".selected-script").dataset.value;
        const outputSelectedValue = outputLangDropdown.querySelector(".selected-script").dataset.value;

        console.log("Input Script:", inputSelectedValue);
        console.log("Output Script:", outputSelectedValue);

        // Add your transliteration logic here based on the selected values
    });
});


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