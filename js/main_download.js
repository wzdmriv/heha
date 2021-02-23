function downloadData(){
    var config_ref = db.ref("/idList");
        config_ref.once('value', (snapshot) =>{
            const fileName = "allData.json";
            const data = JSON.stringify(snapshot.val());
            var blob = new Blob([data],{type:'text/plain'});
            $('#btnDownloadJson').attr('href',URL.createObjectURL(blob));
            $('#btnDownloadJson').attr('target','_blank');
            $('#btnDownloadJson').attr('download',"allData.json");
        });
}

downloadData();