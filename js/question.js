var items = [];
var currQ;
var traceQID;
var curr = 0 ;
var timer;
var sum_score=0;


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
            



    
    }


    function answer(obj){
        let isCorrect = obj.value;
        let id = obj.id;
        clearInterval(timer); 

            if(isCorrect){  
                $("#"+id).css("background-color","rgba(0,128,0,0.5)");
                document.getElementById("score").innerHTML = ++sum_score;
            }
            else{
                $("#"+id).css("background-color","rgba(255,0,0,0.5)");
            }
            if(isLastQuestion()) {
                updateTab(isCorrect);
                alert("You finished with "+sum_score+" score");
                location.reload();
            }else{
                setTimeout(function(){
                    $("#"+id).css("background-color","rgba(255,255,255,0.5)");

                    changeToNextQuestion(isCorrect);
                },2000);
            }
    }

    function updateTab(isCorrect){
        if(isCorrect){
            $("#score-"+(curr+1)).css("background-color","rgba(0,128,0,0.5)");
        }else $("#score-"+(curr+1)).css("background-color","rgba(255,0,0,0.5)");
    }

    function changeToNextQuestion(isCorrect){
        updateTab(isCorrect);
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


    function randomAnswer(qid,root,result,num){
        console.log("raz :",result,root,num);
        if ( result.length === num){
            console.log("Do return",result)
              return result;
        }
        if( result.indexOf(root[qid]) < 0){
            console.log("Do push"+qid)
            result.push(root[qid]);
        }

        let tmp = Math.random()*root.length;
        qid = Math.floor(tmp);
        return randomAnswer(qid,root,result,num);
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

        // countDown(30);

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
                changeToNextQuestion(false);
            } //if i is 0, then stop the interval
            i--;
        }, 1000);
    }

    function shuffleChoice(arr,key){
        let size = arr.length;
        let result = [];
        let tmp = arr;

        console.log("Before ",tmp);

        result = randomAnswer(0,tmp,result,3);

        let i = Math.random()*4;
        let d = Math.floor(i);

        console.log("After ",result);

        console.log(result,"ID ANS"+d,key);
        result.push(result[d]);
        result[d] = key;
        console.log("FFF",result);



        return result;
    }



    function initQuestion(){
        currQ = getQuestion();
        let ch = shuffleChoice(currQ.choices,currQ.key);
        $(".left-tab").css("width","15vw").css("margin-left","2vw").css("margin-right","2vw");
        $("#question").css("width","75vw").css("height","20vh").css("margin-left","2vw").css("margin-right","3vw");
        $("#question").html("<p>[Q"+(curr+1)+"]"+currQ.question+"</p>");
        $("#choice1").css("width","35vw").css("margin-left","2vw").css("margin-right","2vw");
        $("#choice1").html("<p>"+ch[0]+"</p>").attr("value",ch[0]===currQ.key);
        document.getElementById("choice1").onclick = function(){answer(this)};
        $("#choice2").css("width","35vw").css("margin-left","2vw").css("margin-right","2vw");
        $("#choice2").html("<p>"+ch[1]+"</p>").attr("value",ch[1]===currQ.key);
        document.getElementById("choice2").onclick = function(){answer(this)};
        $("#choice3").css("width","35vw").css("margin-left","2vw").css("margin-right","2vw");
        $("#choice3").html("<p>"+ch[2]+"</p>").attr("value",ch[2]===currQ.key);
        document.getElementById("choice3").onclick = function(){answer(this)};
        $("#choice4").css("width","35vw").css("margin-left","2vw").css("margin-right","2vw");
        $("#choice4").html("<p>"+ch[3]+"</p>").attr("value",ch[3]===currQ.key);
        document.getElementById("choice4").onclick = function(){answer(this)};
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
    

