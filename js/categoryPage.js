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