    //Data Structures involved: List, Dictionary
    //List ["Reuben", "Yishan", "Jace", "Patwin", "Isaac", "Andreas"]

    //Dictionary {
    /*
        {

            "Patwin" : "91230000",
            "Jace" : "98987777,"
        }
    */

const database1 = [
    {
        question : "What's the capital of China?",
        options : ["Tokyo", "Manila", "Bangkok", "Beijing"],
        answer : "Beijing"
    },

    {
        question : "how many sheckles do i have?",
        options : ["1Qua", "200M", "58QI", "7M"],
        answer : "58QI"
    },
    
    
    {
        question : "what is the best game on roblox?",
        options : ["GAG", "SAB", "JB", "99 night in a forest"],
        answer : "SAB"
    },
   
    {
        question : "who is the richest GAG player in this zoom?",
        options : ["Me", "Patwin", "Yishan", "Jace"],
        answer : "Me"
    },

    {
        question : "Whats the best brainrot in SAB?",
        options : ["Garama and Madundung", "Dul Dul Dul", "La Grande Combination", "(All Traits) Rainbow Dragon Canenoli"],
        answer : "(All Traits) Rainbow Dragon Canenoli"
    },
        
    {
        question : "When was I Born?",
        options : ["2014 June", "2013 August", "2014 July", "2014 September"],
        answer : "2014 June"

    },
    
    {
        question : "Whats the real name on the owner of GAG?",
        options : ["Andreas", "Sammy", "Janzen Madsen", "Jandel"],
        answer : "Janzen Madsen"
    },

    {
        question : "Whats 1+1?",
        options : ["2", "11", "67", "69"],
        answer : "11"
    },
];




const DropDown = document.getElementById("drop-down");
const StartButton = document.getElementById("start-btn");
const TimerLabel = document.getElementById("timer-label");
const QuestionLabel = document.getElementById('question');
const OptionContainer = document.getElementById("option-container");
const ScoreLabel = document.getElementById("score-label");
const FeedbackLabel = document.getElementById("feedback-label");
const ProgressBar = document.getElementById("progress-bar-fill");
const BgmDropDown = document.getElementById("bgm-dropdown")
const BgmButton = document.getElementById("music-btn")

let CurrentSong = null;
let IsBgmPlaying = false;

// on bgm dropdown change
BgmDropDown.addEventListener("change", () => {

    const SelectedSong = BgmDropDown.value;

    // abort the function if song cannot be found
    if(!SelectedSong) return;

    //stop and reset previous song if it exists
    if(CurrentSong)
    {
        
        CurrentSong.pause();
        CurrentSong.currentTime = 0;
   
    }

    //load and play the new song
    CurrentSong = new Audio(SelectedSong);
    CurrentSong.loop = true;
    CurrentSong.volume = 0.2;
    CurrentSong.play();
    IsBgmPlaying = true;
    BgmButton.textContent = "🔊 Music On";
});

BgmButton.addEventListener('click', () => {
    if(IsBgmPlaying)
    {
        CurrentSong.pause()
        BgmButton.textContent = "🔇 Music Off";
        IsBgmPlaying = false;
    }else
    {
        CurrentSong.play();
        BgmButton.textContent = "🔊 Music On"
        IsBgmPlaying = true;
    }
});


StartButton.addEventListener('click', StartQuiz);

let timer;
let question_index = 0;
let score = 0;

function StartQuiz()
{
    DropDown.style.display = 'none';
    StartButton.style.display = 'none';
    LoadQuestion();
}
function LoadQuestion()
{
    if(question_index < database1.length)
    {
        //reset the timers
        TimerLabel.textContent = 15;

        FeedbackLabel.textContent = "";

        // adjust progress bar's width
        ProgressBar.style.width = `${((question_index + 1) / database1.length) * 100}%`;

        // load a question from database
        const CurrentQuestionsSet = database1[question_index];
        QuestionLabel.textContent = CurrentQuestionsSet.question;

        // remove previous options buttons
        OptionContainer.innerHTML = "";

        // create option buttons
        CurrentQuestionsSet.options.forEach((item) => {
            const button = document.createElement('button');
            button.textContent = item;
            button.classList.add('option-btn');
            OptionContainer.appendChild(button);
        
            button.addEventListener('click', () => {
                DisableAllOptionButtons();
                CheckAnswer(item);
            });
        });
        
        //turn on the timer
        timer = setInterval(() => {
            TimerLabel.textContent = parseInt(TimerLabel.textContent) - 1;
        
            if(parseInt(TimerLabel.textContent) === 0)
            {
                clearInterval(timer); // turn off the timer
                CheckAnswer(null);
            }
        
        }, 1000);
    } else {
        EndQuiz();
    }
}

function EndQuiz()
{
    if (score < 1)
    {
        QuestionLabel.textContent = "Oh did you even try?";
        TimerLabel.textContent = "🥲🥲";

    }
    else
    {
        QuestionLabel.textContent = "Horray! Quiz hqs ended!";
        TimerLabel.textContent = "😛😛";

    }
   
    OptionContainer.style.display = 'none';
    FeedbackLabel.style.display = 'none';
}



function DisableAllOptionButtons()
{
    const all_option_buttons = document.querySelectorAll('.option-btn');
   
    all_option_buttons.forEach(button => {
        button.disabled = true;

    });
}


// item - the player selected option
function CheckAnswer(item)
{
    clearInterval(timer);
    const CurrentQuestionsSet = database1[question_index];
    let message = "";
    
    if (item === CurrentQuestionsSet.answer)
    {
        score = score + 1
        message = "Correct! 1 point goes to you"
    } else if (item === null)
    {
        message = "Time's up"
    }else
    {
        message = "Incorrect!"
    }

    ScoreLabel.textContent = `You scored ${score} points`;
    FeedbackLabel.textContent = message;

    // to hold foir 2 seconds before loading the nest question
    setTimeout(()=>{
        question_index = question_index + 1;
        LoadQuestion();
    }, 2000);
}























