
let add = document.querySelector('.click_add')
let keyword = document.querySelector('h2')
let totals = document.querySelector('.total');
let searchId = document.querySelector("#search");
let inputs = document.querySelectorAll('tr input');
let removeButton = document.querySelectorAll('.delete');

// Set product
let product = document.querySelector('.onder_number');
let quantity = document.querySelector('.onder_qty');
let goods = document.querySelector('.show_list_ID .top');

// Create data store
let dataStore = [];



// Get data of localStorage from product
// Set data of localStorage 
function saveLocalStorage() {
    localStorage.setItem('data-list', JSON.stringify(datas));
}
// Get data of localStorage 
function getDataLocalStorage() {
    let data_list = JSON.parse(localStorage.getItem('data-list'));
    if (data_list != null) {
        dataStore = data_list;

    }
}


// Show product
function showProduct(e) {
    let id = e.target.value; 
    for (let data of dataStore) {
        if (id == data.id) {
            goods.firstElementChild.textContent = data.name;
            quantity.firstElementChild.textContent = 'QTY : ' + data.quantity;
            product.firstElementChild.textContent = data.grossPrice + ' $';
        }else if(id.length == 0){
            goods.firstElementChild.textContent =  '';
            quantity.firstElementChild.textContent = '';
            product.firstElementChild.textContent =  '';
        }
    }
}

// Call to data
getDataLocalStorage();

// Add action to element
searchId.addEventListener('input', showProduct);
