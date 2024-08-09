const favButtons = document.querySelectorAll(".fav");
const products = document.querySelectorAll(".product-name");
const productnames= [];
const productprices= [];

// adding product names to the productnames array...
products.forEach(getProductNames);
function getProductNames(element,index){

    productnames.push(products[index].textContent);

}


// -----------------------------adding favourites functionality -------------------
favButtons.forEach(addOnClick)
function addOnClick(element,index){
    element.onclick = favFunction.bind(this, index ); // learn what is bind function what it is..
}


function favFunction(index){
    let NameOfFavProduct = productnames[index]; 
    console.log(NameOfFavProduct);
}





