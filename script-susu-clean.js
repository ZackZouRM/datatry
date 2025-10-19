// ============================================
// Susu Version - 完全重写
// 每种类型都有多张卡片，信息丰富均匀
// ============================================

// 布局配置（扩散到整个画布）
const LAYOUT = {
  CARD_W: 240,
  CARD_H: 180,
  CORE_W: 280,
  GAP_X: 200,  // 增大间距，向两边扩散
  GAP_Y: 110,
  START_X: 100,
  START_Y: 80
};

// 固定偏移模式（制造落差，不是随机）
const offsetPatterns = [
  { dx: -18, dy: -15 },
  { dx: 15, dy: -18 },
  { dx: -12, dy: 20 },
  { dx: 18, dy: 12 },
  { dx: 0, dy: -22 },
  { dx: 22, dy: 0 },
  { dx: -20, dy: 10 },
  { dx: 10, dy: -15 },
  { dx: -10, dy: 18 },
  { dx: 15, dy: -10 }
];

// 卡片数据（重新分配到整个画布，6列x5行）
const cards = [
  // === Row 0 (顶部，分散) ===
  { id: 'events', title: 'User Events', type: 'Data', badge: '94%', row: 0, col: 0,
    stats: { 'Total': '156.2K', 'Users': '45.9K', 'Avg': '3.4', 'Mobile': '62%' } },
  
  { id: 'revenue-kpi', title: 'Revenue Dashboard', type: 'KPI', cardType: 'kpi', badge: 'Live', row: 0, col: 1.8, width: 260, height: 240,
    content: {
      metrics: [
        { label: 'Total Revenue', value: '$1.24M', trend: 'up', change: '+18%' },
        { label: 'MRR', value: '$156K', trend: 'up', change: '+12%' },
        { label: 'ARPU', value: '$27.50', trend: 'up', change: '+3%' },
        { label: 'Churn', value: '4.2%', trend: 'down', change: '-1.1%' }
      ]
    }
  },
  
  { id: 'orders', title: 'Orders', type: 'Data', badge: '89%', row: 0, col: 3.5,
    stats: { 'Total': '23.6K', 'Revenue': '$1.2M', 'AOV': '$52.85', 'Rate': '87%' } },
  
  { id: 'content-calendar', title: 'Content Pipeline', type: 'Checklist', cardType: 'checklist', badge: '5/8', row: 0, col: 5.2, width: 260, height: 240,
    content: {
      items: [
        { done: true, text: 'Blog: Email best practices' },
        { done: true, text: 'Video: Product showcase' },
        { done: true, text: 'Social: User testimonials' },
        { done: true, text: 'Guide: Getting started' },
        { done: true, text: 'Infographic: Q1 results' },
        { done: false, text: 'Webinar: Growth strategies' },
        { done: false, text: 'Case study: Success story' },
        { done: false, text: 'Newsletter: Monthly recap' }
      ]
    }
  },
  
  { id: 'growth-plan', title: 'Q2 Growth Strategy', type: 'Document', cardType: 'document', row: 0, col: 7, width: 300, height: 260,
    content: { text: 'Focus on email marketing retention. Target: +15% by EOQ2.\n\nKey Initiatives:\n• Cart abandonment campaign\n• Loyalty program launch\n• Personalized recommendations\n• Mobile app optimization' } },
  
  // === Row 1 (次顶部) ===
  { id: 'sessions', title: 'Sessions', type: 'Data', badge: '91%', row: 1, col: 0,
    stats: { 'Total': '445K', 'Duration': '8.3min', 'Pages': '4.2', 'Bounce': '34%' } },
  
  { id: 'q2-tasks', title: 'Q2 Action Items', type: 'Checklist', cardType: 'checklist', badge: '4/9', row: 1, col: 1.8, width: 270, height: 260,
    content: {
      items: [
        { done: true, text: 'Analyze cohort retention' },
        { done: true, text: 'Review channel ROI' },
        { done: true, text: 'Export Q1 report' },
        { done: true, text: 'Update pricing strategy' },
        { done: false, text: 'Launch A/B test framework' },
        { done: false, text: 'Optimize mobile checkout' },
        { done: false, text: 'Team strategy meeting' },
        { done: false, text: 'Review analytics dashboard' },
        { done: false, text: 'Plan Q3 campaigns' }
      ]
    }
  },
  
  { id: 'campaign-assets', title: 'Campaign Assets', type: 'Media', cardType: 'media', badge: '24 items', row: 1, col: 3.5, width: 300, height: 280,
    content: {
      images: [
        { url: 'pic/45124a81-d220-4b99-8d73-5a02ee5e68ef.webp', name: 'Summer Sale Banner' },
        { url: 'pic/5f57e1af-4c4a-455a-877e-3a44c1ef67f8.webp', name: 'Product Hero' },
        { url: 'pic/694d124e-4c6a-4b80-af1b-1be91708fe38.webp', name: 'Email Header' },
        { url: 'pic/a9216aeb-9e6b-4e11-821b-a153aee065f8.webp', name: 'Social Post' },
        { url: 'pic/acbf268e-f06c-4e7e-8250-034ae605a4c8.webp', name: 'Landing Page' },
        { url: 'pic/d04b644f-d314-4401-ac0a-b4cbc0723a2c.webp', name: 'Newsletter' }
      ]
    }
  },
  
  // === Row 2 (中心行，Core在这) ===
  { id: 'product-photos', title: 'Product Photography', type: 'Media', cardType: 'media', badge: '156 items', row: 2, col: 0, width: 260, height: 220,
    content: {
      images: [
        { url: 'pic/f21e953a-e369-4c7b-ae17-acb282b2094d.webp', name: 'Product A' },
        { url: 'pic/output (1) (1).webp', name: 'Product B' },
        { url: 'pic/45124a81-d220-4b99-8d73-5a02ee5e68ef.webp', name: 'Product C' },
        { url: 'pic/5f57e1af-4c4a-455a-877e-3a44c1ef67f8.webp', name: 'Product D' }
      ]
    }
  },
  
  { id: 'core', title: 'Growth Metrics', type: 'Core', badge: '100%', row: 2, col: 3, isCore: true,
    stats: { 'Growth': '+28.4%', 'Users': '45.9K', 'Revenue': '$1.24M', 'Conv': '10.7%' } },
  
  { id: 'user-engagement', title: 'User Engagement', type: 'KPI', cardType: 'kpi', badge: 'Live', row: 2, col: 5.5, width: 260, height: 240,
    content: {
      metrics: [
        { label: 'DAU', value: '12.4K', trend: 'up', change: '+8%' },
        { label: 'Session Time', value: '8.3min', trend: 'up', change: '+15%' },
        { label: 'Retention D7', value: '42%', trend: 'up', change: '+5%' },
        { label: 'Stickiness', value: '28%', trend: 'up', change: '+2%' }
      ]
    }
  },
  
  { id: 'competitor-analysis', title: 'Competitor Analysis', type: 'Document', cardType: 'document', row: 2, col: 7.2, width: 280, height: 220,
    content: { text: 'Market positioning review vs top 3 competitors.\n\nKey Findings:\n• Price advantage: 12%\n• Feature parity: 85%\n• Brand awareness gap\n• Opportunity in mid-market' } },
  
  // === Row 3 (次底部) ===
  { id: 'optimization-tasks', title: 'Website Optimization', type: 'Checklist', cardType: 'checklist', badge: '2/6', row: 3, col: 0, width: 280, height: 220,
    content: {
      items: [
        { done: true, text: 'Mobile page speed audit' },
        { done: true, text: 'Image compression' },
        { done: false, text: 'Lazy loading implementation' },
        { done: false, text: 'CDN setup' },
        { done: false, text: 'Cache optimization' },
        { done: false, text: 'Bundle size reduction' }
      ]
    }
  },
  
  { id: 'video-content', title: 'Video Library', type: 'Media', cardType: 'media', badge: '12 videos', row: 3, col: 2, width: 280, height: 220,
    content: {
      images: [
        { url: 'pic/694d124e-4c6a-4b80-af1b-1be91708fe38.webp', name: 'How-to Video' },
        { url: 'pic/a9216aeb-9e6b-4e11-821b-a153aee065f8.webp', name: 'Testimonial' },
        { url: 'pic/acbf268e-f06c-4e7e-8250-034ae605a4c8.webp', name: 'Product Demo' },
        { url: 'pic/d04b644f-d314-4401-ac0a-b4cbc0723a2c.webp', name: 'Tutorial' }
      ]
    }
  },
  
  { id: 'roadmap', title: 'Product Roadmap H2', type: 'Document', cardType: 'document', row: 3, col: 4.2, width: 300, height: 200,
    content: { text: 'H2 2024 Development Plan\n\n• Q3: Mobile redesign\n• Q3: Payment options expansion\n• Q4: Personalization engine\n• Q4: Analytics dashboard v2' } },
  
  { id: 'conversion-funnel', title: 'Conversion Metrics', type: 'KPI', cardType: 'kpi', badge: 'Live', row: 3, col: 6.5, width: 260, height: 240,
    content: {
      metrics: [
        { label: 'Visit→Cart', value: '12.5%', trend: 'up', change: '+2%' },
        { label: 'Cart→Checkout', value: '68%', trend: 'down', change: '-3%' },
        { label: 'Checkout→Pay', value: '82%', trend: 'up', change: '+4%' },
        { label: 'Overall CVR', value: '6.9%', trend: 'up', change: '+1%' }
      ]
    }
  },
  
  // === Row 4 (底部) ===
  { id: 'users', title: 'User Profiles', type: 'Data', badge: '87%', row: 4, col: 0,
    stats: { 'Total': '45.9K', 'New': '28.3K', 'Active': '68%', 'Retention': '72%' } },
  
  { id: 'marketing', title: 'Marketing Channels', type: 'Data', badge: '78%', row: 4, col: 2,
    stats: { 'Channels': '8', 'CAC': '$45', 'ROI': '3.2x', 'Top': 'Email' } },
  
  { id: 'products', title: 'Product Catalog', type: 'Data', badge: '72%', row: 4, col: 4,
    stats: { 'SKUs': '1,234', 'Categories': '8', 'Top': 'Electronics', 'Price': '$87' } },
  
  { id: 'payments', title: 'Payment Methods', type: 'Data', badge: '85%', row: 4, col: 6,
    stats: { 'Methods': '6', 'Success': '96%', 'Avg Time': '45s', 'Failed': '4%' } },
  
  { id: 'customer-insights', title: 'Customer Research Notes', type: 'Document', cardType: 'document', row: 4, col: 8, width: 290, height: 230,
    content: { text: 'User interview synthesis (N=25)\n\nTop Pain Points:\n• Checkout too complex (60%)\n• Shipping clarity needed (45%)\n• Mobile UX issues (38%)\n• Search functionality (32%)' } }
];

