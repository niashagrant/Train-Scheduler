$(document).ready(function() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAALvsKIZJMJlsZZiIOSs2t43YG9Txm-6w",
    authDomain: "train-scheduler-3d957.firebaseapp.com",
    databaseURL: "https://train-scheduler-3d957.firebaseio.com",
    projectId: "train-scheduler-3d957",
    storageBucket: "train-scheduler-3d957.appspot.com",
    messagingSenderId: "727678218408",
    appId: "1:727678218408:web:23929194c709a1198cd29d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#submitTrainData").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName")
      .val()
      .trim();
    var trainDestination = $("#destination")
      .val()
      .trim();
    var trainTime = $("#trainTime")
      .val()
      .trim();
    var minutesAway = 0;
    var trainFrequency = $("#frequency")
      .val()
      .trim();

    var trainInfo = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency,
      minutes: minutesAway
    };

    database.ref().push(trainInfo);

    console.log(trainInfo.name);
    console.log(trainInfo.destination);
    console.log(trainInfo.time);
    console.log(trainInfo.frequency);
    console.log(trainInfo.minutes);
  });
});
