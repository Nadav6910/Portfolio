import "./styles/styles.css"
import "./styles/animatedbackground.css"
import "./particles"
import "./app"

// creating animation on hover for top nav bar ***

const projects = document.getElementsByClassName("nav-projects")[0]
const about = document.getElementsByClassName("nav-about")[0]
const contact = document.getElementsByClassName("nav-contact")[0]

projects.addEventListener('mouseenter', () => {
  projects.classList.add("hovered")
})

about.addEventListener('mouseenter', () => {
  about.classList.add("hovered")
})

contact.addEventListener('mouseenter', () => {
  contact.classList.add("hovered")
})

projects.addEventListener('mouseleave', () => {
  projects.classList.remove("hovered")
})

about.addEventListener('mouseleave', () => {
  about.classList.remove("hovered")
})

contact.addEventListener('mouseleave', () => {
  contact.classList.remove("hovered")
})




//hamburger manu animations handler

const icon = document.getElementById("icon");
const icon1 = document.getElementById("a");
const icon2 = document.getElementById("b");
const icon3 = document.getElementById("c");
const nav = document.getElementById('nav');
const blue = document.getElementById("blue");

icon.addEventListener('click', function() {
  icon1.classList.toggle('a');
  icon2.classList.toggle('c');
  icon3.classList.toggle('b');
  if (icon3.style.bottom === "" && icon1.style.bottom === "") {
    icon1.style.top = "0.1em"
    icon3.style.bottom = "0.2em"
  } else {
    icon1.style.top = ""
    icon3.style.bottom = ""
  }
  nav.classList.toggle('show');
  blue.classList.toggle('slide');
});

//close manu on select
const hamburgerManuListItems = document.getElementsByClassName("top-nav-list-hamburger")[0].querySelectorAll('a')

hamburgerManuListItems.forEach((item) => {
  item.addEventListener("click", function() {
    icon1.classList.toggle('a');
    icon2.classList.toggle('c');
    icon3.classList.toggle('b');
    if (icon3.style.bottom === "" && icon1.style.bottom === "") {
      icon1.style.top = "0.1em"
      icon3.style.bottom = "0.2em"
    } else {
      icon1.style.top = ""
      icon3.style.bottom = ""
    }
    nav.classList.toggle('show');
    blue.classList.toggle('slide');
  })
})




//title typing effect

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

const titles = ["Creative Front-End Developer", "Full-Stack Engineer", "designer"]
let count = 0
let index = 0
let currentWord = ""
let letter = ""
let write = true

async function type() {
    if (count === titles.length) {
        count = 0
    }

    currentWord = titles[count]
    
    if (write) {
        letter = currentWord.slice(0, ++index)
    }

    document.querySelector(".typing").textContent = letter

    if (letter.length === currentWord.length) {
        await sleep(1500)
    }

    if (letter.length === currentWord.length || !write) {
        write = false
        letter = currentWord.slice(0, --index)
    }

    if (letter.length === 0) {
        document.querySelector(".typing").textContent = letter
        write = true
        count++
        index = 0
    }

    if (letter.length !== currentWord.length && write) {
        setTimeout(type, 230)
    } else {
        setTimeout(type, 70)
    }
}

type()




//loading page handle

window.addEventListener("load", () => {
  if (document.readyState !== "loading") { 
    let loadingPage = document.getElementById("loading")
    setTimeout(() => loadingPage.style.display = "none", 1250) 
    setTimeout(() => document.getElementsByClassName("logo-svg")[0].style.animation = "popInLeft ease 800ms", 1200)
    setTimeout(() => document.getElementsByClassName("top-nav-list")[0].style.animation = "popInDown ease 1s", 1200)
  }
})

// handle hover on enter project btn

if (window.innerWidth > 779) {
  let imgList = Array.from(document.querySelectorAll(".project-img"));
  
  const enterProjectBtn = document.querySelectorAll(".container")
  
  enterProjectBtn.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      imgList.forEach(img => {
        img.style.filter = "brightness(45%)"
      })
    })
    
    btn.addEventListener('mouseleave', () => {
      imgList.forEach(img => {
        img.style.filter = "unset"
      })
    })
  })
} 

//handle click on enter project btns
const enterProjectBtn = document.querySelectorAll(".container")

enterProjectBtn.forEach(btn => {
  
  if (btn.parentElement.id === "project-1") {
    btn.addEventListener('click', () => {
      window.open("https://picer.netlify.app/", "_blank")
    })
  }

  if (btn.parentElement.id === "project-2") {
    btn.addEventListener('click', () => {
      window.open("https://quirky-bhabha-3a3b53.netlify.app/", "_blank")
    })
  }

  if (btn.parentElement.id === "project-3") {
      btn.addEventListener('click', () => {
      window.open("https://chic-entremet-be5027.netlify.app/", "_blank")
    })
  }
})

