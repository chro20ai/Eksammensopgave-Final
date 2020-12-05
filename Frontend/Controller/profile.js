const app = document.querySelector("div#app");

//Delete User
function deleteuser() {

    //https://www.w3schools.com/jsref/met_win_confirm.asp

    //Confirm if you want to delete the user
    var r = confirm("Are you sure you want to delete this user?");
    if (r == true){
        //Delete the user with the id from localstorage
   axios.delete("http://localhost:3000/users/" + localStorage.getItem('loggedIn'))
   .then(function(res){
       //Deleting the localstorage data as well
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        localStorage.removeItem("loggedIn")
    })
    //Sending client back to the login page
    .then(() => window.location = "login.html");
   }
   //If cancelled an alert will be displayed
   else {
       alert("You are still a member")
   }
}
 

   
   
//Get User with id
    function getuser() {
    axios.get("http://localhost:3000/users/" + localStorage.getItem('loggedIn'))
    .then(function(res){
        document.getElementById("overview").innerHTML = `<p>${JSON.stringify(res.data)}</p>`
    })
}


const h1 = document.querySelector('h1')
const personalGreeting = document.querySelector('.personal-greeting')

//Show your name on profile site. 
function nameDisplayCheck() {
    if(localStorage.getItem('username')){
        let name = localStorage.getItem("username");
        h1.textContent = "Du er nu logget ind som, " + name;
    }
}
//Dette betyder at funtionen bliver kørt til sidst. 
document.body.onload = nameDisplayCheck


//Log ud function
function logout() {
    
    axios.post("http://localhost:3000/users/logout")
                .then(function(response){
                    //Edris sagde: localStorage.setItem('', response.data.id); Men det jeg har er godt nok.
                    localStorage.removeItem("username")
                    localStorage.removeItem("password")
                    localStorage.removeItem("loggedIn")
                
                    
                })
                .then(() => window.location = "login.html");
}





// Like funktion
// For loop hvor den kører en funktion, der laver get requests på brugerer, hvorefter man kan like eller dislike. 


