class Dashboard {
    constructor() {
        this.checkAuth();
        this.initializeEventListeners();
        this.loadUserData();
        this.loadProperties();
    }

    checkAuth() {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            window.location.href = 'login.html';
        }
    }

    initializeEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Menu toggle
        document.querySelectorAll('.menu-toggle, .menu-toggle-mobile').forEach(btn => {
            btn.addEventListener('click', () => this.toggleSidebar());
        });

        // Logout
        document.querySelector('.btn-logout').addEventListener('click', () => this.logout());

        // Profile dropdown
        document.querySelector('.profile-btn').addEventListener('click', () => {
            document.querySelector('.profile-dropdown').classList.toggle('active');
        });

        document.querySelectorAll('.profile-dropdown a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.classList.contains('logout-link')) {
                    e.preventDefault();
                    this.logout();
                }
            });
        });

        // Add property form
        document.getElementById('addPropertyForm').addEventListener('submit', (e) => this.handleAddProperty(e));

        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTabClick(e));
        });

        // Settings
        document.getElementById('accountForm')?.addEventListener('submit', (e) => this.handleSaveSettings(e));
    }

    handleNavClick(e) {
        e.preventDefault();
        const section = e.currentTarget.dataset.section;
        this.showSection(section + '-section');

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Close sidebar on mobile
        if (window.innerWidth < 768) {
            this.toggleSidebar();
        }
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    toggleSidebar() {
        document.querySelector('.sidebar').classList.toggle('active');
    }

    loadUserData() {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        // Update UI with user data
        document.querySelectorAll('.profile-btn span')[0].textContent = userName;
    }

    loadProperties() {
        // Load from property-data.js
        this.displayBrowseProperties(properties);
        this.displayMyListings(myListings);
        this.displayFavorites(favorites);
    }

    displayBrowseProperties(props) {
        const container = document.getElementById('propertiesContainer');
        container.innerHTML = props.map(prop => `
            <div class="property-card">
                <div class="property-image" style="background: ${prop.image}; position: relative;">
                    <button class="favorite-btn" style="position: absolute; top: 10px; right: 10px; background: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-heart" style="color: #ccc;"></i>
                    </button>
                </div>
                <div class="property-info">
                    <h3>${prop.name}</h3>
                    <p class="price">$${prop.price.toLocaleString()}</p>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${prop.location}, ${prop.city}</p>
                    <div class="property-details">
                        <span><i class="fas fa-bed"></i> ${prop.beds} Beds</span>
                        <span><i class="fas fa-bath"></i> ${prop.baths} Baths</span>
                        <span><i class="fas fa-expand"></i> ${prop.area.toLocaleString()} sqft</span>
                    </div>
                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                        <button class="btn btn-primary" style="flex: 1; font-size: 0.85rem;">View Details</button>
                        <button class="btn btn-secondary" style="flex: 1; font-size: 0.85rem;">Contact Agent</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayMyListings(listings) {
        const tbody = document.getElementById('myListingsBody');
        tbody.innerHTML = listings.map(listing => `
            <tr>
                <td><strong>${listing.name}</strong></td>
                <td>${listing.location}</td>
                <td>${listing.type}</td>
                <td>$${listing.price.toLocaleString()}</td>
                <td><span class="status ${listing.status}">${listing.status}</span></td>
                <td>${listing.views}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    displayFavorites(faves) {
        const container = document.getElementById('favoritesContainer');
        container.innerHTML = faves.length > 0 ? faves.map(prop => `
            <div class="property-card">
                <div class="property-image" style="background: ${prop.image};"></div>
                <div class="property-info">
                    <h3>${prop.name}</h3>
                    <p class="price">$${prop.price.toLocaleString()}</p>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${prop.location}</p>
                    <div class="property-details">
                        <span><i class="fas fa-bed"></i> ${prop.beds} Beds</span>
                        <span><i class="fas fa-bath"></i> ${prop.baths} Baths</span>
                    </div>
                </div>
            </div>
        `).join('') : '<p>No favorites yet</p>';
    }

    handleAddProperty(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('propName').value,
            type: document.getElementById('propType').value,
            location: document.getElementById('propLocation').value,
            city: document.getElementById('propCity').value,
            price: parseFloat(document.getElementById('propPrice').value),
            area: parseFloat(document.getElementById('propArea').value),
            beds: parseInt(document.getElementById('propBeds').value),
            baths: parseInt(document.getElementById('propBaths').value),
            description: document.getElementById('propDescription').value,
            status: document.getElementById('propStatus').value,
            listingType: document.getElementById('propListingType').value,
            image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };

        alert('Property listed successfully! ID: #' + Math.random().toString(36).substr(2, 9).toUpperCase());
        e.target.reset();
    }

    handleTabClick(e) {
        const tabName = e.target.dataset.tab;

        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

        e.target.classList.add('active');
        document.getElementById(tabName + '-tab').classList.add('active');
    }

    handleSaveSettings(e) {
        e.preventDefault();
        alert('Settings saved successfully!');
    }

    logout() {
        localStorage.clear();
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

// Make showSection available globally
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}
