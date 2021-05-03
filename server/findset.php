
<?php
/*
{
    "_id": {
        "$oid": "608621779834a9e718e51bc1"
    },
    "name": "she/they pronouns",
    "cards": [
        ["word", "def", {
            "$numberInt": "4"
        }, {
            "$numberInt": "2"
        }],
        ["word1", "def1", {
            "$numberInt": "3"
        }, {
            "$numberInt": "3"
        }]
    ]
}
*/


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

//echo '<meta http-equiv="refresh" content="10">';

//require 'vendor/autoload.php';

$client = new MongoDB\Client(
    'mongodb+srv://quizletadmin:programmersocks@cluster0.atcri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
$db = $client->test;


$collection = $client->quizlet->sets;

$pw = $_POST['password'];

$user = $_POST['user'];

$email = $_POST['email'];

$contents = $_POST['contents']; // as a string

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

$setname = $collection->findOne(['setname' => $setname]);

var_dump($setname);

if($setname == null){
  //No overlap - Make the set

$insertOneResult = $collection->insertOne([
    'username' => $user,
    'hashed_pwd' => $hash,
    'email' => $email,
    'starredsets' => []
]);

printf("Inserted %d document(s)\n", $insertOneResult->getInsertedCount());


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