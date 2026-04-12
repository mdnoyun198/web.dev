const activeLinksCount = document.querySelector("#active-links-count");
const linkList = document.querySelector("#list");
const visitedStorageKey = "visited-links";
const qrRoot = document.getElementById("qrcode");
let visitedLinks = [];

function getVisitedLinks() {
    try {
        return JSON.parse(sessionStorage.getItem(visitedStorageKey)) || [];
    } catch (error) {
        return [];
    }
}

function saveVisitedLinks() {
    try {
        sessionStorage.setItem(visitedStorageKey, JSON.stringify(visitedLinks));
    } catch (error) {
        // Ignore storage errors.
    }
}

function renderLinkItem(linkData, index) {
    const listItem = document.createElement("li");
    listItem.className = "link-box";

    const anchor = document.createElement("a");
    anchor.href = linkData.URL || "#";
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.style.animationDelay = `${index * 90}ms`;

    const image = document.createElement("img");
    image.className = "link-icon";
    image.src = linkData.Icon || "";
    image.alt = `${linkData.Name || "Link"} icon`;

    const copyWrapper = document.createElement("span");
    copyWrapper.className = "link-copy";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = linkData.Name || "Link";

    const descriptionSmall = document.createElement("small");
    descriptionSmall.textContent = linkData.description || "";

    copyWrapper.appendChild(titleSpan);
    copyWrapper.appendChild(descriptionSmall);
    anchor.appendChild(image);
    anchor.appendChild(copyWrapper);
    listItem.appendChild(anchor);

    if (linkData.URL && visitedLinks.includes(linkData.URL)) {
        anchor.classList.add("is-visited");
    }

    anchor.addEventListener("click", () => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") {
            return;
        }

        if (!visitedLinks.includes(href)) {
            visitedLinks.push(href);
            anchor.classList.add("is-visited");
            saveVisitedLinks();
        }
    });

    return listItem;
}

function updateActiveCount(count) {
    if (activeLinksCount) {
        activeLinksCount.textContent = count;
    }
}

async function loadLinks() {
    if (!linkList) {
        return;
    }

    visitedLinks = getVisitedLinks();

    try {
        const response = await fetch("links.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load links.json: ${response.status}`);
        }

        const linksData = await response.json();
        linkList.innerHTML = "";

        linksData.forEach((linkData, index) => {
            linkList.appendChild(renderLinkItem(linkData, index));
        });

        updateActiveCount(linksData.length);
    } catch (error) {
        console.error(error);
        linkList.innerHTML = "<li class='link-box'>Unable to load links.</li>";
        updateActiveCount(0);
    }
}

function renderQrCode() {
    if (!qrRoot) {
        return;
    }

    const qr = new QRCode({
        content: window.location.href,
        width: 108,
        height: 108,
        padding: 0,
        color: "#000000",
        background: "#ffffff",
        ecl: "M",
        join: true
    });

    qrRoot.innerHTML = qr.svg();
    const svgEl = qrRoot.querySelector("svg");
    if (!svgEl) {
        return;
    }

    svgEl.removeAttribute("width");
    svgEl.removeAttribute("height");
    svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svgEl.style.width = "100%";
    svgEl.style.height = "auto";
    svgEl.style.display = "block";

    if (!svgEl.getAttribute("viewBox")) {
        svgEl.setAttribute("viewBox", "0 0 108 108");
    }

    const qrShapes = Array.from(svgEl.querySelectorAll("*")).filter((node) => {
        const fill = (node.getAttribute("fill") || "").toLowerCase();
        return fill && fill !== "white" && fill !== "#fff" && fill !== "#ffffff";
    });

    if (!qrShapes.length) {
        return;
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    qrShapes.forEach((shape) => {
        if (typeof shape.getBBox !== "function") {
            return;
        }

        const box = shape.getBBox();
        minX = Math.min(minX, box.x);
        minY = Math.min(minY, box.y);
        maxX = Math.max(maxX, box.x + box.width);
        maxY = Math.max(maxY, box.y + box.height);
    });

    if (Number.isFinite(minX) && Number.isFinite(minY) && Number.isFinite(maxX) && Number.isFinite(maxY)) {
        const pad = 4;
        const boxWidth = maxX - minX;
        const boxHeight = maxY - minY;
        const size = Math.max(boxWidth, boxHeight) + pad * 2;
        const offsetX = minX - pad - (size - boxWidth) / 2;
        const offsetY = minY - pad - (size - boxHeight) / 2;
        svgEl.setAttribute("viewBox", `${offsetX} ${offsetY} ${size} ${size}`);
    }
}

function downloadSVG() {
    const svg = document.querySelector("#qrcode svg");
    if (!svg) {
        return;
    }

    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.svg";
    a.click();
    URL.revokeObjectURL(url);
}

loadLinks();
renderQrCode();
