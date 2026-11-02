const pages = [...document.querySelectorAll(".page")];
const navigationLinks = [...document.querySelectorAll("nav a[href^='#']")];
const sectionLinks = [...document.querySelectorAll("a[href^='#']")];
let activePageId;

function showCurrentPage(shouldScroll = false) {
    const requestedPageId = window.location.hash.slice(1) || "home";
    const activePage = pages.find((page) => page.id === requestedPageId) || pages[0];
    const pageChanged = activePageId !== activePage.id;

    pages.forEach((page) => {
        const isActive = page === activePage;
        page.hidden = !isActive;
        page.classList.toggle("active-page", isActive);
    });

    navigationLinks.forEach((link) => {
        const isCurrent = link.hash === `#${activePage.id}`;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    if (shouldScroll && pageChanged) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    activePageId = activePage.id;
}

sectionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const pageId = link.hash.slice(1);
        if (!pages.some((page) => page.id === pageId)) {
            return;
        }

        event.preventDefault();
        if (window.location.hash !== link.hash) {
            window.history.pushState(null, "", link.hash);
        }
        showCurrentPage(true);
    });
});

window.addEventListener("popstate", () => showCurrentPage(true));
window.addEventListener("hashchange", () => showCurrentPage(true));
showCurrentPage();
