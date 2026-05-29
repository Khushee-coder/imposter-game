// =========================================================
//  TOPIC CATEGORIES
// =========================================================
const CATEGORIES = {
  '🎬 Movies':      ['Dangal','Bajrangi Bhaijaan','Pathaan','Jawan','Animal','Padmaavat','Sanju','Andhadhun','Tumbbad','Kabir Singh','Uri: The Surgical Strike','Raazi','Gully Boy','Chhapaak','Piku','Thappad','Drishyam 2','Shershaah','Laapataa Ladies','Chhaava','Laila Majnu','Sardar Udham','Bhool Bhulaiyaa 2','Gangubai Kathiawadi','Badhai Ho','Article 15','Stree','Badhaai Do'],
  '🍕 Food':        ['Pizza', 'Sushi', 'Burger', 'Pasta', 'Vada Pav', 'Ramen', 'Ice Cream', 'Chocolate', 'Coffee', 'Sandwich', 'Curry', 'Popcorn','Maggie','Puranpoli','Dosa','Biryani','Pani Puri','Gulab Jamun','Chaat','Chicken Chilli','Fried Chicken','Noodles','Samosa','Falafel','Fish Fry','Prawns Masala'],
  '🌍 Places':      ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Ranchi', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Varanasi', 'Srinagar', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Howrah', 'Gwalior', 'Jabalpur', 'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubballi-Dharwad', 'Bareilly', 'Moradabad', 'Mysore', 'Gurgaon', 'Aligarh', 'Jalandhar', 'Bhubaneswar', 'Salem', 'Warangal', 'Tiruchirappalli', 'Kota', 'Bhiwandi', 'Saharanpur', 'Dehradun'],
  '🎮 Gaming':      ['Cricket', 'Kabaddi', 'Kho Kho', 'Badminton', 'Chess', 'Hockey', 'Ludo', 'Carrom', 'Gilli Danda', 'Lagori','Battlegrounds Mobile India', 'Free Fire MAX', 'Grand Theft Auto V', 'Valorant', 'Counter-Strike 2', 'Minecraft', 'Clash of Clans', 'Ludo King', 'Call of Duty: Mobile', 'Among Us'],
  '🎵 Music':       ['Raga', 'Tala', 'Sitar', 'Tabla', 'Veena', 'Harmonium', 'Sarod', 'Bansuri', 'Tanpura', 'Carnatic', 'Hindustani', 'Gharana', 'Rhythm', 'Melody', 'Concert','Arijit Singh','Neha Kakkar','Badshah','Shreya Ghoshal','Yo Yo Honey Singh','Sunidhi Chauhan','Atif Aslam','Kumar Sanu','Lata Mangeshkar','Sonu Nigam','Alka Yagnik','Udit Narayan','Kavita Krishnamurthy','Mohit Chauhan','Ankit Tiwari','Shankar Mahadevan'],
  '🐾 Animals':     ['Dolphin', 'Elephant', 'Penguin', 'Tiger', 'Kangaroo', 'Shark', 'Eagle', 'Chameleon', 'Octopus', 'Giraffe', 'Panda', 'Platypus','Snake','Lion','Monkey','Zebra','Cheetah','Sloth','Koala','Otter','Raccoon','Armadillo','Hedgehog','Squirrel','Meerkat','Lemur','Porcupine','Hyena','Buffalo','Crocodile','Alligator','Deer','Moose'],
  '🎭 Celebrities': ['Sachin Tendulkar', 'Virat Kohli', 'Rohit Sharma', 'MS Dhoni', 'Jasprit Bumrah', 'Ravindra Jadeja', 'Hardik Pandya', 'KL Rahul', 'Shubman Gill', 'Rishabh Pant', 'Amitabh Bachchan', 'Shah Rukh Khan', 'Salman Khan', 'Aamir Khan', 'Akshay Kumar', 'Hrithik Roshan', 'Ranbir Kapoor', 'Deepika Padukone', 'Alia Bhatt', 'Priyanka Chopra','Tilak Varma','Kangana Ranaut','Anushka Sharma','Ranveer Singh','Katrina Kaif','Vicky Kaushal','Sara Ali Khan','Rajkummar Rao','Taapsee Pannu','Bhumi Pednekar','Ayushmann Khurrana'],
  '🏠 At Home':     ['Microwave', 'TV Remote', 'Fridge', 'Toilet', 'Couch', 'Alarm Clock', 'Toothbrush', 'Washing Machine', 'Mirror', 'Doorbell', 'WiFi Router', 'Pillow','Ceiling Fan', 'Pressure Cooker', 'Mortar and Pestle', 'Iron Box', 'Bucket and Mug', 'Broom', 'Mosquito Net', 'Water Purifier', 'Gas Cylinder', 'Diya', 'Spice Box', 'Prayer Mat'],
  '🔞 Adults':      ['Hangover', 'Tinder', 'Therapy', 'Mortgage', 'Tax Return', 'Wine', 'Night Club', 'Strip Poker', 'Skinny Dipping', 'Walk of Shame', 'Monday Morning', 'Beer Pong'],
};

