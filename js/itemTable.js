
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

async function handleDelete(e, cell) {
    const mustDelete = confirm(
        "Are you sure that you want to delete this item?"
    );

    if (!mustDelete) return;

    const row = cell.getRow();
    const itemData = cell.getRow().getData();
    const itemId = itemData.id;

    const response = await connection.delete(`/api/items/${itemId}`);
    if (response.deleted) {
        row.delete()
    }
}

async function handleLend(e, cell) {
    const responsibleName = prompt("Responsible name: ");
    const responsibleEmail = prompt("Responsible email: ");

    if (!isValidEmail(responsibleEmail)) {
        alert("Invalid email received.")
        return;
    }

    const row = cell.getRow()
    const item = row.getData();
    const itemId = item.id;

    const createLendData = {
        responsibleName,
        responsibleEmail,
        itemId
    }

    const response = await connection.post('/api/lend', createLendData);

    if (response.id) {
        row.delete();
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
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

    document.getElementById("add-item").addEventListener("click", function () {
        table.addRow({});
    });

    document.getElementById("show-lend").addEventListener("click", function () {
        location.href = "lend-table.html"
    });
}

setupTable();

