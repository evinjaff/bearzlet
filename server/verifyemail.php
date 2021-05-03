<?php

require_once __DIR__ . '/vendor/autoload.php';

$client = new MongoDB\Client(
    'mongodb+srv://quizletadmin:programmersocks@cluster0.atcri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
$db = $client->test;

//echo $client;
$collection = $client->quizlet->accounts;

/*
$_POST['username'] = "megan";
$_POST['token'] = "ldksfja;";
*/

if(isset($_POST['username'])){

    $document = $collection->findOne(['username' => $_POST['username']] );
    
    if($document["verified"] != null){
        //echo "we got em";
        //var_dump($document["verified"]);

        //var_dump($_POST['token']);

        if (strcmp($_POST['token'], $document["verified"]) === 0) {
            //echo 'token matches, update their record';

            $result = $collection->updateOne(
                array("username"=> $_POST['username']),
                array ('$set' => array('verified' => true))
            );

            if($result->getModifiedCount() > 0){
                echo '{"status": true}';
                exit;
            }

            //printf(" Modified %d collections", $result->getModifiedCount());

            //var_dump($result);

        }

    }
}

echo '{"status": false}';
exit;
?>