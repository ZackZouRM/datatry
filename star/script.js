// ============================================
// Knowledge Universe - Main JavaScript
// 星际数据分析系统 - 交互逻辑
// 正确流程：全屏星球视图 → 数据导入 → QA → 饱满度 → 左右分栏
// ============================================

// 全局状态
const state = {
  currentScene: 'flight',
  universeName: '',
  planets: [],
  selectedPlanet: null,
  chatHistory: [],
  dataSources: [],
  saturation: 0,
  businessContext: null,
  dataStructure: null
};

// 全局函数 - 创建新宇宙
window.goToCreateUniverse = function() {
  console.log('goToCreateUniverse called!');
  showScene('welcome');
};

// 全局函数 - SVG点击
window.clickNewGalaxy = function() {
  console.log('clickNewGalaxy called!');
  showScene('welcome');
};

// ============================================
// 初始化
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Detect version
  const isCellVersion = document.querySelector('link[href="styles-cell.css"]') !== null;
  
  if (isCellVersion) {
    initCellDivision();
  } else {
    initStarsBackground();
    initFlyingUniverse();
  }
  
  initEventListeners();
  showScene('flight');
});

// ============================================
// 细胞分裂初始化 (Cell Version)
// ============================================

function initCellDivision() {
  const circulatorySystem = document.getElementById('circulatorySystem');
  if (!circulatorySystem) return;
  
  // Create fixed heart nodes (使用固定像素坐标，确保精确匹配)
  const heartPositions = [
    // 主心脏（右下，最大）- viewBox 1600x900
    { left: 1248, top: 675, name: 'Main Heart', size: 'large', delay: 0 },
    
    // 周边小心脏（避开左上和中间）
    { left: 1360, top: 162, name: 'Research', size: 'small', delay: 0.3 },
    { left: 288, top: 702, name: 'Product', size: 'small', delay: 0.6 },
    { left: 960, top: 108, name: 'Reading', size: 'small', delay: 0.9 },
    { left: 192, top: 495, name: 'Operations', size: 'small', delay: 1.2 }
  ];
  
  heartPositions.forEach((pos, index) => {
    const heartNode = document.createElement('div');
    heartNode.className = `fixed-heart-node ${pos.size}`;
    // 转换为百分比（基于viewBox 1600x900）
    heartNode.style.left = ((pos.left / 1600) * 100) + '%';
    heartNode.style.top = ((pos.top / 900) * 100) + '%';
    heartNode.style.animationDelay = pos.delay + 's';
    
    heartNode.innerHTML = `
      <div class="heart-outer-ring"></div>
      <div class="heart-core"></div>
      <div class="heart-node-label">${pos.name}</div>
    `;
    
    circulatorySystem.appendChild(heartNode);
  });
  
  // Add blood flow particles
  createBloodFlowParticles();
}

function createBloodFlowParticles() {
  const network = document.getElementById('bloodVesselNetwork');
  if (!network) return;
  
  const paths = network.querySelectorAll('.blood-vessel');
  if (paths.length === 0) return;
  
  // 持续创建血液粒子（循环）
  function createParticle() {
    const randomPath = paths[Math.floor(Math.random() * paths.length)];
    const pathLength = randomPath.getTotalLength();
    
    const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    particle.setAttribute('r', '5');
    particle.setAttribute('fill', '#DC2626');
    particle.setAttribute('class', 'blood-particle-svg');
    particle.setAttribute('filter', 'drop-shadow(0 0 4px #DC2626)');
    
    let progress = 0;
    const speed = 0.015; // 流动速度
    
    const animate = setInterval(() => {
      progress += speed;
      if (progress > 1) {
        clearInterval(animate);
        particle.remove();
        // 粒子消失后，随机延迟再创建新的
        setTimeout(createParticle, Math.random() * 500);
      } else {
        const point = randomPath.getPointAtLength(progress * pathLength);
        particle.setAttribute('cx', point.x);
        particle.setAttribute('cy', point.y);
        // 淡入淡出效果
        const opacity = Math.sin(progress * Math.PI) * 0.9;
        particle.setAttribute('opacity', opacity);
      }
    }, 30);
    
    network.appendChild(particle);
  }
  
  // 初始创建12个粒子，错开时间
  for (let i = 0; i < 12; i++) {
    setTimeout(() => createParticle(), i * 300);
  }
}

// ============================================
// 飞行宇宙初始化
// ============================================

function initFlyingUniverse() {
  const starsContainer = document.getElementById('starsFlying');
  const planetsContainer = document.getElementById('knowledgePlanetsFlying');
  
  if (!starsContainer || !planetsContainer) return;
  
  // Create flying stars
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star-flying';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = (Math.random() * 3 + 1) + 'px';
    star.style.height = star.style.width;
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 2 + 2) + 's';
    starsContainer.appendChild(star);
  }
  
  // Create flying knowledge planets - 从四面八方飞来
  const planetThemes = [
    { name: 'E-commerce', color: '#6EC287', glow: 'rgba(110, 194, 135, 0.8)' },
    { name: 'Reading Notes', color: '#4DD4E8', glow: 'rgba(77, 212, 232, 0.8)' },
    { name: 'Research Papers', color: '#F4A742', glow: 'rgba(244, 167, 66, 0.8)' },
    { name: 'User Profiles', color: '#D94949', glow: 'rgba(217, 73, 73, 0.8)' },
    { name: 'Finance Reports', color: '#6EC287', glow: 'rgba(110, 194, 135, 0.8)' },
    { name: 'Market Research', color: '#4DD4E8', glow: 'rgba(77, 212, 232, 0.8)' },
    { name: 'Product Data', color: '#F4A742', glow: 'rgba(244, 167, 66, 0.8)' },
    { name: 'Operations', color: '#6EC287', glow: 'rgba(110, 194, 135, 0.8)' },
    { name: 'Customer Feedback', color: '#D94949', glow: 'rgba(217, 73, 73, 0.8)' },
    { name: 'Competition', color: '#4DD4E8', glow: 'rgba(77, 212, 232, 0.8)' }
  ];
  
  // 定义8个方向（从中心向外）
  const directions = [
    { x: -20, y: -20 },   // 左上
    { x: 50, y: -20 },    // 正上
    { x: 120, y: -20 },   // 右上
    { x: 120, y: 50 },    // 正右
    { x: 120, y: 120 },   // 右下
    { x: 50, y: 120 },    // 正下
    { x: -20, y: 120 },   // 左下
    { x: -20, y: 50 },    // 正左
    { x: -15, y: -15 },   // 左上远
    { x: 115, y: 115 }    // 右下远
  ];
  
  planetThemes.forEach((theme, index) => {
    const planet = document.createElement('div');
    planet.className = 'flying-planet';
    const direction = directions[index];
    
    // 所有星球从中心(50%, 50%)出发
    planet.style.setProperty('--end-x', direction.x + '%');
    planet.style.setProperty('--end-y', direction.y + '%');
    
    planet.style.animationDelay = (index * 1.6) + 's';  // 错开时间（2倍）
    planet.style.animationDuration = (Math.random() * 4 + 10) + 's';  // 10-14秒（再慢0.5倍）
    
    planet.innerHTML = `
      <div class="flying-planet-circle" style="
        border-color: ${theme.color};
        filter: drop-shadow(0 0 20px ${theme.glow});
      "></div>
      <div class="flying-planet-label">${theme.name}</div>
    `;
    
    planetsContainer.appendChild(planet);
  });
}

function adjustColorBrightness(color, amount) {
  return color; // 简化版本
}

// ============================================
// 星空背景生成
// ============================================

function initStarsBackground() {
  const backgrounds = document.querySelectorAll('.stars-background');
  backgrounds.forEach(bg => {
    // Skip if already populated
    if (bg.children.length > 0) return;
    
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (Math.random() * 2 + 2) + 's';
      bg.appendChild(star);
    }
  });
}

// ============================================
// 场景切换
// ============================================

function showScene(sceneName) {
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach(scene => scene.classList.remove('active'));
  
  const targetScene = document.getElementById(`scene-${sceneName}`);
  if (targetScene) {
    targetScene.classList.add('active');
    state.currentScene = sceneName;
  }
}

// ============================================
// 事件监听器
// ============================================

