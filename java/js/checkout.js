const placeOrderBtn = document.querySelector('.place-order-btn');
let loader = document.querySelector('.loader');

placeOrderBtn.addEventListener('click', () => {
    let user = getUser();
    let address = getAddress();
    let cart = getCart();
    if(user && address && cart){
        fetch('/order', {
            method: 'post',
            headers: new Headers({'Content-Type' : 'application/json'}),
            body: JSON.stringify({
                order: JSON.stringify(cart),
                email: JSON.parse(sessionStorage.user).email,
                add: address
            })
        })
        .then(res => res.json())
        .then(data => {
            updateDatabase(cart);
            if(data.alert == 'Your order has been placed'){ //---> attention, the string must be equal in server.js <---
                delete localStorage.cart;
                showAlert(data.alert, 'success');
                //loader.style.display = null
                //location.href = '/'; 
            }else{
                showAlert(data.alert);
            }
        })
    }
})

placeOrderBtn.addEventListener('click' , () => {
    let user = getUser();
    let address = getAddress();
})


const getAddress = () =>{
    // validation
    let address = document.querySelector('#address' ).value;
    let street = document.querySelector('#street').value;
    let city= document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let pincode = document.querySelector('#pincode').value;
    let landmark = document.querySelector('#landmark').value;

    
    if(!address.length || !street.length || !city.length || ! state.length ||!pincode.length || ! landmark.length){
        return showAlert('fill all the inputs first');
    } 
    else{
        return { address, street, city, state, pincode, landmark };
    }

}

const getUser = () => {
    //verify login
    let user = JSON.parse(sessionStorage.user || null);
    if(!user){
        return showAlert('Please login to place an order');
    } 
    else{
        return user;
    } 
}

const getCart = () => {

    //verify if there are products to buy
    let cart = JSON.parse(localStorage.cart);
    if(!cart){
        return showAlert('Please add product into the cart');
    }
    else{
        return cart;
    }

}

const updateDatabase = async  (cart) => {
    for (let i=0;i<cart.length;i++) {
        let product=cart[i];
        let product_stock = await getProduct(product.id);
        let remaining_stock = Number(await product_stock.stock)-Number(product.item);
        if(remaining_stock>=0){
            await updateProduct(remaining_stock,product.id);
        }
    }
    
}

const updateProduct = async (remaining_stock,id) => {
    let product = await getProduct(id);
    product.stock= remaining_stock.toString();
    await sendDataCheckout('/add-product', product);
}

const getProduct = (id) => {
    return fetch('/get-products', {
        method: "post",
        headers: new Headers({"Content-Type":"application/json"}),
        body: JSON.stringify({id: id})
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })
}

// send data function
const sendDataCheckout = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    }).then((res) => res.json())
    
}

sendData('/login', {
    email: email.value,
    password: password.value,
})