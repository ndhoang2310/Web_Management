import { renderLayout, renderViewPlaceholder, updateActiveNav } from './ui.js'

document.addEventListener('DOMContentLoaded', () => {
  renderLayout()
  renderView('dashboard')
  wireNavClicks()
})

function renderView(viewId) {
  const section = document.getElementById(`view-${viewId}`)
  if (section && !section.children.length) {
    section.innerHTML = renderViewPlaceholder(viewId)
  }
}

function navigate(tab) {
  document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'))
  const target = document.getElementById(`view-${tab}`)
  if (target) {
    target.classList.remove('hidden')
    renderView(tab)
  }
  updateActiveNav(tab)
}

function wireNavClicks() {
  document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(el => {
    el.addEventListener('click', () => {
      const tab = el.dataset.tab
      if (tab && tab !== 'settings') {
        navigate(tab)
      }
    })
  })
}
