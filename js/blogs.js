fetch("https://freelance-writer-backend.onrender.com/api/blogs")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Bloglar getirilemedi");
    }
    return response.json();
  })
  .then((data) => {
    const blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = ""; // Temizle

    if (data.length === 0) {
      blogContainer.innerHTML = "<p>Henüz blog eklenmemiş.</p>";
      return;
    }

    data.forEach((blog) => {
      const imageUrl = blog.image?.trim()
        ? blog.image
        : "https://i.ibb.co/0qRrP6X/book-cover.jpg"; // 🔥 Default yedek görsel

      const blogItem = `
        <div class="card3">
          <img src="${imageUrl}" alt="Blog Görseli" class="card3-image" />
          <div class="card3-content">
            <span class="category">Blog Yazısı</span>
            <h3><a href="blog-detail.html?id=${blog._id}">${blog.title}</a></h3>
            <p class="date">${new Date(blog.createdAt).toLocaleDateString()}</p>
            <p class="excerpt">
              ${
                blog.content.length > 120
                  ? blog.content.slice(0, 120) + "..."
                  : blog.content
              }
            </p>
          </div>
        </div>
      `;

      blogContainer.innerHTML += blogItem;
    });
  })
  .catch((error) => {
    console.error("Hata:", error.message);
    const blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = "<p>Bloglar yüklenirken bir hata oluştu.</p>";
  });
