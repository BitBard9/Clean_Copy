const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const cleanButton = document.getElementById("cleanButton");
const copyButton = document.getElementById("copyButton");
const status = document.getElementById("status");

cleanButton.addEventListener("click", () => {
  const text = inputText.value;

  if (!text.trim()) {
    status.textContent = "Please enter some text first.";
    return;
  }

  const cleaned = cleanText(text);

  outputText.value = cleaned;
  status.textContent = "Text cleaned!";
});

copyButton.addEventListener("click", async () => {
  const text = outputText.value;

  if (!text.trim()) {
    status.textContent = "Nothing to copy.";
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    status.textContent = "Copied!";
  } catch (error) {
    status.textContent = "Could not copy text.";
  }
});


function cleanText(text) {

  return text
    // Convert Windows line endings
    .replace(/\r\n/g, "\n")

    // Remove spaces at the beginning/end of lines
    .replace(/^[ \t]+|[ \t]+$/gm, "")

    // Replace multiple spaces with one
    .replace(/[ \t]+/g, " ")

    // Remove excessive blank lines
    .replace(/\n{3,}/g, "\n\n")

    // Remove spaces before punctuation
    .replace(/\s+([,.!?;:])/g, "$1")

    // Remove spaces immediately after opening brackets
    .replace(/([(\[])\s+/g, "$1")

    // Remove spaces immediately before closing brackets
    .replace(/\s+([)\]])/g, "$1")

    // Trim entire text
    .trim();
}