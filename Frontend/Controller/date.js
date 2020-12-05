//Swipe through profiles function
var i = 0; 
function swipe(){
    
    //Skip the person logged in
    if (i === JSON.parse(localStorage.getItem("loggedIn"))){
        i++
    }
    
    //Getting a suggested user
    axios.get("http://localhost:3000/users/" + i)
    .then(function(res){
        localStorage.setItem("likeId", res.data.id);
        //Display first name and interest
        document.getElementById("displayFirstname").innerHTML = `<p>Name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>` 

        //For now hide other attributes
        document.getElementById('displayUsername').style.visibility = "hidden";
        document.getElementById('displayLastname').style.visibility = "hidden";
        document.getElementById('displayAge').style.visibility = "hidden";
        document.getElementById('displayGender').style.visibility = "hidden";



//Getting next user everytime function is running
i++ 

        //Alert if there are no more profiles
    if (localStorage.getItem('likeId') == "undefined"){
        document.getElementById("displayFirstname").style.visibility = 'hidden';
        document.getElementById("displayInterest").style.visibility = 'hidden';
        document.getElementById("noMoreUsers").innerHTML = '<p>Grab a coffee and wait for more users to be created!</p>'
        alert("no more profiles to swipe")
}
    })


}

//like and match function
function likeUser() {
    //Post the like to likes.json
    axios.post("http://localhost:3000/likes/", {
        loggedIn: localStorage.getItem("loggedIn"),
        id: localStorage.getItem("likeId")
        
    
    })
    .then(function(res){
            for ( i = 0; i < res.data.length; i++){
                for ( j = 0; j < res.data.length; j++){

                    //If you already liked the user you get an alert
                    if ( res.data[i].loggedIn === res.data[j].loggedIn && res.data[i].id === res.data[j].id && j!==i){
                        return alert('You have already liked this user');
                    }
                    //Check if there is a match
                    else if (res.data[i].loggedIn === res.data[j].id && res.data[i].id === res.data[j].loggedIn && j!==i) {
                                axios.post("http://localhost:3000/matches/", {
                                id1 : res.data[i].loggedIn, 
                                id2 : res.data[j].loggedIn
                                })  
                                .then(function(res){
                                })
                                return alert("Du har et match")
                                }
                   }   
                }
        })
    }

//Get full profile function for potentiel match
function getFullProfile() {
    axios.get("http://localhost:3000/users/" + localStorage.getItem('likeId'))
    .then(function(res){

        //Make attributes visible if function is running
        document.getElementById('displayUsername').style.visibility = "visible";
        document.getElementById('displayLastname').style.visibility = "visible";
        document.getElementById('displayAge').style.visibility = "visible";
        document.getElementById('displayGender').style.visibility = "visible";

        //Show data from json in paragraphs on html
        document.getElementById("displayFirstname").innerHTML = `<p>First name: ${JSON.stringify(res.data.firstname)}</p>`
        document.getElementById("displayInterest").innerHTML = `<p>Interest: ${JSON.stringify(res.data.interest)}</p>`
        document.getElementById("displayUsername").innerHTML = `<p>Username: ${JSON.stringify(res.data.username)}</p>`
        document.getElementById("displayLastname").innerHTML = `<p>Last name: ${JSON.stringify(res.data.lastname)}</p>`
        document.getElementById("displayAge").innerHTML = `<p>Age: ${JSON.stringify(res.data.age)}</p>`
        document.getElementById("displayGender").innerHTML = `<p>Gender: ${JSON.stringify(res.data.gender)}</p>`
    
        //Hide paragraphs if there are no more users to be shown
        if (localStorage.getItem('likeId') === "undefined"){
            document.getElementById('displayUsername').style.visibility = "hidden";
            document.getElementById('displayLastname').style.visibility = "hidden";
            document.getElementById('displayAge').style.visibility = "hidden";
            document.getElementById('displayGender').style.visibility = "hidden";
        }
    })
   
    
}

//Show mathces function
function showmatches() {
    axios.get("http://localhost:3000/matches/showmatches/")
    .then(function(res){    
    for ( i = 0; i < res.data.length; i++){

        //If the logged in user is the first id in a match it should add the data to the table
        if ( res.data[i].id1 === localStorage.getItem("loggedIn")){

    //I define a new variable that gets the match id
        var MatchId = res.data[i].MatchId

        //I save it to local storage
        localStorage.setItem('MatchId', res.data[i].MatchId)
    
                //I get the data of the other user that logged in user has matched
                axios.get("http://localhost:3000/users/" + res.data[i].id2)
                .then(function(res){

    //I define variables for data of the other user
    var myName = JSON.stringify(res.data.firstname);
    var interest = JSON.stringify(res.data.interest);
    var MatchId = JSON.stringify(MatchId);

    //Getting the data from html
    var table = document.getElementById("myTableData");
 
    //Variable to count the number of rows
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
 
    //Inserting the row in html. The first cell will have a button that runs the function deletematch()
    row.insertCell(0).innerHTML= `<input type="button" value = "Delete" onClick="deletematch()">`
    row.insertCell(1).innerHTML= myName;
    row.insertCell(2).innerHTML= interest;
   
                })
            
        }
        //The same but with id's switched around
        else if ( res.data[i].id2 === localStorage.getItem("loggedIn")){
            var MatchId = res.data[i].MatchId
            localStorage.setItem('MatchId', res.data[i].MatchId)

            axios.get("http://localhost:3000/users/" + res.data[i].id1)
                .then(function(res){  

    
    var myName = JSON.stringify(res.data.firstname);
    var interest = JSON.stringify(res.data.interest);
    var MatchId = JSON.stringify(MatchId);
    var table = document.getElementById("myTableData");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
 
    row.insertCell(0).innerHTML= `<input type="button" value = "Delete" onClick="deletematch()">`
    row.insertCell(1).innerHTML= myName;
    row.insertCell(2).innerHTML= interest;
    
                    return 
                })
        }
    }
}) 

}

//Function for deleting a match
function deletematch() {
    //Confirm action alert
    var r = confirm("Are you sure you want to delete this user?");
    if (r == true){
        //Deleting the match from json
        axios.delete("http://localhost:3000/matches/deletematch/" + localStorage.getItem("MatchId"))
    }
    //If you cancel the confirm alert you will still have the match
    else {
        alert('You are still a match')
    }
}