<!DOCTYPE html>
<html>
<head profile="http://gmpg.org/xfn/11">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Business Case Innovation - Matthijs Vliegenthart - 0846154</title>
    <link rel="stylesheet" type="text/css" href="stylesheets/stylesheet.css"/>
    <script src="javascripts/jquery.js" type="text/javascript"></script>
    <script src="http://145.24.235.55:1337/socket.io/socket.io.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA3W4088Hl3Xya8eUgfSoe8BItDZL2M_Ss&sensor=true&v=3&libraries=geometry"></script>
    <script src="javascripts/main.js" type="text/javascript"></script>
    <script src="javascripts/createRoute.js" type="text/javascript"></script>
    <script src="javascripts/map.js" type="text/javascript"></script>
    <script src="javascripts/route.js" type="text/javascript"></script>
</head>
    <body>
        <div class="login">
            <div class="login-content">
                <h1>Login: </h1>
                <input type="text" id="login-name" placeholder="Username">
                <select id="login-role">
                    <option value="">Rol</option>
                    <option value="Loper">Loper</option>
                    <option value="Begeleider">Begeleider</option>
                </select>
                <button onclick="loginUser()">login</button>
            </div>
        </div>
        <div class="header">
            <div class="wrapper">
                <ul class="header-menu">
                    <li rel="chat-main">Chat</li>
                    <li rel="create-route-main">Create Route</li>
                    <li rel="map-main">Map</li>
                    <li rel="route-main">Route</li>
                </ul>
            </div>
        </div>
        <div class="main">
            <div class="chat-main main-container">
                <div class="wrapper">
                    <div class="chat">
                        <div id="chat-output"></div>
                        <input type="text" id="chat-input"/>
                    </div>
                    <div class="chat-users">

                    </div>
                </div>
            </div>
            <div class="create-route-main main-container">
                <div class="wrapper">
                    <div class="create-route-options">
                        <div class="create-route-option" rel="punt">Punt</div>
                        <div class="create-route-option" rel="post">Post</div>
                    </div>
                    <div id="create-route-canvas"></div>
                    <button onclick="clearRoute()">Clear Route</button>
                    <button onclick="startRoute()">Start Route</button>
                </div>
            </div>
            <div class="map-main main-container">
                <div class="wrapper">
                    <div id="map-canvas"></div>
                </div>
            </div>
            <div class="route-main main-container">
                <div class="wrapper">
                    <p class="route-status">Route is nog niet gestart</p>
                    <div class="route-output"></div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="wrapper"></div>
        </div>
    </body>
</html>