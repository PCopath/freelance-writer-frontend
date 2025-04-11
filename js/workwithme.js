const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const res = await fetch(
    "https://freelance-writer-backend.onrender.com/api/contact",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    }
  );

  if (res.ok) {
    alert("Mesajınız gönderildi!");
    form.reset();
  } else {
    alert("Hata oluştu.");
  }
});
