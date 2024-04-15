document.addEventListener("DOMContentLoaded", function () {

    //Bootstrap js code of tooltip
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    //Actual code declaring variables
    const form = document.querySelector("form");
    let grossIncome, extraIncome, age, deductions, taxAmount;
    const modal = document.getElementById('resultModal');
    const taxId = document.getElementById('taxAmount');

    //validate function that check user inputs
    function validate(inputID) {
        const input = document.getElementById(inputID);
        const validityState = input.validity;
        const newId = inputID + '-error';
        const errorElement = document.getElementById(newId);
        // if user leaves a field empty
        if (validityState.valueMissing && inputID !== "age") {
            errorElement.setAttribute('data-bs-original-title', 'Please Fill The Details');
            errorElement.classList.remove('d-none');
            return false;
        }
        //if age group is not selected
        else if ((inputID === "age" && input.value === undefined)) {
            errorElement.classList.remove('d-none');
            return false;
        }
        //prompt if age group is selected
        else if ((inputID === "age" && input.value !== undefined)) {
            age = input.value;
            return true;
        }
        //checking whether the input of other fields are numeric and if numeric should not be negative
        else if (/^[0-9,-]+$/.test(input.value) && inputID !== "age") {
            if (input.value.startsWith('-')) {
                errorElement.setAttribute('data-bs-original-title', 'Value Should Be Greater Than 0');
                errorElement.classList.remove('d-none');
                return false;
            }
            //returning green flag and setting up value for correct input 
            else {
                if (inputID === 'gross-income') {
                    grossIncome = parseFloat(input.value.split(",").join(""));
                }
                else if (inputID === 'extra-income') {
                    extraIncome = parseFloat(input.value.split(",").join(""));
                }
                else if (inputID === "deductions") {
                    deductions = parseFloat(input.value.split(",").join(""));
                }
                return true;
            }

        }
        //error if alphanumeric values found
        else {
            errorElement.setAttribute('data-bs-original-title', 'Please Enter Numbers Only');
            errorElement.classList.remove('d-none');
            return false;
        }
    }

    //Tax calculator function
    function taxCalculator() {
        if ([(grossIncome + extraIncome) - deductions] > 800000) {
            const taxableIncome = (grossIncome + extraIncome) - deductions;
            if (age === "40") {
                taxAmount = 0.3 * (taxableIncome - 800000);
            } else if (age === ">=40&<60") {
                taxAmount = 0.4 * (taxableIncome - 800000);
            } else {
                taxAmount = 0.1 * (taxableIncome - 800000);
            }
        }
        else {
            taxAmount = "Same there will be no deductions"
        }
        //modal logic
        taxId.textContent = taxAmount;
        modal.classList.add("show");
        modal.style.display = 'block';
    }

    //Removes error marks when re-submitted
    function errorEliminator(inputID) {
        const newId = inputID + '-error';
        const errorElement = document.getElementById(newId);
        errorElement.classList.add('d-none');
    }

    //Modal close function
    closeModal.addEventListener('click', function () {
        modal.classList.add("hide");
        modal.style.display = 'none';
    });

    //Form listener
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        //Removing error marks when re-submitted
        errorEliminator("gross-income");
        errorEliminator("extra-income");
        errorEliminator("deductions");
        errorEliminator("age");
        //validating every function
        let isGrossIncome = validate("gross-income");
        let isExtraIncome = validate("extra-income");
        let isDeductions = validate("deductions");
        let isAge = validate("age");
        //if validated running Tax function
        if (isGrossIncome && isExtraIncome && isDeductions && isAge) {
            taxCalculator()
        }
    },
        false
    )

})