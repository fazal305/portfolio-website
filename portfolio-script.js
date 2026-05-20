// Navbar blur effect

const navbar = document.querySelector(".custom-navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    }

    else {
        navbar.classList.remove("scrolled");
    }

});

// Open to work banner

const hiringBanner = document.getElementById("hiringBanner");

const closeBannerBtn = document.getElementById("closeBannerBtn");

if (sessionStorage.getItem("bannerClosed") === "true") {

    if (hiringBanner) {
        hiringBanner.style.display = "none";
    }

    if (navbar) {
        navbar.style.top = "0";
    }

}

if (closeBannerBtn) {

    closeBannerBtn.addEventListener("click", function () {

        hiringBanner.style.display = "none";

        sessionStorage.setItem("bannerClosed", "true");

        navbar.style.top = "0";

    });

}

// Page loader

window.addEventListener("load", function () {

    const pageLoader = document.getElementById("pageLoader");

    if (pageLoader) {
        pageLoader.classList.add("hide-loader");
    }

});

// Typewriter effect

const typewriterText = document.getElementById("typewriterText");

const typewriterWords = [
    "Frontend Developer",
    "UI Builder",
    "VB.NET Developer",
    "Python Learner",
    "Beginner Who Ships"
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeWriter() {

    if (!typewriterText) {
        return;
    }

    const currentWord = typewriterWords[wordIndex];

    if (isDeleting === false) {

        typewriterText.textContent = currentWord.substring(0, letterIndex + 1);

        letterIndex++;

        if (letterIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeWriter, 1200);

            return;
        }

    }

    else {

        typewriterText.textContent = currentWord.substring(0, letterIndex - 1);

        letterIndex--;

        if (letterIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex === typewriterWords.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(typeWriter, isDeleting ? 60 : 100);

}

typeWriter();

// Scroll progress bar

const scrollProgressBar = document.getElementById("scrollProgressBar");

window.addEventListener("scroll", function () {

    if (!scrollProgressBar) {
        return;
    }

    let scrollTop = window.scrollY;

    let pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    let scrollPercent = (scrollTop / pageHeight) * 100;

    scrollProgressBar.style.width = scrollPercent + "%";

});

// Project filter

const filterButtons = document.querySelectorAll(".filter-btn");

const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active-filter");
        });

        button.classList.add("active-filter");

        const filterValue = button.getAttribute("data-filter");

        projectItems.forEach(function (project) {

            const category = project.getAttribute("data-category");

            if (filterValue === "all") {
                project.style.display = "block";
            }

            else if (category.includes(filterValue)) {
                project.style.display = "block";
            }

            else {
                project.style.display = "none";
            }

        });

    });

});

// jQuery project hover effect

$(".project-card").hover(

    function () {
        $(this).css("transform", "translateY(-10px)");
    },

    function () {
        $(this).css("transform", "translateY(0)");
    }

);

// Copy email button

const copyEmailBtn = document.getElementById("copyEmailBtn");

if (copyEmailBtn) {

    copyEmailBtn.addEventListener("click", function () {

        navigator.clipboard.writeText("fazalabbas2002@gmail.com");

        copyEmailBtn.textContent = "Copied! ✓";

        setTimeout(function () {
            copyEmailBtn.textContent = "Copy Email";
        }, 2000);

    });

}

// Contact form validation

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const userName = document.getElementById("userName").value.trim();

        const userEmail = document.getElementById("userEmail").value.trim();

        const userMessage = document.getElementById("userMessage").value.trim();

        if (userName === "" || userEmail === "" || userMessage === "") {

            formMessage.textContent = "Please fill all fields.";

            return;
        }

        formMessage.textContent = "Message ready. Firebase saving will be connected next.";

        contactForm.reset();

    });

}

// Scroll reveal animation

const revealSections = document.querySelectorAll(".reveal-section");

const revealObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("show-section");
        }

    });

}, {
    threshold: 0.15
});

revealSections.forEach(function (section) {
    revealObserver.observe(section);
});

// Active navbar links

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".custom-nav-link");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 160;

        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active-link");
        }

    });

});

// Animated counters

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

function startCounters() {

    if (countersStarted === true) {
        return;
    }

    counters.forEach(function (counter) {

        const target = Number(counter.getAttribute("data-target"));

        let currentNumber = 0;

        const increment = target / 60;

        const counterInterval = setInterval(function () {

            currentNumber += increment;

            if (currentNumber >= target) {

                currentNumber = target;

                clearInterval(counterInterval);

            }

            // Add plus sign or percent

            if (target === 100) {

                counter.textContent =
                    Math.floor(currentNumber) + "%";

            }

            else {

                counter.textContent =
                    Math.floor(currentNumber) + "+";

            }

        }, 25);

    });

    countersStarted = true;

}

// Detect about section

const aboutSection = document.querySelector(".about-section");

const counterObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            startCounters();

        }

    });

}, {
    threshold: 0.4
});

if (aboutSection) {

    counterObserver.observe(aboutSection);

}