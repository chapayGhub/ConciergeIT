
function createBox(name, cid, toggle) {
    $("<div>").attr("class", "large-4 small-6 columns "+toggle).append(
        $("<div>").attr("class", "box bg-orange").attr("onclick", "javascript:updateListing('"+cid+"', '"+name+"', '"+name+"')").append(
            $("<img>").attr("src", "http://takeitww.com/conciergeit/img/cat/"+name+".png")
        ).append(
            $("<p>").attr("class", "title-box").html(
                $("<i>").attr("class", "fa fa-plus-square").text(' '+name)
            )
        )
    ).appendTo($("body"));
}

function createBoxLong(iid, name, desc, price) {
    $("<div>").attr("class", "large-12 small-12 columns").append(
        $("<div>").attr("class", "box-long bg-orange").attr("onclick", "updateItem('"+iid+"', '"+name+"', \""+desc+"\", '"+price+"')").append(
            $("<div>").attr("class", "large-5 small-12 columns").append(
                $("<p>").text(name + " - $" + price)
            )
        ).append(
            $("<div>").attr("class", "large-7 small-12 columns").append(
                $("<p>").attr("class", "title-box").text(desc)
            )
        )
    ).appendTo($("body"));
}

function createBoxLongest(name, desc, price, quantity, note) {
    $("<div>").attr("class", "large-12 small-12 columns").append(
        $("<div>").attr("class", "box-longest bg-orange").append(
            $("<div>").attr("class", "large-12 small-12 columns").append(
                $("<h3>").text(name + " - $" + price)
            )
        ).append(
            $("<div>").attr("class", "large-12 small-12 columns").append(
                $("<p>").attr("class", "title-box").text(desc)
            )
        ).append(
            $("<div>").attr("class", "large-12 small-12 columns").append(
                $("<p>").attr("class", "title-box").text("Quantity: "+quantity)
            )
        )
    ).appendTo($("body"));
}

function getDimensions() {
    var width = $(window).width();
    var height = $(window).height();
    alert(width+' x '+height);
}

function getCategory() {
    $.ajax({
        type: "POST",
        url: "http://takeitww.com/conciergeit/request.php",
        crossDomain: true,
        dataType : 'json',
        data: {
            "credential" :"SimpIyGr33n",
            "option"     :"getCategory",
        },
        success: function(data) {
            var toggle = '';
            for (var i = 0; i < data.length; i++) {
                if (i % 2 == true)  { toggle = "shift-left"; }
                else                { toggle = ""; }
                createBox(data[i]['title'], data[i]['cid'], toggle);
            }
        }
    });
}

function getListing() {
    var categoryID = window.localStorage.getItem("cid");
    $.ajax({
        type: "POST",
        url: "http://takeitww.com/conciergeit/request.php",
        crossDomain: true,
        dataType : 'json',
        data: {
            "credential" :"SimpIyGr33n",
            "catID"      :categoryID,
            "option"     :"getListing",
        },
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                createBoxLong(data[i]['iid'], data[i]['name'],  data[i]['details'], data[i]['price']);
            }
        }
    });
}

function getTransactions() {
    var guestID = window.localStorage.getItem("id");
    $.ajax({
        type: "POST",
        url: "http://takeitww.com/conciergeit/request.php",
        crossDomain: true,
        dataType : 'json',
        data: {
            "credential" :"SimpIyGr33n",
            "guestID"    :guestID,
            "option"     :"getTransactions",
        },
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                createBoxLongest(data[i]['name'], data[i]['details'],  data[i]['price'], data[i]['quantity'], data[i]['notes']);
            }
        }
    });
}

function logout() {
    window.localStorage.clear();
    window.location.replace("index.html");
}

function randomizeColor() {
    var random = Math.ceil(Math.random() * 10) + 3;
}

function resetForm(id) {
    $('#'+id)[0].reset();
}

function submit() {
    var guestID = window.localStorage.getItem("id");
    var itemID = window.localStorage.getItem("iid");
    var quantity = $("#quantity").val();
    var note = $("#note").val();
    $.ajax({
        type: "POST",
        url: "http://takeitww.com/conciergeit/request.php",
        crossDomain: true,
        dataType : 'json',
        data: {
            "credential" :"SimpIyGr33n",
            "guestID"    :guestID,
            "itemID"     :itemID,
            "quantity"   :quantity,
            "notes"      :note,
            "option"     :"postTransaction",
        },
        success: function(data) {
            alert("You have successfully made a purchase!");
            window.location.replace("category.html");
        }
    });
}

function test() {
    postTransactions('1', '1', '2', 'android test 4');
}

function updateListBanner() {
    var name = window.localStorage.getItem("list_name");
    var desc = window.localStorage.getItem("list_desc");
    $("#banner_img img").attr("src", "http://takeitww.com/conciergeit/img/cat/"+name+".png");
    $("#banner_txt h1").text(desc);
}

function updateItemBanner() {
    var name = window.localStorage.getItem("item_name");
    var desc = window.localStorage.getItem("item_desc");
    var price = window.localStorage.getItem("item_price");
    $("#item_name h1").text(name);
    $("#item_desc p").text(desc);
    $("#item_price p").text("$"+price);
}

function updateItem(iid, name, desc, price) {
    window.localStorage.setItem("iid", iid);
    window.localStorage.setItem("item_name", name);
    window.localStorage.setItem("item_desc", desc);
    window.localStorage.setItem("item_price", price);
    window.location.replace("item.html");
}

function updateListing(cid, name, desc) {
    window.localStorage.setItem("cid", cid);
    window.localStorage.setItem("list_name", name);
    window.localStorage.setItem("list_desc", desc);
    window.location.replace("listing.html");
}

function updateLogin() {
    var id = $('#regID').val();
    window.localStorage.setItem("id", id);
    window.location.replace("category.html");
}

