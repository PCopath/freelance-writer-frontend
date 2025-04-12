const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

async function getBlog() {
  try {
    const res = await fetch(
      `https://freelance-writer-backend.onrender.com/api/blogs/${blogId}`
    );

    if (!res.ok) {
      throw new Error("Blog bulunamadı");
    }

    const blog = await res.json();

    document.getElementById("blog-title").innerText = blog.title;
    document.getElementById("blog-content").innerText = blog.content;
    document.getElementById("blog-date").innerText = new Date(
      blog.createdAt
    ).toLocaleDateString();
  } catch (error) {
    console.log("Hata:", error.message);
    document.getElementById("blog-title").innerText = "Blog Bulunamadı";
    document.getElementById("blog-content").innerText = "";
    document.getElementById("blog-date").innerText = "";
  }
}

getBlog();
