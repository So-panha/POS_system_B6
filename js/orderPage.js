
let add = document.querySelector('.click_add')
let tbody = document.querySelector('tbody')
let inputs = document.querySelectorAll('tr input');
let totals = document.querySelector('.total');
let keyword = document.querySelector('h2')
let searchId = document.querySelector("#search");
let removeButton = document.querySelectorAll('.delete');

// Set product
let goods = document.querySelector('.show_list_ID .top');
let product = document.querySelector('.onder_number');
let quantity = document.querySelector('.onder_qty');

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
        } else if (id.length == 0) {
            goods.firstElementChild.textContent = '';
            quantity.firstElementChild.textContent = '';
            product.firstElementChild.textContent = '';
        }
    }
}

// show on product
function showOnProduct() {
    let tableTR = document.createElement('tr');

    // show id
    let tdID = document.createElement('td');
    tdID.textContent = dataStore.id

    // show name
    let tdName = document.createElement('td');
    tdName.textContent = dataStore.name

    // show input value 
    let tdInput = document.createElement('td');
    let input = document.createElement('input');
    tdInput.appendChild(input)

    //  show price
    let tdPrice = document.createElement('td');
    tdPrice.textContent = dataStore.price

    // create button delete
    let tdDelete = document.createElement('td');
    let img = document.createElement('img');
    img.src = "../../IMG/image/remove.png";

    tdDelete.appendChild(img)
    tableTR.appendChild(tdID);
    tableTR.appendChild(tdName);
    tableTR.appendChild(tdInput);
    tableTR.appendChild(tdPrice);
    tableTR.appendChild(tdDelete);

    tbody.appendChild(tableTR)
}


// Call to data
getDataLocalStorage();

// Add action to element
searchId.addEventListener('input', showProduct);

//pash product
add.addEventListener('click', showOnProduct)