fetch("https://freelance-writer-backend.onrender.com/api/blogs")
  .then((response) => response.json())
  .then((data) => {
    const blogContainer = document.getElementById("blog-container");

    blogContainer.innerHTML = ""; // temizle

    data.forEach((blog) => {
      const blogItem = `
        <div class="card3">
          <img src="img/kitap3.jpg" alt="Blog" class="card3-image" />
          <div class="card3-content">
            <span class="category">Blog Yazısı</span>
            <h3><a href="blog-detail.html?id=${blog._id}">${blog.title}</a></h3>
            <p class="date">${new Date(blog.createdAt).toLocaleDateString()}</p>
            <p class="excerpt">${blog.content}</p>
          </div>
        </div>
      `;

      blogContainer.innerHTML += blogItem;
    });
  })
  .catch((error) => console.log("Hata:", error));
