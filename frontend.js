//vue things
//<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
//install instructions: https://vuejs.org/v2/guide/installation.html

//let FuzzySet = require(['node_modules/fuzzyset/dist/fuzzyset.js']);

let user = "default settings";
let helloMsg = `Hello, ${user}`

let sets = ["Set 1", "Set 2"];
let currentSetName = "";
let currentWords = ["word1", "word2", "word3"];
let currentDefs = ["def1", "def2", "def3"];
let currentIndex = 0;
let currentWord = "word";
let currentDef = "definition";
let globalCorrect = false;
let globalCorrectFuzzy = false;
let globalIncorrect = false;

let loggedIn = false;
let flashcardActive = false;
let writeActive = false;

let resp;

const Demo = {
  data() {
    return {
      show: true
    }
   },
  // mounted() {
  //   setInterval(() => {
  //     this.show = !this.show;
  //   }, 1000)
  // }
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
      title: helloMsg,
    }
  },
  mounted() {
    setInterval(() => {
      this.title = `Hello, ${user}`;
    }, 100)
  }
}
Vue.createApp(Title).mount('#title')

const MakeAcct = {
  data() {
    return {
      show: true,
    }
  },
  mounted() {
    setInterval(() => {
      this.show = !loggedIn;
      //console.log(this.show);
    }, 100)
  }
}
Vue.createApp(MakeAcct).mount('#makeacct_div')

const Login = {
  data() {
    return {
      show: true,
    }
  },
  mounted() {
    setInterval(() => {
      this.show = !loggedIn;
      //console.log(this.show);
    }, 100)
  }
}
Vue.createApp(Login).mount('#login_div')

const Logout = {
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    setInterval(() => {
      this.show = loggedIn;
    }, 100)
  }
}
Vue.createApp(Logout).mount('#logout_div')

// const FileRead = {
//   data() {
//     return {
//       show: true,
//     }
//   }
// }
// Vue.createApp(FileRead).mount('#fileRead_div')

let Flashcards = {
  data: () => ({
      show: false,
      showSide: true,
      side1:"word",
      side2:"definition"
  }),
  methods:{
    changeCard(word,def) {
      console.log("changeCard called w", word, def);
      this.side1=word;
      this.side2=def;
    }
  },
  mounted() {
    setInterval(() => {
      this.side1 = currentWord;
      this.side2 = currentDef;
      this.show = flashcardActive;
    }, 100)
  }
}
Vue.createApp(Flashcards).mount('#flashcards_div')

let Write = {
  data: () => ({
    show: false,
    word:"word",
    definition:"definition",
    correct:false,
    correctfuzzy:false,
    incorrect:false
}),
methods:{
  changeCard(word,def) {
    console.log("changeCard called w", word, def);
    this.word=word;
    this.definition=def;
  }
},
mounted() {
  setInterval(() => {
    this.word = currentWord;
    this.definition = currentDef;
    this.correct = globalCorrect;
    this.correctfuzzy = globalCorrectFuzzy;
    this.incorrect = globalIncorrect;
    this.show = writeActive;
  }, 100)
}

}
Vue.createApp(Write).mount('#write_div')

