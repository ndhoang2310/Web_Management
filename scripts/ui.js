const TABS = [
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  { id: 'morning', icon: 'wb_sunny', label: 'Buổi sáng' },
  { id: 'focus', icon: 'timer', label: 'Tập trung' },
  { id: 'stats', icon: 'bar_chart', label: 'Thống kê' },
]

export function renderLayout() {
  const app = document.getElementById('app')
  app.innerHTML = `
    ${renderAmbientGlow()}
    ${renderMobileTopBar()}
    ${renderSidebar()}
    ${renderViews()}
    ${renderBottomBar()}
  `
}

function renderAmbientGlow() {
  return `
    <div class="hidden lg:block">
      <div class="hw-glow" style="top: -200px; left: -200px; background: radial-gradient(circle, rgba(76, 244, 121, 0.08) 0%, transparent 70%)"></div>
      <div class="hw-glow" style="top: -200px; right: -200px; background: radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)"></div>
      <div class="hw-glow" style="bottom: -200px; left: 50%; transform: translateX(-50%); background: radial-gradient(circle, rgba(76, 244, 121, 0.06) 0%, transparent 70%)"></div>
    </div>
  `
}

function renderMobileTopBar() {
  return `
    <header id="mobile-top-bar" class="lg:hidden fixed top-0 w-full h-14 flex items-center justify-between px-4 z-30 bg-[#0c0f0f]/70 backdrop-blur-2xl border-b border-[#2a3333]" style="padding-top: env(safe-area-inset-top); height: calc(56px + env(safe-area-inset-top))">
      <span class="hw-title" style="color: #e2e2e2">Chào Hoàng</span>
      <div class="w-8 h-8 rounded-full bg-[#4cf479] flex items-center justify-center flex-shrink-0">
        <span class="text-xs font-bold" style="color: #003913">H</span>
      </div>
    </header>
  `
}

function renderSidebar() {
  return `
    <aside id="sidebar" class="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-64 bg-[#0c0f0f]/60 backdrop-blur-xl border-r border-[#2a3333] z-40 p-4">
      <div class="px-4 py-4 mb-6">
        <span class="text-xl font-bold" style="color: #e8edeb">Hoàng WEB</span>
      </div>
      <nav class="flex-1 space-y-1" id="sidebar-nav">
        ${TABS.map(t => renderSidebarItem(t, false)).join('')}
      </nav>
      <div class="border-t border-[#2a3333] pt-2">
        <a class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors" data-tab="settings" style="color: #889696">
          <span class="material-symbols-outlined" style="font-size: 20px">settings</span>
          <span style="font-size: 14px">Cài đặt</span>
        </a>
      </div>
    </aside>
  `
}

function renderSidebarItem(tab, isActive) {
  return `
    <a class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200" data-tab="${tab.id}" style="${isActive ? 'background: rgba(40,42,43,0.6); border: 1px solid rgba(255,255,255,0.08); color: #4cf479; font-weight: 700' : 'color: #889696'}">
      <span class="material-symbols-outlined" style="font-size: 20px; font-variation-settings: 'FILL' ${isActive ? 1 : 0}">${tab.icon}</span>
      <span style="font-size: 14px">${tab.label}</span>
    </a>
  `
}

function renderBottomBar() {
  return `
    <nav id="bottom-bar" class="lg:hidden fixed bottom-0 w-full bg-[#0c0f0f]/70 backdrop-blur-2xl border-t border-[#2a3333] z-50" style="padding-bottom: env(safe-area-inset-bottom)">
      <div class="flex justify-around items-center h-16" id="bottom-nav">
        ${TABS.map(t => renderBottomItem(t, false)).join('')}
      </div>
    </nav>
  `
}

function renderBottomItem(tab, isActive) {
  return `
    <a class="bottom-nav-item flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors min-w-[64px] min-h-[44px]" data-tab="${tab.id}">
      <span class="material-symbols-outlined" style="font-size: 24px; font-variation-settings: 'FILL' ${isActive ? 1 : 0}; color: ${isActive ? '#4cf479' : '#889696'}">${tab.icon}</span>
      <span style="font-size: 10px; font-weight: ${isActive ? 700 : 400}; color: ${isActive ? '#4cf479' : '#889696'}">${tab.label}</span>
    </a>
  `
}

function renderViews() {
  return `
    <main id="main-content" class="lg:ml-64 min-h-screen pt-14 lg:pt-0 pb-20 lg:pb-0">
      <section id="view-dashboard" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
      <section id="view-morning" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
      <section id="view-focus" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
      <section id="view-stats" class="view-section hidden p-4 lg:p-12 max-w-6xl mx-auto"></section>
    </main>
  `
}

export function renderViewPlaceholder(viewId) {
  const titles = {
    dashboard: 'Dashboard',
    morning: 'Morning Routine',
    focus: 'Focus Timer',
    stats: 'Thống kê',
  }
  return `
    <div class="glass-card p-6 lg:p-8">
      <h2 class="hw-headline" style="color: #e2e2e2">${titles[viewId]}</h2>
      <p class="hw-body" style="margin-top: 8px; color: #bbcbb8">Nội dung đang được xây dựng...</p>
    </div>
  `
}

export function updateActiveNav(activeTab) {
  document.querySelectorAll('.nav-item').forEach(el => {
    const tab = el.dataset.tab
    const isActive = tab === activeTab
    const icon = el.querySelector('.material-symbols-outlined')
    const label = el.querySelector('span:last-child')

    if (isActive) {
      el.style.background = 'rgba(40,42,43,0.6)'
      el.style.border = '1px solid rgba(255,255,255,0.08)'
      el.style.color = '#4cf479'
      el.style.fontWeight = '700'
      if (icon) icon.style.fontVariationSettings = "'FILL' 1"
    } else {
      el.style.background = 'transparent'
      el.style.border = 'none'
      el.style.color = '#889696'
      el.style.fontWeight = '400'
      if (icon) icon.style.fontVariationSettings = "'FILL' 0"
    }
  })

  document.querySelectorAll('.bottom-nav-item').forEach(el => {
    const tab = el.dataset.tab
    const isActive = tab === activeTab
    const icon = el.querySelector('.material-symbols-outlined')
    const label = el.querySelector('span:last-child')

    if (isActive) {
      if (icon) { icon.style.color = '#4cf479'; icon.style.fontVariationSettings = "'FILL' 1" }
      if (label) { label.style.color = '#4cf479'; label.style.fontWeight = '700' }
    } else {
      if (icon) { icon.style.color = '#889696'; icon.style.fontVariationSettings = "'FILL' 0" }
      if (label) { label.style.color = '#889696'; label.style.fontWeight = '400' }
    }
  })
}
