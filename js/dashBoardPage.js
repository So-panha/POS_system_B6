let instock = document.querySelector('.instock');
let category = document.querySelector('.category');
let soldOut = document.querySelector('.sold-out');
let inCome = document.querySelector('.income');


// Data history
let datahistory = []; 
let dataCategory = []; 
let datas = [];

// Primitive storage
let AllStock = 0;
let AllCategories = 0;
let AllSold = 0;
let AllIncome = 0;

// Get data history of sold
function saveHistoryOfSold() {
    localStorage.setItem('history', JSON.stringify(datahistory));
}

function getTotalPrice() {
    let AllHistory = JSON.parse(localStorage.getItem('history'));
    if (AllHistory != null) {
        datahistory = AllHistory;
        showSoldOut_Income();
    }
}


// Get data categories

  function saveDataStorage() {
    localStorage.setItem('mainData', JSON.stringify(dataCategory));
}

function getDataStorage() {
    let data = JSON.parse(localStorage.getItem('mainData'));
    if (data != null) {
        dataCategory = data;  
        showCategories();
    }
}

// Get data product
function saveLocalStorage() {
    localStorage.setItem('data-list', JSON.stringify(datas));
}

function getDataLocalStorage() {
    let data_list = JSON.parse(localStorage.getItem('data-list'));
    if (data_list != null) {
        datas = data_list;
        showStock();
    }
}



// Show stock
function showStock(){
    for(let data of datas){
        AllStock += Number(data.quantity);
    }
    instock.textContent = AllStock;
}

// Show category
function showCategories(){
    for(let index = 0 ; index < dataCategory.length; index++){
        AllCategories = index + 1;
    }
    category.textContent = AllCategories;
}

// Show Sold out 
function showSoldOut_Income(){
    for(let index = 0 ; index < datahistory.length; index++){
        AllSold += Number(datahistory[index].quantity);
        AllIncome +=  Number(datahistory[index].price.replace('$',''));
    }
    soldOut.textContent = AllSold;
    inCome.textContent = AllIncome + '$';
}

// create teble
function showProduct() {
    // create table tr 
    let tbody = document.querySelector('tbody');
    let tableTR = document.createElement('tr');

    // product ID
    let tdID = document.createElement('td');
    // tdID.textContent =

    // product Name
    let tdName = document.createElement('td');
    // tdName.textContent = 

    // Categoty
    let tdCategoty = document.createElement('td');
    // tdCategory.textContent =

    // price
    let tdPrice = document.createElement('td');
    // tdPrice.textContent =

    // amount
    let tdAmount = document.createElement('td');
    // tdAmount.textContent =

    // sell product
    let tdSell = document.createElement('td');
    let img = document.createElement('img');
    img.src = "../../IMG/image/up-removebg-preview.png";

    tdSell.appendChild(img);
    tableTR.appendChild(tdID);
    tableTR.appendChild(tdName);
    tableTR.appendChild(tdCategoty);
    tableTR.appendChild(tdPrice);
    tableTR.appendChild(tdAmount);
    tableTR.appendChild(tdSell);

    tbody.appendChild(tableTR);
}


// Call data
getTotalPrice();
getDataStorage();
getDataLocalStorage();