function initEventListeners() {
  // Scene 0: Start Journey Button
  const startJourneyBtn = document.getElementById('startJourneyBtn');
  if (startJourneyBtn) {
    startJourneyBtn.addEventListener('click', () => {
      showScene('auth');
    });
  }

  // Scene 1: Auth Tabs
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      
      e.target.classList.add('active');
      const tabName = e.target.dataset.tab;
      document.getElementById(tabName + 'Form').classList.add('active');
    });
  });

  // Send Verification Code
  const sendCodeBtn = document.getElementById('sendCodeBtn');
  if (sendCodeBtn) {
    sendCodeBtn.addEventListener('click', () => {
      let countdown = 60;
      sendCodeBtn.disabled = true;
      sendCodeBtn.textContent = `${countdown}s`;
      
      const timer = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
          clearInterval(timer);
          sendCodeBtn.disabled = false;
          sendCodeBtn.textContent = '发送验证码';
        } else {
          sendCodeBtn.textContent = `${countdown}s`;
        }
      }, 1000);
      
      // Simulate sending
      setTimeout(() => {
        alert('Verification code sent! (Demo mode: any 6 digits work)');
      }, 500);
    });
  }

  // Login Button
  const loginBtn = document.getElementById('loginBtn');
  const googleLoginBtn = document.getElementById('googleLoginBtn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      // Simulate login
      showScene('dashboard');
    });
  }
  
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', () => {
      // Simulate Google login
      showScene('dashboard');
    });
  }

  // Scene 2: Create Universe Button (Multiple attempts)
  function setupCreateButton() {
    const createUniverseBtn = document.getElementById('createUniverseBtn');
    console.log('Create Universe Button found:', createUniverseBtn);
    
    if (createUniverseBtn) {
      console.log('Adding click listener to button');
      createUniverseBtn.onclick = function() {
        console.log('Button clicked!');
        showScene('welcome');
      };
    }
  }
  
  // Try immediately
  setupCreateButton();
  
  // Try after delay
  setTimeout(setupCreateButton, 500);
  setTimeout(setupCreateButton, 1000);

  // Click on center "+" to create - SVG circle
  function setupSVGClick() {
    const newGalaxyClickArea = document.getElementById('newGalaxyClickArea');
    console.log('SVG Click Area found:', newGalaxyClickArea);
    
    if (newGalaxyClickArea) {
      newGalaxyClickArea.onclick = function() {
        console.log('SVG Circle clicked!');
        showScene('welcome');
      };
    }
  }
  
  setTimeout(setupSVGClick, 500);
  setTimeout(setupSVGClick, 1000);
  setTimeout(setupSVGClick, 2000);

  // Click on existing galaxy to open
  document.querySelectorAll('.galaxy-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      // Simulate opening existing project
      state.universeName = e.currentTarget.querySelector('.galaxy-label').textContent;
      showScene('main');
      setTimeout(() => {
        buildMainUniverseView();
        addAIMessage(`Welcome back to ${state.universeName}!`, { noTyping: true });
        updateSuggestions([
          { label: 'Continue Analysis', action: () => {} },
          { label: 'View Reports', action: () => {} }
        ]);
      }, 500);
    });
  });

  // Scene 3: Welcome - Universe Name Input
  const universeInput = document.getElementById('universeNameInput');
  if (universeInput) {
    universeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && universeInput.value.trim()) {
        state.universeName = universeInput.value.trim();
        startUniverseInitialization();
      }
    });
  }

  // Upload Zone Drop Area
  const zoneDropArea = document.getElementById('zoneDropArea');
  const fileInputHidden = document.getElementById('fileInputHidden');
  
  if (zoneDropArea && fileInputHidden) {
    // Click to browse
    zoneDropArea.addEventListener('click', () => {
      fileInputHidden.click();
    });
    
    // Drag and drop
    zoneDropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      zoneDropArea.classList.add('drag-over');
    });
    
    zoneDropArea.addEventListener('dragleave', () => {
      zoneDropArea.classList.remove('drag-over');
    });
    
    zoneDropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      zoneDropArea.classList.remove('drag-over');
      handleFilesSelected(e.dataTransfer.files);
    });
    
    // File input change
    fileInputHidden.addEventListener('change', (e) => {
      handleFilesSelected(e.target.files);
    });
  }

  // Database Quick Connect Buttons
  document.querySelectorAll('.db-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dbType = btn.dataset.db;
      if (dbType) {
        connectDatabaseQuick(dbType);
      }
    });
  });

  // Database More Button
  const dbMoreBtn = document.getElementById('dbMoreBtn');
  const dbMoreOptions = document.getElementById('dbMoreOptions');
  
  if (dbMoreBtn && dbMoreOptions) {
    dbMoreBtn.addEventListener('click', () => {
      dbMoreOptions.classList.toggle('hidden');
      dbMoreBtn.querySelector('span:first-child').textContent = 
        dbMoreOptions.classList.contains('hidden') ? '+' : '−';
    });
  }

  // Chat Input - Bottom Panel (Ingestion Scene)
  const chatInputBottom = document.getElementById('chatInputBottom');
  const sendBtnBottom = document.getElementById('sendBtnBottom');
  
  if (chatInputBottom && sendBtnBottom) {
    sendBtnBottom.addEventListener('click', () => sendChatMessageBottom());
    chatInputBottom.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessageBottom();
      }
    });
  }


  // Chat Input - Side Panel (Main Scene)
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  
  if (chatInput && sendBtn) {
    sendBtn.addEventListener('click', () => sendChatMessage());
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
      }
    });
  }

  // Modal Close Buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      hideModal(modal.id);
    });
  });


  // Create View Button
  const createViewBtn = document.getElementById('createViewBtn');
  if (createViewBtn) {
    createViewBtn.addEventListener('click', () => {
      showModal('createViewModal');
    });
  }

  // Close Planet Details Button
  const closePlanetDetails = document.getElementById('closePlanetDetails');
  if (closePlanetDetails) {
    closePlanetDetails.addEventListener('click', () => {
      deselectPlanet();
    });
  }

  // Click on universe view to deselect
  const universeView = document.getElementById('universeView');
  if (universeView) {
    universeView.addEventListener('click', (e) => {
      // Only deselect if clicking on the container itself, not on planets
      if (e.target === universeView || e.target.tagName === 'svg') {
        deselectPlanet();
      }
    });
  }

  // Message History Button
  const messageHistoryBtn = document.getElementById('messageHistoryBtn');
  const messageHistoryPanel = document.getElementById('messageHistoryPanel');
  const closeHistoryBtn = document.getElementById('closeHistoryBtn');
  
  if (messageHistoryBtn) {
    messageHistoryBtn.addEventListener('click', () => {
      toggleMessageHistory();
    });
  }
  
  if (closeHistoryBtn) {
    closeHistoryBtn.addEventListener('click', () => {
      messageHistoryPanel.classList.add('hidden');
    });
  }

  // View Template Selection
  document.querySelectorAll('.view-template').forEach(template => {
    template.addEventListener('click', (e) => {
      const type = e.currentTarget.dataset.type;
      createView(type);
    });
  });

  // Close Create View Modal
  const closeCreateViewModal = document.getElementById('closeCreateViewModal');
  if (closeCreateViewModal) {
    closeCreateViewModal.addEventListener('click', () => {
      hideModal('createViewModal');
    });
  }

  // Database Modal
  const closeDatabaseModal = document.getElementById('closeDatabaseModal');
  const cancelDatabase = document.getElementById('cancelDatabase');
  if (closeDatabaseModal) {
    closeDatabaseModal.addEventListener('click', () => hideModal('databaseModal'));
  }
  if (cancelDatabase) {
    cancelDatabase.addEventListener('click', () => hideModal('databaseModal'));
  }

  // Database Type Selection
  document.querySelectorAll('.db-type-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const type = e.currentTarget.dataset.type;
      selectDatabaseType(type);
    });
  });

  // Test Connection Button
  const testConnectionBtn = document.getElementById('testConnectionBtn');
  if (testConnectionBtn) {
    testConnectionBtn.addEventListener('click', () => testDatabaseConnection());
  }

  // Back to Types Button
  const backToTypesBtn = document.getElementById('backToTypesBtn');
  if (backToTypesBtn) {
    backToTypesBtn.addEventListener('click', () => {
      document.getElementById('dbConnectionForm').classList.add('hidden');
      document.querySelector('.database-types').style.display = 'grid';
      document.getElementById('connectDatabase').disabled = true;
    });
  }

  // Connect Database Button
  const connectDatabase = document.getElementById('connectDatabase');
  if (connectDatabase) {
    connectDatabase.addEventListener('click', () => connectToDatabaseAndImport());
  }
}

// ============================================
// Scene 1.5: Universe Initialization
// ============================================

function startUniverseInitialization() {
  showScene('init');
  
  const titleElement = document.getElementById('universeTitleInit');
  if (titleElement) {
    titleElement.textContent = `[${state.universeName}]`;
  }

  const tasks = [
    { element: 0, duration: 800, progress: 33 },
    { element: 1, duration: 1000, progress: 66 },
    { element: 2, duration: 1200, progress: 100 }
  ];

  let currentTask = 0;
  
  function runNextTask() {
    if (currentTask >= tasks.length) {
      setTimeout(() => {
        showIngestionScene();
      }, 500);
      return;
    }

    const task = tasks[currentTask];
    const taskElements = document.querySelectorAll('#initTaskList .task-item');
    
    if (taskElements[task.element]) {
      taskElements[task.element].classList.remove('pending');
      taskElements[task.element].classList.add('in-progress');
    }

    // Update progress bar
    document.getElementById('initProgress').style.width = task.progress + '%';
    document.getElementById('initProgressText').textContent = task.progress + '%';

    setTimeout(() => {
      if (taskElements[task.element]) {
        taskElements[task.element].classList.remove('in-progress');
        taskElements[task.element].classList.add('completed');
      }
      
      currentTask++;
      runNextTask();
    }, task.duration);
  }

  setTimeout(() => runNextTask(), 500);
}

// ============================================
// Scene 2: Data Ingestion (Full Screen Universe)
// ============================================

function showIngestionScene() {
  showScene('ingestion');
  
  // Update nav
  document.getElementById('universeNameIngestion').textContent = state.universeName;

  // Initialize SVG gradients
  initializeSVGGradientsIngestion();

  // Don't show any messages initially - just show planet and action buttons
  // Messages will appear after user clicks an action button
}

// ============================================
// File Upload (Direct from Zone)
// ============================================

function handleFilesSelected(files) {
  if (files.length === 0) return;
  
  // Hide input zones
  const inputZones = document.getElementById('dataInputZones');
  if (inputZones) {
    inputZones.classList.add('hidden');
  }
  
  // Add files to state
  state.dataSources = [];
  Array.from(files).forEach(file => {
    state.dataSources.push({
      name: file.name,
      size: file.size,
      type: file.type,
      rows: Math.floor(Math.random() * 100000) + 10000,
      columns: Math.floor(Math.random() * 20) + 5
    });
  });
  
  // Show uploaded files message
  const fileList = state.dataSources.map(f => `• ${f.name} (${formatFileSize(f.size)})`).join('\n');
  addAIMessageBottom(
    `✓ Received ${files.length} file(s):\n\n${fileList}\n\nReady to process.`
  );
  
  // Show process button
  showActionButtons([
    { label: '✓ Process Files', primary: true, action: () => startDataCleaningOnUniverse() },
    { label: 'Add More Files', primary: false, action: () => document.getElementById('fileInputHidden').click() },
    { label: 'Cancel', primary: false, action: () => resetToInitialState() }
  ]);
}

// ============================================
// Database Quick Connect (Direct from Zone)
// ============================================

