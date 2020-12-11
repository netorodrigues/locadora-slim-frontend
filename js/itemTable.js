
const connection = getConnection();
var table;

async function editCheck(cell) {
    const itemData = cell.getRow().getData();

    if (!itemData.name || !itemData.type) return;

    if (!itemData.id) {
        const createdItem = await connection.post('/api/items', itemData);
        itemData.id = createdItem.id;
        return;
    }

    const itemId = itemData.id;
    const { name, type } = itemData;

    await connection.put(`/api/items/${itemId}`, { name, type });
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

