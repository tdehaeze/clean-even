$(document).ready(function () {
  Even.backToTop();
  Even.mobileNavbar();
  Even.toc();
  Boxes.setup();
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
