document.addEventListener("DOMContentLoaded", () => {
  console.log("Home page loaded");
  // Example: Highlight announcements on hover
  const announcements = document.querySelectorAll(".announcements ul li");
  announcements.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "#f8f9fa";
    });
    item.addEventListener("mouseout", () => {
      item.style.backgroundColor = "transparent";
    });
  });

  // Hiệu ứng cho bài viết
  const articles = document.querySelectorAll(".article");
  articles.forEach((article) => {
    article.addEventListener("mouseover", () => {
      article.style.transform = "translateY(-5px)";
      article.style.transition = "transform 0.3s ease";
    });
    article.addEventListener("mouseout", () => {
      article.style.transform = "translateY(0)";
    });
  });

  // Hiệu ứng cho số liệu thống kê
  const stats = document.querySelectorAll(".stat-item");
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  stats.forEach(stat => {
    stat.style.opacity = "0";
    stat.style.transform = "translateY(20px)";
    stat.style.transition = "all 0.5s ease";
    observer.observe(stat);
  });
});
