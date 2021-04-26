//vue things
//<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
//install instructions: https://vuejs.org/v2/guide/installation.html

let user = "Megan";

let sets = ["Set 1", "Set 2"];

let resp;

const Demo = {
  data() {
    return {
      show: true
    }
  }
}

Vue.createApp(Demo).mount('#demo')

const Counter = {
  data() {
    return {
      counter: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}

Vue.createApp(Counter).mount('#counter')


const Title = {
  data() {
    return {
      title: `Hello, ${user}`
    }
}
}

Vue.createApp(Title).mount('#title')

//Vue is data driven so dynamically add sets
let getsets = async function () {

  // clear out any existing child elements
  document.getElementById("sets").innerHTML = "";

  let a;
  const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/mongodb.php'
  var obj;
  a = JSON.parse(await $.ajax({
    type: 'POST',
    // make sure you respect the same origin policy with this url:
    // http://en.wikipedia.org/wiki/Same_origin_policy
    url: pathToPhpFile,
    success: function (msg) {
      console.log(msg);

    },
    failure: function (msg) {
      //alert('failedreq')
      obj = { 'status': 'requestfailed' };
    }
  }));


  //adds name of set and buttons
  a["starredsets"].forEach((s, index) => {
    let d = document.createElement("p");
    d.innerHTML += "<strong>" + s + "</strong>";

    let flashcardButton = document.createElement('button');
    flashcardButton.innerHTML += "Flashcards";
    d.appendChild(flashcardButton);

    let writeButton = document.createElement('button');
    writeButton.innerHTML += "Writing";
    d.appendChild(writeButton);

    document.getElementById("sets").appendChild(d);

    flashcardButton.addEventListener("click", function () { runFlashcard(s) }, false);
    writeButton.addEventListener("click", function () { runWriting(s) }, false);
  });

}

//TODO
let runFlashcard = async function (setName) {
  console.log("running flashcard with", setName);
}

//TODO
let runWriting = async function (setName) {
  console.log("running writing with", setName);
}

let makeacct = async function () {

  let a;
  const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/createaccount.php'
  var obj;
  a = await $.ajax({
    type: 'POST',
    // make sure you respect the same origin policy with this url:
    // http://en.wikipedia.org/wiki/Same_origin_policy
    url: pathToPhpFile,
    data: {
      'user': document.getElementById('cusername').value,
      'password': document.getElementById('cpassword').value,
      'email': document.getElementById('cemail').value,
    },
    success: function (msg) {
      console.log(msg);

    },
    failure: function (msg) {
      //alert('failedreq')
      console.log(msg)
    }
  });

  let verify = document.createElement("p");

  //verify Email here



  document.getElementById("makeacct_div").appendChild(d);

}


let uploadSet = async function () {

  /* VUE babey
   use this to read a file in? https://www.digitalocean.com/community/tutorials/vuejs-file-reader-component
   this is also an option https://www.raymondcamden.com/2019/05/21/reading-client-side-files-for-validation-with-vuejs


  */


  /* this belongs in the php
 
  make sure you filter input
  sample code from https://docs.mongodb.com/php-library/current/reference/method/MongoDBCollection-insertMany/
    $collection = (new MongoDB\Client)->test->users;

    $insertManyResult = $collection->insertMany([
        [
            'username' => 'admin',
            'email' => 'admin@example.com',
            'name' => 'Admin User',
        ],
        [
            'username' => 'test',
            'email' => 'test@example.com',
            'name' => 'Test User',
        ],
    ]);

    printf("Inserted %d document(s)\n", $insertManyResult->getInsertedCount());

  */
}



let query = async function () {
  /*
 //let localToken = await getCSRFtoken();
 //https://classes.engineering.wustl.edu/cse330/content/weather_json.php
 let a;
 const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/login.php'
 var obj;
 return $.ajax({
     type: 'POST',
     // make sure you respect the same origin policy with this url:
     // http://en.wikipedia.org/wiki/Same_origin_policy
     url: pathToPhpFile,
     data: {
         'token': 'hewwo'
     },
     success: function (msg) {
          document.getElementById("ajaxtest").innerHTML = msg;
     },
     failure: function (msg) {
         alert('failedreq')

     }
 });
 
 

  const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/mongodb.php';
  const data = { x: 'hi', y: 'hello' };
  
  fetch(pathToPhpFile, {
      method: "POST",
      body: JSON.stringify(data)
  })
  .then(res => resp = res)
  .then(response => document.getElementById("ajaxtest").innerHTML = response)
  .catch(error => console.error('Error:',error))
  */
  let a;
  const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/mongodb.php'
  var obj;
  return $.ajax({
    type: 'POST',
    // make sure you respect the same origin policy with this url:
    // http://en.wikipedia.org/wiki/Same_origin_policy
    url: pathToPhpFile,
    success: function (msg) {
      console.log(msg);

    },
    failure: function (msg) {
      //alert('failedreq')
      obj = { 'status': 'requestfailed' };
    }
  });

}

document.getElementById("loadsets").addEventListener("click", async function () { await getsets(); }, false);

document.getElementById("makeacct").addEventListener("click", async function () { await makeacct(); }, false);

document.getElementById("queery").addEventListener("click", async function () { resp = await query(); document.getElementById("ajaxtest").innerHTML = resp; }, false);

document.getElementById("uploadset").addEventListener("click", async function () { uploadSet() }, false);