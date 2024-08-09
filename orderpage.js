ItemDetails = JSON.parse(localStorage.getItem("buy"));
ItemnNames = Object.keys(ItemDetails);
let CartSection = document.getElementById("cart")
let cartTableBody = document.getElementById("cart-table-body");
let totalSection = document.getElementById("finalTotal");
let orderForm = document.getElementById("order-form");
let message = document.getElementById("message");


let firstName = document.getElementById("first_name");
let lastName = document.getElementById("Last_name");
let mobileNumber = document.getElementById("mob-no");
let email = document.getElementById("email");
let streetAddress  = document.getElementById("st-add");
let city = document.getElementById("city");
let province = document.getElementById("province");

let cardPayment = document.getElementById("card");
let kokoPayment = document.getElementById("pay-later");
let codPayment = document.getElementById("cod");

let orderButton = document.getElementById("order-button-op");
let orderform = document.getElementById("order-form")

let sum = 0;
numbers = [0,1,2,3,4,5,6,7,8,9];





fillForm();
message.style = "display:none"
orderButton.addEventListener("click",order);


function fillForm(){
    if(ItemDetails != null){
        ItemnNames.forEach(getItemDetails)
        
    }
}

function getItemDetails(element,index){
    let priceAndQuantity = ItemDetails[element];
    let indexOfComma = priceAndQuantity.indexOf(",")
    let name = element;
    let price = Number(priceAndQuantity.slice(indexOfComma+1))
    let quanity = Number(priceAndQuantity.slice(0,indexOfComma))
    let total = price * quanity
    sum +=total;
    
    
    cartTableBody.innerHTML =`
    ${cartTableBody.innerHTML}
    <tr>
    <td>${name}</td>
    <td>${quanity}</td>
    <td>${price}</td>
    <td>${total}</td>

    
    </tr>
    
    `
    totalSection.innerHTML = sum;


}




function order(event){
    
    checkAnyNumbers(firstName)
    checkAnyNumbers(lastName)
    checkAnyNumbers(city)
    checkAnyNumbers(province)
    checkAnyLetters(mobileNumber)

    
    orderDetails()
    
  
}



function checkAnyNumbers(input){
    let errorMessage = false
    string = input.value;

    for (let i=0;i<string.length;i++){
        for(let j=0;j<numbers.length;j++){
            
            if(string[i]==numbers[j]){
                errorMessage = true;
              
            }
        }
    }
    if(errorMessage){
        window.alert(`Input fields (except mobile number and email) cannot have any numbers`);
    }

}
function checkAnyLetters(input){
    let errorMessage = false
    string = input.value;

    for (let i=0;i<string.length;i++){
        let isNum  = false
        for(let j=0;j<numbers.length;j++){
            
            if(string[i]==numbers[j]){
                isNum = true;
            }
        }
        if(!isNum){
            errorMessage = true;
        }
    }
    if(errorMessage){
        window.alert(`Mobile number should only have numbers, cannot have any letters`);
    }

}



function orderDetails(){
    let date = new Date();
    date.setDate(date.getDate()+2)
    // the delivery date is 2 days after the user placed an order.
    // the above code will automatically adjust the day year and month if the date is in the next month or next year.
    
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear()
    let deliveryDate = `${day} / ${month} / ${year}`




    message.style = "display:block";
    message.innerHTML = `
    <h1>Thank You</h1>
    <h3>Dear ${firstName.value} ${lastName.value},<br>Your order will be delivered on ${deliveryDate}. to the address of ${streetAddress.value}, ${city.value}, ${province.value}</h3>

    `
    orderForm.style = "display:none"
    CartSection.style = "display:none"
    
    
    
  

}