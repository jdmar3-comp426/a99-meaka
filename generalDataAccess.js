window.addEventListener("load", function(){
    function sendData() {
        const sendRequest = new XMLHttpRequest();
        const signupInfo = new URLSearchParams(new FormData(form));
        sendRequest.addEventListener("error", function (event){
            alert('Submission unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function (event) {
            alert('Your account was created');
        });
        sendRequest.open("POST", "http://localhost:5000/app/new/user" );
        sendRequest.send( signupInfo );
    }
    const form = document.getElementById("signup");
    form.addEventListener("submit", function ( event ){
        event.preventDefault();
        sendData();
    });



/*// some kind of way to get user information and store it here 
    function getData( form ) {
        //sets up request 
        const getRequest = new XMLHttpRequest();
        const userInfo = new URLSearchParams(new FormData(logInForm));
        getRequest.addEventListener("error", function (event){
            alert('There was an error loggin you in. Please try again!');
        });
        //if the request is successful then do this 
        getRequest.onreadystatechange = function() {
            if(getRequest.status == 200) {
                currentUser = JSON.parse(getRequest.response);
                alert('you have successfully logged in :) have fun playing!!')
            } else {
                alert('There was an error logging you in. Please try again!')
            }
        };

        //actually goes through with the request
        getRequest.open("GET", "http://localhost:5000/app/user/"  );
        getRequest.send();
    }
    //get user info needed for the validation
    const logInForm = document.getElementById("login");
    logInForm.addEventListener("submit", function ( event ){
        event.preventDefault();
        getData();
    });
    */



    //some way to log out 




    //some way to update user



    //some way to delete user
});


