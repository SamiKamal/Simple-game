const {uid} = require("uid/single")
let usernameInput = document.querySelector('.input-name')

if (usernameInput){
    usernameInput.addEventListener('keypress', e => {
        if (e.keyCode === 13){
            checkName(e.target.value)
        }
    })
    
    document.querySelector('.btn-new').addEventListener('click', e => {
        checkName(usernameInput.value)
        
    })
    
    function checkName(value) {
        if (!value) {
            document.querySelector('.alert').textContent = 'Please enter a valid name'
        } else {
            let randomID = uid()
            document.querySelector('.alert').textContent = ''
            localStorage.setItem('username', value)
            window.location = '/online/' + randomID
        }
    }
}
