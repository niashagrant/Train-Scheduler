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
  var timeNow = moment().format("HH:mm");
  console.log(timeNow);
  $("#curentTime").append(`${timeNow}`);

  $("#submitTrainData").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName")
      .val()
      .trim();
    var trainDestination = $("#destination")
      .val()
      .trim();
    var firstTrainTime = $("#trainTime")
      .val()
      .trim();

    var trainFrequency = $("#frequency")
      .val()
      .trim();

    var trainInfo = {
      name: trainName,
      destination: trainDestination,
      time: firstTrainTime,
      frequency: trainFrequency
    };

    database.ref().push(trainInfo);

    console.log(trainInfo.name);
    console.log(trainInfo.destination);
    console.log(trainInfo.time);
    console.log(trainInfo.frequency);

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
    var currentTime = moment().format("HH:mm");

    console.log(currentTime);
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    var firstTrainTimeCoversion = moment(firstTrainTime, "hh:mm").subtract(
      1,
      "years"
    );

    var trainTimeDifference = moment().diff(
      moment(firstTrainTimeCoversion),
      "minutes"
    );
    var timeLeftOver = trainTimeDifference % trainFrequency;
    var minutesAway = trainFrequency - timeLeftOver;
    var nextArrivingTrain = moment()
      .add(minutesAway, "minutes")
      .format("hh:mm");
    $("#trainData").append(`
      <tr>
      <td>${trainName}</td>
      <td>${trainDestination}</td>
      <td>${trainFrequency}</td>
      <td>${nextArrivingTrain}</td>
      <td>${minutesAway}</td>
      
    </tr>`);
  });
});
