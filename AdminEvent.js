// Global variables
let events = [];
let editingEventId = null;
let selectedIcon = 'fas fa-calendar-alt';

// Initialize the admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    setupEventListeners();
    updatePreview(); // Initial preview update
});

// Setup event listeners
function setupEventListeners() {
    // Form input listeners for live preview
    const inputs = ['eventTitle', 'eventCategory', 'eventLocation', 'eventStartDate', 'eventEndDate', 'eventDescription', 'eventUrl'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updatePreview);
            element.addEventListener('change', updatePreview); // Ensure change events are captured for select and date inputs
        }
    });

    // Icon selector
    document.querySelectorAll('.icon-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedIcon = this.dataset.icon;
            updatePreview();
        });
    });

    // Form submission
    document.getElementById('eventForm').addEventListener('submit', handleFormSubmit);

    // Mobile menu toggle
    document.querySelector('.menu-toggle').addEventListener('click', toggleSidebar);
}

// Update live preview
function updatePreview() {
    // Get form values
    const title = document.getElementById('eventTitle')?.value || 'Event Title';
    const category = document.getElementById('eventCategory')?.value || 'Select Category';
    const location = document.getElementById('eventLocation')?.value || 'Select Location';
    const startDate = document.getElementById('eventStartDate')?.value;
    const endDate = document.getElementById('eventEndDate')?.value;
    const description = document.getElementById('eventDescription')?.value || 'Enter event description to see preview...';
    const url = document.getElementById('eventUrl')?.value || '#';

    // Update preview elements
    const previewTitle = document.getElementById('previewTitle');
    const previewType = document.getElementById('previewType');
    const previewLocation = document.getElementById('previewLocation');
    const previewDate = document.getElementById('previewDate');
    const previewDescription = document.getElementById('previewDescription');
    const previewImage = document.getElementById('previewImage');
    const applyButton = document.querySelector('.preview-actions .btn-primary');

    if (previewTitle) previewTitle.textContent = title;
    if (previewType) previewType.textContent = category;
    if (previewLocation) previewLocation.textContent = location;
    if (previewDescription) previewDescription.textContent = description;
    if (previewImage) previewImage.innerHTML = `<i class="${selectedIcon}"></i>`;
    if (applyButton) applyButton.href = url;

    // Format and update date
    let dateText = startDate ? new Date(startDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : 'Select Date';

    if (endDate) {
        dateText += ` - ${new Date(endDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })}`;
    }
    if (previewDate) previewDate.textContent = dateText;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('eventTitle').value;
    const category = document.getElementById('eventCategory').value;
    const location = document.getElementById('eventLocation').value;
    const startDate = document.getElementById('eventStartDate').value;
    const endDate = document.getElementById('eventEndDate').value;
    const description = document.getElementById('eventDescription').value;
    const url = document.getElementById('eventUrl').value;

    // Validation
    if (!title || !category || !location || !startDate || !description) {
        showMessage('error', 'Please fill in all required fields!');
        return;
    }

    const event = {
        id: editingEventId || Date.now(),
        title,
        category,
        location,
        startDate,
        endDate,
        description,
        url,
        icon: selectedIcon,
        status: 'Active',
        applicants: 0
    };

    if (editingEventId) {
        events = events.map(ev => ev.id === editingEventId ? event : ev);
        showMessage('success', 'Event updated successfully!');
    } else {
        events.push(event);
        showMessage('success', 'Event created successfully!');
    }

    saveEvents();
    renderEvents();
    updateStats();
    clearForm();
}

// Clear form
function clearForm() {
    document.getElementById('eventForm').reset();
    document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
    selectedIcon = 'fas fa-calendar-alt';
    editingEventId = null;
    document.querySelector('.btn-success').innerHTML = '<i class="fas fa-plus"></i> Create Event';
    updatePreview();
}

// Show success/error message
function showMessage(type, message) {
    const messageElement = document.getElementById(`${type}Message`);
    const messageText = document.getElementById(`${type}Text`);
    if (messageElement && messageText) {
        messageText.textContent = message;
        messageElement.classList.add('show');
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 3000);
    }
}

// Load events from localStorage
function loadEvents() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
        renderEvents();
        updateStats();
    }
}

// Save events to localStorage
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

// Render events in table
function renderEvents() {
    const tbody = document.getElementById('eventsTableBody');
    if (tbody) {
        tbody.innerHTML = '';

        events.forEach(event => {
            const row = document.createElement('tr');
            const startDate = new Date(event.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            const endDate = event.endDate ? new Date(event.endDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }) : '';
            const dateDisplay = endDate ? `${startDate} - ${endDate}` : startDate;

            row.innerHTML = `
                <td>${event.title}</td>
                <td>${event.category}</td>
                <td>${event.location}</td>
                <td>${dateDisplay}</td>
                <td>${event.status}</td>
                <td class="action-btns">
                    <button class="btn btn-primary" onclick="editEvent(${event.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="deleteEvent(${event.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Edit event
function editEvent(id) {
    const event = events.find(ev => ev.id === id);
    if (!event) return;

    editingEventId = id;
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventCategory').value = event.category;
    document.getElementById('eventLocation').value = event.location;
    document.getElementById('eventStartDate').value = event.startDate;
    document.getElementById('eventEndDate').value = event.endDate || '';
    document.getElementById('eventDescription').value = event.description;
    document.getElementById('eventUrl').value = event.url || '';

    // Update icon selection
    selectedIcon = event.icon;
    document.querySelectorAll('.icon-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.icon === event.icon);
    });

    document.querySelector('.btn-success').innerHTML = '<i class="fas fa-save"></i> Update Event';
    updatePreview();
}

// Delete event
function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(ev => ev.id !== id);
        saveEvents();
        renderEvents();
        updateStats();
        showMessage('success', 'Event deleted successfully!');
    }
}

// Update stats
function updateStats() {
    const totalEvents = events.length;
    const activeEvents = events.filter(ev => ev.status === 'Active').length;
    const completedEvents = events.filter(ev => ev.status === 'Completed').length;
    const totalApplicants = events.reduce((sum, ev) => sum + ev.applicants, 0);

    const totalEventsEl = document.getElementById('totalEvents');
    const activeEventsEl = document.getElementById('activeEvents');
    const completedEventsEl = document.getElementById('completedEvents');
    const totalApplicantsEl = document.getElementById('totalApplicants');

    if (totalEventsEl) totalEventsEl.textContent = totalEvents;
    if (activeEventsEl) activeEventsEl.textContent = activeEvents;
    if (completedEventsEl) completedEventsEl.textContent = completedEvents;
    if (totalApplicantsEl) totalApplicantsEl.textContent = totalApplicants;
}

// Toggle sidebar for mobile
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}