window.onload = () => {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 1s ease";
  setTimeout(() => (document.body.style.opacity = 1), 100);
};
