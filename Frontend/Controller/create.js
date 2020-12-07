//Getting the user input
let username = document.getElementById('usernameid');
let firstname = document.getElementById('firstnameid');
let lastname = document.getElementById('lastnameid');
let age = document.getElementById('ageid');
let gender = document.getElementById('genderid');
let interest = document.getElementById('interestid');
let password1 = document.getElementById('passwordid');

//Function to validate if user fullfil all requirements
function validateNewUser() {
var errormessage = ''; 

//Errors for username
if (username.value == '' ) {
    errormessage += 'Please type in a username \n';
}
else if (username.value.length  <4){
    errormessage += 'Submit a username with at least 4 characters\n'
}

//Error for first name
if (firstname.value == '') {
    errormessage += 'Please type in a first name\n'
}

//Error for last name
if (lastname.value == '') {
    errormessage += 'Please type in a last name\n'
}

//Errors for age
if(age.value == '') {
errormessage += 'Your age has to be an integer\n'
}
else if(age.value > 110){
    errormessage += 'Are you a wizard? Please enter a valid age\n'
}

//Error for gender
if(gender.value == '') {
    errormessage += 'Please type in a gender\n';
}

//Error for interest
if(interest.value == '')
errormessage += 'Let other people know of your interest\n'

//Errors for password
if (password1.value == '' || password1.value.length <6){
    errormessage += 'Please submit a password with at least 6 characters\n'
}
else if (password1.value.search(/[a-z]/i) < 0 || password1.value.search(/[A-Z]/i) < 0 || password1.value.search(/[0-9]/) < 0) {
   errormessage += 'Your password must contain at least one lower case letter, \none upper case letter, \nand a number.'; 
}

//If errors have been added to the variable the error messages will be alerted
if (errormessage != ''){
    alert(errormessage)
}

//If the variable is empty it means the user fullfil requirements and user will be created
else {
//let userdata = new User(username.value, password1.value, firstname.value, lastname.value, age.value, gender.value, interest.value)
            let userdata = {
                username : username.value,
                password1 : password1.value,
                firstname : firstname.value,
                lastname : lastname.value,
                age : age.value, 
                gender : gender.value, 
                interest : interest.value
            }
            //Posting the data
            axios.post('http://localhost:3000/users', userdata)
            .then(function(response){
            })
         alert('You can now log in to the system');
        window.location = 'login.html';
		}
}
