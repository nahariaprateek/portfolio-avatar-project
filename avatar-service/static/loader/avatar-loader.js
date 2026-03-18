(function () {
  'use strict';

  var AVATAR_HOST = window.__PRATEEK_AVATAR_HOST || new URL(document.currentScript.src).origin;
  var PARENT_ORIGIN = window.location.origin;

  function createButton(label) {
    var button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', label);
    button.textContent = label;
    return button;
  }

  function init() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = AVATAR_HOST + '/loader/avatar-loader.css';
    document.head.appendChild(link);

    var backdrop = document.createElement('div');
    backdrop.id = 'prateek-avatar-backdrop';

    var fab = document.createElement('button');
    fab.id = 'prateek-avatar-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Open portfolio avatar');

    var fabImg = document.createElement('img');
    fabImg.src = AVATAR_HOST + '/assets/photo.svg';
    fabImg.alt = 'Prateek Naharia avatar';
    fab.appendChild(fabImg);

    var shell = document.createElement('div');
    shell.id = 'prateek-avatar-shell';

    var toolbar = document.createElement('div');
    toolbar.id = 'prateek-avatar-toolbar';

    var minimize = createButton('−');
    var close = createButton('×');

    toolbar.appendChild(minimize);
    toolbar.appendChild(close);

    var iframe = document.createElement('iframe');
    iframe.title = 'Prateek avatar widget';
    iframe.src = 'about:blank';
    iframe.allow = 'microphone';

    shell.appendChild(toolbar);
    shell.appendChild(iframe);

    document.body.appendChild(backdrop);
    document.body.appendChild(shell);
    document.body.appendChild(fab);

    var state = 'idle';

    function postMode(mode) {
      if (!iframe.contentWindow) return;
      iframe.contentWindow.postMessage({ type: 'avatar-mode', mode: mode }, AVATAR_HOST);
    }

    function openWidget() {
      if (state === 'idle') {
        iframe.src = AVATAR_HOST + '/widget.html?parent_origin=' + encodeURIComponent(PARENT_ORIGIN);
      }
      state = 'expanded';
      shell.className = 'active expanded';
      backdrop.classList.add('visible');
      postMode('expanded');
    }

    function minimizeWidget() {
      if (state === 'idle') return;
      state = 'minimized';
      shell.className = 'active minimized';
      backdrop.classList.remove('visible');
      postMode('minimized');
    }

    function closeWidget() {
      state = 'idle';
      shell.className = '';
      backdrop.classList.remove('visible');
      iframe.src = 'about:blank';
    }

    fab.addEventListener('click', openWidget);
    backdrop.addEventListener('click', minimizeWidget);
    minimize.addEventListener('click', function (event) {
      event.stopPropagation();
      minimizeWidget();
    });
    close.addEventListener('click', function (event) {
      event.stopPropagation();
      closeWidget();
    });

    shell.addEventListener('click', function () {
      if (state === 'minimized') {
        openWidget();
      }
    });

    window.addEventListener('message', function (event) {
      if (event.origin !== AVATAR_HOST) return;
      if (!event.data || !event.data.type) return;

      if (event.data.type === 'avatar-session-started' && state !== 'expanded') {
        minimizeWidget();
      }

      if (event.data.type === 'avatar-session-ended' || event.data.type === 'avatar-close') {
        closeWidget();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
