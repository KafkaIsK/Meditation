const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    // Get length of outline
    const outlineLength = outline.getTotalLength();
    // Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick Sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', () => {
            song.src = sound.getAttribute('data-sound');
            video.src = sound.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // Play Sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Select Sound
    timeSelect.forEach(option => {
        option.addEventListener('click', () => {
            fakeDuration = option.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    // Function specific to stop and play sounds
    const checkPlaying = song => {
        if (song.paused)
        {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }
        else
        {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    // Animate Circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = `0${Math.floor(elapsed % 60)}`;
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
    
        timeDisplay.textContent = `${minutes}:${seconds.substr(-2)}`;

        if (currentTime >= fakeDuration){
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
        }
    };
};


app();