// =========================================================
//  GAME STATE
//  IMPORTANT: state.imposterName is ONLY set on the host.
//  Guests only receive their own role via game-start.
// =========================================================
const state = {
  isHost: false,
  myName: '',
  roomCode: '',
  myId: '',
  myRole: '',          // 'crewmate' or 'imposter' — only this player's role
  myTopic: '',         // set only if crewmate; '' if imposter
  imposterName: '',    // ONLY on host machine
  currentTopic: '',    // ONLY on host machine
  playerOrder: [],
  timerSeconds: 60,
  votes: {},           // voterName -> votedName (synced via host)
  myVote: null,
  scores: {},          // persists across rounds
  players: {},         // name -> {name, score}

  selectedCategories: new Set(['🎬 Movies', '🍕 Food', '🌍 Places', '🎮 Gaming']),

  // Networking
  hostConn: null,       // guest -> host connection
  guestConns: {},       // host: name -> PeerConnection

  // Internal
  _pendingVote: null,
  _roleRevealIndex: 0,
};

// =========================================================
//  PEER.JS
// =========================================================
let peer = null;
let timerInterval = null;
let timeLeft = 0;

function initPeer(customId) {
  return new Promise((resolve, reject) => {
    peer = customId ? new Peer(customId, { debug: 0 }) : new Peer({ debug: 0 });
    peer.on('open', id => { state.myId = id; resolve(id); });
    peer.on('error', err => {
      if (err.type === 'unavailable-id') reject(new Error('Room code taken. Try again.'));
      else reject(err);
    });
  });
}

// =========================================================
//  MESSAGING
// =========================================================
function broadcast(msg) {
  Object.values(state.guestConns).forEach(conn => {
    try { conn.send(msg); } catch (e) {}
  });
}

function sendToHost(msg) {
  try { if (state.hostConn) state.hostConn.send(msg); } catch (e) {}
}

// Host sends personalised game-start to each guest individually
function sendGameStartToGuests(roles, topic, imposterName, playerOrder, timerSeconds) {
  Object.entries(state.guestConns).forEach(([name, conn]) => {
    const role = roles[name];
    const payload = {
      type: 'game-start',
      myRole: role,
      myTopic: role === 'crewmate' ? topic : '',   // imposter gets no topic
      playerOrder,
      timerSeconds,
    };
    try { conn.send(payload); } catch (e) {}
  });
}

