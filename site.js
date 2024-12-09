document.addEventListener("DOMContentLoaded", () => {
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
    const navBar = document.querySelector(".navbar");
    const titleBox = document.querySelector(".title-box");
    const aboutSection = document.querySelector("#about");
    const contactSection = document.querySelector("#contact");
    const scrollY = window.scrollY;
    const aboutTop = aboutSection.getBoundingClientRect().top + scrollY;
    const contactTop = contactSection.getBoundingClientRect().top + scrollY;
    const slowScrollRate = 0.5;

    // Get viewport height for parallax background offsets
    const viewportHeight = window.innerHeight;

    // Move title-box if it's above the viewport and not yet touching about-section
    if (scrollY < aboutTop) {
      const opacity1 = scrollY / aboutTop;
      titleBox.style.transform = `translateY(${scrollY * slowScrollRate}px)`;
      titleBox.style.opacity = Math.max(1 - opacity1, 0);
    } else {
      titleBox.style.transform = "translateY(0)";
      titleBox.style.opacity = 0;
    }

    // Adjust navbar opacity when below the contact section
    const contactBottom = contactTop + contactSection.offsetHeight;
    if (scrollY > contactBottom) {
      // Calculate opacity based on how far below the contact section we are
      const fadeDistance = 100;
      const distanceBelow = scrollY - contactBottom;
      const opacity2 = Math.max(1 - distanceBelow / fadeDistance, 0);
      navBar.style.opacity = opacity2;
    } else {
      navBar.style.opacity = 1;
    }

    // Parallax background scroll rates
    const body = document.body;
    const bridgeScrollRate = 0.4;
    const treesScrollRate = 0.5;
    const castleScrollRate = 0.7;
    const cloudsScrollRate = 0.9;

    body.style.backgroundPosition = `
      left ${scrollY * bridgeScrollRate + viewportHeight * 3.05}px, 
      left ${scrollY * treesScrollRate + viewportHeight * 2.55}px,
      left ${scrollY * castleScrollRate + viewportHeight * 1.5}px,
      left ${scrollY * cloudsScrollRate + viewportHeight * 0.4}px, 
      left 0px
    `;
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

  // Load text files when page loads
  window.addEventListener("load", () => {
    loadTextFromFile("text/about.txt", ".about-paragraph");
    loadTextFromFile("text/project1.txt", "#project1-paragraph");
    loadTextFromFile("text/project2.txt", "#project2-paragraph");
    loadTextFromFile("text/project3.txt", "#project3-paragraph");
    loadTextFromFile("text/airship.txt", "#airship-text");
    loadTextFromFile("text/jama.txt", "#jama-text");
    loadTextFromFile("text/intel.txt", "#intel-text");
  });

  // Image carousel
  const images = document.querySelectorAll(".image-container");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentIndex = 0;
  function updateImages() {
    images.forEach((img, index) => {
      img.classList.toggle("current-image", index === currentIndex);
      img.classList.toggle("hidden-image", index !== currentIndex);
    });
  }
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImages();
  });
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImages();
  });

  updateImages();

  // On contact submit
  document
    .getElementById("contact-form")
    .addEventListener("submit", async function (event) {
      // Take control of form submission
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      try {
        // Submit the form data using the Fetch API and catch response
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          // Success! give user a message
          alert("Thank you! Your message has been sent.");
          form.reset(); // Clear the form
        } else {
          // Fail :( give user a message
          alert("Oops! There was a problem submitting your form.");
        }
      } catch (error) {
        // Log any errors
        console.error("Error:", error);
        alert(
          "There was a problem submitting your form. Please try again later."
        );
      }
    });
});
