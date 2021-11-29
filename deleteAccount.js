window.addEventListener("load", function(){
    function deleteData() {
        const deleteRequest = new XMLHttpRequest();
        const deleteInfo = new URLSearchParams(new FormData(form));
        sendRequest.addEventListener("error", function (event){
            alert('Deletion unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function (event) {
            alert('Your account has been deleted. Hope to see you again soon!');
        });
        deleteRequest.open("DELETE", "http://localhost:5000/app/delete/user/:email" );
        deleteRequest.send( deleteInfo );
    }
    const form = document.getElementById("delete");
    form.addEventListener("submit", function ( event ){
        event.preventDefault();
        deleteData();
    });
});