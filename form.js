document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-container");
  
    // handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // gather form data
      const formData = new FormData(form);
  
      // Validate form for empty fields
      let isValid = true;
      formData.forEach((value, key) => {
        if (!value.trim()) {
          isValid = false;
          alert(`Please fill out the ${key} field.`);
        }
      });
  
      if (isValid) {
        console.log("========= Form Submission ==========");
        console.log(`   Name: ${formData.get("name")}`);
        console.log(`   Username: ${formData.get("uname")}`);
        console.log(`   Email: ${formData.get("email")}`);
        console.log(`   Date of Birth: ${formData.get("dob")}`);
        console.log(
          `   Preferred Pronouns: ${formData.get("pronouns") || "Not specified"}`
        );
  
        // It seems like we should reset the form after submitting
        form.reset();
      }
    });
  });