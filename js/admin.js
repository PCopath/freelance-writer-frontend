const loginForm = document.getElementById("loginForm");
const blogForm = document.getElementById("blogForm");
const blogList = document.getElementById("blogList");

let updateBlogId = null; // Güncelleme yapılacak blog ID

// Giriş Formu
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(
    "https://freelance-writer-backend.onrender.com/auth/login",
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
    getBlogs(); // Girişten sonra blogları getir
  } else {
    alert(data.message);
  }
});

// Blog Ekle / Güncelle
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Lütfen giriş yapınız.");
    return;
  }

  if (updateBlogId) {
    // Güncelleme
    const res = await fetch(
      `https://freelance-writer-backend.onrender.com/api/blogs/${updateBlogId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      }
    );

    if (res.ok) {
      alert("Blog Güncellendi!");
      updateBlogId = null;
    } else {
      alert("Güncelleme hatası.");
    }
  } else {
    // Yeni Blog Ekle
    const res = await fetch(
      "https://freelance-writer-backend.onrender.com/api/blogs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      }
    );

    if (res.ok) {
      alert("Blog Eklendi!");
    } else {
      alert("Blog eklenemedi.");
    }
  }

  blogForm.reset();
  getBlogs();
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
        <p>${blog.content}</p>
        <button onclick="deleteBlog('${blog._id}')">Sil</button>
        <button onclick="editBlog('${blog._id}', \`${blog.title}\`, \`${blog.content}\`)">Güncelle</button>
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    alert("Blog silindi.");
    getBlogs();
  } else {
    alert("Silme işlemi başarısız.");
  }
}

// Blog Güncellemek için formu doldur
function editBlog(id, title, content) {
  document.getElementById("title").value = title;
  document.getElementById("content").value = content;
  updateBlogId = id;
}