function handleMessage(data, fromName) {
  switch (data.type) {

    // ── LOBBY ──
    case 'player-join': {
      state.players[data.name] = { name: data.name, score: state.scores[data.name] || 0 };
      // re-key guestConns from tempId to name
      if (state.guestConns[fromName] && fromName !== data.name) {
        state.guestConns[data.name] = state.guestConns[fromName];
        delete state.guestConns[fromName];
      }
      updateLobbyUI();
      broadcast({ type: 'players-update', players: state.players });
      break;
    }

    case 'players-update': {
      state.players = data.players;
      updateLobbyUI();
      break;
    }

    // ── ROLE / GAME START (guests receive personalised payload) ──
    case 'game-start': {
      state.myRole    = data.myRole;
      state.myTopic   = data.myTopic;
      state.playerOrder = data.playerOrder;
      state.timerSeconds = data.timerSeconds;
      state.votes     = {};
      state.myVote    = null;
      state._roleRevealIndex = 0;
      startRoleReveal();
      break;
    }

    // ── DISCUSSION ──
    case 'go-discussion': {
      startDiscussion();
      break;
    }

    case 'chat-message': {
      renderChatMessage(data.sender, data.text, data.sender === state.myName);
      break;
    }

    // ── VOTING ──
    case 'vote-cast': {
      // Host receives votes from guests, tallies, and re-broadcasts
      if (state.isHost) {
        state.votes[data.voter] = data.voted;
        broadcast({ type: 'vote-update', votes: state.votes });
        updateVotingUI();
        checkVotesComplete();
      }
      break;
    }

    case 'vote-update': {
      // Everyone (guests) gets full votes map from host
      state.votes = data.votes;
      updateVotingUI();
      break;
    }

    // ── REVEAL ──
    case 'reveal-results': {
      // Update local scores from authoritative host data
      state.scores = data.scores;
      showReveal(data);
      break;
    }

    // ── PLAY AGAIN ──
    case 'play-again': {
      resetForNextRound();
      setupLobbyUI();
      showScreen('lobby');
      break;
    }
  }
}

// =========================================================
//  CREATE ROOM
// =========================================================
async function createRoom() {
  const name = document.getElementById('create-name').value.trim();
  if (!name) { showError('create', 'Please enter your name'); return; }
  const code = randomCode();
  showLoading('create');
  try {
    await initPeer('FAKEIT-' + code);
    state.isHost    = true;
    state.myName    = name;
    state.roomCode  = code;
    state.players[name] = { name, score: 0 };
    state.scores[name]  = 0;

    peer.on('connection', conn => {
      const tempId = conn.peer;
      state.guestConns[tempId] = conn;

      conn.on('data', data => handleMessage(data, tempId));
      conn.on('close', () => {
        // Find and remove disconnected player
        const n = Object.keys(state.guestConns).find(k => {
          const c = state.guestConns[k];
          return c && c.peer === conn.peer;
        });
        if (n) { delete state.guestConns[n]; delete state.players[n]; }
        updateLobbyUI();
        broadcast({ type: 'players-update', players: state.players });
      });
      setConnStatus(true);
    });

    showScreen('lobby');
    setupLobbyUI();
  } catch (e) {
    hideLoading('create');
    showError('create', e.message || 'Could not create room');
  }
}

// =========================================================
//  JOIN ROOM
// =========================================================
async function joinRoom() {
  const name = document.getElementById('join-name').value.trim();
  const code = document.getElementById('join-code').value.trim().toUpperCase();
  if (!name) { showError('join', 'Please enter your name'); return; }
  if (!code || code.length < 4) { showError('join', 'Enter a valid room code'); return; }

  showLoading('join');
  try {
    await initPeer();
    state.isHost   = false;
    state.myName   = name;
    state.roomCode = code;

    const conn = peer.connect('FAKEIT-' + code, { reliable: true });
    state.hostConn = conn;

    conn.on('open', () => {
      conn.send({ type: 'player-join', name });
      setConnStatus(true);
      showScreen('lobby');
      setupLobbyUI();
    });

    conn.on('data', data => handleMessage(data, 'host'));
    conn.on('close', () => { setConnStatus(false); showToast('Disconnected from host'); });
    conn.on('error', () => { hideLoading('join'); showError('join', 'Could not connect. Check the code.'); });

    setTimeout(() => {
      if (document.getElementById('screen-join').classList.contains('active')) {
        hideLoading('join');
        showError('join', 'Connection timed out. Check the code.');
      }
    }, 8000);
  } catch (e) {
    hideLoading('join');
    showError('join', e.message || 'Could not connect');
  }
}

