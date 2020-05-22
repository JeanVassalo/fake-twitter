
const isEmpty=(field)=>{
    if (field.trim()==="") {
        return true
    }else{
        return false
    }
}

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.match(emailRegEx)) return true;
    else return false;
}

exports.validateSignup = (newUser) => {
    let errors = {};

    if(isEmpty(newUser.name)) errors.name = 'O campo não pode estar vazio';
    if(!isEmail(newUser.email)) errors.email = 'O email não é válido';
    if(isEmpty(newUser.password)) errors.password = 'O campo não pode estar vazio';
    if(newUser.confirmPassword !== newUser.password) errors.confirmPassword = 'Os campos não podem ser diferentes';
    if(isEmpty(newUser.username)) errors.username = 'O campo não pode estar vazio';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}
