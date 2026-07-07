const siteHeader = document.getElementById("siteHeader");
const availabilityBanner = document.getElementById("availabilityBanner");
const closeBannerBtn = document.getElementById("closeBannerBtn");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const pageLoader = document.getElementById("pageLoader");
const scrollProgressBar = document.getElementById("scrollProgressBar");
const typewriterText = document.getElementById("typewriterText");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const counters = document.querySelectorAll(".counter");
const revealSections = document.querySelectorAll(".reveal-section");
const navAnchorLinks = document.querySelectorAll(".nav-link");

const typewriterWords = [
    "Frontend Developer",
    "UI Builder",
    "JavaScript Learner",
    "Firebase Builder",
    "Project Shipper"
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let countersStarted = false;

function initPortfolio() {
    restoreBannerState();
    bindEvents();
    startTypewriter();
    observeRevealSections();
    observeCounters();
    updateHeaderState();
    updateScrollProgress();
    updateActiveNavLink();
}

function bindEvents() {
    window.addEventListener("load", hidePageLoader);
    window.addEventListener("scroll", handleScroll);

    if (closeBannerBtn) {
        closeBannerBtn.addEventListener("click", closeAvailabilityBanner);
    }

    if (navToggle) {
        navToggle.addEventListener("click", toggleNav);
    }

    navAnchorLinks.forEach(function (link) {
        link.addEventListener("click", closeNav);
    });

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterProjects(button);
        });
    });

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", copyEmailAddress);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", handleContactSubmit);
    }
}

function hidePageLoader() {
    if (pageLoader) {
        pageLoader.classList.add("hide-loader");
    }
}

function restoreBannerState() {
    if (sessionStorage.getItem("portfolioBannerClosed") === "true") {
        closeAvailabilityBanner(false);
    }
}

function closeAvailabilityBanner(shouldSave = true) {
    if (availabilityBanner) {
        availabilityBanner.style.display = "none";
    }

    if (siteHeader) {
        siteHeader.classList.add("banner-hidden");
    }

    if (shouldSave) {
        sessionStorage.setItem("portfolioBannerClosed", "true");
    }
}

function toggleNav() {
    const isOpen = navLinks.classList.toggle("show");

    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeNav() {
    navLinks.classList.remove("show");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
}

function handleScroll() {
    updateHeaderState();
    updateScrollProgress();
    updateActiveNavLink();
}

function updateHeaderState() {
    if (!siteHeader) return;

    siteHeader.classList.toggle("scrolled", window.scrollY > 24);
}

function updateScrollProgress() {
    if (!scrollProgressBar) return;

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

    scrollProgressBar.style.width = scrollPercent + "%";
}

function startTypewriter() {
    if (!typewriterText) return;

    const currentWord = typewriterWords[wordIndex];

    if (!isDeleting) {
        typewriterText.textContent = currentWord.slice(0, letterIndex + 1);
        letterIndex += 1;

        if (letterIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(startTypewriter, 1100);
            return;
        }
    } else {
        typewriterText.textContent = currentWord.slice(0, letterIndex - 1);
        letterIndex -= 1;

        if (letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typewriterWords.length;
        }
    }

    setTimeout(startTypewriter, isDeleting ? 54 : 88);
}

function filterProjects(activeButton) {
    const filterValue = activeButton.dataset.filter;

    filterButtons.forEach(function (button) {
        button.classList.toggle("active-filter", button === activeButton);
    });

    projectItems.forEach(function (project) {
        const categories = project.dataset.category || "";
        const shouldShow = filterValue === "all" || categories.includes(filterValue);

        project.classList.toggle("is-hidden", !shouldShow);
    });
}

async function copyEmailAddress() {
    const email = "fazalabbas2002@gmail.com";

    try {
        await navigator.clipboard.writeText(email);
        copyEmailBtn.textContent = "Copied";
    } catch (error) {
        copyEmailBtn.textContent = email;
    }

    setTimeout(function () {
        copyEmailBtn.textContent = "Copy Email";
    }, 1600);
}

function handleContactSubmit(event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value.trim();
    const userEmail = document.getElementById("userEmail").value.trim();
    const userMessage = document.getElementById("userMessage").value.trim();

    formMessage.classList.remove("error");

    if (!userName || !userEmail || !userMessage) {
        formMessage.textContent = "Please fill in all fields first.";
        formMessage.classList.add("error");
        return;
    }

    if (!isValidEmail(userEmail)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.classList.add("error");
        return;
    }

    const subject = encodeURIComponent("Portfolio message from " + userName);
    const body = encodeURIComponent(userMessage + "\n\nFrom: " + userName + "\nEmail: " + userEmail);

    formMessage.textContent = "Opening your email app...";
    window.location.href = "mailto:fazalabbas2002@gmail.com?subject=" + subject + "&body=" + body;
    contactForm.reset();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function observeRevealSections() {
    if (!("IntersectionObserver" in window)) {
        revealSections.forEach(function (section) {
            section.classList.add("show-section");
        });
        return;
    }

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-section");
            }
        });
    }, { threshold: 0.14 });

    revealSections.forEach(function (section) {
        revealObserver.observe(section);
    });
}

function observeCounters() {
    const aboutSection = document.querySelector(".about-section");

    if (!aboutSection || !("IntersectionObserver" in window)) {
        startCounters();
        return;
    }

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                startCounters();
            }
        });
    }, { threshold: 0.35 });

    counterObserver.observe(aboutSection);
}

function startCounters() {
    if (countersStarted) return;

    counters.forEach(function (counter) {
        const target = Number(counter.dataset.target);
        const duration = 900;
        const startTime = performance.now();

        function updateCounter(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const currentValue = Math.floor(progress * target);

            counter.textContent = target === 100 ? currentValue + "%" : currentValue + "+";

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });

    countersStarted = true;
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll("main section[id]");
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 180;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.id;
        }
    });

    navAnchorLinks.forEach(function (link) {
        link.classList.toggle("active-link", link.getAttribute("href") === "#" + currentSection);
    });
}

document.addEventListener("DOMContentLoaded", initPortfolio);
