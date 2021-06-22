/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

let navbList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/




//Function to disable active sections
function disableSections() {
    for(const link of sections){
        link.classList.remove("active_section", "active");
    }
}

function disableNavLinks() {
    let navbarLinks = document.querySelectorAll(".nav__hyperlink");
    for(const link of navbarLinks){
        link.classList.remove("active-nav");
    }
}

function isInViewport(elem) {
	var distance = elem.getBoundingClientRect();
	return (
		distance.top >= -300 &&
		distance.left >= 0 &&
		distance.bottom <= (1.3 * window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

// build the nav
window.addEventListener('load', CreateNavbar())

// Add class 'active' to section when near top of viewport
function enableCurrentSection(currentSection) {
    currentSection.classList.add("active_section", "active");
    disableNavLinks();
    enableNavLinks(currentSection.getAttribute('id'));
}

function enableNavLinks(currentSectionId) {
    let navbarLinks = document.querySelectorAll(".nav__hyperlink");
        for(const link of navbarLinks){
            if(link.getAttribute('href') == `#${currentSectionId}`) {
                link.classList.add("active-nav");
            }
        }
}



// Build menu
function CreateNavbar() {
	for(const link of sections){
	    let listElement = document.createElement("li");
	    listElement.classList.add("navbar__list__item");
    	let sectionTitle = link.getAttribute("data-nav");
    	let currentSectionId = link.getAttribute("id");
        listElement.innerHTML = `<a href="#${currentSectionId}" class="nav__hyperlink">${sectionTitle}</a>`;
        navbList.appendChild(listElement);
    }
}

// Scroll to url ID using scrollTO event
function scrollToSectionOnClick() {
    let navbarLinks = document.querySelectorAll(".nav__hyperlink");
    for(const link of navbarLinks) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}
// Scroll to section on link click
scrollToSectionOnClick();

// Set sections as active
window.addEventListener('scroll', function (event) {
	event.preventDefault();

    for(const link of sections) {
        if (isInViewport(link)) {
            disableSections();
            enableCurrentSection(link);
        } else if(window.scrollY==0) {
            disableSections();
            disableNavLinks();
        }
    }
});
