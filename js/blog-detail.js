const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

async function getBlog() {
  console.log(blogId);

  const res = await fetch(
    `https://freelance-writer-backend.onrender.com/api/blogs/${blogId}`
  );
  const blog = await res.json();

  document.getElementById("blog-title").innerText = blog.title;
  document.getElementById("blog-content").innerText = blog.content;
  document.getElementById("blog-date").innerText = new Date(
    blog.createdAt
  ).toLocaleDateString();
}

getBlog();
