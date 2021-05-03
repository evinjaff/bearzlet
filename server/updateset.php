<?php
//yay security
session_name('programmer_socks');
 session_start();  
 $previous_ua = @$_SESSION['useragent'];
 $current_ua = $_SERVER['HTTP_USER_AGENT'];
   
 if(isset($_SESSION['useragent']) && $previous_ua !== $current_ua){
     die("Session hijack detected");
 }else{
     $_SESSION['useragent'] = $current_ua;
 }

/*
if (!isset($_POST['name']) || is_null($_POST['name'])){
    echo "nothing set";
    exit;
}
*/

//prep array
$setName = $_POST['name'];
$index = $_POST['index'];
$correct = $_POST['correct'];

$secondIndex;
if ($correct==="true"){
    $secondIndex = 2;
} else {
    $secondIndex = 3;
}
//how to index for mongo in php from https://stackoverflow.com/questions/13095451/mongodb-increment-multiple-document-array-values-in-php
$loc = "cards.".$index.".".$secondIndex;

require_once __DIR__ . '/vendor/autoload.php';

$client = new MongoDB\Client(
    'mongodb+srv://quizletadmin:programmersocks@cluster0.atcri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
$collection = $client->quizlet->sets;

$result = $collection->updateOne(
     array("name"=>$setName),
     array('$inc' => array($loc => 1))
);
var_dump($result);
?>