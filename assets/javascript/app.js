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

  database.ref().on("child_added", function(snapshot) {
    var newTrainName = snapshot.val().name;
    var newTrainDestination = snapshot.val().destination;
    var newTrainTime = snapshot.val().time;
    var newTrainFrequency = snapshot.val().frequency;

    var currentTime = moment();

    var timeConverted = moment(newTrainTime, "HH:mm").subtract(1, "years");

    var timeDifference = moment().diff(moment(timeConverted), "minutes");

    var remainingTime = timeDifference % newTrainFrequency;

    var timeUntilNewTrain = newTrainFrequency - remainingTime;

    var nextTrain = moment().add(timeUntilNewTrain, "minutes");
    var nextTrainArrival = moment(nextTrain).format("HH:mm");
    console.log(currentTime);

    $("#trainData").append(`
    <tr>
    <td>${newTrainName}</td>
    <td>${newTrainDestination}</td>
    <td>${newTrainFrequency}</td>
    <td>${nextTrainArrival}</td>
    <td>${timeUntilNewTrain}</td>
    
  </tr>`);
  });
});
