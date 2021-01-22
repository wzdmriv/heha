function genURL(){
    $(function(){
        var room_id = document.forms.form1.room_id.value;
        document.getElementById( "room_id_2" ).value = room_id;
        var mail_address = document.forms.form1.mail_address.value;
        var url = "https://wzdmriv.github.io/heha/heha_button.html?room_id=" + room_id
        document.getElementById( "gend_url" ).value = url;

        //QRコード表示
        var utf8qrtext = unescape(encodeURIComponent(url));
        $("#img-qr").html("");
        $("#img-qr2").html("");
        $("#img-qr").qrcode({width:200,height:200,text:utf8qrtext}); 
        var canvas = $("#canvas")[0];
        var ctx_canvas = canvas.getContext("2d");
        var qr = ctx_canvas.getImageData(0,0,200,200);
        var img_qr1 = document.createElement("canvas");
        img_qr1.id ="img-qr1";
        img_qr1.width=240;
        img_qr1.height=240;
        var ctx_canvas1 = img_qr1.getContext("2d");
        ctx_canvas1.fillStyle = "rgb(255, 255, 255)";
        ctx_canvas1.fillRect(0,0,240,240);
        ctx_canvas1.putImageData(qr, 20, 20);
        var img_src = img_qr1.toDataURL("image/png");
        $("#img-qr").html('');
        $("#img-qr1").html('');
        $("#img-qr2").attr("src",img_src);
        
        //データベース登録
        db.ref("/idList").child(room_id).child("config").set({mail:mail_address,time:10,weight:10,ha:"disable"});
    });
}

function copyURL(){
    document.getElementById( "gend_url" ).select();
    document.execCommand("Copy");
    alert("コピー完了：" + gend_url.value);
}

function selectMode() {
	var element = document.getElementById( "gen" ) ;
	if ( element.checked ) {
		document.getElementById("form2").style.display ="none";
		document.getElementById("form1").style.display ="inline-block";
	}else{
		document.getElementById("form1").style.display ="none";
		document.getElementById("form2").style.display ="inline-block";
	}
}

function load_conf(){
    var room_id = document.forms.form2.room_id_2.value;
    var config_ref = db.ref("/idList").child(room_id).child("config");
    config_ref.on('value', (snapshot) =>{
        const data = snapshot.val();
        document.getElementById( "time_conf" ).value = data.time;
        document.getElementById( "weight_conf" ).value = data.weight;
        document.getElementById( "heha" ).value = data.ha;
    });
}

function update_conf(){
    var room_id = document.forms.form2.room_id_2.value;
    db.ref("/idList").child(room_id).child("config/time").set(Number(document.getElementById( "time_conf" ).value));
    db.ref("/idList").child(room_id).child("config/weight").set(Number(document.getElementById( "weight_conf" ).value));
    db.ref("/idList").child(room_id).child("config/ha").set(document.getElementById( "heha" ).value);
}