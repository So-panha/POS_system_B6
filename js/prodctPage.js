let btnAddproduct = document.getElementById('add_category');
let form_add = document.getElementById('add-product');
let updateForm = document.getElementById('update-product');
let concelAdd = document.getElementById('concelAdd');
let concelUpdate = document.getElementById('concelUpdate');
let viewGoods = document.getElementById('view_goods');
let close_list = document.querySelector('.infor-goods ion-icon');
let totalSold = document.querySelector('.total');


// data 
let datas = [];
let getIndex = null;
let linkImageUpdate = [];
let dataCategory = [];
let nameInput = document.getElementById('nameAdd');
let netpriceInput = document.getElementById('net-priceAdd');
let grosspriceInput = document.getElementById('gross-priceAdd');
let quantityInput = document.getElementById('quantityAdd');
let describtionInput = document.getElementById('describtionAdd');
let imageInput = document.getElementById('imageAdd');
let saveBtn = document.getElementById('save');

let nameUpdate = document.getElementById('nameUpadate');



let netpriceUpdate = document.getElementById('net-priceUpadate');
let grosspriceUpdate = document.getElementById('gross-priceUpadate');
let quantityUpdate = document.getElementById('quantityUpadate');
let describtionUpdate = document.getElementById('describtionUpadate');
let imageUpdate = document.getElementById('imageUpdate');
let updateBtn = document.getElementById('update');



// show form and close form
function show(element) {
    element.className = 'show';
}
function hide(element) {
    element.className = 'hide';
}

// Show form add
function openAdd() {
    show(form_add)
}
function closeAdd() {
    hide(form_add)
}

// Update form 
function update(e) {
    show(updateForm);
    hide(form_add);
    let indexUpdate = e.target.closest('.card').dataset.index;
    getIndex = indexUpdate;
    let data = datas[indexUpdate];
    nameUpdate.value = data.name;
    categoryUpdate.value = data.category;
    netpriceUpdate.value = data.netPrice;
    grosspriceUpdate.value = data.grossPrice;
    quantityUpdate.value = data.quantity;
}

// Start Update
function clickUpdate() {
    previewFilesUpdate(imageUpdate.files);
}


function closeUpdate() {
    hide(updateForm);
}

// Show and close form list of goods
function closeList() {
    viewGoods.style.display = 'none';
}

function openList(e) {
    viewGoods.style.display = '';
    let index = e.target.closest('.card').dataset.index;
    let data = datas[index];
    let lists = viewGoods.firstElementChild.firstElementChild.children;
    let totalSoldOut = totalSold.firstElementChild.firstElementChild;

    lists[1].children[1].textContent = data.name;
    lists[2].children[1].textContent = data.category;
    lists[3].children[1].textContent = data.quantity;
    lists[5].children[1].textContent = data.netPrice;
    lists[6].children[1].textContent = data.grossPrice;

    totalSoldOut.textContent = "3$-3"
}



// convert link imgae
function previewFiles(files) {
    let link = [];
    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            const reader = new FileReader();

            reader.addEventListener(
                "load",
                () => {
                    link.push(reader.result);
                    createCard(link[0]);
                },
                false,
            );
            reader.readAsDataURL(file);
        }
    }

    if (files) {
        Array.prototype.forEach.call(files, readAndPreview);
    }
    createCard(link[0])
}

// Input validation 
function validation(element) {

    if (element != '') {
        return true
    } else {
        return false
    }
}

// Check type of input 
function checkInput(element) {
    if (Number(element)) {
        return true
    } else {
        return false

    }
}

// Prevent of number charactor in input
function allowType(element) {
    if (element < 20) {
        return true
    } else {
        return false
    }
}

// Prevent Negative Number
function preventNumber(element){
    if(element > -1){
        return true
    }else{
        return false
    }
}


// Create object
function createCard(link) {
    if (link != null) {
        store = {};
        store.name = nameInput.value;
        store.category = categoryInput.value;
        store.netPrice = netpriceInput.value;
        store.grossPrice = grosspriceInput.value;
        store.quantity = quantityInput.value;
        store.image = link;

        // add object to array
        datas.push(store);
        displayCard();
        saveLocalStorage();
    }
}

// Input validation 
function validation(element) {

    if (element != '') {
        return true
    } else {
        return false
    }
}

// Check type of input 
function checkInput(element) {
    if (Number(element)) {
        return true
    } else {
        return false

    }
}

// Prevent of number charactor in input
function allowType(element) {
    if (element < 20) {
        return true
    } else {
        return false
    }
}