// =========================================================
//  LOBBY UI
// =========================================================
function setupLobbyUI() {
  document.getElementById('lobby-code').textContent      = state.roomCode;
  document.getElementById('lobby-host-badge').style.display = state.isHost ? 'inline-block' : 'none';
  document.getElementById('host-settings').style.display    = state.isHost ? 'block' : 'none';
  document.getElementById('guest-waiting').style.display    = state.isHost ? 'none' : 'flex';

  if (state.isHost) {
    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';
    Object.keys(CATEGORIES).forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cat-btn' + (state.selectedCategories.has(cat) ? ' selected' : '');
      btn.textContent = cat;
      btn.onclick = () => {
        if (state.selectedCategories.has(cat)) {
          if (state.selectedCategories.size > 1) state.selectedCategories.delete(cat);
        } else {
          state.selectedCategories.add(cat);
        }
        btn.classList.toggle('selected', state.selectedCategories.has(cat));
      };
      grid.appendChild(btn);
    });
  }
  updateLobbyUI();
}

function updateLobbyUI() {
  const names = Object.keys(state.players);
  const count = names.length;
  document.getElementById('lobby-count').textContent  = count;
  document.getElementById('lobby-status').textContent =
    count < 3 ? `Need at least 3 players (${count}/3)` : `${count} player${count > 1 ? 's' : ''} ready`;

  const list = document.getElementById('player-list');
  list.innerHTML = '';
  names.forEach((name, i) => {
    const pill = document.createElement('div');
    const isHostPlayer = i === 0;
    pill.className = 'player-pill' + (isHostPlayer ? ' host-pill' : '');
    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;
    nameSpan.style.cssText = 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
    pill.innerHTML = `<span class="dot"></span>`;
    pill.appendChild(nameSpan);
    if (isHostPlayer) {
      const badge = document.createElement('span');
      badge.className = 'badge badge-host';
      badge.style.fontSize = '0.6rem';
      badge.textContent = 'HOST';
      pill.appendChild(badge);
    }
    list.appendChild(pill);
  });

  if (state.isHost) {
    const btn = document.getElementById('start-btn');
    btn.disabled = count < 3;
    btn.textContent = count < 3 ? `Need ${3 - count} more player${3 - count !== 1 ? 's' : ''}` : 'Start Game 🚀';
  }
}

