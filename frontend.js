//vue things
//<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
//install instructions: https://vuejs.org/v2/guide/installation.html

let user = "Megan";
let helloMsg = `Hello, ${user}`

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
      title: helloMsg
    }
},
// mounted() {
//   setInterval(() => {
//     this.title = `Hello, ${user}`;
//   }, 100)
// }
}
Vue.createApp(Title).mount('#title')

const MakeAcct = {
  data() {
    return {
      showing: false
    }
  },
}
Vue.createApp(MakeAcct).mount('#makeacct_div')

const Flashcards = {
  data() {
    return {
      showSide: true,
      side1: "word",
      side2: "definition"
    }
  },
}
Vue.createApp(Flashcards).mount('#flashcards_div')

//Vue is data driven so dynamically add sets
let getsets = async function () {

  // clear out any existing child elements
  document.getElementById("sets").innerHTML = "";


  //TODO get all sets with privacy set to "false"
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

//FileReader code updated to Vue3 from https://www.raymondcamden.com/2019/05/21/reading-client-side-files-for-validation-with-vuejs
const fileRead = {
  data() {
    return {
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
  }
  
}
Vue.createApp(fileRead).mount('#fileRead')


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
      console.log(msg);
      user = "Megan but cool";
      helloMsg = `Hello, ${user}`
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