const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".option-container");
const answersIndicatorContainer=document.querySelector(".answer-indicator");
const homebox=document.querySelector(".home-box");
const quizbox=document.querySelector(".quiz-box");
const resultbox=document.querySelector(".result-box");


let questionCounter=0;
let currentQuestion;
let availableQuestion=[];
let availableOption=[];
let correctAnswers=0;
let attempts=0;



// push the question into availableQuestion
function setAilableQuestion(){
    const totalQuestion= quiz.length;
    for(let i=0;i<totalQuestion;i++)
    {
        availableQuestion.push(quiz[i]);
    }
    console.log(availableQuestion);

}

function getNewQuestion()
{
    questionNumber.innerHTML="Question "+(questionCounter+1)+" of "+ quiz.length; 
    //setting random question
    const questionIndex= availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
    currentQuestion=questionIndex;
    questionText.innerHTML= currentQuestion.q;
    const index1= availableQuestion.indexOf(questionIndex);
    availableQuestion.splice(index1,1);
    // show image in the question if exist
    if(currentQuestion.hasOwnProperty("img")){
        const img = document.createElement("img");
        img.src=currentQuestion.img;
        questionText.appendChild(img);
    }
    console.log(questionIndex);
    console.log(availableOption)
    //set the options
    const optionlen= currentQuestion.option.length
    for(let i=0; i<optionlen;i++)
    {
       availableOption.push(i);
    }
    optionContainer.innerHTML='';
    let animationDelay=0.15;
     for(let i=0; i<optionlen;i++ )
     {
         const option= document.createElement("div");
         option.innerHTML = currentQuestion.option[i];
         option.id=i;
         option.className="option";
         optionContainer.appendChild(option)
         option.setAttribute("onclick","getResult(this)");
     }
    questionCounter++;
}
function getResult(element){
       const id= parseInt(element.id);
       if(id === currentQuestion.answer){
           // setting the green color of right answer
           element.classList.add("correct");
           // add correct mark in answer indicator
           updateAnswerIndicator("correct");
           console.log("correct"+correctAnswers);
           correctAnswers++;
       }
       else{
           // setting the red color to wrong answer
           element.classList.add("wrong");
           // add wrong mark in answer indicator
           updateAnswerIndicator("wrong");

           // if the user select the wron answer then show the green color to wrigth option
           const optionlen=optionContainer.children.length;
          for(let i=0;i<optionlen;i++)
    {      
        if(parseInt(optionContainer.children[i].id)===currentQuestion.answer)
        optionContainer.children[i].classList.add("correct");
    }
       }
       attempts++;
       unclicableOptions();

}

// making all the function unclicabale once one of them is selected
function unclicableOptions(){
    const optionlen=optionContainer.children.length;
    for(let i=0;i<optionlen;i++)
    {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
        answersIndicatorContainer.innerHTML='';
        const totalQuestion=quiz.length;
        for(let i=0;i<totalQuestion;i++){
            const indicator= document.createElement("div");
            answersIndicatorContainer.appendChild(indicator);
        }

}
function updateAnswerIndicator(marktype){
    answersIndicatorContainer.children[questionCounter-1].classList.add(marktype)
}

function next()
{
    if(questionCounter===quiz.length)
    {
        quizOver();
    }
    else{
        getNewQuestion();

    }
}

function quizOver(){
    // hide quiz quizbox
    quizbox.classList.add("hide");
    // show result box
    resultbox.classList.remove("hide");
    quizResult();
}

// to get result of the quiz
function quizResult(){
resultbox.querySelector(".Total-question").innerHTML=quiz.length;
resultbox.querySelector(".Total-attemp").innerHTML=attempts;
resultbox.querySelector(".Total-correct").innerHTML= correctAnswers;
resultbox.querySelector(".Total-wrong").innerHTML=attempts-correctAnswers;
const percentage=(correctAnswers/attempts)*100;
resultbox.querySelector(".Total-percentage").innerHTML=percentage.toFixed(2)+"%";
resultbox.querySelector(".Total-score").innerHTML=correctAnswers+"/"+quiz.length;



}
function resetquiz(){
questionCounter=0;
correctAnswers=0;
attempts=0;

}

function tryagain(){
//hide the result box
resultbox.classList.add("hide");

// show the quizbox
quizbox.classList.remove("hide");
resetquiz();
StartQuiz();
}

function gohome(){
// hide result box
resultbox.classList.add("hide");

// show home box
homebox.classList.remove("hide");
resetquiz();


}

// starting of the quiz
function StartQuiz(){
    // hide the home box
    homebox.classList.add("hide");

    // showing quizbox
    quizbox.classList.remove("hide");
    setAilableQuestion();
    getNewQuestion();
    answersIndicator();

}

window.onload=function()
{
homebox.querySelector(".total-question").innerHTML=quiz.length;

}