// 连接关系（精简）
const connections = [
    content: { text: 'Market positioning review vs top 3 competitors.\n\nKey Findings:\n• Price advantage: 12%\n• Feature parity: 85%\n• Brand awareness gap\n• Opportunity in mid-market' } },
  
  { id: 'customer-insights', title: 'Customer Research Notes', type: 'Document', cardType: 'document', row: 4, col: 0, width: 290, height: 230,
    content: { text: 'User interview synthesis (N=25)\n\nTop Pain Points:\n• Checkout too complex (60%)\n• Shipping clarity needed (45%)\n• Mobile UX issues (38%)\n• Search functionality (32%)' } },
  
  { id: 'roadmap', title: 'Product Roadmap H2', type: 'Document', cardType: 'document', row: 3, col: 4, width: 300, height: 200,
    content: { text: 'H2 2024 Development Plan\n\n• Q3: Mobile redesign\n• Q3: Payment options expansion\n• Q4: Personalization engine\n• Q4: Analytics dashboard v2' } },
  
  // === Media类 (3张) ===
  { id: 'campaign-assets', title: 'Campaign Assets', type: 'Media', cardType: 'media', badge: '24 items', row: 1, col: 4, width: 300, height: 280,
    content: {
      images: [
        { url: 'pic/45124a81-d220-4b99-8d73-5a02ee5e68ef.webp', name: 'Summer Sale Banner' },
        { url: 'pic/5f57e1af-4c4a-455a-877e-3a44c1ef67f8.webp', name: 'Product Hero' },
        { url: 'pic/694d124e-4c6a-4b80-af1b-1be91708fe38.webp', name: 'Email Header' },
        { url: 'pic/a9216aeb-9e6b-4e11-821b-a153aee065f8.webp', name: 'Social Post' },
        { url: 'pic/acbf268e-f06c-4e7e-8250-034ae605a4c8.webp', name: 'Landing Page' },
        { url: 'pic/d04b644f-d314-4401-ac0a-b4cbc0723a2c.webp', name: 'Newsletter' }
      ]
    }
  },
  
  { id: 'product-photos', title: 'Product Photography', type: 'Media', cardType: 'media', badge: '156 items', row: 2, col: 0, width: 260, height: 220,
    content: {
      images: [
        { url: 'pic/f21e953a-e369-4c7b-ae17-acb282b2094d.webp', name: 'Product A' },
        { url: 'pic/output (1) (1).webp', name: 'Product B' },
        { url: 'pic/45124a81-d220-4b99-8d73-5a02ee5e68ef.webp', name: 'Product C' },
        { url: 'pic/5f57e1af-4c4a-455a-877e-3a44c1ef67f8.webp', name: 'Product D' }
      ]
    }
  },
  
  { id: 'video-content', title: 'Video Library', type: 'Media', cardType: 'media', badge: '12 videos', row: 3, col: 2, width: 280, height: 220,
    content: {
      images: [
        { url: 'pic/694d124e-4c6a-4b80-af1b-1be91708fe38.webp', name: 'How-to Video' },
        { url: 'pic/a9216aeb-9e6b-4e11-821b-a153aee065f8.webp', name: 'Testimonial' },
        { url: 'pic/acbf268e-f06c-4e7e-8250-034ae605a4c8.webp', name: 'Product Demo' },
        { url: 'pic/d04b644f-d314-4401-ac0a-b4cbc0723a2c.webp', name: 'Tutorial' }
      ]
    }
  },
  
  // === Checklist类 (3张) ===
  { id: 'q2-tasks', title: 'Q2 Action Items', type: 'Checklist', cardType: 'checklist', badge: '4/9', row: 1, col: 3, width: 270, height: 260,
    content: {
      items: [
        { done: true, text: 'Analyze cohort retention' },
        { done: true, text: 'Review channel ROI' },
        { done: true, text: 'Export Q1 report' },
        { done: true, text: 'Update pricing strategy' },
        { done: false, text: 'Launch A/B test framework' },
        { done: false, text: 'Optimize mobile checkout' },
        { done: false, text: 'Team strategy meeting' },
        { done: false, text: 'Review analytics dashboard' },
        { done: false, text: 'Plan Q3 campaigns' }
      ]
    }
  },
  
  { id: 'optimization-tasks', title: 'Website Optimization', type: 'Checklist', cardType: 'checklist', badge: '2/6', row: 3, col: 0, width: 280, height: 220,
    content: {
      items: [
        { done: true, text: 'Mobile page speed audit' },
        { done: true, text: 'Image compression' },
        { done: false, text: 'Lazy loading implementation' },
        { done: false, text: 'CDN setup' },
        { done: false, text: 'Cache optimization' },
        { done: false, text: 'Bundle size reduction' }
      ]
    }
  },
  
  { id: 'content-calendar', title: 'Content Pipeline', type: 'Checklist', cardType: 'checklist', badge: '5/8', row: 0, col: 3, width: 260, height: 240,
    content: {
      items: [
        { done: true, text: 'Blog: Email best practices' },
        { done: true, text: 'Video: Product showcase' },
        { done: true, text: 'Social: User testimonials' },
        { done: true, text: 'Guide: Getting started' },
        { done: true, text: 'Infographic: Q1 results' },
        { done: false, text: 'Webinar: Growth strategies' },
        { done: false, text: 'Case study: Success story' },
        { done: false, text: 'Newsletter: Monthly recap' }
      ]
    }
  },
  
  // === KPI类 (3张) ===
  { id: 'revenue-kpi', title: 'Revenue Dashboard', type: 'KPI', cardType: 'kpi', badge: 'Live', row: 0, col: 1, width: 260, height: 240,
    content: {
      metrics: [
        { label: 'Total Revenue', value: '$1.24M', trend: 'up', change: '+18%' },
        { label: 'MRR', value: '$156K', trend: 'up', change: '+12%' },
        { label: 'ARPU', value: '$27.50', trend: 'up', change: '+3%' },
        { label: 'Churn', value: '4.2%', trend: 'down', change: '-1.1%' }
      ]
    }
  },
  
  { id: 'user-engagement', title: 'User Engagement', type: 'KPI', cardType: 'kpi', badge: 'Live', row: 2, col: 3, width: 260, height: 240,
    content: {
      metrics: [
        { label: 'DAU', value: '12.4K', trend: 'up', change: '+8%' },
        { label: 'Session Time', value: '8.3min', trend: 'up', change: '+15%' },
        { label: 'Retention D7', value: '42%', trend: 'up', change: '+5%' },
        { label: 'Stickiness', value: '28%', trend: 'up', change: '+2%' }
      ]
    }
  },
  
  { id: 'conversion-funnel', title: 'Conversion Metrics', type: 'KPI', cardType: 'kpi', badge: 'Live', row: 4, col: 2, width: 260, height: 240,
    content: {
      metrics: [
        { label: 'Visit→Cart', value: '12.5%', trend: 'up', change: '+2%' },
        { label: 'Cart→Checkout', value: '68%', trend: 'down', change: '-3%' },
        { label: 'Checkout→Pay', value: '82%', trend: 'up', change: '+4%' },
        { label: 'Overall CVR', value: '6.9%', trend: 'up', change: '+1%' }
      ]
    }
  }
];

