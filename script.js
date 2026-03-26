let questions = [
    {
        question: "which is the largest animal in the world",
        answer: [
            {text: "Shark" , correct : false},
            {text: "Blue whale" , correct : true},
            {text: "Elephant" , correct : false},
            {text: "Giraffe" , correct : false},
        ]
    },
    {
        question: "which is the largest river in the world",
        answer: [
            {text: "Nile" , correct : true},
            {text: "Ganga" , correct : false},
            {text: "Mekong" , correct : false},
            {text: "Rio Grande" , correct : false},
        ]
    },
    {
        question: "which is the largest desert in the world",
        answer: [
            {text: "Kalahari" , correct : false},
            {text: "Gobi" , correct : false},
            {text: "Sahara" , correct : false},
            {text: "Antarctica" , correct : true},
        ]
    },
    {
        question: "which is the smallest continent in the world",
        answer: [
            {text: "Asia" , correct : false},
            {text: "Australia" , correct : true},
            {text: "Arctic" , correct : false},
            {text: "Africa" , correct : false},
        ]
    }
]
let question_element = document.getElementById("question")
let answer_btn = document.getElementById("answer-btn")
let next_btn = document.getElementById("next-btn")

let current_question_index = 0;
let score = 0;

function start_quiz(){
    let current_question_index = 0;
    let score = 0;
    next_btn.innerHTML = "Next"
    next_btn.style.display = "none"
    show_question()
}


function show_question(){
    reset_state()
    let current_question = questions[current_question_index]
    let question_no = current_question_index + 1
    question_element.innerHTML = question_no + ". " + current_question.question

    current_question.answer.forEach(answer => {
        let up_btn = document.createElement("button")
        up_btn.innerHTML = answer.text
        up_btn.classList.add("btn")
        answer_btn.appendChild(up_btn)
        if(answer.correct){
            up_btn.dataset.correct = answer.correct
        }
        up_btn.addEventListener("click" , selectAnswer)
    });
}


function reset_state(){
    next_btn.style.display = "none"
    while(answer_btn.firstChild){
        answer_btn.removeChild(answer_btn.firstChild)
    }
}

function selectAnswer(e){
    let selected_btn = e.target
    let is_correct = selected_btn.dataset.correct === "true"
    if(is_correct){
        selected_btn.classList.add("correct")
        score++
    }else{
        selected_btn.classList.add("incorrect")
    }
    Array.from(answer_btn.children).forEach(up_btn => {
        if(up_btn.dataset.correct === "true"){
            up_btn.classList.add("correct")
        }
        up_btn.disabled = true
    })
    next_btn.style.display = "block"
}


function show_score(){
    reset_state()
    question_element.innerHTML = `you scored ${score} out of ${questions.length}!`
    next_btn.innerHTML = "Play Again"
    next_btn.style.display = "block"
}

function handle_nxt_btn(){
    current_question_index++
    if(current_question_index < questions.length){
        show_question()
    }else{
        show_score()
    }
}

next_btn.addEventListener("click", ()=>{
    if(next_btn.innerHTML === "Play Again"){
        start_quiz()
    }else{
        handle_nxt_btn()
    }
})


start_quiz()
