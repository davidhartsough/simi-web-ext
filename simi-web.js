const blurred = "blur(8px) grayscale(88%) opacity(0.15)";
const gradient = "linear-gradient(rgba(255,255,255,0.9),rgba(0,0,0,0.9))";
const gradient2 = "linear-gradient(rgba(64,64,64,0.5),rgba(0,0,0,0.5))";
const grayscale = "grayscale(80%)";
const dataKey = "data-photo-obscured";

function shouldObscureImg(img) {
  return (
    !img.src.endsWith(".svg") &&
    !(
      img.src.toLowerCase().includes("logo") ||
      img.src.toLowerCase().includes("icon") ||
      img.className.toLowerCase().includes("logo") ||
      img.className.toLowerCase().includes("icon") ||
      img.id.toLowerCase().includes("logo") ||
      img.id.toLowerCase().includes("icon")
    )
  );
}
function shouldObscureBg(bgImg) {
  return (
    bgImg &&
    bgImg !== "none" &&
    !bgImg.includes(".svg") &&
    !bgImg.toLowerCase().includes("icon") &&
    !bgImg.startsWith(gradient)
  );
}

/**
 * Examine each element
 * @param {Element} el
 */
function examineElement(el) {
  const ogStyles = window.getComputedStyle(el);
  const ogBgImg = ogStyles.backgroundImage;
  const isImg = el.tagName === "IMG";
  if ((isImg && shouldObscureImg(el)) || shouldObscureBg(ogBgImg)) {
    const bg = isImg ? gradient : `${gradient},${gradient2},${ogBgImg}`;
    const filter = isImg ? blurred : grayscale;
    if (el.getAttribute(dataKey) !== "true") {
      el.style.backgroundImage = bg;
      el.style.filter = filter;
      el.setAttribute(dataKey, "true");
    }
    const ogFilter = ogStyles.filter;
    const toggle = () => {
      const isObscured =
        el.getAttribute(dataKey) === "true" ||
        el.style.backgroundImage.startsWith(gradient);
      el.style.backgroundImage = isObscured ? ogBgImg : bg;
      el.style.filter = el.style.filter === filter ? ogFilter : filter;
      el.setAttribute(dataKey, isObscured ? "false" : "true");
    };
    el.addEventListener("contextmenu", toggle);
  }
}

const whitelist = [
  "google.com",
  "github.com",
  "localhost",
  "claude.ai",
  "davidhartsough.com",
  "coles.com.au",
  "chatgpt.com",
  "airbnb.com",
  ".web.app",
  "chat.mistral.ai",
  "ted.com",
  "nextjs.org",
  "app.swapcard.com",
  "calendly.com",
  "stackoverflow.com",
  "reactrouter.com",
  "docs.",
  ".dev",
  "vercel.com",
  ".vercel.app",
  ".netlify.app",
  "developer.",
  "chrome.com",
  "wikipedia.org",
];
const domain = window.location.hostname;
if (whitelist.every((d) => !domain.includes(d))) {
  console.log("hide photos");
  document.querySelectorAll("*").forEach(examineElement);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) examineElement(node);
        });
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
