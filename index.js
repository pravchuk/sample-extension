chrome.runtime.connect({ name: "psa-chrome-ext" });

chrome.devtools.panels.create(
    "Sample Extension",
    "img/cool.png",
    "panel.html"
);
