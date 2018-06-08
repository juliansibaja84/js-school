const NOTE_AUDIO = {
    C: new Audio('./assets/notes/note1s.mp3'),
    D: new Audio('./assets/notes/note2s.mp3'),
    E: new Audio('./assets/notes/note3s.mp3'),
    F: new Audio('./assets/notes/note4s.mp3'),
    G: new Audio('./assets/notes/note5s.mp3'),
    A: new Audio('./assets/notes/note6s.mp3'),
    B: new Audio('./assets/notes/note7s.mp3'),
    SC: new Audio('./assets/notes/note8s.mp3'),
    SD: new Audio('./assets/notes/note9s.mp3'),
    SF: new Audio('./assets/notes/note10s.mp3'),
    SG: new Audio('./assets/notes/note11s.mp3'),
    SA: new Audio('./assets/notes/note12s.mp3'),
}

const NOTE = [
    document.getElementById('C'),
    document.getElementById('D'),
    document.getElementById('E'),
    document.getElementById('F'),
    document.getElementById('G'),
    document.getElementById('A'),
    document.getElementById('B'),
    document.getElementById('SC'),
    document.getElementById('SD'),
    document.getElementById('SF'),
    document.getElementById('SG'),
    document.getElementById('SA'),
]

const playNote = (ev) => {
    if (ev.type === "keydown") {
        console.log(ev.key);
        if (ev.key === "a") NOTE_AUDIO['C'].play();
        if (ev.key === "s") NOTE_AUDIO['D'].play();
        if (ev.key === "d") NOTE_AUDIO['E'].play();
        if (ev.key === "f") NOTE_AUDIO['F'].play();
        if (ev.key === "g") NOTE_AUDIO['G'].play();
        if (ev.key === "h") NOTE_AUDIO['A'].play();
        if (ev.key === "j") NOTE_AUDIO['B'].play();
        if (ev.key === "w") NOTE_AUDIO['SC'].play();
        if (ev.key === "e") NOTE_AUDIO['SD'].play();
        if (ev.key === "t") NOTE_AUDIO['SF'].play();
        if (ev.key === "y") NOTE_AUDIO['SG'].play();
        if (ev.key === "u") NOTE_AUDIO['SA'].play();
    } else if (ev.type === "click") {
        NOTE_AUDIO[ev.target.id].play();
        
    }
};



for (let i = 0;i < 12; i++) {
    NOTE[i].addEventListener('click', playNote);
    document.addEventListener('keydown',playNote) 
}



