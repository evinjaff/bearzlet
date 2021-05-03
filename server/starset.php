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

//prep array
$user = $_POST['user'];
$setName = $_POST['name'];

require_once __DIR__ . '/vendor/autoload.php';

$client = new MongoDB\Client(
    'mongodb+srv://quizletadmin:programmersocks@cluster0.atcri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
$collection = $client->quizlet->accounts;

//array syntax for mongodb in php https://stackoverflow.com/questions/4638368/push-new-value-to-mongodb-inner-array-mongodb-php
$result = $collection->updateOne(
    array("username"=>$user),
    array('$addToSet' => array("starredsets" => $setName))
);
//var_dump($result);
?>