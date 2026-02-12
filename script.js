// check password
function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    const correctPassword = '19-08-2024';

    if (password == correctPassword) {
        document.getElementById('passwordScreen').classList.add('hidden');
        setTimeout(() => {
            document.getElementById('mainContent').classList.add('visible');
            // Avvia le particelle solo dopo aver sbloccato
            startParticles();
        }, 500);
    } else {
        const errorMsg = document.getElementById('errorMessage');
        errorMsg.classList.add('show');
        setTimeout(() => {
            errorMsg.classList.remove('show');
        }, 3000);
    }
}

// allow enter key to submit password
document.getElementById('passwordInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// love timer: count up from August 19, 2024
function updateLoveTimer() {
    const startDate = new Date('2024-08-19T00:00:00');
    const now = new Date();
    const diff = now - startDate;

    // convert to seconds, minutes, hours, days
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // calculate years, months, days, hours, minutes, seconds
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    const startDay = startDate.getDate();
    const nowDay = now.getDate();
    let days = nowDay - startDay;

    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateLoveTimer();
setInterval(updateLoveTimer, 1000);

// Lightbox per ingrandire le foto polaroid
document.addEventListener('DOMContentLoaded', function () {
    // Crea il lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="Foto ingrandita">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Aggiungi click listener a tutte le polaroid
    const polaroids = document.querySelectorAll('.polaroid img');
    polaroids.forEach(img => {
        img.addEventListener('click', function (e) {
            e.stopPropagation();
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
            lightbox.classList.remove('closing');
        });
    });

    // Funzione per chiudere con animazione
    function closeLightbox() {
        lightbox.classList.add('closing');
        setTimeout(() => {
            lightbox.classList.remove('active');
            lightbox.classList.remove('closing');
        }, 300); // durata animazione
    }

    // Chiudi il lightbox cliccando ovunque
    lightbox.addEventListener('click', function () {
        closeLightbox();
    });

    // Chiudi con il pulsante X
    closeBtn.addEventListener('click', function () {
        closeLightbox();
    });

    // Chiudi con il tasto ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});

// Crea particelle di cuori che cadono
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 6) + 's'; // tra 6 e 9 secondi

    document.body.appendChild(particle);

    // Rimuovi la particella dopo l'animazione
    setTimeout(() => {
        particle.remove();
    }, 10000);
}

// Funzione per avviare le particelle (chiamata solo dopo sblocco password)
function startParticles() {
    // Crea particelle regolarmente
    setInterval(createParticle, 400); // ogni 400ms

    // Crea alcune particelle iniziali
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 200);
    }
}
