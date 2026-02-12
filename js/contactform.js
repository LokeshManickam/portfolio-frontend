const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 🔥 Change button state
  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch(
      "https://portfolio-backend-iaxw.onrender.com/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await res.json();

    if (res.ok) {
      submitBtn.innerText = "Sent ✅";
      form.reset();
    } else {
      submitBtn.innerText = "Failed ❌";
      alert(result.message || "Something went wrong");
    }

  } catch (err) {
    console.error("Frontend Error:", err);
    submitBtn.innerText = "Failed ❌";
    alert("Failed to send message");
  }

  // 🔁 Restore button after 2 seconds
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerText = "Send Message";
  }, 2000);
});
