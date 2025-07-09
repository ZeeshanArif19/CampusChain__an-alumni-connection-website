function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

function setActiveLink() {
  const links = document.querySelectorAll('.sidebar-nav a');
  links.forEach(link => link.classList.remove('active'));
  const dashboardLink = Array.from(links).find(link => link.href.includes('dashboard.html') || link.href.endsWith('#'));
  if (dashboardLink) {
    dashboardLink.classList.add('active');
  }
}

function toggleSave(btn) {
  const icon = btn.querySelector('i');
  const textNode = btn.childNodes[btn.childNodes.length - 1];
  if (btn.classList.contains('saved')) {
    btn.classList.remove('saved');
    icon.className = 'fas fa-bookmark';
    textNode.textContent = 'Save';
  } else {
    btn.classList.add('saved');
    icon.className = 'fas fa-bookmark saved';
    textNode.textContent = 'Saved';
  }
}

// Set active link on page load
document.addEventListener('DOMContentLoaded', setActiveLink);