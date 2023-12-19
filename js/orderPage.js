
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
let dataOder = [];

// Total of price order
let totalShow = document.querySelector('.total');
let total = 0;
let storeAllPrice = 0;



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


// store goods lists
let goodList = null;
// Show product
function showProduct(e) {
    let id = e.target.value;
    for (let data of dataStore) {
        if (id == data.id) {
            goodList = data;
            goods.firstElementChild.textContent = data.name;
            quantity.firstElementChild.textContent = 'QTY : ' + data.quantity;
            product.firstElementChild.textContent = data.grossPrice + ' $';
            dataOder.push(goodList)
        } else if (id.length == 0) {
            goods.firstElementChild.textContent = '';
            quantity.firstElementChild.textContent = '';
            product.firstElementChild.textContent = '';
        }
    }
}


// // Clear data
// Setup data store list order
function saveListOrder(){
    localStorage.setItem('storeAllPrice',JSON.stringify(storeAllPrice));
}

function getListorder(){
    let AllPrice = JSON.parse(localStorage.getItem('storeAllPrice'));
    if(list_oder != null){
        storeAllPrice = AllPrice;
    }
}


// Show total of goods
function showTotal(cost){
    totalShow.textContent = cost + '$';
}


// Action click price
function clickPrice(e){
    let index = e.target.closest('tr').dataset.index;
    let numbersOfGoods = e.target.value;
    let price = e.target.closest('tr').children[3].textContent.slice(0,-1);
    total += Number(numbersOfGoods*price);
    showTotal(total)
}



// show on product
function showOnProduct() {
    // set condition
    if (goodList != null) {
        console.log(dataOder);
        // Clear product in list
        goods.firstElementChild.textContent = '';
        quantity.firstElementChild.textContent = '';
        product.firstElementChild.textContent = '';
        searchId.value = '';

        // remove tbody
        tbody.remove();
        tbody = document.createElement('tbody');
        document.querySelector('table').appendChild(tbody);
        
    
        for(let index in dataOder){
            let tableTR = document.createElement('tr');
            tableTR.dataset.index = index;
    
            // show id
            let tdID = document.createElement('td');
            tdID.textContent = dataOder[index].id;
    
            // show name
            let tdName = document.createElement('td');
            tdName.textContent = dataOder[index].name;
    
            // show input value 
            let tdInput = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.addEventListener('input',clickPrice)
            tdInput.appendChild(input)
    
            //  show price
            let tdPrice = document.createElement('td');
            tdPrice.textContent = dataOder[index].grossPrice + '$';
    
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
    
            tbody.appendChild(tableTR);
        }

       
    }
}




// Call to data
getDataLocalStorage();
// getListorder();
// Add action to element
searchId.addEventListener('input', showProduct);

//pash product
add.addEventListener('click', showOnProduct)