const uri = "api/addresslist";
let addresses = null;
function getCount(data) {
    const el = $("#counter");
    let addresslist = "Address";
    
    if (data) {
        if (data > 1) {
            addresslist = "Address";
        }
        el.text(data + " " + addresslist);
    } else {
        el.text("No " + addresslist);
    }
}

$(document).ready(function() {
    getData();
});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#addresslists");

            $(tBody).empty();

            getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append(
                        $("<td></td>").append(
                            $("<input/>", {
                                type: "checkbox",
                                disabled: true,
                                checked: item.isComplete
                            })
                        )
                    )
                    .append($("<td></td>").text(item.firstname))
                    .append($("<td></td>").text(item.lastname))
                    .append($("<td></td>").text(item.city))
                    .append(
                        $("<td></td>").append(
                            $("<button>Edit</button>").on("click", function () {
                                editAddress(item.id);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Delete</button>").on("click", function () {
                                deleteAddress(item.id);
                            })
                        )
                    );

                tr.appendTo(tBody);
            });

            addresses = data;
        }
    });
}

function addItem() {
    const item = {
        firstname: $("#add-firstname").val(),
        lastename: $("#add-lastname").val(),
        city: $("#add-city").val(),
        isComplete: false
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getData();
            $("#add-firstname").val("");
            $("#add-lastname").val("");
            $("#add-city").val("");
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(addresses, function (key, item) {
        if (item.id === id) {
            $("#edit-firstname").val(item.firstname);
            $("#edit-lastname").val(item.lastname);
            $("#edit-city").val(item.city);
            $("#edit-id").val(item.id);
            $("#edit-isComplete")[0].checked = item.isComplete;
        }
    });
    $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const item = {
        firstname: $("#edit-firstname").val(),
        lastname: $("#edit-lastname").val(),
        city: $("#edit-city").val(),
        isComplete: $("#edit-isComplete").is(":checked"),
        id: $("#edit-id").val()
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#spoiler").css({ display: "none" });
}