db.ref("/reslist").child("keylist").set("hello");

document.addEventListener('click', function() {
    document.getElementById('sleep-prevent-video-ios').play();
    document.getElementById('sleep-prevent-video-android').play();
});

setInterval(function(){
    document.getElementById('sleep-prevent-video-ios').play();
    document.getElementById('sleep-prevent-video-android').play();
}, 10000);