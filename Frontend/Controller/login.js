//Getting the input data form html
let username2 = document.getElementById('usernameid2');
let password2 = document.getElementById('passwordid2');

//Funktion der validerer om du er en bruger
function validateLogIn() {
    let logindata = {
        username2 : username2.value,
        password2 : password2.value 
    }
    //Checking in ../Routes/users.js if input matches
    axios.post('http://localhost:3000/users/login', logindata)
                .then(function(response){
                    //Setting up local storage for user
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('username', username2.value);
                    localStorage.setItem('password', password2.value);
                
                    
                })
                //Sending client to the profile site
                .then(() => window.location = 'profile.html');

}

