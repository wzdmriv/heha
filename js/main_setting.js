function genURL(){
    $(function(){
        var room_id = document.forms.form1.room_id.value;
        var mail_address = document.forms.form1.mail_address.value;
        var url = "https://wzdmriv.github.io/heha/heha_button.html?room_id=" + room_id
        document.getElementById( "gend_url" ).value = url;
        var utf8qrtext = unescape(encodeURIComponent(url));
        $("#img-qr").html("");
        $("#img-qr").qrcode({width:200,height:200,text:utf8qrtext}); 
        var canvas = $("#canvas")[0]; //#canvasからcanvas要素を取得。[0]をつけるのがポイント。
        var img_src = canvas.toDataURL("image/png"); //toDataURLでpng形式に変換
        $("#img-qr").html(''); //canvas要素を削除
        $("#img-qr1").attr("src",img_src); //pngを表示
        db.ref("/idList").child(room_id).child("config").set({mail:mail_address,time:10,weight:10,ha:"disable"});
    });
}

function copyURL(){
    var gend_url = document.getElementById( "gend_url" )
    gend_url.select();
    document.execCommand("Copy");
    alert("コピー完了：" + gend_url.value);
}