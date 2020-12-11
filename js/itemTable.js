
const connection = getConnection();
var table;

//define data array
var tabledata = [
    { id: 1, name: "Oli Bob", progress: 12, gender: "male", rating: 1, col: "red", dob: "19/02/1984", car: 1 },
    { id: 2, name: "Mary May", progress: 1, gender: "female", rating: 2, col: "blue", dob: "14/05/1982", car: true },
    { id: 3, name: "Christine Lobowski", progress: 42, gender: "female", rating: 0, col: "green", dob: "22/05/1982", car: "true" },
    { id: 4, name: "Brendon Philips", progress: 100, gender: "male", rating: 1, col: "orange", dob: "01/08/1980" },
    { id: 5, name: "Margret Marmajuke", progress: 16, gender: "female", rating: 5, col: "yellow", dob: "31/01/1999" },
    { id: 6, name: "Frank Harbours", progress: 38, gender: "male", rating: 4, col: "red", dob: "12/05/1966", car: 1 },
];

async function editCheck(cell) {
    const itemData = cell.getRow().getData();

    if (!itemData.name || !itemData.type) return;

    if (!itemData.id) {
        const createdItem = await connection.post('/api/items', itemData);
        itemData.id = createdItem.id;
    }
}

function handleDelete(cell) {
    alert("delete click!")
}

function handleLend(cell) {
    alert("lend click!");
}



async function setupTable() {
    const itemData = await connection.get('/api/items');

    //initialize table
    table = new Tabulator("#item-table", {
        data: itemData,
        history: true,
        cellEdited: editCheck,
        layout: "fitColumns",
        responsiveLayout: "hide",
        tooltips: true,
        addRowPos: "top",
        pagination: "local",
        paginationSize: 6,
        paginationSizeSelector: [3, 6, 8, 10],
        resizableRows: true,
        initialSort: [
            { column: "name", dir: "asc" },
        ],
        columns: [
            { title: "Item Name", field: "name", editor: "input", },
            { title: "Type", field: "type", width: 95, editor: "select", editorParams: { values: ["book", "cd", 'dvd'] } },
            { title: "Delete", width: 90, hozAlign: "center", formatter: "buttonCross", headerSort: false, cellClick: handleDelete },
            { title: "Lend Item", width: 100, hozAlign: "center", formatter: "buttonTick", headerSort: false, cellClick: handleLend },
        ],
    });

    //select row on "select" button click
    document.getElementById("add-item").addEventListener("click", function () {
        table.addRow({});
    });
}

setupTable();

