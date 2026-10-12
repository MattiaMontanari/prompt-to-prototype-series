"use strict";

const copyButton = document.getElementById("copy-source");
const source = document.getElementById("mermaid-source");
const status = document.getElementById("copy-status");

if (copyButton && source && status) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(source.textContent.trim());
      status.textContent = "Copied. Paste into Mermaid Live.";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(source);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Source selected. Use your device’s copy command.";
    }
  });
}
