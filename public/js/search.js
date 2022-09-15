
const searchkey = decodeURI(location.pathname.split('/').pop());
const searchSpanElement = document.querySelector('#search-key');


searchSpanElement.innerHTML = 'Results for search of '+searchkey;

let searchkeys=searchkey.replace(/ /g, '');
searchkeys=searchkeys.toLowerCase();
searchkeys= searchkeys.split(',');


if(searchkeys.length == 1){
    getProducts(searchkey).then(data => createProductCards(data, '.card-container'));
}
else{
    crossSearch(searchkeys);
}

