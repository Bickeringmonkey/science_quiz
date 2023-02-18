const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionsCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the Vaccine that was developed in Oxford University?',
        choice1: 'Moderna',
        choice2: 'Astrazenica',
        choice3: 'pfizer',
        choice4: 'paracetamol',
        answer: 2

    },
    {
        question: 'Who Created Vaccines?',
        choice1: 'Pastuer',
        choice2: 'Curie',
        choice3: 'Jenner',
        choice4: 'EinStein',
        answer: 3
    },
    {
        question: 'What is the immune system?',
        choice1: 'A Coding program to solve strategies of war',
        choice2: 'The name of a ship in WWII',
        choice3: 'The Biological that fights diseases',
        choice4: 'the vales that help blood flow to the heart',
        answer: 2
    },
    {
        question: 'Which microbes do produce diseases?',
        choice1: 'Moderna',
        choice2: 'Astrazenica',
        choice3: 'pfizer',
        choice4: 'paracetamol',
        answer: 2
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
        
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerHTML = score
}

startGame()