function downloadData(){
    var config_ref = db.ref("/idList");
    config_ref.once('value', (snapshot) =>{
        const data = JSON.stringify(snapshot.val());
        var blob = new Blob([data],{type:'text/plain'});
        $('#btnDownloadJson').attr('href',URL.createObjectURL(blob));
        $('#btnDownloadJson').attr('target','_blank');
        $('#btnDownloadJson').attr('download',"allData.json");
    });
}

downloadData();

function countData(){
    var all_ref = db.ref("/idList");
    all_ref.once('value', (snapshot) =>{
        const data = snapshot.val();
        const room_list = Object.keys(data);
        for (var i=0; i<room_list.length; i++){
            const ishe_list = Object.keys(data[room_list[i]]);
            if(ishe_list.some(value => value == "he_data")){
                s_list = Object.keys(data[room_list[i]]["he_data"]);
                for (var j=0; j<s_list.length; j++){
                    he_list = Object.keys(data[room_list[i]]["he_data"][s_list[j]]);
                    console.log(room_list[i]+"---"+s_list[j]+"---"+he_list.length)
                }
            }
        }
    });
}

countData();