$('#loginVerify').click(function(){
    var username = $('#username').val()
    var password = $('#password').val()

    var jsonString = {username: username, password:password}

    $.ajax({
        url: 'http://localhost:3000' + '/login', 
        type: "get",
        data: jsonString,   
        success: function(response) {
            var returnData = JSON.parse(response);
            console.log(returnData.msg);
            if(returnData.msg === "SUCCESS"){
                localStorage.setItem('userId', returnData.results[0].userId);
                localStorage.setItem('firstName', returnData.results[0].firstName);
                localStorage.setItem('lastName', returnData.results[0].lastName);
                localStorage.setItem('email', returnData.results[0].email);
                localStorage.setItem('username', returnData.results[0].username);
                localStorage.setItem('password', returnData.results[0].password);
                //alert(returnData.msg)
                login()
            } else {  
                alert(returnData.msg);
            }
            
        },

        error: function(err){
            alert(err);
        }
    });
    return false;
});


function login(){
    window.location.replace('http://localhost:3000' + '/feed-page');
    return false;    
}

$('#register-page').click(function(){
    window.location.replace('http://localhost:3000' + '/register-page');
    return false;
});
