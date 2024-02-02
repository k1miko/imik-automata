/* connecting the keyboard to the text area */
const buttons = document.querySelectorAll('.btn')
const textarea = document.querySelector('textarea')

/* when deleting text from the text area */
const delete_button = document.querySelector('.delete')

/* when putting space in the text area */
const space_button = document.querySelector('.space')

// copying output to clipboard

// for the dropdown function
const dropdowns = document.querySelectorAll('.dropdown-container'),
      inputLangDropdown = document.querySelector('#input-script'),
      outputLangDropdown = document.querySelector('#output-script');

/* empty array, necessary for getting the chars typed in the text area, wherein it splits each character typed into individual characters. Ex., chars = ['A', 'BA'] assuming they r the baybayin script*/
let chars = []

 let selectedBaseChar = '';

/* click event for da script buttons */
// buttons.forEach(btn => {
//     btn.addEventListener('click', () => {
//         const baybayinCharContent = btn.querySelector('.baybayin-char').textContent;
//         textarea.value += baybayinCharContent
//         chars = textarea.value.split('')
//         console.log(chars); // to see if it works go to the console log in the website
//     })
// })


/* click event for da script buttons */
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const baybayinCharElement = btn.querySelector('.baybayin-char');
      const baybayinKudlitElement = btn.querySelector('.baybayin-kudlit');
  
      // Check if the elements are present before accessing textContent
      const baybayinCharContent = baybayinCharElement ? baybayinCharElement.textContent : '';
      const baybayinKudlitContent = baybayinKudlitElement ? baybayinKudlitElement.textContent : '';
  
      textarea.style.fontFamily = "Baybayin";
  
      // If the clicked character is a vowel or there is no kudlit, just display it
      if (['A', 'E', 'I', 'O', 'U'].includes(baybayinCharContent) || !baybayinKudlitElement) {
        textarea.value += baybayinCharContent;
      } else {
        // If the base character is not empty and not a vowel, remove the last vowel
        if (selectedBaseChar && ['e', 'i', 'o', 'u'].includes(baybayinKudlitContent)) {
            textarea.value = textarea.value.slice(0, -1);
        }
  
        // Form a new character
        const newChar = baybayinCharContent + baybayinKudlitContent;

        // Append the new character to the textarea
        textarea.value += newChar;
  
        // Update the selected base character
        selectedBaseChar = baybayinCharContent;
      }
      const modifiedValue = textarea.value.replace(/\|\|/g, ' ');

  
      console.log(modifiedValue); // To see the result in the console log on the website
    });
  });


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
    textarea.value += '||';
    
    // Log the textarea value with '||' replaced by a space
    const modifiedValue = textarea.value.replace(/\|\|/g, ' ');
    console.log(modifiedValue);
});

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

        inputText.value = "";
        outputText.value = "";

        if (inputLangDropdown.querySelector(".selected-script").dataset.value == "byn") {
            inputText.style.fontFamily = "Baybayin";
            inputText.style.fontSize = "40px";
            outputText.style.fontFamily = "";
            outputText.style.fontSize = "";
        }else{
            outputText.style.fontFamily = "Baybayin";
            outputText.style.fontSize = "40px";
            inputText.style.fontFamily = "";
            inputText.style.fontSize = "";
        }
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

            // Clear input and output text
            inputText.value = "";
            outputText.value = "";

            if (item.dataset.value === "byn") {
                inputText.style.fontFamily = "Baybayin";
                inputText.style.fontSize = "40px";
                outputText.style.fontFamily = "";
                outputText.style.fontSize = "";
            }else{
                outputText.style.fontFamily = "Baybayin";
                outputText.style.fontSize = "40px";
                inputText.style.fontFamily = "";
                inputText.style.fontSize = "";
            }
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

            // Clear input and output text
            inputText.value = "";
            outputText.value = "";

            //Make the text field font family changes to baybayin or latin
            if (item.dataset.value === "byn") {
                outputText.style.fontFamily = "Baybayin";
                outputText.style.fontSize = "40px";
                inputText.style.fontFamily = "";
                inputText.style.fontSize = "";
            }else{
                inputText.style.fontFamily = "Baybayin";
                inputText.style.fontSize = "40px";
                outputText.style.fontFamily = "";
                outputText.style.fontSize = "";
            }
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

    const transliterateButton = document.getElementById("transliterate-button");
    const inputText = document.getElementById("input-text");
    const outputText = document.getElementById("output-text");

    transliterateButton.addEventListener("click", () => {
        const inputLangDropdown = document.getElementById("input-script");
        const outputLangDropdown = document.getElementById("output-script");
        
        const inputSelectedValue = inputLangDropdown.querySelector(".selected-script").dataset.value;
        const outputSelectedValue = outputLangDropdown.querySelector(".selected-script").dataset.value;

        const isLatinToBaybayin = (inputSelectedValue === "lat" && outputSelectedValue === "byn");
        const isBaybayinToLatin = (inputSelectedValue === "byn" && outputSelectedValue === "lat");

        if (isLatinToBaybayin || isBaybayinToLatin) {
            const apiEndpoint = isLatinToBaybayin ? '/api/transliterate/latin-to-baybayin' : '/api/transliterate/baybayin-to-latin';

            fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input: inputText.value })
            })
            
            .then(response => response.json())
            .then(data => {
                outputText.value = data.result;
                // Console for output
                let input_str = data.result;
                input_str = input_str.replace(/\|\|/g, ' ').toUpperCase(); // Replace '||' with a space and convert to uppercase
                console.log(input_str);

                // Handle styling based on the result
                if (outputText.value === "Input not available in Baybayin" && isBaybayinToLatin) {
                    outputText.style.fontFamily = "Baybayin";
                    outputText.style.fontSize = "40px";
                    inputText.style.fontFamily = "";
                    inputText.style.fontSize = "";
                } else {
                    outputText.style.color = "";
                    outputText.style.fontFamily = isLatinToBaybayin ? "Baybayin" : "";
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            console.error('Invalid conversion selected');
        }
    });
});

function copyToClipboard() {
    const outputTextElement = document.getElementById('output-text');

    // Create a Range object to select the text content and style
    const range = document.createRange();
    range.selectNode(outputTextElement);

    // Clear any existing selection
    window.getSelection().removeAllRanges();

    // Add the new Range to the selection
    window.getSelection().addRange(range);

    // Copy the selection to the clipboard
    document.execCommand('copy');

    // Remove the Range from the selection
    window.getSelection().removeAllRanges();
}


document.addEventListener('DOMContentLoaded', function () {
    var rulesMenu = document.querySelector('.rules-menu');
    var rulesContent = document.querySelector('.rules-content');
    
    rulesMenu.addEventListener('click', function() {
        var isDisplayed = window.getComputedStyle(rulesContent).display !== 'none';
        rulesContent.style.display = isDisplayed ? 'none' : 'block';
    });
});