var userId = localStorage.getItem('userId');
var firstName = localStorage.getItem('firstName');
var lastName = localStorage.getItem('lastName');
var email = localStorage.getItem('email');
var username = localStorage.getItem('username');
var password = localStorage.getItem('password');    



$('#accountTitle').html('Welcome ' + firstName)

retrieveItems();

function retrieveItems(){
    //Use Ajax to get data 
    var jsonString = {userId: userId}

    $.ajax({
        url: 'http://localhost:3000' + "/current-items",
        type: 'get',
        data: jsonString,
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
            tableHTML += "<td>"
                            + "<button class='trade-button' data-id= '" + data.results[i].itemId
                            + "'>TRADE</button>"
                        + "</td>"
        tableHTML += "</tr>";
    }

    $('#currentItems').html(tableHTML);
};


$('form#profilePicture').submit(function(){
    console.log("image submited");

    var formData = new FormData(this);

    
    $.ajax({
        url: 'http://localhost:3000' + '/updateProfilePic', 
        type: "post",
        data: formData,
        success: function(response) {
        },

        error: function(err){
            alert(err);
        }
    });

    return false;
})

$('#addItem').click(function(){
    var itemDescription = $('#itemDescription').val();
    var status = $("#status").children("option").filter(":selected").text()
    var itemCategory = $("#itemCategory").children("option").filter(":selected").text()
    var itemName = $('#itemName').val();

    var jsonString = {itemDescription:itemDescription, status:status, itemCategory:itemCategory, userId:userId, itemName:itemName};

    $.ajax({
        url: 'http://localhost:3000' + '/addItem', 
        type: "post",
        data: jsonString,
        success: function(response) {
            location.reload();
            alert(response);
        },

        error: function(err){
            alert(err);
        }
    });

    return false;
});

$('#feedPageRedirect').click(function(){
    window.location.replace('http://localhost:3000' + '/feed-page');
    return false;
});

$('#logout').click(function(){
    window.location.replace('http://localhost:3000' + '/login-page');
    return false;
});