// Set up input 
let dataCategory = [];
let indexUpdate = [];
let search = document.getElementById('search');
let nameInput = document.getElementById('name');
let descriptInput = document.getElementById('descript');
let nameInputUpdate = document.getElementById('nameUpdate');
let descriptInputUpdate = document.getElementById('descriptUpdate');
let btnAdd = document.querySelector('.add');
let btnSave = document.querySelector('.save');
let btnConcel = document.querySelector('.cancel');
let btnSaveUpdate = document.querySelector('.saveUpdate');
let btnConcelUpdate = document.querySelector('.cancelUpdate');
let table = document.querySelector('table');
let form = document.querySelector('.form_fill');
let update = document.querySelector('.form_update');


// Save data of storage
function saveDataStorage() {
    localStorage.setItem('mainData', JSON.stringify(dataCategory));
}

// Get data of storage
function getDataStorage() {
    let data = JSON.parse(localStorage.getItem('mainData'));
    if (data != null) {
        dataCategory = data;
        createtable()
    }
}

// Create object
function createObject() {

    // Call funtion checkInput
    let limitChar = limitName();
    let limitScript = limitDescription();
    if (checkInput(nameInput.value) && limitChar && limitScript) {
        mainCategory = {};
        mainCategory.category = nameInput.value;
        mainCategory.desription = descriptInput.value;
        dataCategory.push(mainCategory);
        saveDataStorage();
        createtable();
        // close from create category
        form.style.display = "none";

    } else if (limitChar == false) {
        alert('You are only allow to input name catagory less than 20!');
    } else if (checkInput(nameInput.value) === false) {
        alert('You need to input your category first!');
    } else if (limitScript == false) {
        alert('You are only allow to write description less than 20!');
    }
}

// Check value of input
function checkInput(element) {
    if (element != '') {
        return true
    } else {
        return false
    }
}

// limit Charactor in input name
function limitName() {
    let lenName = nameInput.value.length;
    if (lenName < 20) {
        return true
    } else {
        return false
    }
}

  // limit Charactor in input description
  function limitDescription() {
    let lenDescript = descriptInput.value.length;
    if (lenDescript < 20) {
        return true
    } else {
        return false
    }
}


// create list of data
function createtable() {
    let tbody = document.querySelector('tbody');
    tbody.remove();
    tbody = document.createElement('tbody');
    for (let index = 0; index < dataCategory.length; index++) {
        let tableRow = document.createElement('tr');
        tableRow.dataset.index = index;

        let td1 = document.createElement('td');
        td1.textContent = Number(index + 1);

        let td2 = document.createElement('td');
        td2.textContent = dataCategory[index].category;

        let td3 = document.createElement('td');

        let edit = document.createElement('i');
        edit.classList = 'material-icons';
        edit.textContent = 'edit';
        edit.style.color = 'blue';
        edit.addEventListener('click', editData);

        let delect = document.createElement('i');
        delect.classList = 'material-icons';
        delect.textContent = 'delete';
        delect.style.color = 'red';
        delect.addEventListener('click', deleteData);

        td3.appendChild(edit);
        td3.appendChild(delect);

        // Append td into tr
        tableRow.appendChild(td1);
        tableRow.appendChild(td2);
        tableRow.appendChild(td3);
        // Append tr into tbody
        tbody.appendChild(tableRow);
    }
    // Append tbody into table
    table.appendChild(tbody);


    // Delect data
    function deleteData(e) {
        let index = e.target.closest('tr').dataset.index;
        dataCategory.splice(index, 1);
        saveDataStorage();
        createtable();
    }

    // Edit data
    function editData(e) {
        // Get index
        let index = e.target.closest('tr').dataset.index;
        indexUpdate = index;
        // Catch value from array object
        nameInputUpdate.value = dataCategory[index].category;
        descriptInputUpdate.value = dataCategory[index].desription;
        // diplay form 
        form.style.display = "none";
        update.style.display = "block";
    }

    // Open form crete category
    function openForm() {
        form.style.display = "block";
    }

    // Close form create category
    function closeForm() {
        form.style.display = "none";
    }



    // Call data
    getDataStorage();
    btnAdd.addEventListener('click', openForm);
    btnConcel.addEventListener('click', closeForm);
    btnSave.addEventListener('click', createObject);
    btnSaveUpdate.addEventListener('click', updateForm);
    btnConcelUpdate.addEventListener('click', closeFormUpdate);
    search.addEventListener('input', searchList);