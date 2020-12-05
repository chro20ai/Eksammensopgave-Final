//Getting all the data from html
let username3 = document.getElementById("patchUsername");
let password3 = document.getElementById("patchPassword");
let firstname3 = document.getElementById("patchFirstName");
let lastname3 = document.getElementById("patchLastName");
let age3 = document.getElementById("patchAge");
let gender3 = document.getElementById("patchGender");
let interest3 = document.getElementById("patchInterest");

//function to update a profile
function updateFunction() {
    //Getting the data input from html
    let updateData = {
        username : username3.value,
        password1 : password3.value, 
        firstname : firstname3.value,
        lastname : lastname3.value,
        age : age3.value,
        gender : gender3.value,
        interest : interest3.value,
        id : localStorage.getItem('loggedIn')
    }

    //Patch the user by the id from local storage
    axios.patch("http://localhost:3000/users/" + localStorage.getItem('loggedIn'), updateData)
                .then(function(response){
                //Change the value in local storage as well
                localStorage.setItem('username', username3.value);
                localStorage.setItem('password', password3.value);
                })
                //Send client back to profile site
                .then(() => window.location = "profile.html");
}
