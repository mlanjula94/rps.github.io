  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyD7WpykEDcMGQLVYBEKMWqrkrEJ7O9Auus",
      authDomain: "class-project-e98c0.firebaseapp.com",
      databaseURL: "https://class-project-e98c0.firebaseio.com",
      projectId: "class-project-e98c0",
      storageBucket: "class-project-e98c0.appspot.com",
      messagingSenderId: "304603598474"
  };

  firebase.initializeApp(config);
  // Create reference to our database
  var database = firebase.database();
  // Submit our new train info
  $('#add-train-btn').on('click', function (event) {
      event.preventDefault();

      // Grab values from form
      var name = $('#train-name-input')
          .val();
      var destinatin = $('#destination-input')
          .val();
      var startTime = $('#start-input')
          .val();
      var frequency = parseInt(
          $('#frequency-input')
          .val());

      // PUSH a new entry into our database, not overwrite (SET)
      database.ref().push({
          name: name,
          destination: destinatin,
          startTime: startTime,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      // Clear out our form fields


      var firstTrainConverted = moment(startTime, "hh:mm").subtract("1, years");
      // the time difference between current time and the first train
      var difference = moment().diff(moment(firstTrainConverted), "minutes");
      var remainder = difference % frequency;
      var minUntilTrain = frequency - remainder;
      var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");
      location.href = "./index.html";

  });

  database.ref().on('child_added', function (childSnapshot) {
      console.log(childSnapshot.val());

      // Get data out of our child snapshot
      var childName = childSnapshot.val().name;
      var childDestination = childSnapshot.val().destination;
      var childStart = childSnapshot.val().startTime;
      var childFrequency = childSnapshot.val().frequency;

      var firstTrainConverted = moment(childStart, "hh:mm").subtract("1, years");
      // the time difference between current time and the first train
      var difference = moment().diff(moment(firstTrainConverted), "minutes");
      var remainder = difference % childFrequency;
      var minUntilTrain = childFrequency - remainder;
      var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");




      // Add row to our table
      $('#train-data').append("<tr><td>" + childName + "</td><td>" + childDestination + "</td><td>" +
          childFrequency + "</td><td>" + nextTrain + "</td><td>" + minUntilTrain + "</td></tr>");
  });