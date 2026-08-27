function showPage(pageId, link) {

    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });

    document.getElementById(pageId).classList.add("active-page");

    let links = document.querySelectorAll("nav a");

    links.forEach(function(navLink) {
        navLink.classList.remove("active");
    });

    link.classList.add("active");

    window.scrollTo(0, 0);
}
