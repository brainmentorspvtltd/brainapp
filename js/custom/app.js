// this file is used to register the service worker
if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js').then(()=>{
        console.log("Service Worker is Registered SuccessFully - Brain Mentors...");
    });
}
else{
    alert("Your Browser is Outdated Not Support Service Worker");
}
window.addEventListener("load",()=>{
    // Enable Notifications
document.querySelector("#notification-button").addEventListener("click",notifyMe);
document.querySelector("#gps").addEventListener("click",initiate_geolocation);
document.querySelector("#loadcamera").addEventListener("click",loadCamera);
document.querySelector("#snap").addEventListener("click",snapPhoto);
});

function notifyMe(){
    if('Notification' in window){
        console.log("Your Browser Support Notification...");
        askForPermission();
    }
    else{
        console.log("Your Browser Doesn't Support Any Notification Feature");
    }
}

function askForPermission(){
    window.Notification.requestPermission((result)=>{
        if(result!=='granted'){
            alert("No Notification Permission U Have....");
        }
        else{
            //alert("Congrats Granted");
            showNotification();
        }
    });
}

function showNotification(){
    const notificationOptions = {
        body : 'You Have Been SuccessFully Subscribe for Notifications',
        icon:'images/edit.png',
        image:'images/delete.png',
        vibrate:[100,50,200] // 100 ms vibrate 50 ms pause then 200 ms vibrate

    }
    //const notification = new Notification("SuccessFully Subscribed",notificationOptions);
    navigator.serviceWorker.ready
    .then(function(swreg) {
      swreg.showNotification('Successfully subscribed (from Brain Mentors Notifications)!', notificationOptions);
    });

}
var context;
function snapPhoto(){
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
}
var player;
var canvas;
function loadCamera(){
     player = document.getElementById('player');
     canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
      const constraints = {
        video: true,
      };
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          player.srcObject = stream;
        });
}

function initiate_geolocation() {
    navigator.geolocation.getCurrentPosition(handle_geolocation_query);
}

function handle_geolocation_query(position){
    var lat = position.coords.latitude;
    var longi = position.coords.longitude;
    alert('Lat: ' + lat + ' ' +
    'Lon: ' + longi);
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + longi + "&zoom=16&size=300x300&sensor=false";

    document.querySelector("#map").appendChild(img);
}
