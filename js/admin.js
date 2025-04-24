blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image =
    document.getElementById("imageUrl").value ||
    "https://picsum.photos/400/300";
  const token = localStorage.getItem("token"); // 🔥 EKLENDİ

  if (!token) {
    alert("Lütfen giriş yapınız.");
    return;
  }

  const url = updateBlogId
    ? `https://freelance-writer-backend.onrender.com/api/blogs/${updateBlogId}`
    : "https://freelance-writer-backend.onrender.com/api/blogs";

  const method = updateBlogId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, image }),
  });

  if (res.ok) {
    alert(updateBlogId ? "Blog Güncellendi!" : "Blog Eklendi!");
    updateBlogId = null;
    blogForm.reset();
    getBlogs();
  } else {
    alert("İşlem başarısız.");
  }
});
