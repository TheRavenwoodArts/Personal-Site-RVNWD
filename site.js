// Scroll page
document.querySelectorAll(".nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// dynamic scrolling
document.addEventListener("scroll", () => {
  const titleBox = document.querySelector(".title-box");
  const aboutSection = document.querySelector("#about");
  const scrollY = window.scrollY;
  const aboutTop = aboutSection.getBoundingClientRect().top + window.scrollY;
  const slowScrollRate = 0.5;

  // move title-box if it's above the viewport and not yet touching about-section
  if (scrollY < aboutTop) {
    // Adjust position adn opacity
    titleBox.style.transform = `translateY(${scrollY * slowScrollRate}px)`;
    const opacity = 1 - scrollY / aboutTop;
    titleBox.style.opacity = Math.max(opacity, 0);
  } else {
    titleBox.style.transform = "translateY(0)";
    titleBox.style.opacity = 0;
  }
});

// Function to load text from a file into an html component
function loadTextFromFile(filePath, targetSelector) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch file: " + response.statusText);
      }
      return response.text();
    })
    .then((text) => {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.textContent = text;
      } else {
        console.error(`Target element not found: ${targetSelector}`);
      }
    })
    .catch((error) => {
      console.error("Error loading text from file:", error);
    });
}

// Load the "About Me" text when page loads
window.addEventListener("load", () => {
  loadTextFromFile("about.txt", ".about-paragraph");
});

// Image carousel
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".about-image img");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;

  // Function to update image visibility
  function updateImages() {
    images.forEach((img, index) => {
      img.classList.toggle("current-image", index === currentIndex);
      img.classList.toggle("hidden-image", index !== currentIndex);
    });
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImages();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImages();
  });

  updateImages();
});
