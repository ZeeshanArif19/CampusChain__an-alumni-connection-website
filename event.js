// Mobile sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

function setActiveLink() {
  const links = document.querySelectorAll('.sidebar-nav a');
  links.forEach(link => link.classList.remove('active'));
  const eventLink = Array.from(links).find(link => link.href.includes('event.html') || link.href.endsWith('#'));
  if (eventLink) {
    eventLink.classList.add('active');
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

function renderDynamicEvents() {
  const eventGrid = document.getElementById('eventGrid');
  const savedEvents = JSON.parse(localStorage.getItem('events')) || [];

  if (!eventGrid) return;

  eventGrid.innerHTML = '';

  savedEvents.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.setAttribute('data-category', event.category);
    card.setAttribute('data-location', event.location);

    const startDate = new Date(event.startDate).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
    const endDate = event.endDate ? new Date(event.endDate).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }) : '';
    const dateRange = endDate ? `${startDate} - ${endDate}` : startDate;

    card.innerHTML = `
      <div class="event-image">
        <i class="${event.icon || 'fas fa-calendar-alt'}"></i>
      </div>
      <div class="event-content">
        <div class="event-header">
          <h2>${event.title}</h2>
          <span class="badge">
            <i class="fas fa-check-circle"></i> Verified
          </span>
        </div>
        <div class="event-meta">
          <div class="event-date"><i class="fas fa-calendar"></i><span>${dateRange}</span></div>
          <div class="event-type"><i class="fas fa-tag"></i><span>${event.category}</span></div>
          <div class="event-location"><i class="fas fa-map-marker-alt"></i><span>${event.location}</span></div>
        </div>
        <p class="event-description">${event.description}</p>
        <div class="event-actions">
          <a href="${event.url || '#'}" class="btn btn-primary" target="_blank">
            <i class="fas fa-external-link-alt"></i> ${event.url ? 'Apply Now' : 'Learn More'}
          </a>
          <button class="btn btn-secondary" onclick="toggleSave(this)">
            <i class="fas fa-bookmark"></i> Save
          </button>
        </div>
      </div>
    `;

    eventGrid.appendChild(card);
  });

  filterEvents(); // Reapply filters
}

function filterEvents() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const categoryFilter = document.getElementById('categoryFilter').value;
  const locationFilter = document.getElementById('locationFilter').value;
  const eventCards = document.querySelectorAll('.event-card');
  const emptyState = document.getElementById('emptyState');
  let visibleCards = 0;

  eventCards.forEach(card => {
    const title = card.querySelector('.event-header h2').textContent.toLowerCase();
    const category = card.getAttribute('data-category');
    const location = card.getAttribute('data-location');

    const matchesSearch = title.includes(searchInput);
    const matchesCategory = categoryFilter === 'all' || category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || location === locationFilter;

    if (matchesSearch && matchesCategory && matchesLocation) {
      card.style.display = 'block';
      visibleCards++;
    } else {
      card.style.display = 'none';
    }
  });

  emptyState.classList.toggle('active', visibleCards === 0);
}

// Load everything on page ready
document.addEventListener('DOMContentLoaded', () => {
  renderDynamicEvents();
  setActiveLink();

  document.getElementById('searchInput').addEventListener('input', filterEvents);
  document.getElementById('categoryFilter').addEventListener('change', filterEvents);
  document.getElementById('locationFilter').addEventListener('change', filterEvents);
});
