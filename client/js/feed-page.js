retrieveItems();

function retrieveItems(){
    //Use Ajax to get data 

    $.ajax({
        url: 'http://localhost:3000' + "/feed-items",
        type: 'get',
        success: function(response){
            var data = JSON.parse(response);
            console.log(data.results[0]);
            if(data.msg === "SUCCESS"){
                displayItems(data);
            } else{
                console.log(data.msg);
            }
        },
        error: function(err){
            alert(err);
        }
    });
}
function displayItems(data){
    var tableHTML = "";
    for(var i=0; i<data.results.length; i++){
        tableHTML += "<tr>";
            tableHTML += "<td>" + data.results[i].itemName + "</td>"
            tableHTML += "<td>" + data.results[i].itemDescription + "</td>"
            tableHTML += "<td>" + data.results[i].itemCategory + "</td>"
            tableHTML += "<td>" + data.results[i].status + "</td>"
            tableHTML += "<td></td>"
            tableHTML += "<td>"
                            + "<button class='trade-button' data-id= '" + data.results[i].itemId
                            + "'>TRADE</button>"
                        + "</td>"  
        tableHTML += "</tr>";
    }

    $('#feedItems').html(tableHTML);

    activateTrade();
};

function activateTrade() {
    $('.trade-button').click(function(){
        var itemId = this.getAttribute("data-id");

        pickOfferedItem();

        $.ajax({
            url: 'http://localhost:3000' + '/trade-request',
            type: 'get',
            data: {id: itemId},
            success: function(response){
                var data = JSON.parse(response);
                if (data.msg === "SUCCESS"){
                    console.log("posting request")
                    postTradeRequest(data);
                }else {
                    console.log(data.msg);
                }
            },
            error: function(err){
                alert(err);
            }
        });
        return false;
    });
}


function pickOfferedItem(){
    var userId = localStorage.getItem('userId');
    var jsonString = {userId: userId}

    $.ajax({
        url: 'http://localhost:3000' + "/current-items",
        type: 'get',
        data: jsonString,
        success: function(response){
            var data = JSON.parse(response);
            console.log(data.results[0]);
            if(data.msg === "SUCCESS"){
                displayOfferingItems(data);
            } else{
                console.log(data.msg);
            }
        },
        error: function(err){
            alert(err);
        }
    });
}
function displayOfferingItems(data){
    var tableHTML = "";
    for(var i=0; i<data.results.length; i++){
        tableHTML += "<tr>";
            tableHTML += "<td>" + data.results[i].itemName + "</td>"
            tableHTML += "<td>" + data.results[i].itemDescription + "</td>"
            tableHTML += "<td>" + data.results[i].itemCategory + "</td>"
            tableHTML += "<td>" + data.results[i].status + "</td>"
            tableHTML += "<td></td>"
            tableHTML += "<td>"
                            + "<button class='choose-button' data-id= '" + data.results[i].itemId
                            + "'>Choose</button>"
                        + "</td>"  
        tableHTML += "</tr>";
    }

    $('#feedItems').html(tableHTML);
    
    activateChoices();
};


function activateChoices() {
    $('.choose-button').click(function(){
        var offeredItemId = this.getAttribute("data-id");

        $.ajax({
            url: 'http://localhost:3000' + '/post-offered-item',
            type: 'post',
            data: {offeredItemId: offeredItemId},
            success: function(response){
                var data = JSON.parse(response);
                if (data.msg === "SUCCESS"){
                    console.log(data.msg)
                    location.reload();
                }else {
                    console.log(data.msg);
                }
            },
            error: function(err){
                alert(err);
            }
        });
        return false;
    });
}

function postTradeRequest(data){
    var decidingUserId = data.results[0].Accounts_userId
    var requestedItemId = data.results[0].itemId
    var requestedItemName = data.results[0].itemName
    var requestingUserId = localStorage.getItem('userId');

    var jsonString = {decidingUserId: decidingUserId, requestedItemId: requestedItemId, requestingUserId: requestingUserId}


    $.ajax({
        url: 'http://localhost:3000' + '/post-request',
        type: 'post',
        data: jsonString,
        success: function(response){
            var data = JSON.parse(response);
            if (data.msg === "SUCCESS"){
                console.log(data.msg)
            }else {
                console.log(data.msg);
            }
        },
        error: function(err){
            alert(err);
        }
    });

}

$('#resetSearch').click(function(){
    location.reload();
});

$('#search').click(function(){
    var searchedItem = $('#itemSearch').val();

    var jsonString = {searchedItem: searchedItem};

    $.ajax({
        url: 'http://localhost:3000' + "/search-items",
        type: 'get',
        data: jsonString,
        success: function(response){
            var data = JSON.parse(response);
            console.log(data.results[0]);
            if(data.msg === "SUCCESS"){
                displayItems(data);
                console.log('Item Found');
            } else{
                console.log(data.msg);
            }
        },
        error: function(err){
            alert(err);
        }
    });
    return false;
});


$('#backToProfile').click(function(){
    window.location.replace('http://localhost:3000' + '/account-page');
    return false;
});