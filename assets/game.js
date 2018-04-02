var config = {
    apiKey: "AIzaSyD7WpykEDcMGQLVYBEKMWqrkrEJ7O9Auus",
    authDomain: "class-project-e98c0.firebaseapp.com",
    databaseURL: "https://class-project-e98c0.firebaseio.com",
    projectId: "class-project-e98c0",
    storageBucket: "class-project-e98c0.appspot.com",
    messagingSenderId: "304603598474"
};
firebase.initializeApp(config);

var database = firebase.database();

var player1={
    name:"",
    guess:""
}


var player2={
    name:"",
    guess:""
}


$("#submit_p1").on("click", function (event) {
    event.preventDefault();
    $("#form_p1").css('display','none');

    player1.name=$("#name_p1").val().trim();
    
    var header_p1 = $("<p>");
    header_p1.text("Player 1 : "+player1.name);
    $("#header_p1").prepend(header_p1);

    database.ref().push({
        player1_name:player1.name,
    })
})


$("#submit_p2").on("click", function (event) {
    event.preventDefault();
    $("#form_p2").css('display','none');

    player2.name=$("#name_p2").val().trim();
    
    var header_p2 = $("<p>");
    header_p2.text("Player 2 : "+player2.name);
    $("#header_p2").html(header_p2);

    database.ref().push({
        player2_name:player2.name,
    })
})