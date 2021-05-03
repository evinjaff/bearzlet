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



if (!isset($_POST['name']) || is_null($_POST['name'])){
    echo "nothing set";
    exit;
}

//prep array
 $username = $_POST['user'];
 $setName = $_POST['name'];
 $privacystr = $_POST['privacy'];
 $contents = $_POST['contents'];
 $words = [];
 $definitions = [];
 $finalCards = array(array());

 //string to boolean conversion from https://stackoverflow.com/questions/7336861/how-to-convert-string-to-boolean-php/15075609
 $privacy = $privacystr === 'true'? true: false;

 foreach ( $contents as $line ) {
    $pieces = explode(";", $line);
    $words[] = $pieces[0];
    $definitions[] = $pieces[1];
}
$count = count($words);

for ($i = 0; $i < $count; $i++){
    $finalCards[$i][0] = $words[$i];
    $finalCards[$i][1] = trim($definitions[$i]);  
    $finalCards[$i][2] = 0;
    $finalCards[$i][3] = 0;
}

echo "name is $setName";
echo "security is $privacy";
//echo "contents: $finalCards";
 
//database setup things
require_once __DIR__ . '/vendor/autoload.php';

$client = new MongoDB\Client(
    'mongodb+srv://quizletadmin:programmersocks@cluster0.atcri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
$collection = $client->quizlet->sets;

if (is_null($collection->findOne(['name' => $setName]))){

    $insertOneResult = $collection->insertOne([
        'name' => $setName,
        'privacy' => $privacy,
        'cards' => $finalCards,
        'owner' => $username
    ]);

    printf("Inserted %d document(s)\n", $insertOneResult->getInsertedCount());
}
else { 
    echo "already exists";
}
?>