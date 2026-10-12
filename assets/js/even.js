'use strict';

const Even = {};

Even.backToTop = function() {
  const $backToTop = $('#back-to-top');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      $backToTop.fadeIn(1000);
    } else {
      $backToTop.fadeOut(1000);
    }
  });

  $backToTop.click(function() {
    $('body,html').animate({scrollTop: 0});
  });
};

Even.mobileNavbar = function() {
  const $mobileNav = $('#mobile-navbar');
  const $mobileNavIcon = $('.mobile-navbar-icon');
  const slideout = new Slideout({
    'panel': document.getElementById('mobile-panel'),
    'menu': document.getElementById('mobile-menu'),
    'padding': 180,
    'tolerance': 70,
  });
  slideout.disableTouch();

  $mobileNavIcon.click(function() {
    slideout.toggle();
  });

  slideout.on('beforeopen', function() {
    $mobileNav.addClass('fixed-open');
    $mobileNavIcon.addClass('icon-click').removeClass('icon-out');
  });

  slideout.on('beforeclose', function() {
    $mobileNav.removeClass('fixed-open');
    $mobileNavIcon.addClass('icon-out').removeClass('icon-click');
  });

  $('#mobile-panel').on('touchend', function() {
    slideout.isOpen() && $mobileNavIcon.click();
  });
};

Even._initToc = function() {
  const SPACING = 20;
  const $toc = $('.post-toc');
  // Pages without a post footer (e.g. research pages) stop at the end of the content
  const $footer = $('.post-footer').length ? $('.post-footer') : $('.post-content');

  if ($toc.length) {
    const minScrollTop = $toc.offset().top - SPACING;
    const footerTop = $footer.is('.post-footer') ? $footer.offset().top : $footer.offset().top + $footer.outerHeight();
    const maxScrollTop = footerTop - $toc.height() - SPACING;

    const tocState = {
      start: {
        'position': 'absolute',
        'top': minScrollTop,
      },
      process: {
        'position': 'fixed',
        'top': SPACING,
      },
      end: {
        'position': 'absolute',
        'top': maxScrollTop,
      },
    };

    $(window).scroll(function() {
      const scrollTop = $(window).scrollTop();

      if (scrollTop < minScrollTop) {
        $toc.css(tocState.start);
      } else if (scrollTop > maxScrollTop) {
        $toc.css(tocState.end);
      } else {
        $toc.css(tocState.process);
      }
    });
  }

  const HEADERFIX = 30;
  const $toclink = $('.toc-link');
  const $headerlink = $('.headerlink');
  const $tocLinkLis = $('.post-toc-content li');

  const headerlinkTop = $.map($headerlink, function(link) {
    return $(link).offset().top;
  });

  const headerLinksOffsetForSearch = $.map(headerlinkTop, function(offset) {
    return offset - HEADERFIX;
  });

  const searchActiveTocIndex = function(array, target) {
    for (let i = 0; i < array.length - 1; i++) {
      if (target > array[i] && target <= array[i + 1]) return i;
    }
    if (target > array[array.length - 1]) return array.length - 1;
    return -1;
  };

  $(window).scroll(function() {
    const scrollTop = $(window).scrollTop();
    const activeTocIndex = searchActiveTocIndex(headerLinksOffsetForSearch, scrollTop);

    $($toclink).removeClass('active');
    $($tocLinkLis).removeClass('has-active');

    if (activeTocIndex !== -1) {
      $($toclink[activeTocIndex]).addClass('active');
      let ancestor = $toclink[activeTocIndex].parentNode;
      while (ancestor.tagName !== 'NAV') {
        $(ancestor).addClass('has-active');
        ancestor = ancestor.parentNode.parentNode;
      }
    }
  });
};

Even.highlight = function() {
  const blocks = document.querySelectorAll('pre code');
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const rootElement = block.parentElement;
    const lineCodes = block.innerHTML.split(/\n/);
    if (lineCodes[lineCodes.length - 1] === '') lineCodes.pop();
    const lineLength = lineCodes.length;

    let codeLineHtml = '';
    for (let i = 0; i < lineLength; i++) {
      codeLineHtml += `<div class="line">${i + 1}</div>`;
    }

    let codeHtml = '';
    for (let i = 0; i < lineLength; i++) {
      codeHtml += `<div class="line">${lineCodes[i]}</div>`;
    }

    block.className += ' highlight';
    const figure = document.createElement('figure');
    figure.className = block.className;
    figure.innerHTML = `<table><tbody><tr><td class="gutter"><pre>${codeLineHtml}</pre></td><td class="code"><pre>${codeHtml}</pre></td></tr></tbody></table>`;

    rootElement.parentElement.replaceChild(figure, rootElement);
  }
};

Even.chroma = function() {
  const blocks = document.querySelectorAll('.highlight > .chroma');
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const afterHighLight = block.querySelector('pre.chroma > code[data-lang]');
    const lang = afterHighLight ? afterHighLight.className : '';
    block.className += ' ' + lang;
  }
};

