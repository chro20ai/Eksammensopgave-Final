//Getting the user input
let username = document.getElementById("usernameid");
let firstname = document.getElementById("firstnameid");
let lastname = document.getElementById("lastnameid");
let age = document.getElementById("ageid");
let gender = document.getElementById("genderid");
let interest = document.getElementById("interestid");
let password1 = document.getElementById("passwordid");

//Function to validate if user fullfil all requirements
function validate() {
var errormessage = ""; 

//error for username
    if (username.value == "") {
        errormessage += "box is empty \n";
    }
   
//error for first name
    if (firstname.value == "") {
        errormessage += "First name is empty\n"
    }
    
//error for last name
    if (lastname.value == "") {
        errormessage += "Last name is empty\n"
    }

//error for age
    if(age.value == "") {
    errormessage += "Skriv din alder i tal\n"
    }

//error for gender
    if(gender.value == "") {
        errormessage += "What is your gender?\n";
    }

//error for interest
    if(interest.value == "")
    errormessage += "Write your interest\n"

//error for password
    if (password1.value == "" || password1.value.length <6){
        errormessage += "Submit a password with at least 6 characters\n"
    }

//If errors have been added to the variable the error messages will be alerted
if (errormessage != ""){
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
            axios.post("http://localhost:3000/users", userdata)
            .then(function(response){
            })
         alert('You can now log in to the system');
        window.location = "login.html";
		}
}