function connectDatabaseQuick(dbType) {
  // Hide input zones
  const inputZones = document.getElementById('dataInputZones');
  if (inputZones) {
    inputZones.classList.add('hidden');
  }
  
  // DB name mapping
  const dbNames = {
    'mysql': 'MySQL',
    'postgresql': 'PostgreSQL',
    'mongodb': 'MongoDB',
    'snowflake': 'Snowflake',
    'redis': 'Redis',
    'bigquery': 'BigQuery',
    'redshift': 'Redshift',
    'oracle': 'Oracle'
  };
  
  const dbName = dbNames[dbType] || dbType;
  
  // Show connecting message
  addAIMessageBottom(`🔌 Connecting to ${dbName}...`);
  
  setTimeout(() => {
    addAIMessageBottom(
      `✓ Connected to ${dbName}!\n\n` +
      `📊 Scanning schema...\n\n` +
      `Found 4 tables:\n` +
      `• users_table (189K rows)\n` +
      `• orders_table (35K rows)\n` +
      `• products_table (12K rows)\n` +
      `• sessions_table (445K rows)`
    );
    
    // Simulate data sources
    state.dataSources = [
      { name: 'users_table', size: 3200000, rows: 189432, columns: 15 },
      { name: 'orders_table', size: 1850000, rows: 34821, columns: 22 },
      { name: 'products_table', size: 890000, rows: 12456, columns: 18 },
      { name: 'sessions_table', size: 5600000, rows: 445230, columns: 10 }
    ];
    
    // Show import button
    showActionButtons([
      { label: '✓ Import All Tables', primary: true, action: () => startDataCleaningOnUniverse() },
      { label: 'Select Specific Tables', primary: false, action: () => {
        addAIMessageBottom('Select which tables to import:');
        showActionButtons([
          { label: '✓ users_table', primary: false, action: () => {} },
          { label: '✓ orders_table', primary: false, action: () => {} },
          { label: 'Continue', primary: true, action: () => startDataCleaningOnUniverse() }
        ]);
      }}
    ]);
  }, 1800);
}

// ============================================
// Action Buttons Management
// ============================================

function showActionButtons(buttons) {
  const container = document.getElementById('actionButtonsBar');
  container.innerHTML = '';
  
  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.className = btn.primary ? 'action-btn' : 'action-btn secondary';
    button.textContent = btn.label;
    button.addEventListener('click', btn.action);
    container.appendChild(button);
  });
}

function clearActionButtons() {
  const container = document.getElementById('actionButtonsBar');
  container.innerHTML = '';
}

function resetToInitialState() {
  clearActionButtons();
  const inputZones = document.getElementById('dataInputZones');
  if (inputZones) {
    inputZones.classList.remove('hidden');
  }
  state.dataSources = [];
  // Clear floating messages
  document.getElementById('floatingMessages').innerHTML = '';
}


// Initialize SVG Gradients for Ingestion Scene
function initializeSVGGradientsIngestion() {
  const svg = document.getElementById('ingestionSvg');
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  
  // Core gradient
  const coreGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
  coreGradient.setAttribute('id', 'coreGradientIngestion');
  coreGradient.innerHTML = `
    <stop offset="0%" style="stop-color:#4DD4E8;stop-opacity:1" />
    <stop offset="100%" style="stop-color:#1B4D89;stop-opacity:1" />
  `;
  defs.appendChild(coreGradient);
  
  svg.insertBefore(defs, svg.firstChild);
}

// ============================================
// Chat Functions - Bottom Panel (Ingestion Scene)
// ============================================

function sendChatMessageBottom() {
  const input = document.getElementById('chatInputBottom');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addUserMessageBottom(message);
  input.value = '';
  
  // Handle commands
  setTimeout(() => {
    handleUserCommandBottom(message);
  }, 500);
}

function addUserMessageBottom(text) {
  const messagesContainer = document.getElementById('floatingMessages');
  const messageDiv = document.createElement('div');
  
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  messageDiv.className = `floating-message user`;
  
  messageDiv.innerHTML = `
    <button class="floating-message-close" onclick="this.parentElement.remove()">×</button>
    <div class="floating-message-header">
      <span class="floating-message-icon">👤</span>
      <span>Sarah</span>
      <span class="floating-message-time">${time}</span>
    </div>
    <div class="floating-message-content">${text}</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  
  state.chatHistory.push({ role: 'user', content: text, time });
  
  // Update message count
  updateMessageCount();
  
  // Auto-scroll to bottom
  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 100);
}

function addAIMessageBottom(text, options = {}) {
  if (!options.noTyping) {
    // Show typing indicator briefly
    showTypingIndicator();
    
    setTimeout(() => {
      hideTypingIndicator();
      addAIMessageBottomContent(text, options);
    }, 1000);
  } else {
    addAIMessageBottomContent(text, options);
  }
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById('floatingMessages');
  
  // Remove existing typing indicator
  const existingTyping = document.getElementById('typingIndicator');
  if (existingTyping) existingTyping.remove();
  
  const typingDiv = document.createElement('div');
  typingDiv.id = 'typingIndicator';
  typingDiv.className = 'floating-message ai';
  typingDiv.style.padding = '15px 20px';
  typingDiv.innerHTML = `
    <div class="typing-indicator">
      <span></span><span></span><span></span>
    </div>
  `;
  
  messagesContainer.appendChild(typingDiv);
  
  // Auto-scroll to bottom
  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 50);
}

function hideTypingIndicator() {
  const typingDiv = document.getElementById('typingIndicator');
  if (typingDiv) typingDiv.remove();
}

function addAIMessageBottomContent(text, options = {}) {
  const messagesContainer = document.getElementById('floatingMessages');
  const messageDiv = document.createElement('div');
  
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  messageDiv.className = `floating-message ai`;
  
  messageDiv.innerHTML = `
    <button class="floating-message-close" onclick="this.parentElement.remove()">×</button>
    <div class="floating-message-header">
      <span class="floating-message-icon">🤖</span>
      <span>AI Assistant</span>
      <span class="floating-message-time">${time}</span>
    </div>
    <div class="floating-message-content">${text.replace(/\n/g, '<br>')}</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  
  state.chatHistory.push({ role: 'assistant', content: text, time });
  
  // Update message count
  updateMessageCount();
  
  // Auto-scroll to bottom
  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 100);
}

// ============================================
// Message Management
// ============================================

function updateMessageCount() {
  const countElement = document.getElementById('messageCount');
  if (countElement) {
    countElement.textContent = state.chatHistory.length;
  }
}

function toggleMessageHistory() {
  const panel = document.getElementById('messageHistoryPanel');
  
  if (panel.classList.contains('hidden')) {
    // Show panel and populate with history
    populateMessageHistory();
    panel.classList.remove('hidden');
  } else {
    // Hide panel
    panel.classList.add('hidden');
  }
}

function populateMessageHistory() {
  const content = document.getElementById('historyContent');
  
  if (state.chatHistory.length === 0) {
    content.innerHTML = '<p class="empty-history">No messages yet</p>';
    return;
  }
  
  // Render all messages in chronological order
  content.innerHTML = state.chatHistory.map(msg => `
    <div class="history-message ${msg.role}">
      <div class="history-message-header">
        <span>${msg.role === 'user' ? '👤 Sarah' : '🤖 AI Assistant'}</span>
        <span>${msg.time}</span>
      </div>
      <div class="history-message-content">${msg.content.replace(/\n/g, '<br>')}</div>
    </div>
  `).join('');
  
  // Scroll to bottom
  content.scrollTop = content.scrollHeight;
}


function handleUserCommandBottom(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('upload')) {
    showModal('uploadModal');
    addAIMessageBottom('Great! Please upload your data files.');
  } else if (lowerMessage.includes('connect')) {
    addAIMessageBottom('Database connection feature coming soon! For now, please use file upload.');
  } else if (lowerMessage.includes('demo') || lowerMessage.includes('example')) {
    loadDemoData();
  } else {
    addAIMessageBottom(`I understand you're asking about: "${message}"\n\nTo get started, please upload your data first. Once we have your data, I can help analyze it and answer your questions!`);
  }
}

function updateSuggestionsBottom(suggestions) {
  const container = document.getElementById('suggestionsFloating');
  container.innerHTML = '';
  
  suggestions.forEach(suggestion => {
    const chip = document.createElement('div');
    chip.className = 'suggestion-chip';
    chip.textContent = suggestion.label;
    chip.addEventListener('click', suggestion.action);
    container.appendChild(chip);
  });
}

// ============================================
// File Upload (Overlay Version)
// ============================================

