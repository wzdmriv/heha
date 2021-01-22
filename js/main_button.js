function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function touchstart_he(){
    var he_button = document.getElementById("he_button");
    he_button.style.backgroundColor = "white";
}
function touchend_he(){
    var he_button = document.getElementById("he_button");
    he_button.style.backgroundColor = "aquamarine";
    db.ref("/idList").child(room_id).child("data").set("hello");

window.onload = function() {
    var room_id = getParam('room_id');
    var dbref = db.ref("/idList").child(room_id).child("config");
    dbref.on('value', (snapshot) =>{
        const data = snapshot.val();
        const data_json = Object.keys(data);
        console.log("hello1");
        console.log(data_json[0]);
    });
    var he_button = document.getElementById("he_button");
    he_button.addEventListener("touchstart",touchstart_he);
    he_button.addEventListener("touchend",touchend_he);

};