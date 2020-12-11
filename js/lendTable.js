
const connection = getConnection();
var table;

async function removeLend(e, cell) {
    const mustRemoveLend = confirm("This item was returned?");

    if (!mustRemoveLend) return;

    const row = cell.getRow();
    const itemData = row.getData();
    const itemId = itemData.id;

    const response = await connection.delete(`/api/lend/${itemId}`);

    if (response.deleted) {
        row.delete();
    }
}


async function setupTable() {
    const itemData = await connection.get('/api/lend');

    //initialize table
    table = new Tabulator("#item-table", {
        data: itemData,
        history: true,
        layout: "fitColumns",
        responsiveLayout: "hide",
        tooltips: true,
        addRowPos: "top",
        pagination: "local",
        paginationSize: 6,
        paginationSizeSelector: [3, 6, 8, 10],
        resizableRows: true,
        initialSort: [
            { column: "Item Name", dir: "asc" },
        ],
        columns: [
            { title: "Item Name", field: "item.name" },
            { title: "Item Type", field: "item.type" },
            { title: "Responsible", field: "responsibleName" },
            { title: "Responsible Email", field: "responsibleEmail" },
            { title: "Retrieve Item", width: 100, hozAlign: "center", formatter: "buttonTick", headerSort: false, cellClick: removeLend },
        ],
    });

    document.getElementById("show-item").addEventListener("click", function () {
        location.href = "index.html"
    });
}

setupTable();

