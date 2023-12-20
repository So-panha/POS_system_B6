
let add = document.querySelector('.click_add')
let tbody = document.querySelector('tbody')
let inputs = document.querySelectorAll('tr input');
let totals = document.querySelector('.total');
let keyword = document.querySelector('h2')
let searchId = document.querySelector("#search");
let removeButton = document.querySelectorAll('.delete');
let btnCheckOut = document.querySelector('.check_out');

// Set product
let goods = document.querySelector('.show_list_ID .top');
let product = document.querySelector('.onder_number');
let quantity = document.querySelector('.onder_qty');

// payment
let formPayment = document.getElementById('payment');
let btnDone = document.querySelector('.btnDone');
let allowShow = null;


// Create data store
let dataStore = [];
let dataOder = [];

// Total of price order
let totalShow = document.querySelector('.total');
let total = 0;
let storeAllPrice = 0;

// Data gistory
let datahistory = [];


// store
let store = null;


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
    if (id != '') {
        for (let data of dataStore) {
            if (id == data.id) {
                goodList = data;
                goods.firstElementChild.textContent = data.name;
                quantity.firstElementChild.textContent = 'QTY : ' + data.quantity;
                product.firstElementChild.textContent = data.grossPrice + ' $';
                store = goodList;
            } else if (id.length == 0) {
                goods.firstElementChild.textContent = '';
                quantity.firstElementChild.textContent = '';
                product.firstElementChild.textContent = '';
                store = null;
            }
        }
    }else{
        goods.firstElementChild.textContent = '';
        quantity.firstElementChild.textContent = '';
        product.firstElementChild.textContent = '';
    }

}


// // Clear data
// Setup data store list order
function saveTotalPrice() {
    localStorage.setItem('storeAllPrice', JSON.stringify(storeAllPrice));
}

function getTotalPrice() {
    let AllPrice = JSON.parse(localStorage.getItem('storeAllPrice'));
    if (AllPrice != null) {
        storeAllPrice = AllPrice;
    }
}


// Save history of sold
function saveHistoryOfSold() {
    localStorage.setItem('history', JSON.stringify(datahistory));
}

function getTotalPrice() {
    let AllHistory = JSON.parse(localStorage.getItem('history'));
    if (AllHistory != null) {
        datahistory = AllHistory;
    }
}


// Show total of goods
function showTotal(cost) {
    totalShow.textContent = cost + '$';

}


// Action click price
function clickPrice(e) {
    total = 0;
    let numbersOfGoods = e.target.value;
    if (numbersOfGoods > -1) {
        let price = e.target.closest('tr').children[3].textContent.slice(0, -1);
        total += Number(numbersOfGoods * price);
        showTotal(total);
    }
}

// Checkout Goods
function checkOut() {
    // Get table rows
    let tableRow = document.querySelectorAll('tbody tr');
    // Checkout value of input
    for (let row of tableRow) {
        let noValue = row.children[2].firstElementChild.value;
        if (noValue <= 0) {
            alert('You need to fill number of product before you checkout!')
            allowShow = false;
            return false
        }
    }
    // show form payment
    if (allowShow == null) {
        formPayment.className = 'show';
    } else {
        allowShow = null;
    }
    for (let row of tableRow) {
        //    All months
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        // Set date of sold
        let today = new Date();
        let years = today.getFullYear();
        let month = months[today.getMonth()];
        let date = today.getDate();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        // Time local
        if (hours > 12) {
            hours -= 12;
        }

        let timeOfDay = date + '-' + month + '-' + years + " " + hours + ':' + minutes;
 
        //   Create object
        let data = row.children;
        let object = {};
        object.price = data[3].textContent.replace('$', '');
        object.quantity = data[2].firstElementChild.value;
        object.date = timeOfDay;
        object.name = data[1].textContent;
        datahistory.push(object);
    }
    saveHistoryOfSold();
    storeAllPrice += total;
    saveTotalPrice();
}


// show on product
function showOnProduct() {
    // set condition
    if (store != null) {
        dataOder.push(store);
        store = null;
    }

    if (goodList != null) {
        // Clear product in list
        goods.firstElementChild.textContent = '';
        quantity.firstElementChild.textContent = '';
        product.firstElementChild.textContent = '';
        searchId.value = '';

        // remove tbody
        tbody.remove();
        tbody = document.createElement('tbody');
        document.querySelector('table').appendChild(tbody);


        for (let index in dataOder) {
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
            input.value = 0;
            input.addEventListener('input', clickPrice)
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

            // delete list order
            img.addEventListener('click', deleteTable)
            function deleteTable() {
                let index = tableTR.dataset.index;
                dataOder.splice(index,1);
                showOnProduct();
            }
        }


    }
}



// Action payment
function showPayment() {
    totalShow.textContent = 0;
    formPayment.className = 'hide';
    tbody.remove();
    tbody = document.createElement('tbody');
    document.querySelector('table').appendChild(tbody);
}



// Download PDF
function generatePDF() {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Set date of sold
    let today = new Date();
    let years = today.getFullYear();
    let month = months[today.getMonth()];
    let date = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    // Time local
    if (hours > 12) {
        hours -= 12;
    }

    let timeOfDay = date + '-' + month + '-' + years + " " + hours + ':' + minutes;
    let text = null;
    let datas = tbody.children;
    for(let data of datas){
        let lists = data.children;
        text += 'Goods : ' + lists[1].textContent + '  --"-- Price : ' + lists[3].textContent + ' --"-- Numbers : ' + lists[2].firstElementChild.value + '\n';
    }

   
    var pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
    });
    pdf.text(text, 20, 20);
    pdf.text("Date :" + timeOfDay, 20, 30);
    pdf.save('Recipient');
}


// Call to data
getDataLocalStorage();
getTotalPrice();
// getListorder();
// Add action to element
searchId.addEventListener('input', showProduct);

//pash product
add.addEventListener('click', showOnProduct);

// Checkout btn
btnCheckOut.addEventListener('click', checkOut);

// Action btn payment
btnDone.addEventListener('click', showPayment)