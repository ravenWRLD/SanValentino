// check password
function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    const correctPassword = '19-08-2024';

    if (password == correctPassword) {
        document.getElementById('passwordScreen').classList.add('hidden');
        setTimeout(() => {
            document.getElementById('mainContent').classList.add('visible');
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