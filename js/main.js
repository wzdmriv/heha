db.ref("/reslist").child("keylist").set("hello");
document.addEventListener('click', function() {
    document.getElementById('sleep-prevent-video-ios').play();
    document.getElementById('sleep-prevent-video-android').play();
});
setInterval(function(){
    document.getElementById('sleep-prevent-video-ios').play();
    document.getElementById('sleep-prevent-video-android').play();
    console.log("hello")
}, 20000);

iosSleepPreventInterval = setInterval(function () {
    window.location.href = "/new/page";
    window.setTimeout(function () {
        window.stop()
    }, 0);
    console.log("hello2")
}, 10000);