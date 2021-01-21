db.ref("/reslist").child("keylist").set("hello");

function genURL(){
    $(function(){
        var room_id = document.forms.form1.room_id.value;
        var mail_address = document.forms.form1.mail_address.value;
        var url = "https://wzdmriv.github.io/heha/heha_button.html?room_id=" + room_id
        document.getElementById( "gend_url" ).value = url;
        var utf8qrtext = unescape(encodeURIComponent(url));
        $("#img-qr").html("");
        $("#img-qr").qrcode({width:200,height:200,text:utf8qrtext}); 
    });
}

function copyURL(){
    var gend_url = document.getElementById( "gend_url" )
    gend_url.select();
    document.execCommand("Copy");
    alert("コピー完了：" + gend_url.value);
}