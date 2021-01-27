var room_id = getParam('room_id');
var time_conf = 10;
var weight_conf = 10;
var heha = "";
var he_number = 0;
var ha_number = 0;
var he_flag = 0;
var ha_flag = 0;

//URLからroom_idを取得
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//Firebaseサーバーから現在地を取得
function get_date(){
    var get_date = db.ref("/get_date");
    var newPostKey = get_date.push().key;
    db.ref("/get_date").child(newPostKey).set(firebase.database.ServerValue.TIMESTAMP);
    var data = 0;
    get_date.child(newPostKey).once('value', (snapshot) =>{
        data = snapshot.val();
    });
    db.ref("/get_date").child(newPostKey).set(null);
    return data;
}

//背景色更新
function he_color(weight){
    var he_button = document.getElementById("he_button");
    if (0<=weight && weight<100){
        he_flag = 0;
        var color = "rgb(" + (150-weight*1.5) + ", 255, " + (150-weight*1.5) + ")";
        he_button.style.backgroundColor = color;
    }else if(weight>=100){
        he_flag = 1;
        var color = "rgb(0, 255, 0)";
        he_button.style.backgroundColor = color;
        var interval = setInterval(function(){
            $('#he_button').fadeOut(200,function(){$(this).fadeIn(200)});
            if (he_flag == 0){
                clearInterval(interval);
            }
        },400);
    }
}
function ha_color(weight){
    var ha_button = document.getElementById("ha_button");
    if (0<=weight && weight<100){
        ha_flag = 0;
        var color = "rgb(255, " + (150-weight*1.5) + ", " + (150-weight*1.5) + ")";
        ha_button.style.backgroundColor = color;
    }else if(weight>=100){
        ha_flag = 1;
        var color = "rgb(255, 0, 0)";
        ha_button.style.backgroundColor = color;
        var interval = setInterval(function(){
            $('#ha_button').fadeOut(200,function(){$(this).fadeIn(200)});
            if (ha_flag == 0){
                clearInterval(interval);
            }
        },400);
    }
}

//タッチ時実行タスク
function touchstart_he(){
    document.getElementById("he_button").style.backgroundColor = "#C0C0C0";
}
function touchend_he(){
    he_color(he_number * weight_conf);
    var millisec = get_date();
    var date = new Date(millisec);
    db.ref("/idList").child(room_id).child("he_data_temp").child(millisec).set(1);
    db.ref("/idList").child(room_id).child("he_data").child(date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+"-t"+time_conf+"-w"+weight_conf).child(millisec).set(1);
}
function touchstart_ha(){
    document.getElementById("ha_button").style.backgroundColor = "#C0C0C0";
}
function touchend_ha(){
    ha_color(ha_number * weight_conf);
    var millisec = get_date();
    var date = new Date(millisec);
    db.ref("/idList").child(room_id).child("ha_data_temp").child(millisec).set(1);
    db.ref("/idList").child(room_id).child("ha_data").child(date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+"-t"+time_conf+"-w"+weight_conf).child(millisec).set(1);
}

//へぇはぁ蓄積数データベース更新
function refresh_data_he(){
    var data_ref = db.ref("/idList").child(room_id).child("he_data_temp");
    data_ref.on('value', (snapshot) =>{
        const data = snapshot.val();
        if (data){
            const time_list = Object.keys(data);
            he_number = time_list.length;
            console.log(he_number)
            he_color(he_number * weight_conf);
            var timer = function() {db.ref("/idList").child(room_id).child("he_data_temp").child(time_list[0]).set(null);}
            var d = get_date();
            if (d - Number(time_list[0]) > time_conf * 1000){
                db.ref("/idList").child(room_id).child("he_data_temp").child(time_list[0]).set(null);
            }else{
                setTimeout(timer, (time_conf * 1000) - d + Number(time_list[0]));
            }
        }else{
            he_number = 0;
            console.log(he_number)
            he_color(he_number * weight_conf);
        }
    });
}
function refresh_data_ha(){
    var data_ref = db.ref("/idList").child(room_id).child("ha_data_temp");
    data_ref.on('value', (snapshot) =>{
        const data = snapshot.val();
        if (data){
            const time_list = Object.keys(data);
            ha_number = time_list.length;
            console.log(ha_number)
            ha_color(ha_number * weight_conf);
            var timer = function() {db.ref("/idList").child(room_id).child("ha_data_temp").child(time_list[0]).set(null);}
            var d = get_date();
            if (d - Number(time_list[0]) > time_conf * 1000){
                db.ref("/idList").child(room_id).child("ha_data_temp").child(time_list[0]).set(null);
            }else{
                setTimeout(timer, (time_conf * 1000) - d + Number(time_list[0]));
            }
        }else{
            ha_number = 0;
            console.log(ha_number)
            ha_color(ha_number * weight_conf);
        }
    });
}

//ウィンドウレイアウト更新
function heha_layout(){
    var ww = window.innerWidth;
    var hh = window.innerHeight;
    var cw = $("#nosleep_conf").outerWidth();
    var ch = $("#nosleep_conf").outerHeight();
    $("#nosleep_conf").css( {"left": ((ww - cw)/2) + "px","top": ((hh - ch)/2) + "px"} ) ;

    if (heha=="disable"){
        $('#ha_button').css({
            'display':'none'
        });
        $('.hehabutton').css({
            'height':hh + "px"
        });
    }else if(ww>500){
        $('#ha_button').css({
            'display':'flex'
        });
        $('.hehabutton').css({
            'height':hh + "px"
        });
    }else{
        $('#ha_button').css({
            'display':'flex'
        });
        $('.hehabutton').css({
            'height':(hh/2) + "px"
        });
    }
}

//初回実行
window.onload = function() {
    if (room_id==""){
        alert("このURLは存在しません");
    }else{
        var config_ref = db.ref("/idList").child(room_id).child("config");
        config_ref.on('value', (snapshot) =>{
            const data = snapshot.val();
            if(data){
                time_conf = data.time;
                weight_conf = data.weight;
                heha = data.ha;
                heha_layout();
                $(window).resize(heha_layout);
                nosleep_id = document.getElementById("nosleep_id");
                nosleep_id.innerHTML = "room_id："+room_id;
                //スリープ防止機能起動用ウィンドウ
                var noSleep = new NoSleep();
                $("#modal_overlay").fadeIn("fast");
                $("#nosleep_conf").fadeIn("fast");
                $("#close_nosleep").unbind().click(function(){
                    noSleep.enable();
                    $("#nosleep_conf").fadeOut("fast");
                    $("#modal_overlay").fadeOut("fast");
                });
            }else{
                alert("このURLは存在しません");
            }
        });
    }
    heha_layout();

    var he_button = document.getElementById("he_button");
    he_button.addEventListener("touchstart",touchstart_he);
    he_button.addEventListener("touchend",touchend_he);
    refresh_data_he();
    var a = document.getElementById("ha_button");
    ha_button.addEventListener("touchstart",touchstart_ha);
    ha_button.addEventListener("touchend",touchend_ha);
    refresh_data_ha();
}