// 连接关系（精简，避免混乱）
const connections = [
  // Core连接
  { from: 'events', to: 'core' },
  { from: 'orders', to: 'core' },
  { from: 'users', to: 'core' },
  
  // 文档连到Core
  { from: 'growth-plan', to: 'core' },
  { from: 'roadmap', to: 'core' },
  
  // Media连到数据
  { from: 'campaign-assets', to: 'events' },
  { from: 'product-photos', to: 'products' },
  
  // Checklist连到相关
  { from: 'q2-tasks', to: 'core' },
  { from: 'optimization-tasks', to: 'sessions' },
  { from: 'content-calendar', to: 'campaign-assets' },
  
  // KPI连到Core
  { from: 'revenue-kpi', to: 'core' },
  { from: 'user-engagement', to: 'users' },
  { from: 'conversion-funnel', to: 'orders' }
];

// 计算卡片位置的函数
function calculateCardPosition(card, index) {
  if (!card.width) {
    card.width = card.isCore ? LAYOUT.CORE_W : LAYOUT.CARD_W;
  }
  if (!card.height) {
    card.height = LAYOUT.CARD_H;
  }
  
  // 基础网格位置
  const baseX = LAYOUT.START_X + card.col * (LAYOUT.CARD_W + LAYOUT.GAP_X);
  const baseY = LAYOUT.START_Y + card.row * (LAYOUT.CARD_H + LAYOUT.GAP_Y);
  
  // 应用固定偏移（Core不偏移）
  const pattern = card.isCore ? {dx:0, dy:0} : offsetPatterns[index % offsetPatterns.length];
  
  card.x = baseX + pattern.dx;
  card.y = baseY + pattern.dy;
  
  // 边界检查（确保不超出viewBox）
  const maxX = 2400 - card.width - 50;
  const maxY = 1400 - card.height - 50;
  
  card.x = Math.max(50, Math.min(card.x, maxX));
  card.y = Math.max(50, Math.min(card.y, maxY));
  
  // 中心点
  card.cx = card.x + card.width / 2;
  card.cy = card.y + card.height / 2;
  
  // 保存初始位置
  if (!card.initialX) {
    card.initialX = card.x;
    card.initialY = card.y;
  }
}

