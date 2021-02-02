$(document).ready(function () {
  Even.backToTop();
  Even.mobileNavbar();
  Even.toc();

  // Blocks
  var boxesNames = {
    "seealso": "See also",
    "definition": "Definition",
    "exampl": "Example",
    "exercice": "Exercice",
    "question": "Question",
    "summary": "Summary",
    "note": "Note",
    "answer": "Answer",
    "hint": "Hint",
    "important": "Important",
    "caution": "Caution",
    "warning": "Warning"
  };
  for (var className in boxesNames) {
    let boxes = document.querySelectorAll('div.' + className);

    for (let box of boxes) {
      let boxTitle = document.createElement('p');
      boxTitle.className = "admonition-title " + className;
      boxTitle.textContent = boxesNames[className];

      box.parentNode.insertBefore(boxTitle, box);
    }
  }
});

Even.responsiveTable();
Even.flowchart();
Even.sequence();

if (window.hljs) {
  hljs.initHighlighting();
  Even.highlight();
} else {
  Even.chroma();
}
