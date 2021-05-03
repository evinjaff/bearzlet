<?php 

//require_once __DIR__ . '/vendor/autoload.php';

//mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb

require_once __DIR__ . '/vendor/autoload.php';

//echo '<meta http-equiv="refresh" content="10">';

//require 'vendor/autoload.php';
$username = $_POST['username'];

$client = new MongoDB\Client(
    'mongodb+srv://quizletadmin:programmersocks@cluster0.atcri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
$db = $client->test;

//echo $client;

$collection = $client->quizlet->accounts;

$document = $collection->findOne(['username' => $username ] );


//{"_id":{"$oid":"60765b64e0908b7126d0d0f2"},"username":"megan","hashed_pwd":"","email":"megan@wustl.edu","starredsets":["0","1"]}




//////var_dump($document);

echo json_encode(iterator_to_array($document));


?>