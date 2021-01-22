var room_id = getParam('room_id');
var time_conf = 10;
var weight_conf = 10;
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
    var d = new Date();
    db.ref("/idList").child(room_id).child("data").child(d.valueOf()).set("1");
}
function refresh_data(){
    var data_ref = db.ref("/idList").child(room_id).child("data");
    data_ref.on('value', (snapshot) =>{
        const data = snapshot.val();
        if (data){
            const time_list = Object.keys(data);
            var timer = function() {db.ref("/idList").child(room_id).child("data").child(time_list[0]).set(null);}
            var d = new Date();
            if (Number(d) - Number(time_list[0]) > time_conf * 1000){
                db.ref("/idList").child(room_id).child("data").child(time_list[0]).set(null);
            }else{
                setTimeout(timer, (time_conf * 1000) - Number(d) + Number(time_list[0]));
            }
        }
    });
}

window.onload = function() {
    var config_ref = db.ref("/idList").child(room_id).child("config");
    config_ref.on('value', (snapshot) =>{
        const data = snapshot.val();
        const data_json = Object.keys(data);
        console.log("hello1");
        console.log(data_json[0]);
    });
    var he_button = document.getElementById("he_button");
    he_button.addEventListener("touchstart",touchstart_he);
    he_button.addEventListener("touchend",touchend_he);
    refresh_data();
}