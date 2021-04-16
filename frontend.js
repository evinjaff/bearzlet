//vue things
//<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
//install instructions: https://vuejs.org/v2/guide/installation.html

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


document.getElementById("queery").addEventListener("click", async function () { resp = await query(); document.getElementById("ajaxtest").innerHTML = resp; }, false);
