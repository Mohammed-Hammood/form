const endpoint = "https://posts-comments-users.vercel.app/api/auth/form";
const validateCallbacks = [];
const fullName = document.getElementById('fullName');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submitStatus = document.getElementById('submitStatus');
const form = document.getElementById('form-feedback');


function Validation(element, required_regex, errorMessage = '') {
    const regEx = {
        'email': /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'phone': /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/
    };
    const regex = regEx[required_regex];

    validateCallbacks.push(() => {
        if (!element.value.trim()) {
            return true;
        }
        const isValid = regex.test(element.value);

        if (isValid) {
            element.parentElement.classList.remove('has-error');
            element.parentElement.children[2].innerHTML = '';
            return true;
        } else {
            element.parentElement.classList.add('has-error');
            element.parentElement.children[2].innerHTML = errorMessage;
            return false;
        }
    });
    element.addEventListener('change', validateCallbacks.at(-1));
}

function submitHandler() {
    if (!validateCallbacks.some(item => !item())) {
        const data = {
            name: fullName.value,
            phone: phone.value,
            email: email.value,
            message: message.value,
        };

        document.getElementById("form-feedback").style.display = "none";
        submitStatus.innerHTML = 'Загрузка';

        function sendRequest() {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                const res = JSON.parse(this.response).ok;
                if (res) {
                    submitStatus.innerHTML = 'Успешно';
                    document.getElementById("form-feedback").style.display = "none";

                } else {
                    document.getElementById("form-feedback").style.display = "block";
                    submitStatus.innerHTML = 'Ошибки';
                }
            }
            xhttp.open("POST", endpoint);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(JSON.stringify(data));
        }
        sendRequest();
    }
}

Validation(email, 'email', 'Э. почта должна быть: name@example.com');
Validation(phone, 'phone', 'номер должен быть: +7 (423) 123-45-67');
form.addEventListener('submit', submitHandler);