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



function closeUpdate() {
    hide(updateForm);
}

// Show and close form list of goods
function closeList() {
    viewGoods.style.display = 'none';
}

btnAddproduct.addEventListener('click', openAdd);
concelAdd.addEventListener('click', closeAdd);
concelUpdate.addEventListener('click', closeUpdate);
close_list.addEventListener('click', closeList);
saveBtn.addEventListener('click', clickCreate);





