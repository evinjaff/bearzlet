//vue things
//<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
//install instructions: https://vuejs.org/v2/guide/installation.html

let user = "Megan";
let helloMsg = `Hello, ${user}`

let sets = ["Set 1", "Set 2"];
let currentWords = ["word1", "word2", "word3"];
let currentDefs = ["def1", "def2", "def3"];
let currentIndex = 0;
let currentWord = "word";
let currentDef = "definition";
let globalCorrect = false;
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


  console.log(a["starredsets"]);
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

let runFlashcard = async function (setName) {
  console.log("running flashcard with", setName);
  //TODO set setName as currentWords and currentDefs
  currentIndex = -1;
  flashcardNext();

  writeActive = false;
  flashcardActive = true;
  //don't look at this i know it's bad 
  //https://stackoverflow.com/questions/16623852/how-to-pause-javascript-code-execution-for-2-seconds
  setTimeout(function(){
    document.getElementById("flashcardNext").addEventListener("click", async function () { flashcardNext() }, false);
    document.getElementById("flashcardBack").addEventListener("click", async function () { flashcardBack() }, false);
  }, 100);
}

let runWriting = async function (setName) {
  console.log("running writing with", setName);
  //TODO set setName as currentWords and currentDefs
  currentIndex = -1;
  writeNext();

  flashcardActive = false;
  writeActive = true;
  setTimeout(function(){
      document.getElementById("writeNext").addEventListener("click", async function () { writeNext() }, false);
      document.getElementById("write_submit").addEventListener("click", async function () { checkWrite() }, false);    
    }, 100);
  }

let flashcardNext = async function () {
  console.log("next");
  currentIndex++;
  if (currentIndex==currentWords.length){
    currentIndex=0;
  }
  currentWord = currentWords[currentIndex];
  currentDef = currentDefs[currentIndex];

  Flashcards.methods.changeCard(currentWords[currentIndex], currentDefs[currentIndex]);
}

let flashcardBack = async function (){
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

  //let fuzzy = new FuzzySet(currentWords);
  //let fuzzyattempt = fuzzy.get(attempt);
  //console.log(fuzzyattempt);

  if (attempt === currentWord){
    globalCorrect = true;
  } else {
    globalIncorrect = true;
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

  Write.methods.changeCard(currentWords[currentIndex], currentDefs[currentIndex]);
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
        contents : contents
      },
      url: pathToPhpFile,
      success: function(msg){
        console.log("successfully sent to php",msg);
      },
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
      user = "Megan but cool";
      helloMsg = `Hello, ${user}`;
      loggedIn = true;
      console.log(loggedIn);
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

document.getElementById("login").addEventListener("click", async function () { login() }, false);