//Vue is data driven so dynamically add sets
let getsets = async function () {

  // clear out any existing child elements
  document.getElementById("sets").innerHTML = "";


  //TODO get all sets with privacy set to "false" or set to true and your username
  let a;
  const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/getsets.php'
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


  let starred;
  const pathToPhpFile2 = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/mongodb.php'
  var obj;
  b = JSON.parse(await $.ajax({
    type: 'POST',
    // make sure you respect the same origin policy with this url:
    // http://en.wikipedia.org/wiki/Same_origin_policy
    url: pathToPhpFile2,
    success: function (msg) {
      console.log(msg);
    },
    failure: function (msg) {
      //alert('failedreq')
      console.log(msg);
    }
  }));

  


  console.log(a);
  console.log(b);

  
  //adds name of set and buttons

  //add your sets first
  //b[""]

  a["user"].forEach((s, index) => {
    let d = document.createElement("p");


    //Check for Starred Sets
    let favflag = false;
    b["starredsets"].forEach(g => {
      console.log( s["name"] + " === " + g);
      if( s["name"] === g ){
        d.innerHTML += "<strong>" + s["name"] + "</strong>";
        favflag = true;
      }
    })

    if(!favflag){
      d.innerHTML += s["name"];
    }
    let starButton;
    if (!favflag){
      starButton = document.createElement('button');
      starButton.innerHTML += "Star Me!";
      d.appendChild(starButton);
    }

    let flashcardButton = document.createElement('button');
    flashcardButton.innerHTML += "Flashcards";
    d.appendChild(flashcardButton);

    let writeButton = document.createElement('button');
    writeButton.innerHTML += "Writing";
    d.appendChild(writeButton);

    document.getElementById("sets").appendChild(d);

    if (!favflag){
      starButton.addEventListener("click", function () { starSet(s) }, false);
    }
    flashcardButton.addEventListener("click", function () { runFlashcard(s) }, false);
    writeButton.addEventListener("click", function () { runWriting(s["name"]) }, false);
  });

  let e = document.createElement("h3");

  e.innerHTML = "Public Sets:";

  document.getElementById("sets").appendChild(e);

  //Add public sets

  a["public"].forEach((s, index) => {
    let d = document.createElement("p");
    //Save for starred sets
    //d.innerHTML += "<strong>" + s["name"] + "</strong>";

    d.innerHTML += s["name"];
    //TODO Starred sets

    let flashcardButton = document.createElement('button');
    flashcardButton.innerHTML += "Flashcards";
    d.appendChild(flashcardButton);

    let writeButton = document.createElement('button');
    writeButton.innerHTML += "Writing";
    d.appendChild(writeButton);

    document.getElementById("sets").appendChild(d);

    flashcardButton.addEventListener("click", function () { runFlashcard(s) }, false);
    writeButton.addEventListener("click", function () { runWriting(s["name"]) }, false);
  });
  

}

let runFlashcard = async function (setObject) {
  console.log("running flashcard with", setObject);

  console.log("setobj", setObject);

  //TODO set setName as currentWords and currentDefs
  currentSetName = setObject["name"];

  sets = [];
   currentWords = [];
   currentDefs = [];

  setObject["cards"].forEach(s => {

    currentWords[currentWords.length] = s[0];
    currentDefs[currentDefs.length] = s[1];
  })



  currentIndex = -1;
  flashcardNext();

  writeActive = false;
  flashcardActive = true;
  //don't look at this i know it's bad 
  //It's ok Lane I still love you - Evin
  //https://stackoverflow.com/questions/16623852/how-to-pause-javascript-code-execution-for-2-seconds
  
  try {
    document.getElementById("flashcardNext").removeEventListener("click", flashcardNext, false);
    document.getElementById("flashcardBack").removeEventListener("click", flashcardBack, false);
  } catch (e){}

  setTimeout(function(){
    document.getElementById("flashcardNext").addEventListener("click", flashcardNext, false);
    document.getElementById("flashcardBack").addEventListener("click", flashcardBack, false);
  }, 100);
}

let runWriting = async function (setName) {
  console.log("running writing with", setName);

  //TODO set setName as currentWords and currentDefs
  currentSetName = setName;

  currentIndex = -1;
  writeNext();

  flashcardActive = false;
  writeActive = true;

  document.getElementById("writeNext").removeEventListener("click", async function () { writeNext() }, false);
  document.getElementById("write_submit").removeEventListener("click", async function () { checkWrite() }, false);    

  setTimeout(function(){
      document.getElementById("writeNext").addEventListener("click", async function () { writeNext() }, false);
      document.getElementById("write_submit").addEventListener("click", async function () { checkWrite() }, false);    
    }, 100);
  }

let flashcardNext = function () {
  console.log("next");
  currentIndex++;
  if (currentIndex==currentWords.length){
    currentIndex=0;
  }
  currentWord = currentWords[currentIndex];
  currentDef = currentDefs[currentIndex];

  Flashcards.methods.changeCard(currentWords[currentIndex], currentDefs[currentIndex]);
}

let flashcardBack = function (){
  console.log("back");
  currentIndex--;
  if (currentIndex==-1){
    currentIndex=currentWords.length-1;
  }
  currentWord = currentWords[currentIndex];
  currentDef = currentDefs[currentIndex];

  Flashcards.methods.changeCard(currentWords[currentIndex], currentDefs[currentIndex]);
}

