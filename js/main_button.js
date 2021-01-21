function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var room_id = getParam('room_id');
var dbref = db.ref("/idList").child(room_id).child("config");
dbref.on('value', (snapshot) =>{
    const data = snapshot.val();
    console.log(data);
});