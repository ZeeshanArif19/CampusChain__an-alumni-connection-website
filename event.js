// Mobile sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Save/Unsave functionality
function toggleSave(btn) {
  const icon = btn.querySelector('i');
  const textNode = btn.childNodes[btn.childNodes.length - 1];
  
  if (btn.classList.contains('saved')) {
    btn.classList.remove('saved');
    icon.className = 'fas fa-bookmark';
    textNode.text
  }
}