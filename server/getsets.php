<?php 

session_name('programmer_socks');

session_start(); 

// = 'megan';

$previous_ua = @$_SESSION['useragent'];
$current_ua = $_SERVER['HTTP_USER_AGENT'];
  
if(isset($_SESSION['useragent']) && $previous_ua !== $current_ua){
	die("Session hijack detected");
}else{ 
	$_SESSION['useragent'] = $current_ua;
}

require_once __DIR__ . '/vendor/autoload.php';

//echo '<meta http-equiv="refresh" content="10">';

//require 'vendor/autoload.php';

$client = new MongoDB\Client(
    'mongodb+srv://quizletadmin:programmersocks@cluster0.atcri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
$db = $client->test;

if(isset($_POST['username'])){

	$username = $_POST['username'];

	$collection = $client->quizlet->sets;

	//Get the sets for YOUR username
	$document = $collection->find(['owner' => $username]);

	echo '{"user": '; 
	
	echo json_encode(iterator_to_array($document));

	echo ',"public":';

	//$manager->executeQuery('db.collection', $query);


	$others = $collection->find(["owner" => array('$ne' => $username), "privacy" => false] , ['limit' => 5]); 

	echo json_encode(iterator_to_array($others));

	echo "}";


}
else{
	echo '{"status": "frulse"}';
}


?>


