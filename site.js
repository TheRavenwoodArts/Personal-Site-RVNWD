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
    const creditsSection = document.querySelector("#credits");
    const parallaxlayer1 = document.querySelector(".layer-1");
    const parallaxlayer2 = document.querySelector(".layer-2");
    const parallaxlayer3 = document.querySelector(".layer-3");

    const scrollY = window.scrollY;
    const aboutTop = aboutSection.getBoundingClientRect().top + scrollY;
    const contactTop = contactSection.getBoundingClientRect().top + scrollY;
    const sectionTop = creditsSection.offsetTop;
    const slowScrollRate = 0.5;

    if (scrollY < aboutTop) {
      const opacity1 = scrollY / aboutTop;
      titleBox.style.transform = `translateY(${scrollY * slowScrollRate}px)`;
      titleBox.style.opacity = Math.max(1 - opacity1, 0);
    } else {
      titleBox.style.transform = "translateY(0)";
      titleBox.style.opacity = 0;
    }

    if (scrollY > contactTop) {
      const opacity2 =
        (scrollY - contactTop) / (document.body.scrollHeight - contactTop);
      navBar.style.opacity = Math.max(1 - opacity2, 0.5);
    } else {
      navBar.style.opacity = 1;
    }

    const relativeScrollY = sectionTop - scrollY;
    parallaxlayer1.style.transform = `translateY(${relativeScrollY * 0.2}px)`;
    parallaxlayer2.style.transform = `translateY(${relativeScrollY * 0.4}px)`;
    parallaxlayer3.style.transform = `translateY(${relativeScrollY * 0.6}px)`;
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
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          alert("Thank you! Your message has been sent.");
          form.reset();
        } else {
          alert("Oops! There was a problem submitting your form.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          "There was a problem submitting your form. Please try again later."
        );
      }
    });
});
