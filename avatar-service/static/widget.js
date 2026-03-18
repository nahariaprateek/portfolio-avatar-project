(function () {
  'use strict';

  var API_BASE = window.location.origin;
  var urlParams = new URLSearchParams(window.location.search);
  var parentOrigin = urlParams.get('parent_origin') || 'http://127.0.0.1:3000';

  var statusEl = document.getElementById('avatar-status');
  var nameEl = document.getElementById('avatar-name');
  var messageList = document.getElementById('message-list');
  var suggestionsEl = document.getElementById('suggestions');
  var form = document.getElementById('chat-form');
  var input = document.getElementById('chat-input');

  var history = [];

  function notifyParent(type) {
    if (window.parent !== window) {
      window.parent.postMessage({ type: type }, parentOrigin);
    }
  }

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function appendMessage(role, text) {
    var node = document.createElement('div');
    node.className = 'message ' + role;
    node.textContent = text;
    messageList.appendChild(node);
    messageList.scrollTop = messageList.scrollHeight;
  }

  function renderSuggestions(items) {
    suggestionsEl.innerHTML = '';
    (items || []).forEach(function (item) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = item;
      button.addEventListener('click', function () {
        input.value = item;
        form.requestSubmit();
      });
      suggestionsEl.appendChild(button);
    });
  }

  async function bootstrap() {
    try {
      var configResp = await fetch(API_BASE + '/api/config');
      var config = await configResp.json();
      nameEl.textContent = config.avatar_name || 'Prateek Naharia';

      var wakeResp = await fetch(API_BASE + '/api/wake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!wakeResp.ok) throw new Error('Wake failed');

      var tokenResp = await fetch(API_BASE + '/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!tokenResp.ok) throw new Error('Token failed');

      var tokenData = await tokenResp.json();
      setStatus('Mock session active. Session ' + tokenData.session_id + ' is ready for portfolio questions.');
      appendMessage('assistant', 'Hi, I am your local portfolio avatar test environment. Ask me about experience, projects, skills, or how this avatar is being built.');
      renderSuggestions([
        'Summarize Prateek in 30 seconds',
        'Tell me about the healthcare analytics work',
        'What skills should a recruiter know?',
        'How is this avatar architecture designed?'
      ]);
      notifyParent('avatar-session-started');
    } catch (error) {
      setStatus('The avatar service could not finish startup. Check the local backend logs.');
      appendMessage('assistant', 'The local avatar service is unavailable. Start the FastAPI app and reload this page.');
    }
  }

  async function sendMessage(message) {
    appendMessage('user', message);
    history.push({ role: 'user', content: message });
    input.value = '';
    setStatus('Thinking...');

    try {
      var response = await fetch(API_BASE + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          history: history
        })
      });
      if (!response.ok) throw new Error('Chat failed');

      var payload = await response.json();
      history.push({ role: 'assistant', content: payload.answer });
      appendMessage('assistant', payload.answer);
      renderSuggestions(payload.suggestions);
      setStatus('Mock session active. You can continue the conversation or test minimize and close states.');
    } catch (error) {
      appendMessage('assistant', 'The local reply request failed. Verify the backend is still running.');
      setStatus('Chat request failed.');
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = input.value.trim();
    if (!value) return;
    sendMessage(value);
  });

  window.addEventListener('message', function (event) {
    if (event.origin !== parentOrigin) return;
    if (!event.data) return;

    if (event.data.type === 'avatar-mode') {
      document.body.classList.remove('expanded', 'minimized');
      if (event.data.mode) {
        document.body.classList.add(event.data.mode);
      }
    }
  });

  window.addEventListener('beforeunload', function () {
    notifyParent('avatar-session-ended');
  });

  bootstrap();
})();
