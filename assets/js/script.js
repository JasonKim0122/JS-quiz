const startButtonEl = document.getElementById("start-btn")
const nextButtonEl = document.getElementById("next-btn")
const questionContainerEl= document.getElementById("question-body")
const questionEl =document.getElementById("question")
const answerButtonEl=document.getElementById("answer-buttons")


let mixedQuestions, currentQuestionIndex

//Countdown timer start
let countDownTime = 5
const timerEl = document.getElementById("timer-count") 
timerEl.innerHTML = countDownTime 

function countDown() {
    if (countDownTime <= 0) {
        timerEl.innerHTML = "You have ran out of time!"
        endGame(); 
    }
    else {
        timerEl.innerHTML = countDownTime + " seconds left"
        countDownTime--; 
    }
}



//Functions
function startGame() {
    startButtonEl.classList.add("content")
    mixedQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("content")
    nextQuestion();
}

function nextQuestion () {
    resetGame();
    newQuestion(mixedQuestions[currentQuestionIndex])
}

function newQuestion(questions) {
    questionEl.innerText = questions.question
    questions.answers.forEach(answers => {
        const buttonEl = document.createElement("button")
        buttonEl.innerText = answers.text
        buttonEl.classList.add("btn")
        if (answers.correct) {
            buttonEl.dataset.correct = answers.correct 
        }
        buttonEl.addEventListener("click", chosenAnswer)
        answerButtonEl.appendChild(buttonEl)
    })
}

function resetGame () {
    nextButtonEl.classList.add("content")
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
}
function chosenAnswer (event) {
    const targetButton = event.target
    const correct = targetButton.dataset.correct
    statusOfClass(document.body,correct)
    Array.from(answerButtonEl.children).forEach(button => {
        statusOfClass(button, button.dataset.correct)
    })
    if (mixedQuestions.length > currentQuestionIndex + 1) {
        nextButtonEl.classList.remove("content")
    }
    else {
        startButtonEl.innerText = "Start Over"
        startButtonEl.classList.remove("content")
    }
}

function statusOfClass (element,correct) {
    clearStatusOfClass (element)
    if (correct) {
        element.classList.add("correct")
    }
    else {
        element.classList.add("incorrect")
    }
}

function clearStatusOfClass(element) {
    element.classList.remove("correct")
    element.classList.remove("incorrect")
}

//Array

const questions = [
    {
        question: "Which of these following are not JavaScript Data types?",
        answers: [ 
            {text: "Boolean", correct: true},
            {text: "Number", correct: false},
            {text: "String", correct: false},
            {text: "Style-Sheets", correct: false}
        ]
    },
    {
        question: "Inside which HTML element do we enclose Javascript in?",
        answers: [
            {text: "<script>", correct: true},
            {text: "<java>", correct: false},
            {text: "<scripts>", correct: false},
            {text: "<javascript>", correct: false}
        ]
    },
    {
        question: "Which of the follow is the correct way to start a FOR loop?",
        answers: [
            {text: "for i = 0; <= 4, i++", correct: false},
            {text: "for (i = 0, <= 4, i++)", correct: false},
            {text: "for (i = 0; <= 4; i++)", correct: true},
            {text: "for (i = 0, <= 4; I++)", correct: false}
        ]
    },
    {
        question:"How do you round the number 22.75 to the nearest whole number?",
        answers: [
            {text:"Math.random(22.75)", correct: false},
            {text:"Math.floor(22.75)", correct: true},
            {text:"Math.max(22.75)", correct: false},
            {text:"None of the above", correct: false}
        ]
    }
]
//Event Listener
startButtonEl.addEventListener("click", function () {
    startGame();
    setInterval(countDown,1000);
}) 
nextButtonEl.addEventListener("click", function () {
    currentQuestionIndex++
    nextQuestion();
})