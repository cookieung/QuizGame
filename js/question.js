var items = [];
var currQ;
var traceQID;
var curr = 0 ;
var timer;


init();


    function loadJson(){
        $.getJSON( "db.json", function( data ) {

            $.each( data, function( key, val ) {
                let quiz = {
                    question: val.question,
                    key: val.key,
                    choices: val.choices
                }
                items.push(quiz);
            });

        
        });
    }


    function init(){
        loadJson();
        refresh();
        $( "#easy" ).click(function() {
            traceQID = genTab(5);
            initQuestion();
            $("#menu").css("display","none");
            $("#play").css("display","block");
        });
        
        $( "#medium" ).click(function() {
            traceQID = genTab(10);
            initQuestion();
            $("#menu").css("display","none");
            $("#play").css("display","block");
        });
        
        $( "#hard" ).click(function() {
            traceQID = genTab(15);  
            initQuestion();
            $("#menu").css("display","none");
            $("#play").css("display","block");
        });
            
        $(".choice").click(function(){
            if(isLastQuestion()) {
                alert("You finished");
                location.reload();
            }else{
                clearInterval(timer); 
                changeToNextQuestion(false);
            }
    
        });


    
    }

    function changeToNextQuestion(isTimeout){
        console.log(isTimeout);
        if(isTimeout){
            $("#score-"+(curr+1)).css("background-color","rgba(255,0,0,0.5)");
            // alert("Timeout at "+(curr+1));
            // resetTimer();
        }
        else{
            $("#score-"+(curr+1)).css("background-color","rgba(0,128,0,0.5)");
        }
        // resetTimer();
        curr++;
        initQuestion();
    }


    function getQuestion(){
        return items[traceQID[curr]];
        
    }



    function recursiveQID(qid,root,num){

        if (root.indexOf(qid) < 0){
            //console.log(qid);
            return qid;
        }
        let tmp = Math.random()*15;
        qid = Math.floor(tmp);
        return recursiveQID(qid,root,num);
    }


    function genTab(num) {
        let html = "";
        let traceQID = [];
        for(let i=num ; i>= 1 ; i--){
            let tmp = Math.random()*15;
            let qid = Math.floor(tmp);
            traceQID.push(recursiveQID(qid,traceQID,num));
            html +="<div class='score' id='score-"+i+"'>"+i+"</div>";
        }
        //console.log(html)
        $("#question_tab").append(html);     
        

        return traceQID;

    }


    function countDownToNext(){

        countDown(30);

    }


    function countDown(i) {
        timer = setInterval(function () {
            document.getElementById("timer").innerHTML = i;
            if(i === 0 ) {
                if(isLastQuestion()) {
                    alert("You finished");
                    location.reload();
                    return ;
                }
                clearInterval(timer); 
                changeToNextQuestion(true);
            } //if i is 0, then stop the interval
            i--;
        }, 1000);
    }



    function initQuestion(){
        currQ = getQuestion();
        //console.log(currQ);
        $(".left-tab").css("width","15vw").css("margin-left","2vw").css("margin-right","2vw");
        $("#question").css("width","75vw").css("height","20vh").css("margin-left","2vw").css("margin-right","3vw");
        $("#question").html("<p>[Q"+(curr+1)+"]"+currQ.question+"</p>");
        $("#choice1").css("width","35vw").css("margin-left","2vw").css("margin-right","2vw");
        $("#choice1").html("<p>"+currQ.key+"</p>");
        $("#choice2").css("width","35vw").css("margin-left","2vw").css("margin-right","2vw");
        $("#choice2").html("<p>"+currQ.choices[0]+"</p>");
        $("#choice3").css("width","35vw").css("margin-left","2vw").css("margin-right","2vw");
        $("#choice3").html("<p>"+currQ.choices[1]+"</p>");
        $("#choice4").css("width","35vw").css("margin-left","2vw").css("margin-right","2vw");
        $("#choice4").html("<p>"+currQ.choices[2]+"</p>");
        countDownToNext();
    }



    function isLastQuestion(){
        console.log("Check Last",traceQID.length,curr);
        return (traceQID.length-1 <= curr); 
    }
    function refresh(){
        traceQID = [];
        items = [];
        currQ = null;
    }
    

