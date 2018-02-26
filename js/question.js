var items = [];
var currQ;
var traceQID;

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

    function getQuestion(questions,curr){
        return items[questions[curr]];
        
    }



    function recursiveQID(qid,root,num){
        if(root.length === num) return root;
        if(root.indexOf(qid) < 0 ) root.push(qid);
        let tmp = Math.random()*15;
        qid = Math.floor(tmp);
        recursiveQID(qid,root,num);
    }


    function genTab(num) {
        let html = "";
        let traceQID = [];
        for(let i=num ; i>= 1 ; i--){
            let tmp = Math.random()*15;
            let qid = Math.floor(tmp);
            
            recursiveQID(qid,traceQID,num);
            html +="<div class='score' id='score-"+i+"'>"+i+"</div>";
        }
        console.log(html)
        traceQID = traceQID;
        $("#question_tab").append(html);     
        
        currQ = getQuestion(traceQID,0);

        return traceQID;

    }
    
    function initQuestion(traceQID,curr){


        $("#question").html("[Q"+(curr+1)+"]"+currQ.question);
        $("#choice1").html(currQ.key);
        $("#choice2").html(currQ.choices[0]);
        $("#choice3").html(currQ.choices[1]);
        $("#choice4").html(currQ.choices[2]);

        $(".choice").click(function(){
            if(traceQID.length-1 === curr) {
                $("#menu").css("display","block");
                $("#play").css("display","none");
            }else{
                $("#score-"+(curr+1)).css("background-color","rgba(255,0,0,0.5)");
                currQ = getQuestion(traceQID,curr+1);
                initQuestion(traceQID,curr+1);
            }

        });
        
    }
    

    $( "#easy" ).click(function() {
        traceQID = genTab(5);
        initQuestion(traceQID,0);
        $("#menu").css("display","none");
        $("#play").css("display","block");
    });
    
    $( "#medium" ).click(function() {
        traceQID = genTab(10);
        initQuestion(traceQID,0);
        $("#menu").css("display","none");
        $("#play").css("display","block");
    });
    
    $( "#hard" ).click(function() {
        traceQID = genTab(15);  
        initQuestion(traceQID,0);
        $("#menu").css("display","none");
        $("#play").css("display","block");
    });
        
    
