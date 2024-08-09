ItemDetails = JSON.parse(localStorage.getItem("buy"));
ItemnNames = Object.keys(ItemDetails);
let CartSection = document.getElementById("cart");
let cartTableBody = document.getElementById("cart-table-body");
let totalSection = document.getElementById("finalTotal");
let orderForm = document.getElementById("order-form");
let message = document.getElementById("message");

let firstName = document.getElementById("first_name");
let lastName = document.getElementById("Last_name");
let mobileNumber = document.getElementById("mob-no");
let email = document.getElementById("email");
let streetAddress = document.getElementById("st-add");
let city = document.getElementById("city");
let province = document.getElementById("province");

let cardPayment = document.getElementById("card");
let kokoPayment = document.getElementById("pay-later");
let codPayment = document.getElementById("cod");

let orderButton = document.getElementById("order-button-op");
let orderform = document.getElementById("order-form");

let sum = 0;

fillForm();
message.style = "display:none";

// Event listener for the form's submit event
orderForm.addEventListener("submit", function(event) {
    // Perform custom validation before allowing the form to submit
    if (!validatePaymentMethod() || !customFieldValidation()) {
        event.preventDefault(); // Prevent form submission if custom validation fails
    } else {
        event.preventDefault(); // Prevent form submission after successful validation
        orderDetails(); // Show the thank you message
    }
});

function fillForm() {
    if (ItemDetails != null) {
        ItemnNames.forEach(getItemDetails);
    }
}

function getItemDetails(element, index) {
    let priceAndQuantity = ItemDetails[element];
    let indexOfComma = priceAndQuantity.indexOf(",");
    let name = element;
    let price = Number(priceAndQuantity.slice(indexOfComma + 1));
    let quantity = Number(priceAndQuantity.slice(0, indexOfComma));
    let total = price * quantity;
    sum += total;
    
    cartTableBody.innerHTML = `
    ${cartTableBody.innerHTML}
    <tr>
        <td>${name}</td>
        <td>${quantity}</td>
        <td>${price}</td>
        <td>${total}</td>
    </tr>`;
    totalSection.innerHTML = sum;
}

// Function to validate payment method selection
function validatePaymentMethod() {
    const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
    let isOptionSelected = false;
    
    paymentOptions.forEach(option => {
        if (option.checked) {
            isOptionSelected = true;
        }
    });

    if (!isOptionSelected) {
        alert('Please select a payment method before proceeding.');
    }

    return isOptionSelected;
}

// Custom validation for specific fields
function customFieldValidation() {
    let error = false;

    // Validate that certain fields do not contain numbers or letters as required
    if (checkAnyNumbers(firstName)) error = true;
    if (checkAnyNumbers(lastName)) error = true;
    if (checkAnyNumbers(city)) error = true;
    if (checkAnyNumbers(province)) error = true;
    if (checkAnyLetters(mobileNumber)) error = true;
    if (!validateMobileNumberLength(mobileNumber)) error = true;
    if (!validateEmail(email)) error = true;

    return !error; // Return true if there are no errors, false otherwise
}

// Function to check if a field contains numbers
function checkAnyNumbers(input) {
    let string = input.value;
    let hasNumbers = /\d/.test(string); // Regex to check for any digit

    if (hasNumbers) {
        alert(`The field "${input.previousElementSibling.innerText}" cannot contain numbers.`);
    }

    return hasNumbers;
}

// Function to check if a field contains letters
function checkAnyLetters(input) {
    let string = input.value;
    let hasLetters = /[a-zA-Z]/.test(string); 

    if (hasLetters) {
        alert(`The field "${input.previousElementSibling.innerText}" cannot contain letters.`);
    }

    return hasLetters;
}

// Function to validate mobile number length
function validateMobileNumberLength(input) {
    let string = input.value;
    if (string.length !== 10) {
        alert('The mobile number must be exactly 10 digits long.');
        return false;
    }
    return true;
}

// Function to validate email contains an @ sign
function validateEmail(input) {
    let string = input.value;
    if (!string.includes('@')) {
        alert('The email address must contain an "@" sign.');
        return false;
    }
    return true;
}

// Function to display order details and thank you message
function orderDetails() {
    let date = new Date();
    date.setDate(date.getDate()+2)
    // the delivery date is 2 days after the user placed an order.
    // the above code will automatically adjust the day year and month if the date is in the next month or next year.
    
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear()
    let deliveryDate = `${day} / ${month} / ${year}`


    message.style = "display:block";
    orderForm.style = "display:none"
    CartSection.style = "display:none"
    message.innerHTML = `<h2>Thank you for your order, ${firstName.value}!</h2>
    <p>Your order total is ${sum} and will be delivered to ${streetAddress.value}, ${city.value}, ${province.value}. On the date of ${deliveryDate}</p>`;
}
