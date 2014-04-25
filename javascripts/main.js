var socketio = io.connect("145.24.235.55:1337");
window.clickableMap = true;

$( document ).ready(function() {
    $('#chat-input').keypress(function (e) {
        if (e.which == 13) {
            sendMessage();
        }
    });

    $(".main-container").css('min-height', $(window).height() - $(".header").outerHeight(true) - $(".footer").outerHeight(true));
    $(".main").height($(".main-container").height());

    //menu work
    $(".header-menu li").click(function(){
        $(".main-container").css('z-index', '0');
        $("." + $(this).attr('rel')).css('z-index', '20');
    });
});


//chat work
socketio.on("message_to_client", function(data) {
    $("#chat-output").append("<p>" + data['role'] + " " + data['name'] + ": " + data['message'] + "</p>");
});

function sendMessage() {
    if(document.getElementById("chat-input").value != ''){
        var msg = document.getElementById("chat-input").value;
        socketio.emit("message_to_server", { message : msg});
        $("#chat-input").val('');
    }
}


//login work
function loginUser(){
    if(document.getElementById("login-name").value != '' && $("#login-role option:selected").val() !=''){

        setCoordinates();
        var name = document.getElementById("login-name").value;
        var role = $("#login-role option:selected").val();
        socketio.emit("loginUser", { name : name, role : role });
        $(".login").fadeOut(1000);

        if(role == 'Loper'){
            $(".header-menu li[rel='create-route-main']").hide();
        }
    }
}

socketio.on("loginUser", function(data){
    setRealtimeCoordinates();
    $("#chat-output").append("<p><i>" + data['role'] + " " + data['name'] + " has entered the room!</i></p>");
});

socketio.on("logoutUser", function(data){
    $("#chat-output").append("<p><i>" + data['role'] + " " + data['name'] + " has left the room!</i></p>");
});

socketio.on("getOnlineUsers", function(data){

    $(".chat-users").empty();

    for(var user in data['clients']){
        $(".chat-users").append('<div class="user"><p>Name: ' + data['clients'][user].name + '</p><p>Rol: ' + data['clients'][user].role + '</p></div>')
    }
});