function selectTimer(secs, btn) {
  state.timerSeconds = secs;
  document.querySelectorAll('#timer-options .cat-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function copyShareLink() {
  const url = `${window.location.href.split('?')[0]}?join=${state.roomCode}`;
  navigator.clipboard.writeText(url).then(() => showToast('Link copied! Share with friends 🎉'));
}

// =========================================================
//  START GAME  (host only)
//  KEY FIX: host assigns roles secretly and sends each
//  player ONLY their own role. Host itself also only
//  reveals its own role through the card-flip flow.
// =========================================================
function startGame() {
  const names = Object.keys(state.players);
  if (names.length < 3) { showToast('Need at least 3 players!'); return; }

  // Pick random topic
  const cats   = Array.from(state.selectedCategories);
  const cat    = cats[Math.floor(Math.random() * cats.length)];
  const topics = CATEGORIES[cat];
  const topic  = topics[Math.floor(Math.random() * topics.length)];

  // Pick random imposter
  const imposterIdx  = Math.floor(Math.random() * names.length);
  const imposterName = names[imposterIdx];

  // Build roles map (host only — never broadcast full map)
  const roles = {};
  names.forEach(n => { roles[n] = n === imposterName ? 'imposter' : 'crewmate'; });

  // Shuffle clue order
  const playerOrder = [...names].sort(() => Math.random() - 0.5);

  // Store on host state
  state.imposterName  = imposterName;
  state.currentTopic  = topic;
  state.myRole        = roles[state.myName];
  state.myTopic       = state.myRole === 'crewmate' ? topic : '';
  state.playerOrder   = playerOrder;
  state.timerSeconds  = state.timerSeconds;
  state.votes         = {};
  state.myVote        = null;
  state._roleRevealIndex = 0;

  // Send each guest ONLY their own role (not the full map)
  sendGameStartToGuests(roles, topic, imposterName, playerOrder, state.timerSeconds);

  // Host goes to role reveal for themselves
  startRoleReveal();
}

// =========================================================
//  ROLE REVEAL  (pass-the-device, local)
//  Each player physically taps the card on the shared device
//  OR on their own device (internet mode).
// =========================================================
function startRoleReveal() {
  // Every player (host or guest) only ever sees their OWN card.
  showMyRoleCard();
}

function showRoleForPlayer(idx) {
  // Kept for compatibility but not used in internet mode
  showMyRoleCard();
}

function showMyRoleCard() {
  // Always show only this player's own role — never anyone else's
  const name  = state.myName;
  const role  = state.myRole;
  const topic = state.myTopic;

  document.getElementById('role-player-name').textContent = name;
  document.getElementById('role-emoji').textContent  = role === 'imposter' ? '🕵️' : '👥';
  document.getElementById('role-title').textContent  = role === 'imposter' ? 'IMPOSTER' : 'CREWMATE';

  const backEl = document.getElementById('role-back');
  backEl.className = 'role-face role-back ' + role;

  const topicEl = document.getElementById('role-topic');
  if (role === 'crewmate') {
    topicEl.style.display = 'block';
    topicEl.textContent   = topic;
  } else {
    topicEl.style.display = 'none';
  }
  document.getElementById('role-hint').textContent =
    role === 'imposter' ? "You don't know the topic. Blend in!" : 'Give clues without giving it away!';

  // Reset card
  document.getElementById('role-card').classList.remove('flipped');
  document.getElementById('role-actions').style.display = 'none';
  document.getElementById('flip-hint').style.display    = 'block';
  document.getElementById('role-btn-text').textContent  = 'Got it — Start Discussion →';

  showScreen('role');
}

function flipCard() {
  const card = document.getElementById('role-card');
  if (!card.classList.contains('flipped')) {
    card.classList.add('flipped');
    document.getElementById('flip-hint').style.display    = 'none';
    document.getElementById('role-actions').style.display = 'flex';
  }
}

function nextRoleOrStart() {
  // Everyone is on their own device.
  // Host broadcasts go-discussion and transitions immediately.
  // Guest shows a waiting screen until host broadcasts go-discussion.
  if (state.isHost) {
    broadcast({ type: 'go-discussion' });
    startDiscussion();
  } else {
    showWaitingForDiscussion();
  }
}

function showWaitingForDiscussion() {
  document.getElementById('role-actions').style.display   = 'none';
  document.getElementById('flip-hint').style.display      = 'none';
  document.getElementById('role-player-name').textContent = '✅ Role seen!';
  const sub = document.querySelector('#screen-role p.sub');
  if (sub) sub.textContent = 'Waiting for host to start discussion...';
}

// =========================================================
//  DISCUSSION + CHAT
// =========================================================
function startDiscussion() {
  state.votes   = {};
  state.myVote  = null;
  showScreen('discussion');

  // Role badge
  const badge = document.getElementById('disc-role-badge');
  badge.textContent = state.myRole === 'imposter' ? '🕵️ IMPOSTER' : '👥 CREWMATE';
  badge.className   = 'my-role-badge ' + state.myRole;

  // Topic — only crewmates see it
  const topicEl = document.getElementById('disc-topic');
  if (state.myRole === 'crewmate') {
    topicEl.textContent = state.myTopic || state.currentTopic;
    topicEl.style.color = 'var(--accent3)';
  } else {
    topicEl.textContent = '??? — Figure it out from the clues!';
    topicEl.style.color = 'var(--accent)';
  }

  // Host controls
  document.getElementById('disc-host-ctrl').style.display = state.isHost ? 'block' : 'none';

  // Clear chat
  document.getElementById('chat-messages').innerHTML = '';
  addSystemMessage('🎮 Discussion started! Give clues about the topic.');

  // Timer
  timeLeft = state.timerSeconds;
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  updateTimerUI();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      addSystemMessage('⏰ Time\'s up! Voting begins...');
      setTimeout(proceedToVoting, 1500);
    }
  }, 1000);
}

