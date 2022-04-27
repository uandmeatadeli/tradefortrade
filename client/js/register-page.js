$('#register').click(function(){
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var username = $('#username').val();
    var password = $('#password').val();

    console.log('before jsonstring')

    var jsonString = {firstName:firstName, lastName:lastName, email:email, username:username, password:password};

    $.ajax({
        url: 'http://localhost:3000' + '/register-page', 
        type: "post",
        data: jsonString,
        success: function(response) {
            login();
            alert(response);
        },

        error: function(err){
            alert(err);
        }
    });
    return false;
});

function login(){
    console.log('in login');
    var username = $('#username').val();
    var password = $('#password').val();

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
                alert("Welcome to Trade for Trade " + localStorage.getItem('firstName'));
                loginRedirect();
            } else {  
                alert(returnData.msg);
            }
            
        },

        error: function(err){
            alert(err);
        }
    });
    return false;
}

$('#login-page').click(function(){
    window.location.replace('http://localhost:3000' + '/login-page');
    return false;
});

function loginRedirect(){
    window.location.replace('http://localhost:3000' + '/feed-page');
    return false;    
}