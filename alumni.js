function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

function setActiveLink() {
  const links = document.querySelectorAll('.sidebar-nav a');
  links.forEach(link => link.classList.remove('active'));
  const alumniLink = Array.from(links).find(link => link.href.includes('alumni.html') || link.href.endsWith('#'));
  if (alumniLink) {
    alumniLink.classList.add('active');
  }
}

function filterAlumni() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const collegeFilter = document.getElementById('collegeFilter').value;
  const locationFilter = document.getElementById('locationFilter').value;
  const alumniCards = document.querySelectorAll('.alumni-card');
  const emptyState = document.getElementById('emptyState');
  let visibleCards = 0;

  alumniCards.forEach(card => {
    const name = card.querySelector('.alumni-header h2').textContent.toLowerCase();
    const college = card.getAttribute('data-college');
    const location = card.getAttribute('data-location');

    const matchesSearch = name.includes(searchInput);
    const matchesCollege = collegeFilter === 'all' || college === collegeFilter;
    const matchesLocation = locationFilter === 'all' || location === locationFilter;

    if (matchesSearch && matchesCollege && matchesLocation) {
      card.style.display = 'block';
      visibleCards++;
    } else {
      card.style.display = 'none';
    }
  });

  emptyState.classList.toggle('active', visibleCards === 0);
}

// Set active link on page load
document.addEventListener('DOMContentLoaded', setActiveLink);

// Add event listeners for filtering
document.getElementById('searchInput').addEventListener('input', filterAlumni);
document.getElementById('collegeFilter').addEventListener('change', filterAlumni);
document.getElementById('locationFilter').addEventListener('change', filterAlumni);

// Initial filter call
filterAlumni();