// Prevent Negative Number
function preventNumber(element){
    if(element > -1){
        return true
    }else{
        return false
    }
}


// create cards
function clickCreate() {
    let allowed = allowType(nameInput.value.length);
    if (validation(nameInput.value) && validation(netpriceInput.value) && validation(grosspriceInput.value) && validation(quantityInput.value) && validation(imageInput.value) && checkInput(netpriceInput.value) && checkInput(grosspriceInput.value) && allowed && preventNumber(netpriceInput.value) && preventNumber(grosspriceInput.value)) {
        previewFiles(imageInput.files);
        hide(form_add);
    } else {
        if (validation(nameInput.value) == false) {
            alert('Please fill name of your product!');
        }
        else if (validation(netpriceInput.value) == false) {
            alert('Please fill your net price of your product!');
        }
        else if (validation(grosspriceInput.value) == false) {
            alert('Please fill your gross price of your product!');
        }
        else if (validation(quantityInput.value) == false) {
            alert('Please fill quantity of your product!');
        }
        else if (validation(imageInput.value) == false) {
            alert('Please input your image of your product!')
        }
        else if (checkInput(netpriceInput.value) == false) {
            alert('You need to fill your net price as the number!');
        }
        else if (checkInput(netpriceInput.value) == false) {
            alert('You need to fill your net price as the number!');
        }
        else if (checkInput(grosspriceInput.value) == false) {
            alert('You need to fill your gross price as the number!');
        }
        else if (allowed == false) {
            alert('You do not allow for add character more than 20 in input name!');
        }else if(checkInput(categoryInput.value) == false){
            alert('You need to fill your category form!');
        }else if(preventNumber(netpriceInput.value) == false){
            alert('You need to input your price as a negative number!');
        }else if(preventNumber(grosspriceInput.value) == false){
            alert('You need to input your price as a negative number!');
        }
    }
}


// Display card 
function displayCard() {
    let main_card = document.querySelector('.scroll');
    main_card.remove();
    main_card = document.createElement('div');
    main_card.className = 'scroll';
    for (let index in datas) {
        let card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;

        let infor = document.createElement('div');
        infor.className = 'infor';

        let detail = document.createElement('div');
        detail.className = 'detail';

        let imageCard = document.createElement('img');
        imageCard.className = 'image-product';
        imageCard.src = datas[index].image;

        let productId = document.createElement('p');
        productId.textContent = 'Product ID : '

        let id = document.createElement('span');
        id.textContent = '001';
        productId.appendChild(id);
        detail.appendChild(productId);

        let productName = document.createElement('p');
        productName.textContent = 'Product Name : '
        let name = document.createElement('span');
        name.textContent = datas[index].name;
        productName.appendChild(name);
        detail.appendChild(productName);

        let Quantity = document.createElement('p');
        Quantity.textContent = 'Quantity : '
        let numbers = document.createElement('span');
        numbers.textContent = datas[index].quantity;
        Quantity.appendChild(numbers);
        detail.appendChild(Quantity);

        let Price = document.createElement('p');
        Price.textContent = 'Price : ';
        let cost = document.createElement('span');
        cost.textContent = datas[index].grossPrice;
        Price.appendChild(cost);
        detail.appendChild(Price);

        let action = document.createElement('div');
        action.className = 'actionCard';

        let deleteBtn = document.createElement('img');
        deleteBtn.className = 'btnAction'
        deleteBtn.src = "../IMG/image/delete-removebg-preview.png";
        deleteBtn.addEventListener('click', delectCard)

        let editBtn = document.createElement('img');
        editBtn.className = 'btnAction'
        editBtn.src = "../IMG/image/edit-removebg-preview.png";
        editBtn.addEventListener('click', update)

        let viewBtn = document.createElement('img');
        viewBtn.className = 'btnAction'
        viewBtn.src = '../IMG/image/eye-removebg-preview.png';
        viewBtn.addEventListener('click', openList)

        action.appendChild(deleteBtn);
        action.appendChild(editBtn);
        action.appendChild(viewBtn);

        infor.appendChild(detail);
        infor.appendChild(action);

        card.appendChild(imageCard);
        card.appendChild(infor);
        main_card.appendChild(card);
    }
    let contain = document.querySelector('.product');
    contain.appendChild(main_card)
    // reset 
    imageInput.value = '';
}


btnAddproduct.addEventListener('click', openAdd);
concelAdd.addEventListener('click', closeAdd);
concelUpdate.addEventListener('click', closeUpdate);
close_list.addEventListener('click', closeList);
saveBtn.addEventListener('click', clickCreate);





