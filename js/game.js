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
        choice3: 'The part of the body that fights diseases',
        choice4: 'the vales that help blood flow to the heart',
        answer: 3
    },
    {
        question: 'What is the chemical symbol for iron?',
        choice1: 'Fi',
        choice2: 'In',
        choice3: 'Ir',
        choice4: 'Fe',
        answer: 4
    },
    {
        question: 'What is the smallest planet in our solar system?',
        choice1: 'Venus',
        choice2: 'Mercury',
        choice3: 'Mars',
        choice4: 'Jupiter',
        answer: 2
    },
    {
        question: 'What is the term used to describe the ability of a vaccine to produce an immune response?',
        choice1: 'Pathogenicity',
        choice2: 'Antigenicity',
        choice3: 'Immunogenicity',
        choice4: 'Virulence',
        answer: 3
    },
    {
        question: 'What is the term used to describe the level of immunity in a population?',
        choice1: 'Herd immunity',
        choice2: 'Individual immunity',
        choice3: 'Active immunity',
        choice4: 'Passive immunity',
        answer: 1
    },
    {
        question: 'What is the name of the protein on the surface of a virus that triggers an immune response?',
        choice1: 'Antigen',
        choice2: 'Enzyme',
        choice3: 'Antibody',
        choice4: 'Receptor',
        answer: 1
    },
    {
        question: 'What is the name of the vaccine that protects against measles, mumps, and rubella?',
        choice1: 'HPV',
        choice2: 'MMR',
        choice3: 'DTaP',
        choice4: 'Hepatitis B',
        answer: 2
    },
    {
        question: 'What is the term used to describe the ability of a vaccine to protect against different strains of a virus?',
        choice1: 'Homologous protection',
        choice2: 'Cross-protection',
        choice3: 'Heterologous protection',
        choice4: 'Cross-reactivity',
        answer: 2
    },
    {
        question: 'What is the name of the vaccine that protects against human papillomavirus (HPV)?',
        choice1: 'Gardasil',
        choice2: 'Menactra',
        choice3: 'Prevnar',
        choice4: 'Rotateq',
        answer: 1
    },
    {
        question: 'What is the term used to describe the ability of a vaccine to prevent infection and/or disease?',
        choice1: 'Potency',
        choice2: 'Efficiency',
        choice3: 'Effectiveness',
        choice4: 'Efficacy',
        answer: 4
    },
    {
        question: 'What is the term used to describe the process of increasing the potency of a vaccine by modifying the vaccine formulation?',
        choice1: 'Mutation',
        choice2: 'Amplification',
        choice3: 'Adjuvantation',
        choice4: 'Attenuation',
        answer: 3
    },
    {
        question: 'What is the name of the vaccine that protects against influenza?',
        choice1: 'Fluzone',
        choice2: 'MMR',
        choice3: 'Hep A',
        choice4: 'BCG',
        answer: 1
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5

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