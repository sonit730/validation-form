//Select the form fields and add the submit event listener
const userNameEl = document.querySelector('#username')
const emailEl = document.querySelector('#email')
const passwordEl = document.querySelector('#password')
const confirmPasswordEl = document.querySelector('#confirm-password')

const form = document.querySelector('#signup')

const checkUsername = () => {

    const min = 3, max = 25;
    const username = userNameEl.value.trim();

    if (!isRequired(username)) {
        showError(userNameEl, 'Vui lòng nhập trường này!')
    } else if (!isBetween(username.length, min, max)) {
        showError(userNameEl, `Username phải từ ${min} đến ${max} kí tự`)
    } else {
        showSuccess(userNameEl)
    }
}

const checkEmail = () => {
    const email = emailEl.value.trim();

    if (!isRequired(email)) {
        showError(emailEl, 'Vui lòng nhập trường này!')
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email không hợp lệ. Vui lòng nhập lại !')
    } else {
        showSuccess(emailEl)
    }
}

const checkPassword = () => {
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Vui lòng nhập trường này')
    } else if (isPasswordSecure(password)) {
        let results = isPasswordSecure(password);
        let html = ''

        results.forEach(result => {
            html += `<p>${result}</p>`
        })
        showError(passwordEl, html)
    } else {
        showSuccess(passwordEl)
    }
}

const checkConfirmPassword = () => {

    const confirmPassword = confirmPasswordEl.value.trim()
    const password = passwordEl.value.trim()

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Vui lòng nhập trường này')
    } else if (!(password === confirmPassword)) {
        showError(confirmPasswordEl, 'Mật khẩu nhập lại không khớp')
    } else {
        showSuccess(confirmPasswordEl)
    }
}


//Event listener form
form.addEventListener('submit', function (e) {

    //prevent the form from submitting
    e.preventDefault();

    //Check fileds
    checkUsername()
    checkEmail();
    checkPassword();
    checkConfirmPassword();
})


/** RULES CHECK FORM
 * A field is required.
 * The length of a field is between min and max.
 * The email is in a valid format.
 * The password is strong.
 */

//isRequired()
const isRequired = value => value === '' ? false : true;

//isBetween()
const isBetween = (length, min, max) => length < min || length > max ? false : true

//isEmail()
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


//isPasswordSecure()
const isPasswordSecure = (password) => {

    let errorArray = []

    // REGEX
    const lowerCaseLetters = /[a-z]/g
    const upperCaseLetters = /[A-Z]/g
    const numbersCharacter = /[0-9]/g
    const length = /^(?=.{8,})/
    const special = /[!@#\$%\^&\*]/g

    if (!lowerCaseLetters.test(password)) {
        errorArray.push('Có ít nhất một kí tự thường')
    }
    if (!upperCaseLetters.test(password)) {
        errorArray.push('Có ít nhất một kí tự hoa')
    }
    if (!numbersCharacter.test(password)) {
        errorArray.push('Có ít nhất một kí tự số')
    }
    if (!length.test(password)) {
        errorArray.push('Có ít nhất một 8 kí tự')
    }
    if (!special.test(password)) {
        errorArray.push('Có ít nhất một kí tự đặc biệt')
    }
    return errorArray.length == 0 ? false : errorArray
};


//showError()
const showError = (input, message = '') => {

    //get the form-field element
    const formField = input.parentElement
    //add the error class
    formField.classList.remove('success')
    formField.classList.add('error')

    //show the error message
    const error = formField.querySelector('small')
    error.innerHTML = message
};

//showSuccess()
const showSuccess = (input) => {

    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}