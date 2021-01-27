function genURL(){
    var room_id = document.forms.form1.room_id.value;
    var mail_address = document.forms.form1.mail_address.value;
    if (room_id==""){
        errorbox = document.getElementById("errorbox");
    	errorbox.innerHTML = "ルームIDを入力してください";
    }else if(!(room_id.match(/^[a-zA-Z0-9_]*$/))){
        errorbox = document.getElementById("errorbox");
    	errorbox.innerHTML = "使用できない文字が含まれています";
    }else if(!(mail_address.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/))){
        errorbox = document.getElementById("errorbox");
    	errorbox.innerHTML = "有効なメールアドレスを入力してください";
    }else{
        var config_ref = db.ref("/idList").child(room_id).child("config");
        config_ref.once('value', (snapshot) =>{
            const data = snapshot.val();
            if(data){
                errorbox = document.getElementById("errorbox");
    	        errorbox.innerHTML = "このIDは既に使われています";
            }else{
                $(function(){
                    document.getElementById( "room_id_2" ).value = room_id;
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
                    errorbox = document.getElementById("errorbox");
                    errorbox.innerHTML = "";
                });
            }
        });
    }
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
    if (room_id==""){
        errorbox = document.getElementById("errorbox2");
        errorbox.innerHTML = "ルームIDを入力してください";
    }else{
        var config_ref = db.ref("/idList").child(room_id).child("config");
        config_ref.once('value', (snapshot) =>{
            const data = snapshot.val();
            if (data){
                document.getElementById("time_conf").value = data.time;
                document.getElementById("weight_conf").value = data.weight;
                document.getElementById("heha").value = data.ha;
                errorbox = document.getElementById("errorbox2");
                errorbox.innerHTML = "";
            }else{
                errorbox = document.getElementById("errorbox2");
                errorbox.innerHTML = "指定されたIDは無効です";
            }
        });
    }
}

function update_conf(){
    var room_id = document.forms.form2.room_id_2.value;
    var time_conf = Number(document.getElementById("time_conf").value);
    var weight_conf = Number(document.getElementById("weight_conf").value);
    var heha = document.getElementById("heha").value;
    if (room_id==""){
        errorbox = document.getElementById("errorbox3");
        errorbox.innerHTML = "ルームIDを入力してください";
    }else if (time_conf<0||weight_conf<0||weight_conf>100||heha==""){
        errorbox = document.getElementById("errorbox3");
    	errorbox.innerHTML = "無効な入力があります";
    }else{
        var config_ref = db.ref("/idList").child(room_id).child("config");
        config_ref.once('value', (snapshot) =>{
            const data = snapshot.val();
            if(data){
                db.ref("/idList").child(room_id).child("config/time").set(time_conf);
                db.ref("/idList").child(room_id).child("config/weight").set(weight_conf);
                db.ref("/idList").child(room_id).child("config/ha").set(heha);
                errorbox = document.getElementById("errorbox3");
                errorbox.innerHTML = "";
                alert("更新完了");
            }else{
                errorbox = document.getElementById("errorbox3");
    	        errorbox.innerHTML = "指定されたIDは無効です";
            }
        });
    }
}