function updateTimerUI() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  document.getElementById('timer-display').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  const circumference = 295.3;
  const offset = circumference * (1 - timeLeft / state.timerSeconds);
  document.getElementById('timer-circle').style.strokeDashoffset = offset;
  document.getElementById('timer-display').style.color =
    timeLeft <= 10 ? 'var(--accent)' : 'var(--text)';
}

function endDiscussion() {
  clearInterval(timerInterval);
  proceedToVoting();
}

function proceedToVoting() {
  clearInterval(timerInterval);
  showScreen('voting');
  renderVotingUI();
}

// ── CHAT ──
function sendChat() {
  const input = document.getElementById('chat-input');
  const text  = input.value.trim();
  if (!text) return;
  input.value = '';

  const msg = { type: 'chat-message', sender: state.myName, text };

  // Render own message immediately
  renderChatMessage(state.myName, text, true);

  // Host relays to all guests; guest sends to host who relays
  if (state.isHost) {
    broadcast(msg);
  } else {
    sendToHost(msg);
    // Host will receive and rebroadcast — but we also need host to relay back
    // We handle this in host's handleMessage: re-broadcast chat messages to all guests
  }
}

// Override handleMessage chat-message for host relay
const _origHandle = handleMessage;
// (Monkey-patch host relay for chat in the same function — see case 'chat-message' above,
//  host also needs to re-broadcast to all OTHER guests)

function renderChatMessage(sender, text, isMine) {
  const container = document.getElementById('chat-messages');
  const wrap = document.createElement('div');
  wrap.className = 'chat-msg ' + (isMine ? 'mine' : 'others');
  if (!isMine) {
    const nameEl = document.createElement('div');
    nameEl.className = 'msg-name';
    nameEl.textContent = sender;
    wrap.appendChild(nameEl);
  }
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;
  wrap.appendChild(bubble);
  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
}

function addSystemMessage(text) {
  const container = document.getElementById('chat-messages');
  const wrap   = document.createElement('div');
  wrap.className = 'chat-msg system';
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;
  wrap.appendChild(bubble);
  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
}

// =========================================================
//  VOTING
// =========================================================
function renderVotingUI() {
  const grid = document.getElementById('vote-grid');
  grid.innerHTML = '';
  const avatarColors = ['#7c3aed','#ff3e6c','#f59e0b','#10b981','#3b82f6','#ec4899','#14b8a6','#f97316'];

  state.playerOrder.forEach((name, i) => {
    if (name === state.myName) return; // can't vote yourself
    const card = document.createElement('div');
    card.className = 'vote-card';
    card.id = `vote-${name}`;
    card.onclick = () => selectVote(name);
    const color = avatarColors[i % avatarColors.length];
    card.innerHTML = `
      <div class="vote-avatar" style="background:${color}">${name[0].toUpperCase()}</div>
      <div class="vote-name">${name}</div>
      <div class="vote-count" id="votecount-${name}">0 votes</div>
      <div class="votes-bar"><div class="votes-bar-fill" id="votebar-${name}" style="width:0%"></div></div>
    `;
    grid.appendChild(card);
  });

  document.getElementById('vote-confirm-area').style.display = 'none';
  updateVotingUI();
}

