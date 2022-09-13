const link_key = window.location.href.split('=').pop();
const searchSpanElement = document.querySelector('#link-key');

searchSpanElement.innerHTML = link_key;

let link_keys=link_key.replace(/ /g, '');
link_keys= link_keys.split(',');


if(link_keys.length == 1){
    getProducts(link_key).then(data => createProductCards(data, '.card-container'));
}
else{
    crossSearch(link_keys);
}
