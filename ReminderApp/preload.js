const btn = document.querySelector('.btn');
const input = document.querySelector('input');
const numbInput = document.querySelector('.numb-input');

let alertContent = "";
let alertTime = 0;
let formError = document.querySelector('.form-error');
let fun = false;
let startBtn = document.createElement('button');
let audioFile;
let audioInput = document.querySelector('.audio-input');
let allControl;
let isUpload = document.querySelector('.upload-span');

audioInput.addEventListener('change', (event) => {
    audioFile = event.target.files[0].path;
    isUpload.innerHTML = event.target.files[0].name;
})

function playSound(songData) {
    const audio = new Audio(songData);
    audio.play();
    setTimeout(() => {
        audio.pause();
    }, 3000);
}

startBtn.classList.add('secbtn');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    alertContent = input.value;
    alertTime = numbInput.value;
    if (alertContent !== "" && alertTime > 0) {
        if (!fun) {
            formError.innerHTML = `<p class = "first">Alert content: ${alertContent} </p> <br> <p class = "seconds">Alert time: ${alertTime} second </p> <br> <p class = "lasto">Do you Approve boss ?</p></p> `;
            formError.appendChild(startBtn);
            startBtn.classList.add('yes');
            startBtn.classList.add('secbtn');
            startBtn.innerHTML = "Im Approve dude";
            startBtn.style.marginTop = "20px";
        }
        else {
            formError.innerHTML = `<p class = "frst"> Now its okey</p> <p class = "first"> Alert content: ${alertContent} </p> <br> <p class = "seconds">Alert time: ${alertTime} second </p> <br> <p class = "lasto">Do you Approve boss ?</p></p>`;
            formError.appendChild(startBtn);
            startBtn.classList.add('yes');
            startBtn.innerHTML = "Thanks man Im Approve";
            startBtn.style.marginTop = "20px";
        }
    }
    else {
        formError.innerHTML = `You forget content or time boss!!`;
        formError.style.color = "crimson";
        fun = true;
    }
})

let fakeTime = alertTime;

function createNotifycation() {
    Notification.requestPermission().then((res) => {
        res = new Notification('Its Time Boss', {
            body: alertContent
        });
    })

}

function timeCalc(timeParam) {
    return timeParam + "" + 0 + "" + 0 + "" + 0;
}

let stopApp = document.querySelector('.stop');
let stopBtn = document.createElement('button');
stopBtn.classList.add('secbtn');
let appInterval;
let showInterval;
let okeyBoss = document.createElement('p');

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.okeyBoss').appendChild(okeyBoss)
    okeyBoss.innerHTML = "Okay boss";
    setTimeout(() => {
        okeyBoss.innerHTML = "";
    }, 1000);
    fakeTime = alertTime;
    appInterval = setInterval(() => {
        formError.innerHTML = fakeTime -= 1 + "";
        if (fakeTime <= 0) {
            createNotifycation();
            playSound(audioFile);
            fakeTime = alertTime;
        }
    }, 1000);

    if (formError.innerHTML.includes("")) {
        setTimeout(() => {
            formError.classList.add('timing');
        }, 1000);
    }
    stopApp.appendChild(stopBtn);
    stopBtn.innerHTML = "Now stop man thanks";
    stopBtn.style.display = "block";
    stopBtn.style.margin = "0 auto";
    stopBtn.style.marginTop = "20px"
    startBtn.style.display = "none";
});

stopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formError.classList.remove('timing');
    clearInterval(appInterval);
    alert('We are stop boss');
    startBtn.innerHTML = "Start again dude";
    document.querySelector('.okeyBoss').appendChild(okeyBoss)
    okeyBoss.innerHTML = "Okey boss";
    setTimeout(() => {
        okeyBoss.innerHTML = "";
    }, 1000);
    startBtn.style.margin = "0 auto";
    fakeTime = alertTime;
    formError.innerHTML = "";
    formError.appendChild(startBtn);
    stopBtn.style.display = "none";
    startBtn.style.display = "block";
})






