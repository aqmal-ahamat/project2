const productNames= document.querySelectorAll(".product-name");
const productPrices = document.querySelectorAll(".product-price");
const quantityFields = document.getElementsByTagName("input");
const productnames= [];
const productprices= [];
const addToCartButtons = document.querySelectorAll(".cart");
const buyButtons = document.querySelectorAll(".buy");
let orderObject = JSON.parse(localStorage.getItem("cart"));// getting the items which are in the cart already



// adding product names to the productnames array...
productNames.forEach(getProductNames);
function getProductNames(element,index){
    let nameWithQuantity = productNames[index].textContent;
    let lastIndexOfSpace = nameWithQuantity.lastIndexOf(" ");
    let nameWithoutQuantity = nameWithQuantity.slice(0,lastIndexOfSpace)// removing the quanity part from the string

    productnames.push(nameWithoutQuantity);

}

// adding product prices to the productprices array.
productPrices.forEach(getProductPrices)
function getProductPrices(element,index){
    let priceString = productPrices[index].textContent;
    let indexOfspace = priceString.indexOf(" ")
    let priceInt = Number(priceString.slice(indexOfspace+1));// removing the Rs. part from the string
    productprices.push(priceInt)
}



addToCartButtons.forEach(clickCart)
buyButtons.forEach(clickBuy)

window.addEventListener("beforeunload", addToTheCart);


// -----------------------------adding to cart functionality -------------------
function clickCart(element,index){
    element.onclick = cartFunction.bind(this, index,element ); // learn what is bind function what it is..
}


function cartFunction(index, element){
    let quanityOfTheProduct = Number(quantityFields[index].value);
    let NameOfTheProduct = productnames[index]; 
    let PriceOfTheProduct  = productprices[index];

    if(quanityOfTheProduct<=0){
        window.alert(`Product quantity of ${NameOfTheProduct} cannot be empty or less than 1`)
    }
    else if(quanityOfTheProduct>30){
        window.alert(`Maximum order is 30kg. for bulk orders please email us at support@grocies.lk`)
    }else{
        if (orderObject==null){
            orderObject = {}
        }
        orderObject[NameOfTheProduct]=`${quanityOfTheProduct},${PriceOfTheProduct}`
        
        
        element.textContent = "Added";
        
        setTimeout(changeTheText,1500)

        function changeTheText(){
            element.textContent = "Add to cart";
        }







    }
    
}
function clickBuy(element,index){
    element.onclick = buyFunction.bind(this,element,index)

}
function buyFunction(element,index){
    let quanityOfTheProduct = Number(quantityFields[index].value);
    let NameOfTheProduct = productnames[index]; 
    let PriceOfTheProduct  = productprices[index];
    

    if(quanityOfTheProduct==0){
        window.alert(`Product quantity of ${NameOfTheProduct} cannot be 0 or empty`)
    }
    else if(quanityOfTheProduct>30){
        window.alert(`Maximum order is 30kg. for bulk orders please email us at support@grocies.lk`)
    }else{

        let confirmation = window.confirm(`click -Ok- to proceed with buying ${NameOfTheProduct}`)
        if (confirmation){
            buyObject = {

            [NameOfTheProduct] : `${quanityOfTheProduct},${PriceOfTheProduct}`,

            }
            stringBuyObject = JSON.stringify(buyObject)
            localStorage.setItem("buy",stringBuyObject);
            console.log(stringBuyObject)
            window.location.href = "orderpage.html";

        }
        
    }

}



function addToTheCart(){
    let stringOrderObject = JSON.stringify(orderObject);
    localStorage.setItem("cart",stringOrderObject);

}





