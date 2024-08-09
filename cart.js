const EmptymessageSection=document.getElementById("empty-cart");
const CartSection = document.getElementById("cart");
const clearCartButton = document.getElementById("clear-cart");
const purchaseButton = document.getElementById("purchase");
let cartTableBody = document.getElementById("cart-table-body");
let totalSection = document.getElementById("finalTotal");
let ItemsAddedToCart = JSON.parse(localStorage.getItem("cart"));
let addToFavouritesButton = document.getElementById("AddFav");
let applyFavouritesButton = document.getElementById("ApplyFav");
let itemNames=[];
let sum = 0;
let FavFunction = false;



getItemNames();
EmptyMessage();
fillForm();

clearCartButton.onclick = emptyCart;  ``
purchaseButton.onclick = purchase;
addToFavouritesButton.onclick = addFav;
applyFavouritesButton.onclick = applyFav;


function addFav(){
    
    localStorage.setItem("fav",JSON.stringify(ItemsAddedToCart));
    
    
    

}
function applyFav(){
    if (!FavFunction){
        let favourites = JSON.parse(localStorage.getItem("fav"));
        favNames = Object.keys(favourites);
        
        
        for (i=0;i<favNames.length;i++){
            if  (!itemNames.includes(favNames[i])){
                let favItemName = favNames[i]
                let favItemPriceAndQuantity = favourites[favItemName];
                let favItemIndexOfComma = favItemPriceAndQuantity.indexOf(",");
                let favItemPrice = Number(favItemPriceAndQuantity.slice(favItemIndexOfComma+1));
                let favItemQuantity = Number(favItemPriceAndQuantity.slice(0,favItemIndexOfComma));
                if (!Object.keys(ItemsAddedToCart).includes(favItemName)){
                    
                    itemNames.push(favItemName);
                    ItemsAddedToCart[favItemName] = `${favItemQuantity},${favItemPrice}`;
                }
                
                
            }
            
        }
        EmptymessageSection.style = "display:none";
        CartSection.style = "display:block";
        clearCartButton.style = "display:block";
        purchaseButton.style = "display:block";
        addToFavouritesButton.style = "display:block";
        
        fillForm();
        FavFunction = true;
    }    

}




function emptyCart(){
    localStorage.removeItem("cart");
    ItemsAddedToCart= localStorage.getItem("cart");
    ItemsAddedToCart = null;
    ItemsAddedToCart = {}; 
    itemNames.splice(0,itemNames.length);
    cartTableBody.innerHTML = ''
    FavFunction = false;
    
    EmptyMessage();
    
    
}
function EmptyMessage(){
    // this function will display the empty message if no items were added to the cart.
    // and hide the message if any items were added to the cart.
    if (Object.keys(ItemsAddedToCart).length == 0){
        EmptymessageSection.style = "display:block";
        CartSection.style = "display:none";
        clearCartButton.style = "display:none";
        purchaseButton.style = "display:none";
        addToFavouritesButton.style = "display:none";
        

       
    }else{

        EmptymessageSection.style = "display:none";
        CartSection.style = "display:block";
        clearCartButton.style = "display:block";
        purchaseButton.style = "display:block";
        addToFavouritesButton.style = "display:block";

    }
    
      
}

function fillForm(){
    cartTableBody.innerHTML = ""
    sum = 0;
    if(ItemsAddedToCart != null){
        itemNames.forEach(getItemDetails)
        
    }
    
    
    


}
function getItemDetails(element,index){
    let priceAndQuantity = ItemsAddedToCart[element];
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

function purchase(){
    localStorage.setItem("buy",JSON.stringify(ItemsAddedToCart));
    window.location.href = "orderpage.html";
}

function getItemNames(){
    if(ItemsAddedToCart!=null){ //gets the item names only if there are any items that were added to the cart
        itemNames = Object.keys(ItemsAddedToCart)
    }
    else if (ItemsAddedToCart==null){
        ItemsAddedToCart = {}
    }
}