let checkWrite = async function() {
  let attempt = document.getElementById("write_word").value;
  console.log(attempt);

  let fuzzy = new FuzzySet(currentWords);
  let fuzzyresp = fuzzy.get(attempt);
  let fuzzyattempt = '';
  if (fuzzyresp.length>0){
    if (fuzzyresp[0][0] > .7){
      fuzzyattempt = fuzzyresp[0][1];
    }
  }

  console.log("attempt:", attempt);
  console.log("fuzzy attempt:", fuzzyattempt);
  console.log("true answer: ", currentWord);

  if (attempt === currentWord){
    globalCorrect = true;
    updateWrite(true, currentIndex);
  } else if (fuzzyattempt === currentWord) {
    globalCorrectFuzzy = true;
    updateWrite(true, currentIndex);
  } else {
    globalIncorrect = true;
    updateWrite(false, currentIndex);
  }
}

let writeNext = async function(){
  console.log("next");
  currentIndex++;
  if (currentIndex==currentWords.length){
    currentIndex=0;
  }
  currentWord = currentWords[currentIndex];
  currentDef = currentDefs[currentIndex];

  if (document.getElementById('write_word')!= null){
    document.getElementById('write_word').value = '';
  }
  globalCorrect = false;
  globalIncorrect = false;
  globalCorrectFuzzy = false;

  Write.methods.changeCard(currentWords[currentIndex], currentDefs[currentIndex]);
}

let updateWrite = async function (correct, index) {
  console.log("updating!", correct, index);
  const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/updateset.php'
    $.ajax({
      type: "POST",
      data: {
        name: currentSetName,
        index : index, 
        correct: correct
      },
      url: pathToPhpFile,
      success: function(msg){
        console.log("successfully sent to php",msg);
      },
    });

}

let makeacct = async function () {

  let a;
  const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/createaccount.php'
  
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

//FileReader code updated to Vue3 from https://www.raymondcamden.com/2019/05/21/reading-client-side-files-for-validation-with-vuejs
const fileRead = {
  data() {
    return {
      show: true,
      text:'',
      lines: []
    }
  },
  methods:{
    selectedFile(event) {
        console.log('selected a file');
        //console.log(this.$refs.myFile.files[0]);
        
        let file = this.$refs.myFile.files[0];
        if(!file || file.type !== 'text/plain') return;
        
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload =  evt => {
          this.text = evt.target.result;
          this.lines=this.text.split("\n");
          // console.log("text: ",this.text);
          // console.log("lines: ",this.lines);
          uploadSet(this.lines)
        }
        reader.onerror = evt => {
          console.error(evt);
        }
    }
  },
  mounted() {
    setInterval(() => {
      this.show = loggedIn;
    }, 100)
  }
  
}
Vue.createApp(fileRead).mount('#fileRead_div')


let uploadSet = async function (c) {

  console.log(c);
  let name = c[0];
  let privacy = c[1];
  let contents = c.slice(2);

  const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/uploadset.php'
    $.ajax({
      type: "POST",
      data: {
        name: name,
        privacy: privacy,
        contents : contents, 
        user: user
      },
      url: pathToPhpFile,
      success: function(msg){
        console.log("successfully sent to php",msg);
      },
    });


}

let starSet = async function(set) {
  console.log("want to star", set["name"]);

  const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/starset.php'

  $.ajax({
    type: 'POST',
    url: pathToPhpFile,
    data: {
      user: user,
      name: set["name"],
    },
    url: pathToPhpFile,
    success: function(msg){
      console.log("successfully sent to php",msg);
    }
  });


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

let logout = async function(){
  user = "";
  loggedIn = false;
  console.log("logged in?", loggedIn);

  setTimeout(function(){
    document.getElementById("logout").addEventListener("click", async function () { await logout() }, false);
  }, 100);

  
}


let login = async function(){
  let a;
  const pathToPhpFile = 'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/login.php'
  var obj;
  return $.ajax({
    type: 'POST',
    // make sure you respect the same origin policy with this url:
    // http://en.wikipedia.org/wiki/Same_origin_policy
    url: pathToPhpFile,
    data: {
      'username': document.getElementById('lusername').value,
      'password': document.getElementById('lpassword').value,
    },
    success: function (msg) {
      //console.log(msg);
      user = document.getElementById('lusername').value;
      helloMsg = `Hello, ${user}`;
      loggedIn = true;
      console.log("logged in?", loggedIn);
      
      setTimeout(function(){
        document.getElementById("logout").addEventListener("click", async function () { await logout() }, false);
      }, 100);
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

document.getElementById("uploadset").addEventListener("click", async function () { await uploadSet() }, false);

document.getElementById("login").addEventListener("click", async function () { await login() }, false);