function selectVote(name) {
  if (state.myVote) return;
  document.querySelectorAll('.vote-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById(`vote-${name}`);
  if (card) card.classList.add('selected');
  state._pendingVote = name;
  document.getElementById('vote-confirm-area').style.display = 'block';
  document.getElementById('confirm-vote-btn').textContent = `Vote for ${name} 🗳️`;
}

function confirmVote() {
  if (!state._pendingVote || state.myVote) return;
  state.myVote = state._pendingVote;

  const voteMsg = { type: 'vote-cast', voter: state.myName, voted: state.myVote };

  if (state.isHost) {
    // Record own vote, broadcast update, check completion
    state.votes[state.myName] = state.myVote;
    broadcast({ type: 'vote-update', votes: state.votes });
    updateVotingUI();
    checkVotesComplete();
  } else {
    // Send to host to tally
    sendToHost(voteMsg);
  }

  document.getElementById('vote-confirm-area').style.display = 'none';
  document.querySelectorAll('.vote-card').forEach(c => c.classList.add('voted'));
  showToast(`Voted for ${state.myVote} ✅`);
  updateVotingUI();
}

function updateVotingUI() {
  const voteCounts = {};
  Object.values(state.votes).forEach(v => { voteCounts[v] = (voteCounts[v] || 0) + 1; });
  const total  = Object.keys(state.players).length;
  const voted  = Object.keys(state.votes).length;

  state.playerOrder.forEach(name => {
    const countEl = document.getElementById(`votecount-${name}`);
    const barEl   = document.getElementById(`votebar-${name}`);
    if (!countEl) return;
    const c = voteCounts[name] || 0;
    countEl.textContent = `${c} vote${c !== 1 ? 's' : ''}`;
    if (barEl) barEl.style.width = `${total > 0 ? (c / total) * 100 : 0}%`;
  });

  const waitEl = document.getElementById('votes-waiting');
  if (voted < total) {
    waitEl.style.display = 'block';
    waitEl.innerHTML = `<div class="waiting" style="justify-content:center"><div class="spinner"></div>&nbsp;${voted}/${total} votes in...</div>`;
  } else {
    waitEl.style.display = 'none';
  }
}

function checkVotesComplete() {
  if (!state.isHost) return;
  const total = Object.keys(state.players).length;
  if (Object.keys(state.votes).length >= total) {
    setTimeout(calculateReveal, 800);
  }
}

// =========================================================
//  REVEAL
// =========================================================
function calculateReveal() {
  // Tally votes
  const voteCounts = {};
  Object.values(state.votes).forEach(v => { voteCounts[v] = (voteCounts[v] || 0) + 1; });

  let maxVotes = 0, accused = '';
  Object.entries(voteCounts).forEach(([name, count]) => {
    if (count > maxVotes) { maxVotes = count; accused = name; }
  });

  const accusedWasImposter = accused === state.imposterName;

  // Update scores
  Object.keys(state.players).forEach(n => {
    if (!state.scores[n]) state.scores[n] = 0;
    if (accusedWasImposter) {
      if (n !== state.imposterName) state.scores[n] += 2; // crewmates win
    } else {
      if (n === state.imposterName) state.scores[n] += 3; // imposter wins
    }
    state.players[n].score = state.scores[n];
  });

  const revealData = {
    type: 'reveal-results',
    accused,
    accusedWasImposter,
    imposterName: state.imposterName,
    topic: state.currentTopic,
    scores: state.scores,
  };

  broadcast(revealData);
  showReveal(revealData);
}

function showReveal(data) {
  showScreen('reveal');

  document.getElementById('reveal-accused').textContent = data.accused;
  const verdict = document.getElementById('reveal-verdict');

  if (data.accusedWasImposter) {
    verdict.textContent = '🕵️ WAS THE IMPOSTER!';
    verdict.className   = 'reveal-badge imposter';
    document.getElementById('reveal-confetti').textContent = '🎉';
  } else {
    verdict.textContent = '👥 WAS A CREWMATE!';
    verdict.className   = 'reveal-badge crewmate';
    document.getElementById('reveal-confetti').textContent = '💀';
  }

  document.getElementById('reveal-imposter-name').textContent = data.imposterName;
  document.getElementById('reveal-topic').textContent         = data.topic;

  // Scores
  const list   = document.getElementById('scores-list');
  list.innerHTML = '';
  const sorted = Object.entries(data.scores).sort((a, b) => b[1] - a[1]);
  sorted.forEach(([name, score], i) => {
    const row    = document.createElement('div');
    row.className = 'score-row';
    const medal  = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
    row.innerHTML = `<span>${medal} ${name}${name === data.imposterName ? ' 🕵️' : ''}</span><span class="score-pts">${score} pts</span>`;
    list.appendChild(row);
  });

  document.getElementById('play-again-btn').style.display = state.isHost ? 'inline-flex' : 'none';
}

// =========================================================
//  PLAY AGAIN
// =========================================================
function playAgain() {
  broadcast({ type: 'play-again' });
  resetForNextRound();
  setupLobbyUI();
  showScreen('lobby');
}

function resetForNextRound() {
  state.votes              = {};
  state.myVote             = null;
  state._pendingVote       = null;
  state.myRole             = '';
  state.myTopic            = '';
  state.currentTopic       = '';
  state.imposterName       = '';
  state._roleRevealIndex   = 0;
  clearInterval(timerInterval);
}

// =========================================================
//  UI HELPERS
// =========================================================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + name);
  if (el) el.classList.add('active');
}

