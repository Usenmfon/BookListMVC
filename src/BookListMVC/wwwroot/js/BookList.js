var dataTable;

$(document).ready(function() {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/books/getall",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function(data) {
                    return `<div class="text-center">
                    <a href="/Books/Upsert?id=${data}" class='btn btn-success text-white' style='cursor:Pointer; width:70px;'>
                        Edit
                    </a>
                    &nbsp;
                    <a class='btn btn-danger text-white' style='cursor:Pointer; width:70px;' onclick=Delete('/books/Delete?id='+${data})>
                        Delete
                    </a>
                    </div>`;
                },
                "width": "30%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "40%"
    });
}

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        $.ajax({
            type: "DELETE",
            url: url,
            success: function(data) {
                if (data.success) {
                    toatr.success(data.message);
                    dataTable.ajax.reload();
                } else {
                    toatr.error(data.message);
                }
            }
        });
    });
}