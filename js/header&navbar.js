//Define Varible
    const navToggleBtn = document.querySelector("#nav-icon")
    navToggleBtn.addEventListener("click",toggleNav)

    const navbar = document.querySelector(".nav");

    const navLinks = document.querySelectorAll(".nav-link")

    let nav_status = 0;

    let prevScrollPos = window.scrollY;
//Header & Navigation Bar
    function toggleNav(){
        if (nav_status % 2 === 0){
            navbar.classList.remove("nav-deactive")
            navbar.classList.add("nav-active")
            nav_status++;
            navToggleBtn.classList.remove("bi-list")
            navToggleBtn.classList.add("bi-x-square")
        }
        else{
            navbar.classList.remove("nav-active")
            navbar.classList.add("nav-deactive")
            nav_status++;
            navToggleBtn.classList.remove("bi-x-square")
            navToggleBtn.classList.add("bi-list")

        }
    }
    /*Navbar movement for responsive*/
    navLinks.forEach(closeNav)
    function closeNav(link){
        link.addEventListener("click",() => {
            document.querySelector("nav").classList.replace("nav-active","nav-deactive");
            navToggleBtn.classList.remove("bi-x-square")
            navToggleBtn.classList.add("bi-list")
            nav_status = 0;
        })
    }
    document.querySelector(".cart-icon-box").addEventListener("click",() => {
        document.querySelector("nav").classList.replace("nav-active","nav-deactive");
        navToggleBtn.classList.remove("bi-x-square")
        navToggleBtn.classList.add("bi-list")
        nav_status = 0;
    })
    document.querySelector("#sign-up-here").addEventListener("click",() => {
        document.querySelector("nav").classList.replace("nav-active","nav-deactive");
        navToggleBtn.classList.remove("bi-x-square")
        navToggleBtn.classList.add("bi-list")
        nav_status = 0;
    })

//

window.addEventListener('scroll', function() {
    let currentScrollPos = window.scrollY;

    if( prevScrollPos < currentScrollPos && window.innerWidth > 1200){
        document.querySelector(".header-nav").style.top = "-100px";
    }else {
        document.querySelector(".header-nav").style.top = "0";
    }
});