function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

function showError(screen, msg) {
  const el = document.getElementById(screen + '-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
  hideLoading(screen);
}

function showLoading(screen) {
  const btn = document.querySelector(`#screen-${screen} .btn-primary`);
  if (btn) {
    btn._origText  = btn.textContent;
    btn.disabled   = true;
    btn.innerHTML  = '<div class="spinner"></div>&nbsp;Connecting...';
  }
}

function hideLoading(screen) {
  const btn = document.querySelector(`#screen-${screen} .btn-primary`);
  if (btn && btn._origText) { btn.textContent = btn._origText; btn.disabled = false; }
}

function setConnStatus(connected) {
  const bar = document.getElementById('conn-status');
  bar.style.display = 'flex';
  document.getElementById('conn-dot').className   = 'conn-dot' + (connected ? '' : ' red');
  document.getElementById('conn-label').textContent = connected ? 'Connected' : 'Disconnected';
}

function randomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// =========================================================
//  HOST RELAY FOR CHAT
//  When host receives a chat-message from a guest,
//  rebroadcast to all other guests (already handled in
//  handleMessage — but we also need to render it locally on host)
// =========================================================
// Patch the chat-message case so host relays + renders
const originalHandleMessage = handleMessage;
window.handleMessage = function(data, fromName) {
  if (data.type === 'chat-message' && state.isHost) {
    // Render on host screen
    renderChatMessage(data.sender, data.text, data.sender === state.myName);
    // Relay to all guests
    broadcast(data);
    return;
  }
  originalHandleMessage(data, fromName);
};

// =========================================================
//  AUTO-JOIN FROM URL PARAM
// =========================================================
window.onload = () => {
  const params   = new URLSearchParams(window.location.search);
  const joinCode = params.get('join');
  if (joinCode) {
    document.getElementById('join-code').value = joinCode.toUpperCase();
    showScreen('join');
  }
};