function handleFileUploadOverlay(files) {
  const uploadedFilesContainer = document.getElementById('uploadedFilesOverlay');
  const confirmBtn = document.getElementById('confirmUploadOverlay');
  
  Array.from(files).forEach(file => {
    // Add to state
    state.dataSources.push({
      name: file.name,
      size: file.size,
      type: file.type,
      rows: Math.floor(Math.random() * 100000) + 10000,
      columns: Math.floor(Math.random() * 20) + 5
    });
    
    // Create file item
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
      <div class="file-info">
        <span>📄</span>
        <div>
          <div class="file-name">${file.name}</div>
          <div class="file-size">${formatFileSize(file.size)}</div>
        </div>
      </div>
    `;
    uploadedFilesContainer.appendChild(fileItem);
  });
  
  if (state.dataSources.length > 0) {
    confirmBtn.disabled = false;
  }
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ============================================
// Data Cleaning - Display on Universe
// ============================================

function startDataCleaningOnUniverse() {
  // Clear action buttons
  clearActionButtons();
  
  // Show energy injection animation
  animateEnergyInjection();
  
  // Activate core node
  setTimeout(() => {
    const coreCircle = document.querySelector('#coreNodeIngestion circle');
    if (coreCircle) {
      coreCircle.classList.remove('empty');
      coreCircle.setAttribute('fill', 'url(#coreGradientIngestion)');
      coreCircle.style.animation = 'pulse-activate 0.8s ease-out';
    }
  }, 800);

  // Show simple message
  addAIMessageBottom(`⚡ Injecting ${state.dataSources.length} data stream(s) into core...`);

  // Create pending planet nodes around core
  setTimeout(() => {
    state.dataSources.forEach((ds, index) => {
      setTimeout(() => {
        createPendingPlanetIngestion(index);
      }, index * 200);
    });
  }, 1200);

  // Start cleaning process (progress shown on Core)
  setTimeout(() => {
    runCleaningWithMessages();
  }, 2000);
}

function animateEnergyInjection() {
  // Create temporary energy particles flowing to core
  const svg = document.getElementById('ingestionSvg');
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      particle.setAttribute('r', '3');
      particle.setAttribute('fill', 'var(--energy-cyan)');
      particle.setAttribute('opacity', '0.8');
      
      // Random start position (from edges)
      const side = Math.random() > 0.5 ? 'left' : 'right';
      const startX = side === 'left' ? 200 : 1400;
      const startY = 450 + (Math.random() - 0.5) * 200;
      
      particle.setAttribute('cx', startX);
      particle.setAttribute('cy', startY);
      
      svg.appendChild(particle);
      
      // Animate to core
      let progress = 0;
      const animate = setInterval(() => {
        progress += 0.02;
        if (progress >= 1) {
          clearInterval(animate);
          particle.remove();
        } else {
          const currentX = startX + (800 - startX) * progress;
          const currentY = startY + (450 - startY) * progress;
          particle.setAttribute('cx', currentX);
          particle.setAttribute('cy', currentY);
          particle.setAttribute('opacity', 0.8 * (1 - progress));
        }
      }, 16);
    }, i * 100);
  }
}

function createPendingPlanetIngestion(index) {
  const svg = document.getElementById('ingestionSvg');
  const group = document.getElementById('planetsGroupIngestion');
  
  const angles = [0, 120, 240]; // 3 planets around core (or 4 if database)
  const angle = angles[index % 3] * (Math.PI / 180);
  const radius = 220;
  const cx = 800 + Math.cos(angle) * radius;
  const cy = 450 + Math.sin(angle) * radius;
  
  const planet = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  planet.setAttribute('class', 'planet pending');
  planet.setAttribute('data-index', index);
  
  // Circle - half transparent
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', cx);
  circle.setAttribute('cy', cy);
  circle.setAttribute('r', 30);
  circle.setAttribute('fill', 'rgba(232, 230, 217, 0.2)');
  circle.setAttribute('stroke', 'rgba(232, 230, 217, 0.4)');
  circle.setAttribute('stroke-width', '2');
  circle.setAttribute('stroke-dasharray', '5, 5');
  
  planet.appendChild(circle);
  group.appendChild(planet);
  
  // Create connection line
  createConnectionLineIngestion(800, 450, cx, cy, index);
}

function createConnectionLineIngestion(x1, y1, x2, y2, index) {
  const group = document.getElementById('connectionsGroupIngestion');
  
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('class', 'connection-line');
  line.setAttribute('data-index', index);
  line.setAttribute('stroke-opacity', '0.2');
  
  group.appendChild(line);
}

// ============================================
// Data Cleaning with Messages (No Modal)
// ============================================

function runCleaningWithMessages() {
  const tasks = [
    'Schema analysis',
    'Missing values',
    'Outlier detection',
    'Type inference',
    'Duplicate check',
    'Standardization'
  ];
  
  // Show progress on Core planet (not in message)
  const progressText = document.getElementById('coreProgressText');
  const progressRing = document.getElementById('progressRingFill');
  
  if (progressText) {
    progressText.setAttribute('opacity', '1');
  }
  
  let progress = 0;
  const circumference = 2 * Math.PI * 100; // r=100
  
  function updateProgress() {
    if (progress >= tasks.length) {
      // Cleaning complete
      if (progressText) {
        progressText.textContent = '100%';
      }
      if (progressRing) {
        progressRing.setAttribute('stroke-dashoffset', '0');
      }
      
      setTimeout(() => {
        // Hide progress
        if (progressText) {
          progressText.setAttribute('opacity', '0');
        }
        
        activatePlanetsIngestion();
        setTimeout(() => {
          showBusinessQA();
        }, 1000);
      }, 800);
      return;
    }
    
    progress++;
    const percentage = Math.round((progress / tasks.length) * 100);
    
    // Update progress ring on Core
    if (progressText) {
      progressText.textContent = percentage + '%';
    }
    if (progressRing) {
      const offset = circumference - (circumference * percentage / 100);
      progressRing.setAttribute('stroke-dashoffset', offset);
    }
    
    setTimeout(updateProgress, Math.random() * 400 + 300);
  }
  
  setTimeout(updateProgress, 800);
}

// ============================================
// Business QA - Phase by Phase
// ============================================

function showBusinessQA() {
  addAIMessageBottom(`✅ Data cleaning complete!`);
  
  setTimeout(() => {
    startBusinessQAPhase1();
  }, 800);
}

// Phase 1: 业务理解（谁/做啥/为何）
function startBusinessQAPhase1() {
  addAIMessageBottom(
    `📋 **Phase 1/3: Business Context**\n\n` +
    `Based on your data, I believe:\n\n` +
    `**Who you are:** [需确认]\n` +
    `E-commerce retail company\n\n` +
    `**What you do:** [需确认]\n` +
    `Sell consumer products online (B2C)\n\n` +
    `**Why analyze:** [需确认]\n` +
    `Understand customer behavior to increase sales`
  );
  
  showActionButtons([
    { label: '✓ Correct, Continue', primary: true, action: () => {
      clearActionButtons();
      addUserMessageBottom("Yes, that's correct!");
      state.businessContext = { phase1: 'confirmed' };
      setTimeout(() => startBusinessQAPhase2(), 1000);
    }},
    { label: '✎ No, Let me clarify', primary: false, action: () => startClarificationFlow() },
    { label: 'Skip All', primary: false, action: () => skipToDataCheck() }
  ]);
}

// Phase 2: 应用场景（要回答什么/怎么用）
function startBusinessQAPhase2() {
  addAIMessageBottom(
    `📋 **Phase 2/3: Application Goals**\n\n` +
    `What questions do you want to answer:\n\n` +
    `**Primary goal:** [需确认]\n` +
    `User growth & retention analysis\n\n` +
    `**Key questions:** [需确认]\n` +
    `• Why do users leave?\n` +
    `• Which channels retain best?\n` +
    `• How to improve repeat purchase?\n\n` +
    `**Usage:** [需确认]\n` +
    `Weekly review + campaign optimization`
  );
  
  showActionButtons([
    { label: '✓ Correct, Continue', primary: true, action: () => {
      clearActionButtons();
      addUserMessageBottom("Yes, exactly what I need!");
      state.businessContext.phase2 = 'confirmed';
      setTimeout(() => startBusinessQAPhase3(), 1000);
    }},
    { label: '✎ Adjust Goals', primary: false, action: () => {
      clearActionButtons();
      addAIMessageBottom(`What would you like to adjust? Please tell me your specific goals.`);
      // Can use input box to clarify
    }}
  ]);
}

// Phase 3: 数据细节（粒度/键/时态/口径）
function startBusinessQAPhase3() {
  addAIMessageBottom(
    `📋 **Phase 3/3: Data Structure**\n\n` +
    `Data entity mapping:\n\n` +
    `**Time granularity:** [需确认]\n` +
    `Daily level (can aggregate to weekly/monthly)\n\n` +
    `**Primary keys:** [需确认]\n` +
    `• User: user_id\n` +
    `• Order: order_id\n` +
    `• Event: event_id\n\n` +
    `**Time fields:** [需确认]\n` +
    `created_at, updated_at (UTC timezone)\n\n` +
    `**Metrics caliber:** [需确认]\n` +
    `Revenue: USD, Users: Unique count`
  );
  
  showActionButtons([
    { label: '✓ All Correct', primary: true, action: () => {
      clearActionButtons();
      addUserMessageBottom("All confirmed!");
      state.businessContext.phase3 = 'confirmed';
      setTimeout(() => checkDataSaturation(), 1000);
    }},
    { label: '✎ Adjust Mapping', primary: false, action: () => {
      clearActionButtons();
      addAIMessageBottom(`Which part needs adjustment? (Time granularity / Keys / Metrics)`);
    }}
  ]);
}

// Clarification Flow
function startClarificationFlow() {
  clearActionButtons();
  
  addAIMessageBottom(
    `Let me understand better. Please tell me:\n\n` +
    `1️⃣ **Your Business:**\n` +
    `   What industry? What do you sell?\n\n` +
    `2️⃣ **Your Challenge:**\n` +
    `   What problem are you trying to solve?\n\n` +
    `3️⃣ **Your Goal:**\n` +
    `   What decision will this data help you make?`
  );
  
  // Simulate user clarifying (for demo)
  setTimeout(() => {
    addUserMessageBottom(
      "We're a subscription box service. Our churn is too high. " +
      "I want to predict which customers will cancel next month."
    );
    
    setTimeout(() => {
      // After clarification, re-analyze
      addAIMessageBottom(
        `Got it! Re-analyzing your data for:\n\n` +
        `✓ Business: Subscription box service\n` +
        `✓ Challenge: High churn rate\n` +
        `✓ Goal: Churn prediction model\n\n` +
        `Checking data requirements...`
      );
      
      setTimeout(() => {
        checkDataSaturationLow();
      }, 1500);
    }, 1200);
  }, 3000);
}

// Low saturation after clarification
function checkDataSaturationLow() {
  const saturation = 35; // Very low
  state.saturation = saturation;
  
  // Display saturation on Core planet
  const saturationText = document.getElementById('coreSaturationText');
  if (saturationText) {
    saturationText.textContent = `Saturation: ${saturation}%`;
    saturationText.setAttribute('opacity', '1');
    saturationText.classList.add('low');
  }
  
  // Show critical warning
  addAIMessageBottom(
    `🚨 **Critical: Data Saturation Too Low (${saturation}%)**\n\n` +
    `For churn prediction, you need:\n\n` +
    `**Missing (Critical):**\n` +
    `• Subscription events (start/pause/cancel)\n` +
    `• Payment history\n` +
    `• Customer support interactions\n` +
    `• Product usage/engagement data\n\n` +
    `**Impact:** Without these, prediction accuracy <40%\n\n` +
    `Please add more data to continue.`
  );
  
  showActionButtons([
    { label: '📤 Add More Data', primary: true, action: () => {
      clearActionButtons();
      hideSaturationDisplay();
      addSecondRoundData();
    }},
    { label: 'Continue Anyway (Not Recommended)', primary: false, action: () => {
      clearActionButtons();
      hideSaturationDisplay();
      addAIMessageBottom(`⚠ Proceeding with low data quality. Results may be unreliable.`);
      setTimeout(() => completeUniverseConstruction(), 1500);
    }}
  ]);
}

// Second round: Add more data
function addSecondRoundData() {
  hideSaturationDisplay();
  
  // Show input zones again
  const inputZones = document.getElementById('dataInputZones');
  if (inputZones) {
    inputZones.classList.remove('hidden');
  }
  
  addAIMessageBottom(`Please add the missing data:\n• Subscription events\n• Payment history\n• Support tickets`);
  
  // Simulate user adding more data (for demo)
  setTimeout(() => {
    // Auto-add files for demo
    state.dataSources.push(
      { name: 'subscription_events.csv', size: 1200000, rows: 45678, columns: 10 },
      { name: 'payment_history.csv', size: 890000, rows: 34521, columns: 8 }
    );
    
    const inputZones2 = document.getElementById('dataInputZones');
    if (inputZones2) {
      inputZones2.classList.add('hidden');
    }
    
    addAIMessageBottom(
      `✓ Received additional data:\n` +
      `• subscription_events.csv\n` +
      `• payment_history.csv\n\n` +
      `Processing...`
    );
    
    showActionButtons([
      { label: '✓ Process New Data', primary: true, action: () => {
        clearActionButtons();
        startSecondRoundCleaning();
      }}
    ]);
  }, 5000);
}

// Second round cleaning
function startSecondRoundCleaning() {
  // Show progress on core
  const progressText = document.getElementById('coreProgressText');
  const progressRing = document.getElementById('progressRingFill');
  
  if (progressText) {
    progressText.setAttribute('opacity', '1');
  }
  
  addAIMessageBottom(`Processing additional data...`);
  
  let progress = 0;
  const circumference = 2 * Math.PI * 100;
  
  const interval = setInterval(() => {
    progress += 20;
    if (progress > 100) {
      progress = 100;
      clearInterval(interval);
      
      // Complete
      if (progressText) {
        progressText.textContent = '100%';
      }
      if (progressRing) {
        progressRing.setAttribute('stroke-dashoffset', '0');
      }
      
      setTimeout(() => {
        if (progressText) {
          progressText.setAttribute('opacity', '0');
        }
        
        // Create new planets for new data
        createPendingPlanetIngestion(3);
        createPendingPlanetIngestion(4);
        
        setTimeout(() => {
          activatePlanetsIngestion();
          recheckDataSaturation();
        }, 1000);
      }, 800);
    } else {
      if (progressText) {
        progressText.textContent = progress + '%';
      }
      if (progressRing) {
        const offset = circumference - (circumference * progress / 100);
        progressRing.setAttribute('stroke-dashoffset', offset);
      }
    }
  }, 400);
}

// Recheck saturation after adding data
function recheckDataSaturation() {
  const newSaturation = 78; // Improved but still borderline
  state.saturation = newSaturation;
  
  // Update saturation on Core
  const saturationText = document.getElementById('coreSaturationText');
  if (saturationText) {
    saturationText.textContent = `Saturation: ${newSaturation}%`;
    saturationText.setAttribute('opacity', '1');
    saturationText.classList.remove('low');
    saturationText.classList.add('medium');
  }
  
  addAIMessageBottom(
    `✅ **Saturation improved: ${newSaturation}%**\n\n` +
    `Much better! You now have:\n` +
    `✓ User behavior data\n` +
    `✓ Order history\n` +
    `✓ Subscription events\n` +
    `✓ Payment data\n\n` +
    `This is sufficient for churn prediction analysis.`
  );
  
  showActionButtons([
    { label: '🚀 Build Universe', primary: true, action: () => {
      clearActionButtons();
      hideSaturationDisplay();
      completeUniverseConstruction();
    }}
  ]);
}

function skipToDataCheck() {
  clearActionButtons();
  addUserMessageBottom("Skip QA, just process the data");
  setTimeout(() => {
    checkDataSaturation();
  }, 800);
}

function confirmBusinessQA() {
  clearActionButtons();
  addUserMessageBottom("Yes, that's correct!");
  
  state.businessContext = {
    type: 'E-commerce Platform - B2C Retail',
    goal: 'User Growth & Retention Analysis'
  };
  
  setTimeout(() => {
    checkDataSaturation();
  }, 800);
}

function clarifyBusinessQA() {
  clearActionButtons();
  addAIMessageBottom(`Please tell me:\n1. What type of business are you in?\n2. What do you want to achieve with this data?`);
  
  // User can type in input box for conversation
  // For demo, auto-proceed after timeout
  setTimeout(() => {
    addUserMessageBottom("I run an e-commerce store and want to improve retention");
    setTimeout(() => {
      addAIMessageBottom(`Got it! Updating business context...\n\nBusiness: E-commerce\nGoal: Improve retention`);
      setTimeout(() => {
        checkDataSaturation();
      }, 1500);
    }, 1000);
  }, 3000);
}

function runCleaningProcessOverlay() {
  const statusText = document.getElementById('cleaningStatusOverlay');
  const progressBar = document.getElementById('cleaningProgressOverlay');
  const progressText = document.getElementById('cleaningProgressTextOverlay');
  
  const taskNames = [
    'Schema analysis',
    'Missing value detection',
    'Outlier identification',
    'Type inference',
    'Duplicate check',
    'Standardization'
  ];
  
  let currentTask = 0;
  const totalTasks = taskNames.length;
  
  function runTask() {
    if (currentTask >= totalTasks) {
      setTimeout(() => {
        hideOverlay('cleaningOverlay');
        
        // Activate planets on universe
        activatePlanetsIngestion();
        
        // Show business QA
        setTimeout(() => {
          showBusinessUnderstandingOverlay();
        }, 1500);
      }, 500);
      return;
    }
    
    // Update status
    statusText.textContent = taskNames[currentTask] + '...';
    
    // Update progress
    const progress = Math.round(((currentTask + 1) / totalTasks) * 100);
    progressBar.style.width = progress + '%';
    progressText.textContent = progress + '%';
    
    currentTask++;
    setTimeout(runTask, Math.random() * 500 + 300);
  }
  
  setTimeout(() => runTask(), 500);
}

function runCleaningProcess() {
  const tasks = document.querySelectorAll('#cleaningTasks .task-item');
  const statusText = document.getElementById('cleaningStatus');
  const progressBar = document.getElementById('cleaningProgress');
  const progressText = document.getElementById('cleaningProgressText');
  
  const taskNames = [
    'Schema analysis',
    'Missing value detection',
    'Outlier identification',
    'Type inference',
    'Duplicate check',
    'Standardization'
  ];
  
  let currentTask = 0;
  const totalTasks = tasks.length;
  
  function runTask() {
    if (currentTask >= totalTasks) {
      setTimeout(() => {
        hideModal('cleaningModal');
        
        // Activate planets on universe
        activatePlanetsIngestion();
        
        // Show cleaning results
        showCleaningResults();
      }, 500);
      return;
    }
    
    // Update status
    statusText.textContent = `Current: ${taskNames[currentTask]}...`;
    
    // Mark as in progress
    tasks[currentTask].classList.remove('pending');
    tasks[currentTask].classList.add('in-progress');
    
    // Update progress
    const progress = Math.round(((currentTask + 0.5) / totalTasks) * 100);
    progressBar.style.width = progress + '%';
    progressText.textContent = progress + '%';
    
    setTimeout(() => {
      // Mark as completed
      tasks[currentTask].classList.remove('in-progress');
      tasks[currentTask].classList.add('completed');
      
      // Final progress for this task
      const finalProgress = Math.round(((currentTask + 1) / totalTasks) * 100);
      progressBar.style.width = finalProgress + '%';
      progressText.textContent = finalProgress + '%';
      
      currentTask++;
      setTimeout(runTask, 300);
    }, Math.random() * 800 + 400);
  }
  
  setTimeout(runTask, 500);
}

function activatePlanetsIngestion() {
  const planets = document.querySelectorAll('#planetsGroupIngestion .planet');
  const connections = document.querySelectorAll('#connectionsGroupIngestion .connection-line');
  
  planets.forEach((planet, index) => {
    setTimeout(() => {
      const circle = planet.querySelector('circle');
      if (circle) {
        circle.setAttribute('fill', 'rgba(110, 194, 135, 0.3)');
        circle.setAttribute('stroke', '#6EC287');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('stroke-dasharray', 'none');
        circle.style.filter = 'drop-shadow(0 0 10px #6EC287)';
      }
      planet.classList.remove('pending');
      planet.classList.add('active');
      
      // Activate connection
      const connection = connections[index];
      if (connection) {
        connection.setAttribute('stroke-opacity', '0.6');
        connection.classList.add('active');
      }
    }, index * 300);
  });
}

function showCleaningResults() {
  addAIMessageBottom(
    `✅ Auto-cleaning complete! (3.2s)\n\n` +
    `📊 CLEANING SUMMARY:\n` +
    `Total records: ${state.dataSources.reduce((sum, ds) => sum + ds.rows, 0).toLocaleString()} → ${(state.dataSources.reduce((sum, ds) => sum + ds.rows, 0) - 835).toLocaleString()} (99.6%)\n\n` +
    `✓ Fixed: 234 type mismatches\n` +
    `✓ Standardized: 12 date formats → ISO-8601\n` +
    `✓ Unified: Currency fields → USD\n` +
    `✓ Removed: 835 duplicate records\n` +
    `✓ Normalized: Product categories (18 → 8)\n\n` +
    `Now analyzing your business context...`
  );
  
  setTimeout(() => {
    showBusinessUnderstandingModal();
  }, 2000);
}

// ============================================
// Business Understanding QA (Overlay Version)
// ============================================

function showBusinessUnderstandingOverlay() {
  showOverlay('qaOverlay');
}

// ============================================
// Data Saturation Check (Display on Core)
// ============================================

function checkDataSaturation() {
  // Calculate saturation (for demo, use 63%)
  const saturation = 63;
  state.saturation = saturation;
  
  // Display saturation on Core planet
  const saturationText = document.getElementById('coreSaturationText');
  if (saturationText) {
    saturationText.textContent = `Saturation: ${saturation}%`;
    saturationText.setAttribute('opacity', '1');
    
    // Set color based on level
    if (saturation >= 80) {
      saturationText.classList.add('high');
    } else if (saturation >= 60) {
      saturationText.classList.add('medium');
    } else {
      saturationText.classList.add('low');
    }
  }
  
  if (saturation < 80) {
    // Show warning message with recommendations
    addAIMessageBottom(
      `⚠ Low data saturation detected.\n\n` +
      `**Missing:**\n` +
      `• Marketing attribution (+15%)\n` +
      `• Product catalog (+12%)`
    );
    
    showActionButtons([
      { label: 'Continue Anyway', primary: true, action: () => {
        clearActionButtons();
        hideSaturationDisplay();
        completeUniverseConstruction();
      }},
      { label: '📤 Add More Data', primary: false, action: () => {
        clearActionButtons();
        hideSaturationDisplay();
        resetToInitialState();
      }}
    ]);
  } else {
    // Good saturation, proceed
    setTimeout(() => {
      hideSaturationDisplay();
      completeUniverseConstruction();
    }, 1500);
  }
}

function hideSaturationDisplay() {
  const saturationText = document.getElementById('coreSaturationText');
  if (saturationText) {
    saturationText.setAttribute('opacity', '0');
  }
}

// ============================================
// Complete Universe Construction
// ============================================

function completeUniverseConstruction() {
  // Clear all action buttons
  clearActionButtons();
  
  // Add labels and values to planets
  const planets = document.querySelectorAll('#planetsGroupIngestion .planet');
  const planetLabels = ['Events', 'Orders', 'Users'];
  const planetValues = ['156.2K', '23.6K', '45.9K'];
  
  planets.forEach((planet, index) => {
    const circle = planet.querySelector('circle');
    const cx = circle.getAttribute('cx');
    const cy = circle.getAttribute('cy');
    
    // Add label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', cx);
    label.setAttribute('y', parseFloat(cy) - 5);
    label.setAttribute('class', 'planet-label');
    label.textContent = planetLabels[index];
    planet.appendChild(label);
    
    // Add value
    const value = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    value.setAttribute('x', cx);
    value.setAttribute('y', parseFloat(cy) + 10);
    value.setAttribute('class', 'planet-value');
    value.textContent = planetValues[index];
    planet.appendChild(value);
  });
  
  addAIMessageBottom(`🎉 Knowledge Universe created!\n\nTransitioning to main interface...`);
  
  setTimeout(() => {
    // Switch to main scene (split view)
    transitionToMainScene();
  }, 1500);
}

// ============================================
// Transition to Main Scene (Split View)
// ============================================

function transitionToMainScene() {
  showScene('main');
  
  // Update nav
  document.getElementById('universeNameNav').textContent = state.universeName;

  // Copy universe state to main SVG
  buildMainUniverseView();

  // Add welcome message in side panel
  addAIMessage(
    `✨ Universe ready!\n\n` +
    `Your knowledge universe is now operational with ${state.dataSources.length} data planets.\n\n` +
    `Overall data saturation: ${state.saturation}%\n\n` +
    `💬 What would you like to know?`,
    { noTyping: true }
  );
  
  updateSuggestions([
    { label: 'Analyze cohorts', action: () => analyzeCohort() },
    { label: 'Find top channels', action: () => addUserMessage('Which channel has the best repeat purchase rate?') },
    { label: 'Show trends', action: () => addAIMessage('Trend analysis coming soon!') }
  ]);
}

function buildMainUniverseView() {
  // Initialize SVG gradients
  initializeSVGGradientsMain();
  
  // Create planets based on data sources
  const planetConfigs = [
    { 
      id: 'events', 
      label: 'User\nEvents', 
      value: '156.2K',
      saturation: 94,
      x: 250, 
      y: 300,
      color: '#6EC287'
    },
    { 
      id: 'orders', 
      label: 'Orders', 
      value: '23.6K\n$1.2M',
      saturation: 89,
      x: 550, 
      y: 300,
      color: '#4DD4E8'
    },
    { 
      id: 'users', 
      label: 'Users', 
      value: '45.9K\nNew:62%',
      saturation: 87,
      x: 400, 
      y: 450,
      color: '#F4A742'
    }
  ];
  
  state.planets = planetConfigs;
  
  // Create planets
  planetConfigs.forEach(config => {
    createPlanetMain(config);
  });
  
  // Create connections
  createConnectionMain('core', 'events');
  createConnectionMain('core', 'orders');
  createConnectionMain('core', 'users');
  createConnectionMain('events', 'orders');
  createConnectionMain('orders', 'users');
  
  // Update saturation
  const avgSaturation = Math.round(planetConfigs.reduce((sum, p) => sum + p.saturation, 0) / planetConfigs.length);
  updateSaturation(avgSaturation);
  
  // Update core metric
  document.getElementById('coreValue').textContent = '+28.4%';
}

function initializeSVGGradientsMain() {
  const svg = document.getElementById('universeSvg');
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  
  // Core gradient
  const coreGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
  coreGradient.setAttribute('id', 'coreGradient');
  coreGradient.innerHTML = `
    <stop offset="0%" style="stop-color:#4DD4E8;stop-opacity:1" />
    <stop offset="100%" style="stop-color:#1B4D89;stop-opacity:1" />
  `;
  defs.appendChild(coreGradient);
  
  svg.insertBefore(defs, svg.firstChild);
}

function createPlanetMain(config) {
  const svg = document.getElementById('universeSvg');
  const group = document.getElementById('planetsGroup');
  
  const planet = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  planet.setAttribute('class', 'planet');
  planet.setAttribute('data-id', config.id);
  planet.setAttribute('transform', `translate(0, 0)`);
  
  // Circle
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', config.x);
  circle.setAttribute('cy', config.y);
  circle.setAttribute('r', 40);
  circle.setAttribute('class', 'planet-circle');
  circle.setAttribute('fill', config.color);
  circle.setAttribute('fill-opacity', '0.3');
  circle.setAttribute('stroke', config.color);
  circle.setAttribute('stroke-width', '2');
  circle.style.filter = `drop-shadow(0 0 10px ${config.color})`;
  
  // Label
  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', config.x);
  label.setAttribute('y', config.y - 5);
  label.setAttribute('class', 'planet-label');
  label.textContent = config.label.split('\n')[0];
  
  // Value
  const value = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  value.setAttribute('x', config.x);
  value.setAttribute('y', config.y + 15);
  value.setAttribute('class', 'planet-value');
  value.textContent = config.value.split('\n')[0];
  
  // Saturation
  const saturation = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  saturation.setAttribute('x', config.x);
  saturation.setAttribute('y', config.y + 55);
  saturation.setAttribute('class', 'planet-saturation');
  saturation.textContent = config.saturation + '%';
  
  planet.appendChild(circle);
  planet.appendChild(label);
  planet.appendChild(value);
  planet.appendChild(saturation);
  
  // Click handler
  planet.addEventListener('click', (e) => {
    e.stopPropagation();
    selectPlanet(config.id);
  });
  
  // Drag handlers
  enablePlanetDrag(planet, config);
  
  group.appendChild(planet);
}

function createConnectionMain(from, to) {
  const group = document.getElementById('connectionsGroup');
  
  // Get positions
  let x1, y1, x2, y2;
  
  if (from === 'core') {
    x1 = 400;
    y1 = 300;
  } else {
    const fromPlanet = state.planets.find(p => p.id === from);
    x1 = fromPlanet.x;
    y1 = fromPlanet.y;
  }
  
  const toPlanet = state.planets.find(p => p.id === to);
  x2 = toPlanet.x;
  y2 = toPlanet.y;
  
  // Create line
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('class', 'connection-line');
  line.setAttribute('data-from', from);
  line.setAttribute('data-to', to);
  
  group.insertBefore(line, group.firstChild);
}

// ============================================
// Planet Drag & Select Functions
// ============================================

function enablePlanetDrag(planetElement, config) {
  let isDragging = false;
  let startX, startY, offsetX = 0, offsetY = 0;
  
  planetElement.addEventListener('mousedown', (e) => {
    // Only start drag if not clicking too quickly (distinguish from click)
    const dragTimer = setTimeout(() => {
      isDragging = true;
      planetElement.classList.add('dragging');
      
      const svg = document.getElementById('universeSvg');
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      
      startX = svgP.x;
      startY = svgP.y;
      
      const circle = planetElement.querySelector('circle');
      const currentX = parseFloat(circle.getAttribute('cx'));
      const currentY = parseFloat(circle.getAttribute('cy'));
      
      offsetX = currentX - startX;
      offsetY = currentY - startY;
    }, 150);
    
    planetElement.addEventListener('mouseup', () => {
      clearTimeout(dragTimer);
    }, { once: true });
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const svg = document.getElementById('universeSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    const newX = svgP.x + offsetX;
    const newY = svgP.y + offsetY;
    
    // Update all elements in planet group
    const circle = planetElement.querySelector('circle');
    const label = planetElement.querySelector('.planet-label');
    const value = planetElement.querySelector('.planet-value');
    const saturation = planetElement.querySelector('.planet-saturation');
    
    circle.setAttribute('cx', newX);
    circle.setAttribute('cy', newY);
    label.setAttribute('x', newX);
    label.setAttribute('y', newY - 5);
    value.setAttribute('x', newX);
    value.setAttribute('y', newY + 15);
    saturation.setAttribute('x', newX);
    saturation.setAttribute('y', newY + 55);
    
    // Update config
    config.x = newX;
    config.y = newY;
    
    // Update connection lines
    updateConnectionLines();
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      planetElement.classList.remove('dragging');
    }
  });
}

function updateConnectionLines() {
  // Update all connection lines based on current planet positions
  document.querySelectorAll('#connectionsGroup .connection-line').forEach(line => {
    const from = line.getAttribute('data-from');
    const to = line.getAttribute('data-to');
    
    let x1, y1, x2, y2;
    
    if (from === 'core') {
      x1 = 400;
      y1 = 300;
    } else {
      const fromPlanet = state.planets.find(p => p.id === from);
      x1 = fromPlanet.x;
      y1 = fromPlanet.y;
    }
    
    const toPlanet = state.planets.find(p => p.id === to);
    x2 = toPlanet.x;
    y2 = toPlanet.y;
    
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
  });
}

function selectPlanet(planetId) {
  // Deselect all
  document.querySelectorAll('.planet').forEach(p => {
    p.classList.remove('selected');
  });
  
  // Select clicked planet
  const planet = document.querySelector(`.planet[data-id="${planetId}"]`);
  if (planet) {
    planet.classList.add('selected');
    state.selectedPlanet = planetId;
    
    // Show planet details panel
    showPlanetDetails(planetId);
    
    // Update input placeholder and style
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
      const config = state.planets.find(p => p.id === planetId);
      chatInput.placeholder = `💬 Ask about ${config.label.replace('\n', ' ')} data...`;
      chatInput.classList.add('planet-selected');
    }
  }
}

function deselectPlanet() {
  // Remove selection
  document.querySelectorAll('.planet').forEach(p => {
    p.classList.remove('selected');
  });
  state.selectedPlanet = null;
  
  // Hide planet details
  document.getElementById('planetDetails').classList.add('hidden');
  document.getElementById('chatView').classList.remove('hidden');
  
  // Reset input placeholder and style
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.placeholder = 'Ask me anything about your data...';
    chatInput.classList.remove('planet-selected');
  }
}

function showPlanetDetails(planetId) {
  const config = state.planets.find(p => p.id === planetId);
  if (!config) return;
  
  // Hide chat view, show planet details
  document.getElementById('chatView').classList.add('hidden');
  const detailsPanel = document.getElementById('planetDetails');
  detailsPanel.classList.remove('hidden');
  
  // Update title
  document.getElementById('planetDetailsTitle').textContent = config.label.replace('\n', ' ');
  
  // Generate details content
  const content = document.getElementById('planetDetailsContent');
  content.innerHTML = generatePlanetDetailsHTML(config);
}

function generatePlanetDetailsHTML(config) {
  const detailsData = {
    'events': {
      stats: [
        { label: 'Total Events', value: '156,234' },
        { label: 'Unique Users', value: '45,890' },
        { label: 'Time Range', value: 'Q1 2024' },
        { label: 'Avg Events/User', value: '3.4' }
      ],
      metrics: [
        { label: 'Page Views', value: '70,305', change: '+12.3%', positive: true },
        { label: 'Add to Cart', value: '43,746', change: '+8.7%', positive: true },
        { label: 'Purchases', value: '28,127', change: '+15.2%', positive: true },
        { label: 'Signups', value: '14,056', change: '+22.1%', positive: true }
      ],
      insights: [
        'Peak activity: 2-4 PM EST',
        'Mobile traffic: 62% of total',
        'Average session: 8.3 minutes',
        'Bounce rate: 34.5%'
      ]
    },
    'orders': {
      stats: [
        { label: 'Total Orders', value: '23,567' },
        { label: 'Total Revenue', value: '$1,245,670' },
        { label: 'Avg Order Value', value: '$52.85' },
        { label: 'Completion Rate', value: '87.3%' }
      ],
      metrics: [
        { label: 'Revenue', value: '$1.24M', change: '+18.5%', positive: true },
        { label: 'Order Count', value: '23.6K', change: '+22.1%', positive: true },
        { label: 'AOV', value: '$52.85', change: '-2.3%', positive: false },
        { label: 'Repeat Orders', value: '4,892', change: '+31.2%', positive: true }
      ],
      insights: [
        'Top category: Electronics (42%)',
        'Average items per order: 2.3',
        'Free shipping threshold: $50',
        'Return rate: 5.2%'
      ]
    },
    'users': {
      stats: [
        { label: 'Total Users', value: '45,890' },
        { label: 'New Users (Q1)', value: '28,345' },
        { label: 'Active Users', value: '31,234' },
        { label: 'Retention Rate', value: '68.1%' }
      ],
      metrics: [
        { label: 'New Signups', value: '28.3K', change: '+45.6%', positive: true },
        { label: 'Active Rate', value: '68.1%', change: '+3.2%', positive: true },
        { label: 'Churn Rate', value: '12.4%', change: '-2.1%', positive: true },
        { label: 'Avg Lifetime', value: '156 days', change: '+12 days', positive: true }
      ],
      insights: [
        'Top acquisition: Social (42%)',
        'Best retention: Email users',
        'Age group: 25-34 (48%)',
        'Geography: 67% US, 33% International'
      ]
    }
  };
  
  const data = detailsData[config.id] || detailsData['events'];
  
  let html = `
    <div class="detail-section">
      <h4>📊 Overview</h4>
      ${data.stats.map(stat => `
        <div class="detail-row">
          <span class="detail-label">${stat.label}</span>
          <span class="detail-value">${stat.value}</span>
        </div>
      `).join('')}
    </div>
    
    <div class="detail-section">
      <h4>📈 Key Metrics</h4>
      ${data.metrics.map(metric => `
        <div class="metric-card">
          <div class="metric-card-header">
            <span class="metric-label">${metric.label}</span>
            <span class="metric-change ${metric.positive ? 'positive' : 'negative'}">${metric.change}</span>
          </div>
          <div class="metric-value-large">${metric.value}</div>
        </div>
      `).join('')}
    </div>
    
    <div class="detail-section">
      <h4>💡 Key Insights</h4>
      <ul style="list-style: none; padding: 0;">
        ${data.insights.map(insight => `
          <li style="padding: 8px 0; color: rgba(232, 230, 217, 0.8);">• ${insight}</li>
        `).join('')}
      </ul>
    </div>
  `;
  
  return html;
}

function updateSaturation(percentage) {
  state.saturation = percentage;
  document.getElementById('saturationFill').style.width = percentage + '%';
  document.getElementById('saturationText').textContent = percentage + '%';
}

// ============================================
// Chat Functions - Side Panel (Main Scene)
// ============================================

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addUserMessage(message);
  input.value = '';
  
  // Handle commands
  setTimeout(() => {
    handleUserCommand(message);
  }, 500);
}

function addUserMessage(text) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user';
  
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  messageDiv.innerHTML = `
    <div class="message-header">
      <span>👤 Sarah</span>
      <span>${time}</span>
    </div>
    <div class="message-content">${text}</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  state.chatHistory.push({ role: 'user', content: text, time });
}

function addAIMessage(text, options = {}) {
  const messagesContainer = document.getElementById('chatMessages');
  
  // Show typing indicator
  if (!options.noTyping) {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant typing';
    typingDiv.innerHTML = `
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    setTimeout(() => {
      typingDiv.remove();
      addAIMessageContent(text, options);
    }, 1000);
  } else {
    addAIMessageContent(text, options);
  }
}

function addAIMessageContent(text, options = {}) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message assistant';
  
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  messageDiv.innerHTML = `
    <div class="message-header">
      <span>🤖 AI Assistant</span>
      <span>${time}</span>
    </div>
    <div class="message-content">${text.replace(/\n/g, '<br>')}</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  state.chatHistory.push({ role: 'assistant', content: text, time });
}

function handleUserCommand(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('channel') && lowerMessage.includes('repeat')) {
    analyzeChannelRepeatRate();
  } else if (lowerMessage.includes('cohort')) {
    analyzeCohort();
  } else {
    addAIMessage(`I understand you're asking about: "${message}"\n\nLet me analyze that for you...`);
    
    setTimeout(() => {
      addAIMessage(`Based on your current data, I can provide insights on:\n• Channel performance\n• Cohort analysis\n• User segmentation\n\nPlease ask a more specific question, or try one of the suggested queries!`);
    }, 1500);
  }
}

function updateSuggestions(suggestions) {
  const container = document.getElementById('suggestionsChips');
  container.innerHTML = '';
  
  suggestions.forEach(suggestion => {
    const chip = document.createElement('div');
    chip.className = 'suggestion-chip';
    chip.textContent = suggestion.label;
    chip.addEventListener('click', suggestion.action);
    container.appendChild(chip);
  });
}

// ============================================
// Analysis Functions
// ============================================

function analyzeChannelRepeatRate() {
  addUserMessage('Which channel has the best repeat purchase rate?');
  
  setTimeout(() => {
    addAIMessage(
      `Based on your Q1 data analysis:\n\n` +
      `🏆 **Email Marketing** has the highest repeat purchase rate!\n\n` +
      `📊 Comparison:\n\n` +
      `**Email:** 34.2% (1,245 / 3,640)\n` +
      `**Direct:** 28.7% (1,867 / 6,502)\n` +
      `**Social:** 18.9% (1,890 / 9,998)\n` +
      `**Search:** 15.3% (1,034 / 6,756)\n\n` +
      `💡 Key Insight:\n` +
      `Email subscribers show 2.2× higher loyalty than average. Consider increasing email marketing investment for better customer retention.`
    );
    
    updateSuggestions([
      { label: 'Analyze email campaigns', action: () => analyzeEmailCampaigns() },
      { label: 'Compare cohorts', action: () => analyzeCohort() },
      { label: 'Export results', action: () => exportAnalysis() }
    ]);
  }, 1500);
}

function analyzeCohort() {
  addUserMessage('Create a cohort analysis for users who signed up in January');
  
  setTimeout(() => {
    addAIMessage(`✓ Task created! Analyzing January 2024 cohort...`);
    
    setTimeout(() => {
      addAIMessage(
        `✅ Cohort Analysis Complete!\n\n` +
        `📊 **January 2024 Cohort**\n` +
        `Total Users: 12,345\n` +
        `Time Period: 8 weeks\n\n` +
        `**Retention Curve:**\n` +
        `Week 1: 78%\n` +
        `Week 2: 56% ⚠️\n` +
        `Week 3: 45%\n` +
        `Week 4: 38%\n` +
        `Week 5: 35%\n` +
        `Week 6: 32%\n` +
        `Week 7: 30%\n` +
        `Week 8: 29%\n\n` +
        `💡 Key Insights:\n` +
        `• Sharp drop in Week 2 (-22%)\n` +
        `• Stabilizes at Week 7 (~30%)\n` +
        `• Consider re-engagement campaign for Week 2 users`
      );
      
      updateSuggestions([
        { label: 'Compare other cohorts', action: () => compareCohorts() },
        { label: 'Analyze drop reasons', action: () => analyzeDropReasons() },
        { label: 'Export report', action: () => exportAnalysis() }
      ]);
    }, 2000);
  }, 500);
}

// ============================================
// Additional Analysis Functions
// ============================================

function analyzeEmailCampaigns() {
  addUserMessage('Analyze email campaigns performance');
  
  setTimeout(() => {
    addAIMessage(`Analyzing email campaign data...`);
    
    setTimeout(() => {
      addAIMessage(
        `📧 **Email Campaign Analysis (Q1 2024)**\n\n` +
        `**Campaign Performance:**\n` +
        `• Welcome Series: 48.2% open rate, 12.3% CTR\n` +
        `• Weekly Newsletter: 32.5% open rate, 5.7% CTR\n` +
        `• Flash Sale: 55.8% open rate, 18.9% CTR\n` +
        `• Cart Abandonment: 41.3% open rate, 23.4% CTR\n\n` +
        `**Revenue Attribution:**\n` +
        `• Cart Abandonment: $145K (42%)\n` +
        `• Flash Sale: $98K (28%)\n` +
        `• Newsletter: $67K (19%)\n` +
        `• Welcome Series: $38K (11%)\n\n` +
        `💡 **Recommendations:**\n` +
        `• Increase cart abandonment frequency (currently 24h delay)\n` +
        `• A/B test flash sale subject lines\n` +
        `• Segment newsletter by user behavior`
      );
      
      updateSuggestions([
        { label: 'Deep dive cart abandonment', action: () => addUserMessage('Analyze cart abandonment flow') },
        { label: 'Segment analysis', action: () => addUserMessage('Show email performance by user segment') },
        { label: 'Create campaign', action: () => addAIMessage('Campaign builder coming soon!') }
      ]);
    }, 2000);
  }, 500);
}

function compareCohorts() {
  addUserMessage('Compare January vs February cohorts');
  
  setTimeout(() => {
    addAIMessage(`Comparing cohorts...`);
    
    setTimeout(() => {
      addAIMessage(
        `📊 **Cohort Comparison: Jan vs Feb 2024**\n\n` +
        `**Cohort Size:**\n` +
        `• January: 12,345 users\n` +
        `• February: 14,892 users (+20.6%)\n\n` +
        `**Week 4 Retention:**\n` +
        `• January: 38% retention\n` +
        `• February: 42% retention (↗ +10.5%)\n\n` +
        `**Average Order Value:**\n` +
        `• January: $67.30\n` +
        `• February: $71.20 (↗ +5.8%)\n\n` +
        `**Conversion to Purchase:**\n` +
        `• January: 18.5%\n` +
        `• February: 21.3% (↗ +15.1%)\n\n` +
        `💡 **Key Finding:**\n` +
        `February cohort shows significantly better performance across all metrics. This aligns with Valentine's Day campaign launch and improved onboarding flow.`
      );
      
      updateSuggestions([
        { label: 'Analyze March cohort', action: () => addUserMessage('How did March cohort perform?') },
        { label: 'What changed?', action: () => addUserMessage('What caused February improvement?') }
      ]);
    }, 2000);
  }, 500);
}

function analyzeDropReasons() {
  addUserMessage('Why do users drop off in Week 2?');
  
  setTimeout(() => {
    addAIMessage(`Analyzing user drop-off patterns...`);
    
    setTimeout(() => {
      addAIMessage(
        `🔍 **Week 2 Drop-off Analysis**\n\n` +
        `**Drop-off Triggers (Top 5):**\n` +
        `1. No purchase within 7 days: 34.2%\n` +
        `2. High cart abandonment: 23.7%\n` +
        `3. Poor mobile experience: 18.9%\n` +
        `4. Slow shipping times: 12.4%\n` +
        `5. Limited payment options: 10.8%\n\n` +
        `**User Segments Most Affected:**\n` +
        `• Mobile-only users: 67% drop rate\n` +
        `• International users: 54% drop rate\n` +
        `• First-time buyers: 48% drop rate\n\n` +
        `💡 **Actionable Fixes:**\n` +
        `• Send "special offer" email at Day 5\n` +
        `• Optimize mobile checkout (reduce steps)\n` +
        `• Add Apple Pay / Google Pay\n` +
        `• Highlight express shipping option\n\n` +
        `**Potential Impact:** Could reduce drop-off by 15-20%`
      );
      
      updateSuggestions([
        { label: 'Test retention campaign', action: () => addAIMessage('Campaign simulation: +12% retention expected') },
        { label: 'Mobile UX analysis', action: () => addAIMessage('Mobile funnel shows 3.2× more drop-offs at checkout') }
      ]);
    }, 2500);
  }, 500);
}

function exportAnalysis() {
  addUserMessage('Export current analysis');
  
  setTimeout(() => {
    addAIMessage(
      `📤 **Preparing Export...**\n\n` +
      `Format: Comprehensive PDF Report\n` +
      `Content: All analyses + visualizations\n` +
      `Size: ~3.2 MB\n\n` +
      `⏳ Generating...`
    );
    
    setTimeout(() => {
      addAIMessage(
        `✅ **Export Ready!**\n\n` +
        `📄 Q1_Analysis_Report.pdf\n` +
        `• 18 pages of insights\n` +
        `• 12 visualizations\n` +
        `• Executive summary included\n\n` +
        `[Download] button would appear here in production.`
      );
    }, 2000);
  }, 500);
}

// ============================================
// Demo Data
// ============================================

function loadDemoData() {
  state.dataSources = [
    { name: 'user_events_q1.csv', size: 2800000, rows: 156234, columns: 12 },
    { name: 'orders_2024q1.xlsx', size: 1200000, rows: 23567, columns: 18 },
    { name: 'user_profiles.json', size: 856000, rows: 45890, columns: 8 }
  ];
  
  addUserMessageBottom('Load demo data');
  
  setTimeout(() => {
    addAIMessageBottom(`Loading demo dataset...\n\n✓ Loaded 3 files\n✓ Total: ${state.dataSources.reduce((sum, ds) => sum + ds.rows, 0).toLocaleString()} rows\n\nStarting auto-cleaning...`);
    
    setTimeout(() => {
      startDataCleaningOnUniverse();
    }, 1000);
  }, 500);
}

// ============================================
// View Creation
// ============================================

function createView(type) {
  hideModal('createViewModal');
  
  const viewNames = {
    'analytics': 'Analytics Dashboard',
    'monitor': 'Monitor Dashboard',
    'notes': 'Notes & Insights',
    'goals': 'Goal Tracking'
  };
  
  addAIMessage(`Creating ${viewNames[type]}...`);
  
  setTimeout(() => {
    if (type === 'monitor') {
      addAIMessage(
        `✅ Monitor Dashboard Created!\n\n` +
        `📊 **Real-time Metrics Tracking:**\n` +
        `• Daily Active Users: 12,456 (↗ +8.3%)\n` +
        `• Conversion Rate: 3.2% (↗ +0.4%)\n` +
        `• Average Order Value: $87.50 (↘ -2.1%)\n` +
        `• Revenue: $35,234 (↗ +12.7%)\n\n` +
        `🔔 Alerts configured:\n` +
        `• Conversion rate drops >10%\n` +
        `• Revenue anomaly detection\n` +
        `• Traffic spike alerts\n\n` +
        `Dashboard is now active and monitoring your metrics!`
      );
    } else if (type === 'analytics') {
      addAIMessage(
        `✅ Analytics Dashboard Created!\n\n` +
        `📈 **Key Insights:**\n` +
        `• Top performing product: Wireless Headphones ($45K revenue)\n` +
        `• Best converting channel: Email (4.8%)\n` +
        `• Peak traffic time: 2-4 PM EST\n` +
        `• Mobile conversion: 2.1% vs Desktop: 4.5%\n\n` +
        `💡 Recommendations:\n` +
        `• Optimize mobile checkout flow\n` +
        `• Increase email campaign frequency\n` +
        `• Focus inventory on top 20 products`
      );
    } else if (type === 'goals') {
      addAIMessage(
        `✅ Goal Tracking Created!\n\n` +
        `🎯 **Q2 Goals Progress:**\n` +
        `• Revenue Target: $500K\n` +
        `  Current: $387K (77% ████████░░)\n\n` +
        `• New Users: 50K\n` +
        `  Current: 43.2K (86% ████████▓░)\n\n` +
        `• Conversion Rate: 4.5%\n` +
        `  Current: 3.8% (84% ████████▓░)\n\n` +
        `On track to meet 2/3 goals! 🚀`
      );
    } else if (type === 'notes') {
      addAIMessage(
        `✅ Notes & Insights Created!\n\n` +
        `📝 **Saved Insights:**\n` +
        `• Email marketing shows 2.2× better retention\n` +
        `• Week 2 user drop-off needs attention\n` +
        `• Social media drives volume but lower quality\n\n` +
        `You can now add notes and tag important findings as you explore your data.`
      );
    }
    
    updateSuggestions([
      { label: 'View Dashboard', action: () => addAIMessage('Dashboard view will open in a separate tab.') },
      { label: 'Customize Widgets', action: () => addAIMessage('You can add/remove widgets and customize the layout.') },
      { label: 'Continue Analysis', action: () => addAIMessage('What else would you like to analyze?') }
    ]);
  }, 1500);
}

// ============================================
// Modal Functions
// ============================================

function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}
