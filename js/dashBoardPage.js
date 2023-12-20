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


// Data list top 
let storeData = [];
let topProduct = [];
let rowTopProducts = [];

// Get data history of sold
function saveHistoryOfSold() {
    localStorage.setItem('history', JSON.stringify(datahistory));
}

function getTotalPrice() {
    let AllHistory = JSON.parse(localStorage.getItem('history'));
    if (AllHistory != null) {
        datahistory = AllHistory;
        showSoldOut_Income();
        showProduct();
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
function showStock() {
    for (let data of datas) {
        AllStock += Number(data.quantity);
    }
    instock.textContent = AllStock;
}

// Show category
function showCategories() {
    for (let index = 0; index < dataCategory.length; index++) {
        AllCategories = index + 1;
    }
    category.textContent = AllCategories;
}

// Show Sold out 
function showSoldOut_Income() {
    for (let index = 0; index < datahistory.length; index++) {
        AllSold += Number(datahistory[index].quantity);
        AllIncome += Number(datahistory[index].price.replace('$', ''));
    }
    soldOut.textContent = AllSold;
    inCome.textContent = AllIncome + '$';
}


// create teble of top 5 product lists
function showProduct() {
    // Find max product
    for (let data of datas) {
        let findCategory = 0;
        for (let product of datahistory) {
            // Get data from datas
            let goodsInstock = data.name.toLowerCase();
            let goodsHadSold = product.name.toLowerCase();
            // Give condition 
            if (goodsInstock.includes(goodsHadSold) == true) {
                findCategory += Number(product.quantity);
            }
        }

        let object = {};
        object.id = data.id;
        object.name = data.name;
        object.category = data.category;
        object.price = data.grossPrice;
        object.amount = findCategory;
        storeData.push(object);
        rowTopProducts.push(object);
    }
    // Compare data
    let compareData = storeData;
    let maxArr = [];
    for (let index = 0; index < 5; index++) {
        if (index + 1 <= compareData.length) {
            // Set max price
            let getIndex = 0;
            let max = compareData[0].amount;
            for (let index = 0; index < compareData.length; index++) {
                // determine condition
                if (max < compareData[index].amount) {
                    max = compareData[index].amount;
                    getIndex = index;
                }
            }
            // Push amount 
            maxArr.push(max);
            compareData.splice(getIndex, 1);
            // Get last amount
            if (index + 1 == storeData.length) {
                maxArr.push(storeData[index].amount);
            }
        }
    }
    // Get product by price
    for (let index = 0; index < maxArr.length; index++) {
        for (let data of rowTopProducts) {
            // Set condition
            if (maxArr[index] == data.amount) {
                topProduct.push(data);
            }
        }
    }

    // Create table top lists
    for (let product of topProduct) {
        // create table tr 
        let tbody = document.querySelector('tbody');
        let tableTR = document.createElement('tr');

        // product ID
        let tdID = document.createElement('td');
        tdID.textContent = product.id;

        // product Name
        let tdName = document.createElement('td');
        tdName.textContent = product.name;

        // Categoty
        let tdCategoty = document.createElement('td');
        tdCategoty.textContent = product.category;

        // price
        let tdPrice = document.createElement('td');
        tdPrice.textContent = product.price + '$';

        // amount
        let tdAmount = document.createElement('td');
        tdAmount.textContent = product.amount;

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

}


// Call data
getDataLocalStorage();
getTotalPrice();
getDataStorage();