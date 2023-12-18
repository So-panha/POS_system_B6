// Set up input 
let dataCategory = [];

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
}


// Delect data
function deleteData(e) {
    let index = e.target.closest('tr').dataset.index;
    dataCategory.splice(index, 1);
    saveDataStorage();
    createtable();
}




// Call data
getDataStorage();
btnAdd.addEventListener('click', openForm);
btnConcel.addEventListener('click', closeForm);
btnSave.addEventListener('click', createObject);
btnSaveUpdate.addEventListener('click', updateForm);
btnConcelUpdate.addEventListener('click', closeFormUpdate);
search.addEventListener('input', searchList);