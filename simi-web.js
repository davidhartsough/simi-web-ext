// const safeExtensions = [".jpg", ".jpeg", ".png", ".webp"];
/*
photoExtensions.some(
(ext) => img.src.endsWith(ext) || img.src.includes(`${ext}?`)
)
*/
const blurred = "blur(8px) grayscale(88%) opacity(0.15)";
const gradient = "linear-gradient(rgba(255,255,255,0.9),rgba(0,0,0,0.9))";
const gradient2 = "linear-gradient(rgba(64,64,64,0.5),rgba(0,0,0,0.5))";
const grayscale = "grayscale(80%)";
const dataKey = "data-photo-obscured";
// const blurLayer = `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHN0eWxlPSJmaWxsOiNmZmZmZjsgZmlsbC1ydWxlOmJsdWUoMTBweCk7IiAvPjwvc3ZnPg==")`;
// const blurredPixel = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVQIW2NkYGD4z8DAwMgABXAGNgYYYGRgYGAAAAAA//8DAAyqAQAUaOVwAAAAAElFTkSuQmCC`;

function shouldObscureImg(img) {
  return (
    !img.src.endsWith(".svg") &&
    !(
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
    !bgImg.startsWith(gradient)
  );
}

/*
function obscureImg(img) {
  if (
    shouldObscure(img)
  ) {
    const ogStyles = window.getComputedStyle(img);
    const ogFilter = ogStyles.filter;
    const ogBgImg = ogStyles.backgroundImage;
    // img.style.visibility = "hidden";
    if (ogFilter !== filter) {
      img.style.filter = filter;
    }
    if (ogBgImg !== gradient) {
      img.style.backgroundImage = gradient;
    }
    // img.classList.add("simi-web-hide-photo");
    const toggle = () => {
      if (img.style.filter === filter) {
        img.style.filter = ogFilter;
      } else {
        img.style.filter = filter;
      }
      if (img.style.backgroundImage === gradient) {
        img.style.backgroundImage = ogBgImg;
      } else {
        img.style.backgroundImage = gradient;
      }
    };
    img.addEventListener("click", toggle);
    img.addEventListener("contextmenu", toggle);
  }
}

function obscureBg(el) {
  const bgImage = window.getComputedStyle(el).backgroundImage;
  if (
    bgImage &&
    bgImage !== "none" &&
    !bgImage.includes(".svg") &&
    !bgImage.startsWith(gradient)
  ) {
    el.style.backgroundImage = `${gradient},${gradient2},${bgImage}`;
    el.style.filter = "grayscale(80%)";
  }
}
*/

function hidePhotos() {
  document.querySelectorAll("*").forEach((el) => {
    const ogStyles = window.getComputedStyle(el);
    const ogBgImg = ogStyles.backgroundImage;
    const ogFilter = ogStyles.filter;
    const isImg = el.tagName === "IMG";
    if ((isImg && shouldObscureImg(el)) || shouldObscureBg(ogBgImg)) {
      const bg = isImg ? gradient : `${gradient},${gradient2},${ogBgImg}`;
      const filter = isImg ? blurred : grayscale;
      el.style.backgroundImage = bg;
      el.style.filter = filter;
      el.setAttribute(dataKey, "true");
      const toggle = () => {
        const isObscured = el.getAttribute(dataKey) === "true";
        el.style.backgroundImage = isObscured ? ogBgImg : bg;
        el.style.filter = el.style.filter === filter ? ogFilter : filter;
        el.setAttribute(dataKey, isObscured ? "false" : "true");
      };
      el.addEventListener("contextmenu", toggle);
    }
  });
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
];
const domain = window.location.hostname;
if (whitelist.every((d) => !domain.includes(d))) {
  console.log("hide photos");
  hidePhotos();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) hidePhotos();
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
