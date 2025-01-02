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
  if (shouldObscure(el)) {
    el.classList.add("simi-web-obscure");
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
  "audible.com",
  "amazon.com",
  "wakingup.com",
  "noisli.com",
  "groupme.com",
  "perplexity.ai",
  "photopea.com",
  "svgedit",
  "pixlr.com",
  "tinyjpg.com",
  "tinypng.com",
  "playground.com",
  "app.leonardo.ai",
  "firefly.adobe.com",
  "squoosh.app",
  "robinhood.com",
  "acorns.com",
  "venmo.com",
  "naturalreaders.com",
  "numberbarn.com",
  "spotify.com",
  "waitbutwhy.com",
  //
  "raspberrypi.com",
];
const domain = window.location.hostname;
if (whitelist.every((d) => !domain.includes(d))) {
  console.log("hide photos");
  document.body.classList.add("simi-web-enabled");
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