// 初始化所有卡片位置
cards.forEach((card, index) => {
  calculateCardPosition(card, index);
});

// State
let selectedCard = null;
let zoomLevel = 1;
let panOffset = { x: 0, y: 0 };

// ============================================
// 初始化
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  renderConnections();
  initEventListeners();
  initZoomAndPan();
  
  // 自动适应视图
  setTimeout(() => fitToView(), 100);
  
  // 显示初始建议
  setTimeout(() => showInitialSuggestions(), 200);
});

// 自动适应（显示所有卡片）
function fitToView() {
  const canvas = document.querySelector('.card-network-canvas');
  if (!canvas) return;
  
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  cards.forEach(card => {
    minX = Math.min(minX, card.x);
    minY = Math.min(minY, card.y);
    maxX = Math.max(maxX, card.x + card.width);
    maxY = Math.max(maxY, card.y + card.height);
  });
  
  const contentWidth = maxX - minX + 120;
  const contentHeight = maxY - minY + 120;
  
  const canvasRect = canvas.getBoundingClientRect();
  zoomLevel = Math.min(canvasRect.width / contentWidth, canvasRect.height / contentHeight, 1) * 0.9;
  
  panOffset.x = (canvasRect.width - contentWidth * zoomLevel) / 2 - minX * zoomLevel + 60 * zoomLevel;
  panOffset.y = (canvasRect.height - contentHeight * zoomLevel) / 2 - minY * zoomLevel + 60 * zoomLevel;
  
  applyTransform();
}

// ============================================
// 根据类型渲染卡片内容
// ============================================

