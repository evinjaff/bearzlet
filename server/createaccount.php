<?php 
  require_once __DIR__ . '/vendor/autoload.php';

	//Referenced From: https://stackoverflow.com/questions/4356289/php-random-string-generator
	/**
	 * Generate a random string, using a cryptographically secure 
	 * pseudorandom number generator (random_int)
	 *
	 * This function uses type hints now (PHP 7+ only), but it was originally
	 * written for PHP 5 as well.
	 * 
	 * For PHP 7, random_int is a PHP core function
	 * For PHP 5.x, depends on https://github.com/paragonie/random_compat
	 * 
	 * @param int $length      How many characters do we want?
	 * @param string $keyspace A string of all possible characters
	 *                         to select from
	 * @return string
	 */
	function random_str(
		int $length = 64,
		string $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	): string {
		if ($length < 1) {
			throw new \RangeException("Length must be a positive integer");
		}
		$pieces = [];
		$max = mb_strlen($keyspace, '8bit') - 1;
		for ($i = 0; $i < $length; ++$i) {
			$pieces []= $keyspace[random_int(0, $max)];
		}
		return implode('', $pieces);
	}

session_name('programmer_socks');

session_start();

$previous_ua = @$_SESSION['useragent'];
$current_ua = $_SERVER['HTTP_USER_AGENT'];
  
if(isset($_SESSION['useragent']) && $previous_ua !== $current_ua){
	die("Session hijack detected");
}else{
	$_SESSION['useragent'] = $current_ua;
}



//echo '<meta http-equiv="refresh" content="10">';

//require 'vendor/autoload.php';

$client = new MongoDB\Client(
    'mongodb+srv://quizletadmin:programmersocks@cluster0.atcri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
$db = $client->test;


$collection = $client->quizlet->accounts;

// the message
$msg = "First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("evin@wustl.edu","My subject",$msg);

/*

if( !(isset($_POST['password'])) && !(isset($_POST['user'])) && !(isset($_POST['email']))){
  echo "No params";
  exit;
}
*/

/*
$pw = $_POST['password'];

$user = $_POST['user'];

$email = $_POST['email'];
*/

$pw = "hewwo";

$user = "evin";

$email = "evin@wustl.edu";

use Mailgun\Mailgun;


/*
# Include the Autoloader (see "Libraries" for install instructions)
require 'vendor/autoload.php';
use Mailgun\Mailgun;

# Instantiate the client.
$mgClient = new Mailgun('3850608313c51bd7594c3e7b51d4b3e9-4b1aa784-848c58aa');
$domain = "sandbox623e8d35b88447bc8e67ca2240853895.mailgun.org";

# Make the call to the client.
$result = $mgClient->sendMessage("$domain",
	array('from'    => 'Mailgun Sandbox <postmaster@sandbox623e8d35b88447bc8e67ca2240853895.mailgun.org>',
		  'to'      => 'Evin Jaff <evin@wustl.edu>',
		  'subject' => 'Hello Evin Jaff',
		  'text'    => 'Congratulations Evin Jaff, you just sent an email with Mailgun!  You are truly awesome! '));

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.
*/


$msg = "First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("evin@wustl.edu","My subject",$msg);

//$dupe = $collection->findOne(['user' => $user]);
$uname = $collection->findOne(['username' => $user]);
$uemail = $collection->findOne(['email' => $email]);

var_dump($uname);
var_dump($uemail);

if($uname == null && $uemail == null){
  //No overlap
  echo "account not found - make one";

  $hash = password_hash("".$pw , PASSWORD_BCRYPT);





// First, instantiate the SDK with your API credentials
	$mg = Mailgun::create('3850608313c51bd7594c3e7b51d4b3e9-4b1aa784-848c58aa');

	// Now, compose and send your message.

	$verifytoken = random_str(6);

	$mg->messages()->send('sandbox623e8d35b88447bc8e67ca2240853895.mailgun.org', [
	'from' => 'Bearzlet Support <mailgun@sandbox623e8d35b88447bc8e67ca2240853895.mailgun.org>',
	'to' => 'Bearzlet User <'.$email.'>',
	'subject' => 'Please verify your email',
	'text' => 'Hi, '. $user . '. Your email token is: ' . $verifytoken . '. Please go to "verify email" in the application to verify it'
	]);

  $insertOneResult = $collection->insertOne([
    'username' => $user,
    'hashed_pwd' => $hash,
    'email' => $email,
    'starredsets' => [],
    'verified' => $verifytoken
]);

printf("Inserted %d document(s)\n", $insertOneResult->getInsertedCount());


}
else{
  echo "{error: '";
  if($uname != null){
    echo "username";
  }
  if($uemail != null){
    echo "*email";
  }
  echo "'}";
  
}


/*
//input filtering using https://www.php.net/manual/en/function.filter-var.php
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
if (!(!filter_var($email, FILTER_VALIDATE_EMAIL) === false)) {
    echo $email;
    echo json_encode(array( "status" => htmlentities($email)+" is not valid"));
  exit;
}

if (!(!filter_var($user, FILTER_SANITIZE_SPECIAL_CHARS) === false)) {
    echo json_encode(array( "status" => "faileduser"));
  exit;
}

if (strcmp($pw,"")==0) {
    echo json_encode(array( "status" => "failedpassword"));
  exit;
}
*/




//{"_id":{"$oid":"60765b64e0908b7126d0d0f2"},"username":"megan","hashed_pwd":"","email":"megan@wustl.edu","starredsets":["0","1"]}




//////var_dump($document);


?>


