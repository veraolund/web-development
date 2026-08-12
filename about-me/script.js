// dynamiskt visa nuvarande årtal
document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
});

// dynamiskt via nuvarande ålder
document.querySelectorAll("#age").forEach((element) => {
    element.textContent = new Date().getFullYear() - 2004;
});