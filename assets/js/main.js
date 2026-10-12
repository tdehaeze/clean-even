$(document).ready(function () {
  Boxes.setup();
  Even.backToTop();
  Even.mobileNavbar();
  Even.toc();
});

Even.responsiveTable();
Even.flowchart();
Even.sequence();

if (window.hljs) {
  hljs.initHighlighting();
  Even.highlight();
} else {
  Even.chroma();
  Even.codeTools();
}
