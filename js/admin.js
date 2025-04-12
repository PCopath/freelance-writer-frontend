const loginForm = document.getElementById("loginForm");
const blogForm = document.getElementById("blogForm");
const blogList = document.getElementById("blogList");

let updateBlogId = null;

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(
    "https://freelance-writer-backend.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );

  const data = await res.json();

  if (res.ok) {
    alert("Giriş Başarılı");
    localStorage.setItem("token", data.token);
    getBlogs();
  } else {
    alert(data.message);
  }
});

// Blog Ekle / Güncelle
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("imageUrl").value;
  const token = localStorage.getItem("token");

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

// Blogları Getir
async function getBlogs() {
  const res = await fetch(
    "https://freelance-writer-backend.onrender.com/api/blogs"
  );
  const data = await res.json();

  blogList.innerHTML = "";

  data.forEach((blog) => {
    blogList.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px">
        <h3>${blog.title}</h3>
        <img src="${blog.image}" alt="Blog" style="width:100%; max-height:200px; object-fit:cover; margin:10px 0;">
        <p>${blog.content}</p>
        <button onclick="deleteBlog('${blog._id}')">Sil</button>
        <button onclick="editBlog('${blog._id}', \`${blog.title}\`, \`${blog.content}\`, \`${blog.image}\`)">Güncelle</button>
      </div>
    `;
  });
}

// Blog Sil
async function deleteBlog(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Önce giriş yapınız.");
    return;
  }

  const res = await fetch(
    `https://freelance-writer-backend.onrender.com/api/blogs/${id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (res.ok) {
    alert("Blog Silindi.");
    getBlogs();
  } else {
    alert("Silinemedi.");
  }
}

// Blog Güncelle Modu
function editBlog(id, title, content, image) {
  document.getElementById("title").value = title;
  document.getElementById("content").value = content;
  document.getElementById("imageUrl").value = image;
  updateBlogId = id;
}
