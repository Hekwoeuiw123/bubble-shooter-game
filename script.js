const header = document.querySelector('.head');
const timer = document.querySelector('.time');
const target = document.querySelector('.targrt');
const restart = document.querySelector('.btn-restart');
const score = document.querySelector('.score');
const select_btn = document.querySelector('.btn-select');
const countdown_number = document.querySelector('.countdown-number');
const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");
const start_container = document.querySelector('.start-container');
const difficulty_container = document.querySelector('.difficulty-buttons');
let high_score = document.querySelector('.high-score');
let section = document.querySelector('.section-btn');
let section_over = document.querySelector('.section-over');
let section_start = document.querySelector('.section-start');
let section_countdown = document.querySelector('.section-countdown');
let id; // defined globally so that it can be cleared
let difficulty = 'medium'; // default difficulty
let difficultyTime = 45; // default time limit for medium difficulty

// Initial high score setup
const setHighScore = () => {
    const savedHighScore = Number(localStorage.getItem('highScore'));
    if (!savedHighScore || savedHighScore < Number(score.textContent)) {
        localStorage.setItem('highScore', score.textContent);
        high_score.textContent = score.textContent;
    } else {
        high_score.textContent = savedHighScore;
    }
}

const generate_button = () => {
    section.innerHTML = '';
    target.textContent = Math.floor(Math.random() * 15) + 1;
    for (let i = 0; i < 43; i++) {
        const randval = Math.floor(Math.random() * 15) + 1;
        const button = document.createElement("button")
        button.classList.add('btn2')
        section.append(button)
        button.textContent = randval
    }
    setHighScore();
}

const startTimer = (difficultyTime) => {
    let time = 0;
    clearInterval(id);
    id = setInterval(() => {
        time++;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        timer.textContent = ` ${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        if (time >= difficultyTime) {
            clearInterval(id);
            section.style.display = "none";
            section_over.style.opacity = "1";
            section.style.pointerEvents = "none";
            section_over.querySelector("h2 span").textContent = score.textContent;
        }
    }, 1000);
}

//  starting the game
section_start.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-start')) {
        section_start.style.display = "none";
        section_countdown.style.display = "block";
        // countdown starts
        for (let i = 3; i > 0; i--) {
            setTimeout(() => {
                countdown_number.textContent = i;
            }, (3 - i) * 1000);
        }
        setTimeout(() => {
            countdown_number.textContent = 'Go!';
        }, 3000);
        // Hide countdown and start game after 3.5 seconds
        setTimeout(() => {
            section_countdown.style.display = "none";
            section.style.display = "flex";
            section_over.style.display = "flex";
            section.style.pointerEvents = "auto";
            section_over.style.pointerEvents = "auto";
            generate_button();
            startTimer(difficultyTime);
        }, 3500);// Wait until countdown completes
    }
})

// Event listener for button clicks
section.addEventListener('click', (e) => {
    console.log("hello here")
    var c = Number(score.textContent)
    if (e.target.classList.contains('btn2')) {
        if (e.target.textContent === target.textContent) {
            c += 10;
            e.target.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
            soundCorrect.play();
        } else {
            c -= 5;
            e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            soundWrong.play();
        }
        e.target.style.pointerEvents = 'none';
        score.textContent = c;
        target.textContent = '';
        // Delay before generating new buttons
        setTimeout(() => {
            generate_button();
            section.style.pointerEvents = "auto";
        }, 300); // wait 300ms to show the color
    }
})

// Restart button functionality
restart.addEventListener('click', (e) => {
    section.style.display = "flex";
    section.style.pointerEvents = "auto"
    section_over.style.opacity = "0";
    score.textContent = 0;
    generate_button()
    startTimer(difficultyTime)
})

// Select button functionality
select_btn.addEventListener('click', (e) => {
    start_container.style.display = "none";
    difficulty_container.style.display = "flex";
    difficulty_container.style.pointerEvents = "auto";
})

// Difficulty selection
difficulty_container.addEventListener('click', (e) => {
    if (e.target.classList.contains('easy')) {
        difficulty = 'easy';
        difficultyTime = 60; // 60 seconds for easy
        start_container.style.display = "flex";
        difficulty_container.style.display = "none";
    }
    else if (e.target.classList.contains('medium')) {
        difficulty = 'medium';
        difficultyTime = 45; // 45 seconds for medium
        start_container.style.display = "flex";
        difficulty_container.style.display = "none";
    }
    else if (e.target.classList.contains('hard')) {
        difficulty = 'hard';
        difficultyTime = 30; // 30 seconds for hard
        start_container.style.display = "flex";
        difficulty_container.style.display = "none";
    }
});

// Remove it when tab is closed or refreshed
//window.addEventListener("beforeunload", function () {
//    localStorage.removeItem("highScore");
//});
