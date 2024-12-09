// const blurred = "blur(8px) grayscale(88%) opacity(0.15)";
// const gradient = "linear-gradient(rgba(255,255,255,0.9),rgba(0,0,0,0.9))";
// const gradient2 = "linear-gradient(rgba(64,64,64,0.5),rgba(0,0,0,0.5))";
// const grayscale = "grayscale(80%)";
// const dataKey = "data-photo-obscured";
const myClassName = "simi-web-obscure";
const bodyClassName = "simi-web-enabled";

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
    !bgImg.toLowerCase().includes("icon")
    // && !bgImg.startsWith(gradient)
  );
}

/**
 * @param {Element} el
 */
function shouldObscure(el) {
  return (
    (el.tagName === "IMG" && shouldObscureImg(el)) ||
    shouldObscureBg(window.getComputedStyle(el).backgroundImage)
  );
}

/**
 * Examine each element
 * @param {Element} el
 */
function examineElement(el) {
  // const ogStyles = window.getComputedStyle(el);
  // const ogBgImg = ogStyles.backgroundImage;
  // const isImg = el.tagName === "IMG";
  // if ((isImg && shouldObscureImg(el)) || shouldObscureBg(ogBgImg)) {
  if (shouldObscure(el)) {
    // const bg = isImg ? gradient : `${gradient},${gradient2},${ogBgImg}`;
    // const filter = isImg ? blurred : grayscale;
    el.classList.add("simi-web-obscure");
    // if (el.getAttribute(dataKey) !== "true") {
    //   el.style.backgroundImage = bg;
    //   el.style.filter = filter;
    //   el.setAttribute(dataKey, "true");
    // }
    // const ogFilter = ogStyles.filter;
    /*
    const toggle = () => {
      // const isObscured = el.getAttribute(dataKey) === "true" || el.style.backgroundImage.startsWith(gradient);
      // el.style.backgroundImage = isObscured ? ogBgImg : bg;
      // el.style.filter = el.style.filter === filter ? ogFilter : filter;
      // el.setAttribute(
      //   dataKey,
      //   el.getAttribute(dataKey) === "true" ? "false" : "true"
      // );
      el.classList.toggle("simi-web-obscure");
    };
    el.addEventListener("contextmenu", toggle);
    */
  }
}

function toggleBody() {
  document.body.classList.toggle(bodyClassName);
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
  "audible.com",
  "amazon.com",
  //
  "raspberrypi.com",
];
const domain = window.location.hostname;
if (whitelist.every((d) => !domain.includes(d))) {
  console.log("hide photos");
  document.body.classList.add(bodyClassName);
  document.addEventListener("contextmenu", toggleBody);
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
