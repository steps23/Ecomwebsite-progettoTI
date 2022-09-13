const setupSlidingEffect = () => {
    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];


    productContainers.forEach((item, i) => {
        let containerDimenstions = item.getBoundingClientRect();
        let containerWidth = containerDimenstions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })

}

// fetch product cards
const getProducts = (tag) => {
    tag=tag.toLowerCase();
    return fetch('/get-products', {
        method: "post",
        headers: new Headers({"Content-Type":"application/json"}),
        body: JSON.stringify({tag: tag})
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })
}

// create product slider
const createProductSlider = (data, parent, title) => {
    let slideContainer = document.querySelector(`${parent}`);
    if (data!='no products') {
        slideContainer.innerHTML += `
        <section class="product">
            <h2 class="product-category">${title}</h2>
            <button class="pre-btn"><img src="../img/arrow.png" alt=""></button>
            <button class="nxt-btn"><img src="../img/arrow.png" alt=""></button>
            ${createProductCards(data)}
        </section> `
        setupSlidingEffect();
    }
    
}

const createProductCards = (data, parent) => {
    // here parent is for search product
    let start = '<div class="product-container"> ';
    let middle = ''; // this will contain card HTML
    let end = '</div>';
    if(data!='no products'){
        for(let i= 0; i < data.length; i++) {
            if (data[i].id != decodeURI(location.pathname.split('/').pop())){
                middle += `
                <div class="product-card">
                    <div class="product-image">
                        <span class="discount-tag">${data[i].discount}% off</span>
                        <img src="${data[i].images[0]}" class="product-thumb" alt="">
                    </div>
                    <div class="product-info" onclick="location.href = '/products/${data[i].id}'">
                        <h2 class="product-brand">${data[i].name}</h2>
                        <p class="product-short-des">${data[i].shortDes}</p>
                        <span class="price">€${data[i].sellPrice}</span> <span
                        class="actual-price">€${data[i].actualPrice}</span>
                    </div>
                </div>
            `
            } 
        }
        if(parent){
            let cardContainer = document.querySelector(parent);
            cardContainer.innerHTML = start + middle + end;
        } else {
            return start + middle + end;
        }
    }
}

const createProductCardsTitle = (data, parent,title) => {
    // here parent is for search product
    let start = `<h2 class="product-category">${title}</h2> <div class="product-container"> `;
    let middle = ''; // this will contain card HTML
    let end = '</div>';
    if(data!='no products'){
        for(let i= 0; i < data.length; i++) {
            if (data[i].id != decodeURI(location.pathname.split('/').pop())){
                middle += `
                <div class="product-card">
                    <div class="product-image">
                        <span class="discount-tag">${data[i].discount}% off</span>
                        <img src="${data[i].images[0]}" class="product-thumb" alt="">
                    </div>
                    <div class="product-info" onclick="location.href = '/products/${data[i].id}'">
                        <h2 class="product-brand">${data[i].name}</h2>
                        <p class="product-short-des">${data[i].shortDes}</p>
                        <span class="price">€${data[i].sellPrice}</span> <span
                        class="actual-price">€${data[i].actualPrice}</span>
                    </div>
                </div>
            `
            } 
        }
        if(parent){
            let cardContainer = document.querySelector(parent);
            cardContainer.innerHTML = start + middle + end;
        } else {
            return start + middle + end;
        }
    }
}

const add_product_to_cart_or_wishlist = (type, product) => {
    let data = JSON.parse(localStorage.getItem(type));
    if(data == null){
        data = [];
    }
    product = {
        item: 1,
        id: product.id,
        stock: product.stock,
        name: product.name,
        sellPrice: product.sellPrice,
        size: size || null,
        shortDes: product.shortDes,
        image: product.images[0]
    }
    if(product.size != null ){
        if (count_stock(data,product)+1 <= product.stock) { //check if you can add the product depending about the stock
            for(let i= 0; i < data.length; i ++){
                if (data[i].id == product.id && data[i].size == product.size)
                {
                    let count_size = Number(data[i].item)+1;
                    product.item=count_size;
                    data.splice(i,1); // the element in position i
                    break;
                }
            }
            data.push(product);
            localStorage.setItem(type, JSON.stringify(data));
            return 'Added';
        }
        else {
            showAlert('Product is out of stock');
            return 'Add to '+type;
        }
    }
    else{
        showAlert('Select a size to add into the '+type);
        return 'Add to '+type;
    }
}


//counts how many products are present in the stock
const count_stock = (data,product) => {
    let count_stock= 0;
    for(let i= 0; i < data.length; i ++){
        if (data[i].id == product.id )
            {
                count_stock += Number(data[i].item);
            }
    }
    return count_stock;
}


// search with multiples keys 
const crossSearch = (list_keys) => {
    getProducts(list_keys[0]).then(data => crossRecursive(data,list_keys));
}

const crossRecursive = (data,list_keys) => {
    if (data != 'no products' ){
        list_keys.forEach((key,k) => {
            data=createCross(data,key); //substitutes the old data with the key for a new and final cross
        })
        data=normalizeData(data);
        createProductCards(data, '.card-container');
        suggestionRecursive(data,list_keys);
    }
    else{
        let prova=[]
        suggestionRecursive(prova,list_keys);
    }
    

}

const createCross = (data,key) => {
    let data2=[];
    data.forEach((item,i) =>{
        item.tags.forEach((tag,t) => {
            if (tag==key){
                data2.push(item);
            }
        })
    })
    return data2;
}


const suggestionRecursive = async (data,list_keys) => {
    let data_suggestion = [];
    data_suggestion= await getDatas(data_suggestion,list_keys);
    data_suggestion= removeDuplicates(data_suggestion,data);
    createProductCardsTitle(normalizeData(data_suggestion),'.card-container2','Suggestion for your search');

}

const getDatas= async (data_suggestion,list_keys) => {
    for (let i=0;i<list_keys.length; i++){
        //console.log(i);
        let products= await getProducts(list_keys[i]);
        {
            if (products !='no products'){
                data_suggestion= await createSuggestions(data_suggestion,products);
            }
        }
    }
    return data_suggestion;
}

const createSuggestions = (data_suggestion,data) => {
    for(let i=0;i<data.length; i++){

        if(!isPresent(data[i],data_suggestion)){ //push the item only when it is not present already
            data_suggestion.push(data[i]);
        }
    }
    return data_suggestion;
}

const isPresent = (element,data) => {
    for (let i=0;i<data.length; i++){
        if (data[i].id == element.id){
            return true;
        }
    }
    return false;
}

const removeDuplicates = (data,data_to_remove) => {
    let result=[]
    for(let i=0;i<data.length; i++){ //check all the suggestion
        if(!isPresent(data[i],data_to_remove)){ //push if a product is not already present in data_to_remove(result of cross search)
            result.push(data[i]);
        }
    }
    return result;
}

const normalizeData =(data) => {
    let str='no products';
    if (data.length <=0){
        data='no products';
    }
    return data;
}
