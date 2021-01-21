// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();
var reslist = db.ref("/reslist");