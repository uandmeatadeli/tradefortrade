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
};

$('#resetSearch').click(function(){
    location.reload();
});

$('#backToProfile').click(function(){
    window.location.replace('http://localhost:3000' + '/account-page');
    return false;
});