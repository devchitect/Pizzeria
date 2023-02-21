//sign In Pop-Up
    const accountToggleBtn = document.querySelector("#account-icon")
    accountToggleBtn.addEventListener("click",toggleAcc)

    const accountCloseBtn = document.querySelector("#account-close")
    accountCloseBtn.addEventListener("click",closeAcc)

    const signInBox = document.querySelector(".account-details")

    const body = document.getElementsByTagName('body')[0];

    let  signIn_toggle = 0;




    /*Fake Sign In*/
    let emailData = sessionStorage.getItem("email");
    let passwordData = sessionStorage.getItem("password");
    let nameData = sessionStorage.getItem("name");
    let genderData = sessionStorage.getItem("gender");
    let birthData = sessionStorage.getItem("birthdate");
    let phoneData = sessionStorage.getItem("phone");
    let addressData = sessionStorage.getItem("address");

    console.log(emailData)
    console.log(passwordData)

    let signIn_flag = sessionStorage.getItem("signInFlag");
    let flagEmail, flagPass;
    flagEmail = flagPass = false;

    function fakeSignIn(){
        if(document.querySelector("#email").value === emailData){
            flagEmail = true;
        }else{
            flagEmail = false;
        }
        if(document.querySelector("#password").value === passwordData){
            flagPass = true;
        }else {
            flagPass = false;
        }

        if (flagEmail && flagPass){
            closeAcc();
            sessionStorage.setItem("signInFlag","1")

            signIn_flag = sessionStorage.getItem("signInFlag");

            document.querySelector(".popup-si-alert").classList.replace("dp-none","dp-block");
            setTimeout(()=>{
                document.querySelector(".popup-si-alert").classList.replace("dp-block","dp-none");
            },5000)
        }else {
            console.log("Sign in Failed!")
        }


    }

    /*User */
    function closeUser(){
        document.querySelector(".user-popup").classList.replace("dp-block","dp-none")
    }
    function logOut(){
        document.querySelector(".user-popup").classList.replace("dp-block","dp-none")
        sessionStorage.setItem("signInFlag","0")
        signIn_flag = sessionStorage.getItem("signInFlag");
        flagEmail = flagPass = false;
    }

    /*Sign In Success Alert*/
    function closeAlert(){
        document.querySelector(".popup-si-alert").classList.replace("dp-block","dp-none");
    }
    /*Toggle Account Button*/
    function toggleAcc(){
        if(signIn_flag === "1"){
            document.querySelector(".user-popup").classList.replace("dp-none","dp-block")
        }
        else if (signIn_toggle % 2 === 0 && signIn_flag !== "1") {
            body.style.overflowY = 'hidden';
            signInBox.style.display = "flex";
            signIn_toggle++;
        }

    }

    function closeAcc(){
        body.style.overflowY = 'visible';
        signInBox.style.display="none";
        signIn_toggle=0;
    }

    /*Show Pass in Sign In Box*/
    let passFlag = true;
    function showPass(){
        let show = document.querySelector(".show")
        if(passFlag){
            document.getElementById("password").setAttribute("type","text")
            show.classList.remove("bi-eye-slash-fill")
            show.classList.add("bi-eye-fill")
            passFlag = false;
        }else {
            document.getElementById("password").setAttribute("type","password")
            show.classList.remove("bi-eye-fill")
            show.classList.add("bi-eye-slash-fill")
            passFlag = true;
        }
    }

