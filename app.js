//Initial Values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let wrong = 0;
let timer;

//Starting the quiz
function startQuiz(){
    $('#start').click(function(){
        $('#start').remove();
        $('.quizpicture').remove();
        $('#time').html(counter);
        loadQuestion();
    });
    }

//Show choices for users to select from
function loadChoices(choices){
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
};

//Start a 60 second timer for user to respond or choose an answer

function timesUp(){
    clearInterval(timer);

    wrong++;
    
    displayGif('wrong')
    setTimeout(nextQuestion, 5 * 1000);
}

function countDown(){
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0){
        //what will happen if timer hits 0
        timesUp();
    }
}

//Go to the next question if timer is over, halt when no more questions

function nextQuestion(){
    
    const questionOver = (quizQuestions.length - 1) === currentQuestion;
    if (questionOver){
        console.log('Quiz is over');
        displayResult();
    } else {
    currentQuestion++;
    loadQuestion();
    }
}

//Display the question and the choices to the browser
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices; //

    $('#time').html('Timer: ' + counter);
    $('#quiz').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
        ${loadScore()}
    `);
};

//Go to the next question after selecting choice

function renderNext(){
$(document).on('click', '.choice', function(){
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    
    if (correctAnswer === selectedAnswer){
        //User is correct
        score++;
        displayGif('correct')
        setTimeout(nextQuestion, 5 * 1000);
        console.log('correct!!!')
    } else {
        //User is incorrect
        wrong++;
        displayGif('wrong')
        setTimeout(nextQuestion, 5 * 1000);
        console.log('wrong!!!')
    }
    console.log(selectedAnswer);
});
}

//Choice selection result

function displayGif(condition){
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if (condition === 'correct'){
        $('#quiz').html(`
            <p class="displayGif-image">You know your stuff, don't you?</p>
            <p class="displayGif-image">You're right! The answer is <b>${correctAnswer}</b></p>
            <img src="${randomImage(rightImages)}"/>
        `);
    } else {
        $('#quiz').html(`
            <p class="displayGif-image">Nope!</p>
            <p class="displayGif-image">The correct answer is <b>${correctAnswer}</b></p>
            <img src="${randomImage(wrongImages)}"/>
        `);
    }
}

//Gives a random image
function randomImage(images){
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random]
    return randomImage;
}

//End of the quiz display

function displayResult(){
    const result = `
        <p>You got ${score} question(s) right</p>
        <p>You got ${wrong} question(s) wrong</p>
        <p>Out of a total of ${quizQuestions.length} questions</p>
        <button class="btn btn-primary" id="reset">RESET QUIZ</button>
    `;

    $('#quiz').html(result);
};

//Display the number of questions remaining and score

function loadRemainingQuestion(){
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    
    return `${remainingQuestion} Questions Remaining     |     `
}

function loadScore(){
    return ` Score: ${score}`
}

//Click reset to start over
function reset(){
    $(document).on('click', '#reset', function(){
        console.log('Resetting');
        counter = 30;
        currentQuestion = 0;
        score = 0;
        wrong = 0;
        timer = null;
    
        loadQuestion();
    });
    }

function makeQuiz() {
    startQuiz();
    reset();
    renderNext();
  }
  
  $(makeQuiz);