// Copy and fold buttons in the header bar of the code blocks.
// Blocks with the "folded" class (e.g. `:folded yes` in Org) start folded.
Even.codeTools = function() {
  const ICONS = {
    copy: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"/><path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5v5a1.5 1.5 0 0 0 1.5 1.5h.5"/></svg>',
    check: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3 3 7-7"/></svg>',
    fold: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>'
  };

  const copyText = function(text) {
    // The Clipboard API is only available in secure contexts (https, localhost)
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function(resolve, reject) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      ok ? resolve() : reject(new Error('copy failed'));
    });
  };

  const makeButton = function(name, label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-tools-' + name;
    button.title = label;
    button.setAttribute('aria-label', label);
    button.innerHTML = ICONS[name];
    return button;
  };

  const blocks = document.querySelectorAll('.highlight > .chroma');
  for (let i = 0; i < blocks.length; i++) {
    const wrapper = blocks[i].parentElement;
    // Code cell only (not the line numbers)
    const code = blocks[i].querySelector('code[data-lang]') || blocks[i].querySelector('code');
    if (!code) continue;

    const tools = document.createElement('div');
    tools.className = 'code-tools';
    const copyButton = makeButton('copy', 'Copy');
    const foldButton = makeButton('fold', 'Fold');
    tools.appendChild(copyButton);
    tools.appendChild(foldButton);

    wrapper.classList.add('code-block');
    wrapper.insertBefore(tools, blocks[i]);

    let resetTimer;
    copyButton.addEventListener('click', function() {
      copyText(code.textContent.replace(/\n$/, '')).then(function() {
        copyButton.innerHTML = ICONS.check;
        copyButton.title = 'Copied';
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function() {
          copyButton.innerHTML = ICONS.copy;
          copyButton.title = 'Copy';
        }, 1500);
      });
    });

    const setFolded = function(folded) {
      wrapper.classList.toggle('is-folded', folded);
      foldButton.setAttribute('aria-expanded', String(!folded));
      foldButton.title = folded ? 'Unfold' : 'Fold';
      foldButton.setAttribute('aria-label', foldButton.title);
    };
    setFolded(wrapper.classList.contains('folded'));
    foldButton.addEventListener('click', function() {
      setFolded(!wrapper.classList.contains('is-folded'));
    });
  }
};

Even.toc = function() {
  const tocContainer = document.getElementById('post-toc');
  if (tocContainer !== null) {
    const toc = document.getElementById('TableOfContents');
    if (toc === null) {
      // toc = true, but there are no headings
      tocContainer.parentNode.removeChild(tocContainer);
    } else {
      this._refactorToc(toc);
      this._linkToc();
      this._initToc();
    }
  }
};

Even._refactorToc = function(toc) {
  // when headings do not start with `h1`
  const oldTocList = toc.children[0];
  let newTocList = oldTocList;
  let temp;
  while (newTocList.children.length === 1
      && (temp = newTocList.children[0].children[0]).tagName === 'UL') {
    newTocList = temp;
  }

  if (newTocList !== oldTocList) toc.replaceChild(newTocList, oldTocList);
};

Even._linkToc = function() {
  const links = document.querySelectorAll('#TableOfContents a:first-child');
  for (let i = 0; i < links.length; i++) links[i].className += ' toc-link';

  for (let num = 1; num <= 6; num++) {
    const headers = document.querySelectorAll('.post-content>h' + num);
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      header.innerHTML = `<a href="#${header.id}" class="headerlink anchor"><i class="iconfont icon-link"></i></a>${header.innerHTML}`;
    }
  }
};

Even.flowchart = function() {
  if (!window.flowchart) return;

  const blocks = document.querySelectorAll('pre code.language-flowchart, pre code.language-flow');
  for (let i = 0; i < blocks.length; i++) {
    if (!window.hljs && i % 2 === 0) continue;

    const block = blocks[i];
    const rootElement = window.hljs
        ? block.parentElement
        : block.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

    const container = document.createElement('div');
    const id = `js-flowchart-diagrams-${i}`;
    container.id = id;
    container.className = 'align-center';
    rootElement.parentElement.replaceChild(container, rootElement);

    const diagram = flowchart.parse(block.childNodes[0].nodeValue);
    diagram.drawSVG(id, window.flowchartDiagramsOptions ? window.flowchartDiagramsOptions : {});
  }
};

Even.sequence = function() {
  if (!window.Diagram) return;

  const blocks = document.querySelectorAll('pre code.language-sequence');
  for (let i = 0; i < blocks.length; i++) {
    if (!window.hljs && i % 2 === 0) continue;

    const block = blocks[i];
    const rootElement = window.hljs
        ? block.parentElement
        : block.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

    const container = document.createElement('div');
    const id = `js-sequence-diagrams-${i}`;
    container.id = id;
    container.className = 'align-center';
    rootElement.parentElement.replaceChild(container, rootElement);

    const diagram = Diagram.parse(block.childNodes[0].nodeValue);
    diagram.drawSVG(id, window.sequenceDiagramsOptions
        ? window.sequenceDiagramsOptions
        : {theme: 'simple'});
  }
};

Even.responsiveTable = function() {
  const tables = document.querySelectorAll('.post-content > table');
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.parentElement.replaceChild(wrapper, table);
    wrapper.appendChild(table);
  }
};

