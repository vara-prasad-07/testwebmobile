
let signupcontainer=document.getElementById("signup")
let logincontainer=document.getElementById("login")
let signuplink=document.getElementById("signuplink")        
let loginlink=document.getElementById("loginlink")


let sinupbtn=document.getElementById("signupbtn")
        sinupbtn.addEventListener("click",function(event){
            event.preventDefault(); // Prevent the default form submission
            window.location.href = "userdetails.html"// Replace with your desired action
        });

loginlink.addEventListener("click",function(event){
          // Prevent the default form submission
            signupcontainer.classList.add("d-none")// Replace with your desired action
            logincontainer.classList.remove("d-none")
})

signuplink.addEventListener("click",function(event){
            // Prevent the default form submission
            logincontainer.classList.add("d-none")// Replace with your desired action
            signupcontainer.classList.remove("d-none")
})