function renderCardContent(card) {
  // Document
  if (card.cardType === 'document') {
    return `
      <div class="card-header">
        <h4 class="card-title">${card.title}</h4>
      </div>
      <div class="card-document">
        <div class="doc-icon">📄</div>
        <p class="doc-text">${card.content.text}</p>
      </div>
    `;
  }
  
  // Media
  if (card.cardType === 'media') {
    return `
      <div class="card-header">
        <h4 class="card-title">${card.title}</h4>
        <span class="card-badge">${card.badge}</span>
      </div>
      <div class="card-media">
        <div class="media-grid">
          ${card.content.images.map(img => `
            <div class="media-item">
              <img src="${img.url}" alt="${img.name}" class="media-thumb-img"/>
              <div class="media-name">${img.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Checklist
  if (card.cardType === 'checklist') {
    return `
      <div class="card-header">
        <h4 class="card-title">${card.title}</h4>
        <span class="card-badge">${card.badge}</span>
      </div>
      <div class="card-checklist">
        ${card.content.items.map(item => `
          <div class="checklist-item ${item.done ? 'done' : ''}">
            <span class="checkbox">${item.done ? '✓' : '○'}</span>
            <span class="item-text">${item.text}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // KPI
  if (card.cardType === 'kpi') {
    return `
      <div class="card-header">
        <h4 class="card-title">${card.title}</h4>
        <span class="card-badge">${card.badge}</span>
      </div>
      <div class="card-kpi">
        ${card.content.metrics.map(m => `
          <div class="kpi-item">
            <div class="kpi-label">${m.label}</div>
            <div class="kpi-value">${m.value}</div>
            <div class="kpi-change ${m.trend}">${m.trend === 'up' ? '↗' : '↘'} ${m.change}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // 默认：Data统计
  const statsHtml = Object.entries(card.stats || {}).map(([label, value]) => `
    <div class="stat-item">
      <div class="stat-label">${label}</div>
      <div class="stat-value">${value}</div>
    </div>
  `).join('');
  
  return `
    <div class="card-header">
      <h4 class="card-title">${card.title}</h4>
      <span class="card-badge">${card.badge}</span>
    </div>
    <div class="card-meta">
      <span class="card-type">${card.type}</span>
    </div>
    <div class="card-stats">${statsHtml}</div>
  `;
}

// ============================================
// 渲染卡片
// ============================================

function renderCards() {
  const svgGroup = document.getElementById('cardsGroup');
  svgGroup.innerHTML = '';
  
  const typeColors = {
    'Core': 'core-color',
    'Data': 'blue-tint',
    'Document': 'yellow-tint',
    'Media': 'pink-tint',
    'Checklist': 'green-tint',
    'KPI': 'purple-tint'
  };
  
  cards.forEach(card => {
    const colorClass = typeColors[card.type] || 'blue-tint';
    
    const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    foreignObject.setAttribute('x', card.x);
    foreignObject.setAttribute('y', card.y);
    foreignObject.setAttribute('width', card.width);
    foreignObject.setAttribute('height', card.height);
    foreignObject.id = `card-${card.id}`;
    
    const content = renderCardContent(card);
    
    const htmlContent = `
      <div class="data-card ${colorClass} ${card.isCore ? 'core' : ''}" 
           xmlns="http://www.w3.org/1999/xhtml"
           style="background: #FFFFFF !important;"
           onclick="selectCard('${card.id}')">
        <div class="card-actions">
          <button class="card-action-btn edit-btn" onclick="event.stopPropagation(); editCard('${card.id}')">✎</button>
          <button class="card-action-btn delete-btn" onclick="event.stopPropagation(); deleteCard('${card.id}')">×</button>
        </div>
        ${content}
        <div class="card-expand-hint">Click to expand →</div>
      </div>
    `;
    
    foreignObject.innerHTML = htmlContent;
    enableCardDragSVG(foreignObject, card);
    svgGroup.appendChild(foreignObject);
  });
}

// 卡片拖拽
function enableCardDragSVG(foreignObject, cardData) {
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };
  let cardStart = { x: 0, y: 0 };
  
  foreignObject.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('card-action-btn')) return;
    
    const svg = document.getElementById('unifiedSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    isDragging = true;
    dragStart = { x: svgP.x, y: svgP.y };
    cardStart = { x: cardData.x, y: cardData.y };
    e.stopPropagation();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const svg = document.getElementById('unifiedSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    cardData.x = cardStart.x + (svgP.x - dragStart.x);
    cardData.y = cardStart.y + (svgP.y - dragStart.y);
    cardData.cx = cardData.x + cardData.width / 2;
    cardData.cy = cardData.y + cardData.height / 2;
    
    foreignObject.setAttribute('x', cardData.x);
    foreignObject.setAttribute('y', cardData.y);
    
    updateAllConnections();
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

// 更新连接线
function updateAllConnections() {
  connections.forEach((conn, index) => {
    const from = cards.find(c => c.id === conn.from);
    const to = cards.find(c => c.id === conn.to);
    
    if (!from || !to) return;
    
    const pathData = createSmoothCurve(from, to);
    const svg = document.getElementById('connectionsGroup');
    const allPaths = svg.querySelectorAll('.connection-line');
    if (allPaths[index]) {
      allPaths[index].setAttribute('d', pathData);
    }
  });
}

// ============================================
// 渲染连接线（贝塞尔曲线）
// ============================================

function renderConnections() {
  const svg = document.getElementById('connectionsGroup');
  svg.innerHTML = '';
  
  console.log('\n📋 === CONNECTIONS ===');
  
  connections.forEach((conn, index) => {
    const from = cards.find(c => c.id === conn.from);
    const to = cards.find(c => c.id === conn.to);
    
    if (!from || !to) {
      console.error(`❌ #${index+1}: Missing`, conn);
      return;
    }
    
    console.log(`#${index+1}: ${from.title} → ${to.title}`);
    
    const pathData = createSmoothCurve(from, to);
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('class', 'connection-line');
    path.dataset.from = conn.from;
    path.dataset.to = conn.to;
    svg.appendChild(path);
  });
  
  console.log('=================\n');
}

function createSmoothCurve(from, to) {
  const x1 = from.cx;
  const y1 = from.cy;
  const x2 = to.cx;
  const y2 = to.cy;
  
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  const offset = Math.min(Math.abs(dx), Math.abs(dy)) * 0.6;
  
  if (Math.abs(dx) > Math.abs(dy)) {
    const cx1 = x1 + offset * Math.sign(dx);
    const cy1 = y1;
    const cx2 = x2 - offset * Math.sign(dx);
    const cy2 = y2;
    return `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
  } else {
    const cx1 = x1;
    const cy1 = y1 + offset * Math.sign(dy);
    const cx2 = x2;
    const cy2 = y2 - offset * Math.sign(dy);
    return `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
  }
}

// ============================================
// 卡片选中
// ============================================

function selectCard(cardId) {
  document.querySelectorAll('.data-card').forEach(c => c.classList.remove('selected'));
  
  const foreignObject = document.getElementById(`card-${cardId}`);
  if (!foreignObject) return;
  
  const cardDiv = foreignObject.querySelector('.data-card');
  if (cardDiv) cardDiv.classList.add('selected');
  
  selectedCard = cardId;
  highlightConnections(cardId);
  updateChatPanel(cardId);
  showCardDetailOverlay(cardId);
}

function highlightConnections(cardId) {
  document.querySelectorAll('.connection-line').forEach(line => {
    const related = line.dataset.from === cardId || line.dataset.to === cardId;
    line.classList.toggle('active', related);
  });
}

function updateChatPanel(cardId) {
  const cardData = cards.find(c => c.id === cardId);
  const attachments = document.getElementById('inputAttachments');
  
  if (!attachments) return;
  
  // 清空之前的附件
  attachments.innerHTML = '';
  
  // 创建附件标签
  const tag = document.createElement('div');
  tag.className = 'selected-card-tag';
  tag.innerHTML = `
    <span class="tag-icon">📎</span>
    <span class="tag-text">${cardData.title}</span>
    <button class="tag-close" onclick="deselectCard(); event.stopPropagation();">×</button>
  `;
  
  attachments.appendChild(tag);
  
  // 更新placeholder
  const chatInput = document.querySelector('.chat-input');
  if (chatInput) {
    chatInput.placeholder = `Ask about ${cardData.title}...`;
  }
}

function showCardDetailOverlay(cardId) {
  const cardData = cards.find(c => c.id === cardId);
  
  let overlay = document.getElementById('cardDetailOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'cardDetailOverlay';
    overlay.className = 'card-detail-overlay';
    document.body.appendChild(overlay);
  }
  
  let detailsHTML = '';
  
  if (cardData.cardType === 'document') {
    detailsHTML = `
      <div style="font-size: 14px; line-height: 1.8; color: var(--text-dark); white-space: pre-line; margin-bottom: 25px;">
        ${cardData.content.text}
      </div>
      <div style="padding: 16px; background: var(--bg-light); border-radius: 8px;">
        <div style="font-size: 12px; color: var(--text-gray); margin-bottom: 8px;">📅 Last Modified: 2 days ago</div>
        <div style="font-size: 12px; color: var(--text-gray);">👤 Author: Sarah Chen</div>
      </div>
    `;
  } else if (cardData.cardType === 'media') {
    const mediaHTML = cardData.content.images.map(img => `
      <div style="background: var(--bg-light); border-radius: 8px; padding: 8px;">
        <img src="${img.url}" alt="${img.name}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;"/>
        <div style="font-size: 12px; color: var(--text-dark); font-weight: 500; text-align: center;">${img.name}</div>
      </div>
    `).join('');
    
    detailsHTML = `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 25px;">
        ${mediaHTML}
      </div>
      <div style="padding: 16px; background: var(--bg-light); border-radius: 8px;">
        <div style="font-size: 12px; color: var(--text-gray);">📊 Total: ${cardData.badge} | Last Upload: Today</div>
      </div>
    `;
  } else if (cardData.cardType === 'checklist') {
    const itemsHTML = cardData.content.items.map(item => `
      <div style="display: flex; gap: 10px; padding: 10px; background: var(--bg-light); border-radius: 6px; margin-bottom: 8px;">
        <span style="font-size: 16px; color: ${item.done ? 'var(--accent-green)' : 'var(--text-light)'};">${item.done ? '✓' : '○'}</span>
        <span style="flex: 1; font-size: 14px; color: var(--text-dark); ${item.done ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${item.text}</span>
      </div>
    `).join('');
    
    const doneCount = cardData.content.items.filter(i => i.done).length;
    const total = cardData.content.items.length;
    const percent = Math.round((doneCount / total) * 100);
    
    detailsHTML = `
      <div>${itemsHTML}</div>
      <div style="margin-top: 20px; padding: 16px; background: var(--bg-light); border-radius: 8px;">
        <div style="font-size: 12px; color: var(--text-gray);">📈 Progress: ${percent}% (${doneCount}/${total})</div>
      </div>
    `;
  } else if (cardData.cardType === 'kpi') {
    const kpiHTML = cardData.content.metrics.map(m => `
      <div style="padding: 20px; background: var(--bg-light); border-radius: 8px;">
        <div style="font-size: 11px; color: var(--text-gray); margin-bottom: 8px; text-transform: uppercase;">${m.label}</div>
        <div style="font-family: var(--font-mono); font-size: 32px; color: var(--text-primary); font-weight: 600; margin-bottom: 6px;">${m.value}</div>
        <div style="font-size: 13px; color: ${m.trend === 'up' ? 'var(--accent-green)' : '#E57373'}; font-weight: 500;">
          ${m.trend === 'up' ? '↗' : '↘'} ${m.change} vs last period
        </div>
      </div>
    `).join('');
    
    detailsHTML = `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 25px;">
        ${kpiHTML}
      </div>
      <div style="padding: 16px; background: var(--bg-light); border-radius: 8px;">
        <div style="font-size: 12px; color: var(--text-gray);">🔄 Real-time sync • Updated 2 minutes ago</div>
      </div>
    `;
  } else {
    const statsHtml = Object.entries(cardData.stats || {}).map(([label, value]) => `
      <div class="overlay-stat-item">
        <div class="overlay-stat-label">${label}</div>
        <div class="overlay-stat-value">${value}</div>
      </div>
    `).join('');
    
    detailsHTML = `<div class="overlay-stats">${statsHtml}</div>`;
  }
  
  overlay.innerHTML = `
    <div class="overlay-backdrop" onclick="closeCardOverlay()"></div>
    <div class="overlay-card-large">
      <button class="overlay-close" onclick="closeCardOverlay()">×</button>
      <h2>${cardData.title}</h2>
      <div class="card-meta" style="margin-bottom: 25px;">
        <span class="card-type">${cardData.type}</span>
        ${cardData.badge ? `<span class="card-badge" style="margin-left: 10px;">${cardData.badge}</span>` : ''}
      </div>
      ${detailsHTML}
    </div>
  `;
  
  overlay.classList.add('active');
}

window.closeCardOverlay = function() {
  const overlay = document.getElementById('cardDetailOverlay');
  if (overlay) overlay.classList.remove('active');
};

function deselectCard() {
  document.querySelectorAll('.data-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.connection-line').forEach(l => l.classList.remove('active'));
  
  // 清空输入框内的附件标签
  const attachments = document.getElementById('inputAttachments');
  if (attachments) {
    attachments.innerHTML = '';
  }
  
  // 恢复placeholder
  const chatInput = document.querySelector('.chat-input');
  if (chatInput) {
    chatInput.placeholder = 'Ask me anything about your data...';
  }
  
  // 移除面板选中态
  const panel = document.querySelector('.info-panel');
  if (panel) {
    panel.classList.remove('card-selected');
  }
  
  window.closeCardOverlay();
  selectedCard = null;
}

function getConnectedCount(cardId) {
  return connections.filter(c => c.from === cardId || c.to === cardId).length;
}

// ============================================
// 编辑删除
// ============================================

window.editCard = function(cardId) {
  addMessage('assistant', `Edit mode for "${cards.find(c => c.id === cardId).title}"`);
};

// ============================================
// Auto Layout功能（一键复位）
// ============================================

window.autoLayout = function() {
  // 重置所有卡片到初始位置
  cards.forEach((card, index) => {
    card.x = card.initialX;
    card.y = card.initialY;
    card.cx = card.x + card.width / 2;
    card.cy = card.y + card.height / 2;
  });
  
  // 重新渲染
  renderCards();
  renderConnections();
  
  // 自动适应视图
  setTimeout(() => {
    fitToView();
    addMessage('assistant', '✓ Layout reset to default positions');
  }, 100);
};

// ============================================
// Create View功能
// ============================================

window.closeViewModal = function() {
  const modal = document.getElementById('viewModal');
  if (modal) modal.classList.remove('active');
};

window.createView = function(viewType) {
  window.closeViewModal();
  
  const viewNames = {
    'analytics': 'Analytics Dashboard',
    'monitor': 'Monitor Dashboard',
    'report': 'Report Builder',
    'goals': 'Goal Tracking'
  };
  
  addMessage('user', `Create ${viewNames[viewType]}`);
  
  setTimeout(() => {
    if (viewType === 'analytics') {
      addMessage('assistant', `✅ Analytics Dashboard created!\n\n📊 Configured metrics:\n• Revenue trends\n• User growth\n• Conversion rates\n• Channel performance\n\nDashboard is ready for viewing.`);
    } else if (viewType === 'monitor') {
      addMessage('assistant', `✅ Monitor Dashboard created!\n\n📈 Real-time tracking:\n• Active users: 1,234\n• Revenue today: $12,450\n• Conversion rate: 3.2%\n\n🔔 Alerts configured for anomalies.`);
    } else if (viewType === 'report') {
      addMessage('assistant', `✅ Report Builder ready!\n\n📝 Available sections:\n• Executive summary\n• Detailed metrics\n• Visualizations\n• Recommendations\n\nCustomize and export as PDF.`);
    } else if (viewType === 'goals') {
      addMessage('assistant', `✅ Goal Tracking initialized!\n\n🎯 Q2 Goals:\n• Revenue: $500K (77% ████████░░)\n• New Users: 50K (86% ████████▓░)\n• Conversion: 4.5% (84% ████████▓░)\n\nOn track to meet 2/3 goals!`);
    }
  }, 500);
};

window.deleteCard = function(cardId) {
  const cardData = cards.find(c => c.id === cardId);
  addMessage('assistant', `Deleting "${cardData.title}"...`);
  
  const cardEl = document.getElementById(`card-${cardId}`);
  cardEl.style.opacity = '0';
  
  setTimeout(() => {
    const index = cards.findIndex(c => c.id === cardId);
    if (index > -1) cards.splice(index, 1);
    
    renderCards();
    renderConnections();
    addMessage('assistant', `✓ Removed`);
    deselectCard();
  }, 300);
};

// ============================================
// 会话
// ============================================

function handleChat() {
  const input = document.querySelector('.chat-input');
  const msg = input.value.trim();
  
  if (!msg) return;
  
  addMessage('user', msg);
  input.value = '';
  
  const lowerMsg = msg.toLowerCase();
  
  // Delete命令
  if (lowerMsg.startsWith('delete ')) {
    const name = msg.substring(7).trim();
    const card = cards.find(c => c.title.toLowerCase() === name.toLowerCase());
    
    if (card) {
      window.deleteCard(card.id);
    } else {
      addMessage('assistant', `Not found: "${name}"`);
    }
  }
  // Advice命令
  else if (lowerMsg === 'advice' || lowerMsg === '/advice') {
    showAISuggestions();
  }
  else {
    addMessage('assistant', `Received: "${msg}"`);
  }
}

// 显示初始建议
function showInitialSuggestions() {
  const introMsg = `Your knowledge universe is ready! I've analyzed ${cards.length} data nodes.`;
  
  addMessage('assistant', introMsg);
  
  setTimeout(() => {
    showAISuggestions();
  }, 500);
}

// 生成AI建议
function showAISuggestions() {
  const suggestions = [
    {
      icon: '⚠️',
      title: 'Your data saturation is at 78%',
      description: 'We recommend uploading additional data sources (marketing attribution, support tickets) to improve analysis quality and unlock deeper insights.',
      action: 'Click to upload more data',
      command: 'add-data'
    },
    {
      icon: '📊',
      title: 'Analyze user cohorts for retention insights',
      description: 'Run a cohort analysis to identify which user groups have the best retention rates and understand what drives long-term engagement.',
      action: 'Run cohort analysis',
      command: 'analyze-cohorts'
    },
    {
      icon: '🎯',
      title: 'Optimize your conversion funnel',
      description: 'Identify specific drop-off points in your checkout flow and get actionable recommendations to improve conversion rates.',
      action: 'Analyze conversion funnel',
      command: 'analyze-funnel'
    }
  ];
  
  const suggestionsHTML = suggestions.map(s => `
    <div class="suggestion-card" onclick="executeSuggestion('${s.command}', '${s.action}')">
      <div class="suggestion-header">
        <span class="suggestion-icon">${s.icon}</span>
        <span class="suggestion-title">${s.title}</span>
      </div>
      <div class="suggestion-desc">${s.description}</div>
      <div class="suggestion-action">→ ${s.action}</div>
    </div>
  `).join('');
  
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message assistant';
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  msgDiv.innerHTML = `
    <div class="message-header">
      <span>🤖 AI</span>
      <span>${time}</span>
    </div>
    <div class="message-content">
      Here are some recommendations based on your data:
      <div style="margin-top: 10px;">
        ${suggestionsHTML}
      </div>
    </div>
  `;
  
  const container = document.getElementById('chatMessages');
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

// 执行建议
window.executeSuggestion = function(command, action) {
  // 发送为用户消息
  addMessage('user', action);
  
  // AI响应
  setTimeout(() => {
    if (command === 'add-data') {
      addMessage('assistant', 'To improve data saturation, please upload:\n• Marketing channel attribution data\n• Customer support tickets\n• Product catalog with metadata');
    } else if (command === 'analyze-cohorts') {
      addMessage('assistant', 'Running cohort analysis...\n\n📊 January cohort: 78% Week-1 retention\n📊 February cohort: 82% Week-1 retention (+5.1%)\n\n💡 February shows better retention due to onboarding improvements.');
    } else if (command === 'analyze-funnel') {
      addMessage('assistant', 'Conversion funnel analysis:\n\n• Visit → Cart: 12.5% ✓\n• Cart → Checkout: 68% ⚠️ Drop-off here\n• Checkout → Payment: 82% ✓\n\n💡 Focus on cart abandonment emails and checkout UX.');
    }
  }, 800);
};

function addMessage(role, content) {
  const container = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = `message ${role}`;
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  msg.innerHTML = `
    <div class="message-header">
      <span>${role === 'user' ? '👤 Sarah' : '🤖 AI'}</span>
      <span>${time}</span>
    </div>
    <div class="message-content">${content.replace(/\n/g, '<br>')}</div>
  `;
  
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

// ============================================
// 缩放拖拽
// ============================================

function initZoomAndPan() {
  const canvas = document.querySelector('.card-network-canvas');
  
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    zoomLevel = Math.max(0.3, Math.min(2, zoomLevel + delta));
    applyTransform();
  });
  
  let isPanning = false;
  let panStart = { x: 0, y: 0 };
  
  canvas.addEventListener('mousedown', (e) => {
    if (e.target === canvas || e.target.id === 'unifiedSvg' || e.target.id === 'connectionsGroup' || e.target.id === 'cardsGroup') {
      isPanning = true;
      panStart = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
      canvas.style.cursor = 'grabbing';
    }
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    panOffset.x = e.clientX - panStart.x;
    panOffset.y = e.clientY - panStart.y;
    applyTransform();
  });
  
  document.addEventListener('mouseup', () => {
    isPanning = false;
    canvas.style.cursor = '';
  });
}

function applyTransform() {
  const transform = `translate(${panOffset.x / zoomLevel}, ${panOffset.y / zoomLevel}) scale(${zoomLevel})`;
  document.getElementById('connectionsGroup').setAttribute('transform', transform);
  document.getElementById('cardsGroup').setAttribute('transform', transform);
}

// ============================================
// 事件监听
// ============================================

function initEventListeners() {
  // Profile菜单
  const profileBtn = document.getElementById('profileMenuBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('hidden');
    });
    
    document.addEventListener('click', () => {
      profileDropdown.classList.add('hidden');
    });
  }
  
  // Create View按钮
  const createViewBtn = document.getElementById('createViewBtn');
  if (createViewBtn) {
    createViewBtn.addEventListener('click', () => {
      const modal = document.getElementById('viewModal');
      if (modal) modal.classList.add('active');
    });
  }
  
  // 建议按钮
  const adviceBtn = document.getElementById('btnAdvice');
  if (adviceBtn) {
    adviceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addMessage('user', '/advice');
      showAISuggestions();
    });
  }
  
  // 会话输入
  const chatInput = document.querySelector('.chat-input');
  const sendBtn = document.querySelector('.btn-send');
  
  if (chatInput && sendBtn) {
    sendBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleChat();
      }
    });
    
    // 输入时自动补全/advice
    chatInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase();
      if (val === 'advice' || val === 'advi' || val === 'adv') {
        // 可以显示补全提示
      }
    });
  }
  
  // 点击空白取消选中
  const canvas = document.querySelector('.card-network-canvas');
  canvas.addEventListener('click', (e) => {
    if (e.target === canvas || e.target.id === 'unifiedSvg' || e.target.id === 'connectionsGroup' || e.target.id === 'cardsGroup') {
      deselectCard();
    }
  });
  
  // 关闭弹窗
  const modalClose = document.getElementById('modalClose');
  const modal = document.getElementById('cardDetailModal');
  
  if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}
