/*
 
 From JS:
 
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBtGT4gtRsDOPpQsiCxw0L_04peL2HY2oQ",
    authDomain: "quizlet-3ac2a.firebaseapp.com",
    projectId: "quizlet-3ac2a",
    storageBucket: "quizlet-3ac2a.appspot.com",
    messagingSenderId: "623871812516",
    appId: "1:623871812516:web:0c3dd32b3ca517acd5d731",
    measurementId: "G-K31T175KMY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
 */
<?php
/*
$firebaseConfig = {
  apiKey: "AIzaSyBtGT4gtRsDOPpQsiCxw0L_04peL2HY2oQ",
  authDomain: "quizlet-3ac2a.firebaseapp.com",
  projectId: "quizlet-3ac2a",
  storageBucket: "quizlet-3ac2a.appspot.com",
  messagingSenderId: "623871812516",
  appId: "1:623871812516:web:0c3dd32b3ca517acd5d731",
  measurementId: "G-K31T175KMY"
}; */
    
    use Kreait\Firebase\Factory;

    $factory = (new Factory)
        ->withServiceAccount('/path/to/firebase_credentials.json')
        ->withDatabaseUri('https://my-project-default-rtdb.firebaseio.com');

    $auth = $factory->createAuth();
    $realtimeDatabase = $factory->createDatabase();
    $cloudMessaging = $factory->createMessaging();
    $remoteConfig = $factory->createRemoteConfig();
    $cloudStorage = $factory->createStorage();
    $firestore = $factory->createFirestore();

    
    
?>
