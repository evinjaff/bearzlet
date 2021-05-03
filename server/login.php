<?php 



session_name('programmer_socks');

session_start(); 

$previous_ua = @$_SESSION['useragent'];
$current_ua = $_SERVER['HTTP_USER_AGENT'];
  
if(isset($_SESSION['useragent']) && $previous_ua !== $current_ua){
	die("Session hijack detected");
}else{
	$_SESSION['useragent'] = $current_ua;
}

require_once __DIR__ . '/vendor/autoload.php';

use Mailgun\Mailgun;


//echo '<meta http-equiv="refresh" content="10">';

//require 'vendor/autoload.php';

$client = new MongoDB\Client(
    'mongodb+srv://quizletadmin:programmersocks@cluster0.atcri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
$db = $client->test;

// $_POST['username'] = "evin";

// $_POST['password'] = "hewwo";

if(isset($_POST['username']) && isset($_POST['password'])){
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	$collection = $client->quizlet->accounts;

	$document = $collection->findOne(['username' => $username], ['verified' => "true"]);

	$pwd_guess = $password;

	// var_dump($document);

	if ($document != null){

		if ($document['verified'] === true){

			$pwd_hashed = $document['hashed_pwd'];

			if(password_verify($pwd_guess, $pwd_hashed)){
				echo '{"status": true}';
			}
			else{
				echo '{"status": false}';
			}
		}
		else{
			echo '{"status": false}';
		}

	//{"_id":{"$oid":"60765b64e0908b7126d0d0f2"},"username":"megan","hashed_pwd":"","email":"megan@wustl.edu","starredsets":["0","1"]}
	}
}
else{
	echo '{"status": false}';
}


?>


