const links = document.querySelectorAll(".link-box a");
const linkItems = document.querySelectorAll("#list li");
const activeLinksCount = document.querySelector("#active-links-count");
const visitedStorageKey = "visited-links";

if (activeLinksCount) {
    activeLinksCount.textContent = linkItems.length;
}

let visitedLinks = [];

try {
    visitedLinks = JSON.parse(sessionStorage.getItem(visitedStorageKey)) || [];
} catch (error) {
    visitedLinks = [];
}

links.forEach((link, index) => {
    link.style.animationDelay = `${index * 90}ms`;

    const href = link.getAttribute("href");

    if (href && visitedLinks.includes(href)) {
        link.classList.add("is-visited");
    }

    link.addEventListener("click", () => {
        if (!href) {
            return;
        }

        if (!visitedLinks.includes(href)) {
            visitedLinks.push(href);
            link.classList.add("is-visited");

            try {
                localStorage.setItem(visitedStorageKey, JSON.stringify(visitedLinks));
            } catch (error) {
                // Ignore storage failures and keep the UI working.
            }
        }
    });
});
