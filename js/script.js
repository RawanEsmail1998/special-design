// check if there is local storage color option
let mainColor = localStorage.getItem('color_option');
if(mainColor !== null){
    document.documentElement.style.setProperty('--main-color', localStorage.getItem('color_option'));
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove('active');
        if(element.dataset.color === mainColor){
            // add active class
            element.classList.add('active');
        }
    })  


}

// Random background option
let backgroundOption = true ;
// variable to control the interval
let backroundInterval ;
// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
// check if random background local storage is not empty
if(backgroundLocalItem !== null){
    if(backgroundOption === 'true' ){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }
    // remove active class from all spans
    document.querySelectorAll('.random-background span').forEach(element =>{
        element.classList.remove('active');
    });
    if(backgroundLocalItem === 'true'){
        document.querySelector('.random-background .yes').classList.add('active');
    }else{
        document.querySelector('.random-background .no').classList.add('active');
    }
}


// Toggle spin class on icon
document.querySelector('.toggle-settings .fa-gear').onclick = function(){
    // toggle class fa-spin for Rotation on self
    this.classList.toggle("fa-spin");
    // Toggle class open on main settings box
    document.querySelector(".settings-box").classList.toggle('open');
}
// switch colors
const colorLi = document.querySelectorAll(".colors-list li");
// loop on list li items
colorLi.forEach(li =>{
 li.addEventListener("click",(e) =>{
    //  set color on root
    document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
   //  set color on local storage
    localStorage.setItem("color_option",e.target.dataset.color)  ;
    // remove active class from all children
    handleActive(ev);
})
});

// switch random background option
const randomBackround = document.querySelectorAll(".random-background span");
// loop on all span
randomBackround.forEach(span =>{
 span.addEventListener("click",(e) =>{
    // remove active class from all children
    e.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove('active');
    })  
        // add active class on the clicked element
        e.target.classList.add('active');
        if(e.target.dataset.background === "yes"){
            backgroundOption =true;
            randomizeImgs();
            localStorage.setItem("background_option",true);
        }else{
            backgroundOption = false;
            clearInterval(backroundInterval);
            localStorage.setItem("background_option",false);
        }
})
});



// select landing page element
let landingPage = document.querySelector('.landing-page');

// get array images
let imgArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];

//change background image url
landingPage.style.backgroundImage = 'url("")';

// function to randomize Imgs
function randomizeImgs(){
    if(backgroundOption === true){
       backroundInterval = setInterval(() =>{
            // get random number
           let randomNum = Math.floor(Math.random() * imgArray.length);
           
           //change background image url
           landingPage.style.backgroundImage = 'url("imgs/'+ imgArray[randomNum] +'")';
           },1000)
    }
}

randomizeImgs();

// select skills selector
let ourSkills = document.querySelector('.skills');
window.onscroll = function() {
    // skills offst top

    let skillsOffsetTop = ourSkills.offsetTop;
    // outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window height 
    let windowHeight = this.innerHeight ;
    // window ScrollTop
    let windowScrollTop = this.pageYOffset;
    if(windowScrollTop < (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
        allSkills.forEach(skill =>{
          skill.style.width = skill.dataset.progress ;
        });
    } 
};
// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img =>{
    img.addEventListener('click',(e) =>{
        // create overlay element
        let overlay = document.createElement("div");
        // add class to overlay
        overlay.className = "popup-overlay";
        // append overlay to the body
        document.body.appendChild(overlay);
        // create the popup box
        let popupBox = document.createElement("div");
        // add class to the popup box
        popupBox.className = "popup-box";
        if(img.alt !==null){
            // create heading 
            let imgHeading = document.createElement("h3");
            // create text for heading
            let imgText = document.createTextNode(img.alt);
            // append the text to the haeding
            imgHeading.appendChild(imgText);
            // append the heading to the popup box
            popupBox.appendChild(imgHeading);
            
        }
        // create the image
        let popupImage = document.createElement("img");
        // set image source 
        popupImage.src = img.src ;
        // add image to popup box
        popupBox.appendChild(popupImage);
        // append the popup box to body
        document.body.appendChild(popupBox);
        // create close span
        let closeButton = document.createElement("span");
        // create the close Button text
        let closeButtonText = document.createTextNode("X");
        // append text to close button
        closeButton.appendChild(closeButtonText);
        // add class to close button
        closeButton.className = "close-button";
        // add close button to popup box
        popupBox.appendChild(closeButton);

    });

});
// close popup
document.addEventListener("click",(e) => {
    if(e.target.className == 'close-button' ){
        // remove the current popup
        e.target.parentNode.remove();
        // remove the overlay
        document.querySelector(".popup-overlay").remove();


    }
});

// select all bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
allBullets.forEach(bullet =>{

    bullet.addEventListener('click',(e) =>{
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:'smooth'
        });
    });
});

// select all links
const allLinks = document.querySelectorAll('.links a');
allLinks.forEach(link =>{

    link.addEventListener('click',(e) =>{
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:'smooth'
        });
    });
});


let bulletSpan = document.querySelectorAll('.bullets-option span');
let bulletContainer = document.querySelector('.nav-bullets');
let bulletLocalItem = localStorage.getItem("bullets_option");
if(bulletLocalItem !== null) {
    bulletSpan.forEach(span =>{
        span.classList.remove("active");

    });
    if(bulletLocalItem === "block"){
        bulletContainer.style.display = "block" ;
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
bulletSpan.forEach(span =>{
    span.addEventListener("click",(e)=>{
        if(span.dataset.display === "show"){
            bulletContainer.style.display = "block" ;
            localStorage.setItem("bullets_option", "block");
        }else{
            bulletContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        handleActive(e);
    });
});
// Reset Button 
document.querySelector(".reset-options").onclick = function(){
    // localStorage.clear();
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    window.location.reload();
    
}
//  toggle menu
let toggleButton = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleButton.onclick = function(e){
    // stop propagation
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
};
// click anywhere outside the menu
document.addEventListener("click",(e)=>{
    if(e.target !== toggleButton && e.target !== tLinks){
        // check if menu is open
        if(tLinks.classList.contains("open")){
            toggleButton.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});
// stop propagation on menu
tLinks.onclick = function(e){
    e.stopPropagation();
}


// handle active state
function handleActive(ev){

    // remove active class from all childrens

    ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove('active');
    });
        // add active class on the clicked element
        ev.target.classList.add('active');
}





















