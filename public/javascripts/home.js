document.addEventListener("DOMContentLoaded", () => {
  console.log("Home page loaded");
  // Example: Highlight announcements on hover
  const announcements = document.querySelectorAll(".announcements ul li");
  announcements.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "#f0f8ff";
    });
    item.addEventListener("mouseout", () => {
      item.style.backgroundColor = "transparent";
    });
  });
});
