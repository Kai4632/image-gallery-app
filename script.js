// Global variables
let images = [];
let currentFilter = 'all';
let favorites = JSON.parse(localStorage.getItem('galleryFavorites')) || [];

// DOM elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const searchInput = document.getElementById('searchInput');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadImagesFromStorage();
    renderGallery();
    setupEventListeners();
});

// Event listeners setup
function setupEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop events
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Search functionality
    searchInput.addEventListener('input', debounce(searchImages, 300));
    
    // Modal close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// File handling functions
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    processFiles(files);
}

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
}

function processFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
        alert('Please select image files only.');
        return;
    }
    
    imageFiles.forEach(file => {
        if (file.size > 5 * 1024 * 1024) {
            alert(`File ${file.name} is too large. Maximum size is 5MB.`);
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = {
                id: Date.now() + Math.random(),
                name: file.name,
                src: e.target.result,
                date: new Date().toISOString(),
                size: file.size,
                type: file.type,
                isFavorite: favorites.includes(file.name)
            };
            
            images.unshift(imageData);
            saveImagesToStorage();
            renderGallery();
        };
        reader.readAsDataURL(file);
    });
}

// Gallery rendering
function renderGallery() {
    const filteredImages = getFilteredImages();
    
    if (filteredImages.length === 0) {
        gallery.innerHTML = `
            <div class="empty-state">
                <h3>No images found</h3>
                <p>Upload some images to get started!</p>
            </div>
        `;
        return;
    }
    
    gallery.innerHTML = filteredImages.map(image => `
        <div class="gallery-item" onclick="openModal('${image.id}')">
            <img src="${image.src}" alt="${image.name}" loading="lazy">
            <div class="gallery-item-actions">
                <button class="action-btn favorite-btn ${image.isFavorite ? 'active' : ''}" 
                        onclick="toggleFavorite(event, '${image.id}')" title="Toggle favorite">
                    ${image.isFavorite ? '❤️' : '🤍'}
                </button>
                <button class="action-btn" onclick="deleteImage(event, '${image.id}')" title="Delete image">
                    🗑️
                </button>
            </div>
            <div class="gallery-item-info">
                <h4>${image.name}</h4>
                <p>${formatDate(image.date)} • ${formatFileSize(image.size)}</p>
            </div>
        </div>
    `).join('');
}

function getFilteredImages() {
    let filtered = images;
    
    // Apply current filter
    switch (currentFilter) {
        case 'recent':
            filtered = images.slice(0, 10); // Show only 10 most recent
            break;
        case 'favorites':
            filtered = images.filter(img => img.isFavorite);
            break;
        default:
            filtered = images;
    }
    
    // Apply search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(img => 
            img.name.toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

// Search functionality
function searchImages() {
    renderGallery();
}

// Filter functionality
function filterImages(filter) {
    currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderGallery();
}

// Favorite functionality
function toggleFavorite(event, imageId) {
    event.stopPropagation();
    
    const image = images.find(img => img.id === imageId);
    if (image) {
        image.isFavorite = !image.isFavorite;
        
        if (image.isFavorite) {
            if (!favorites.includes(image.name)) {
                favorites.push(image.name);
            }
        } else {
            favorites = favorites.filter(name => name !== image.name);
        }
        
        localStorage.setItem('galleryFavorites', JSON.stringify(favorites));
        saveImagesToStorage();
        renderGallery();
    }
}

// Delete functionality
function deleteImage(event, imageId) {
    event.stopPropagation();
    
    if (confirm('Are you sure you want to delete this image?')) {
        const image = images.find(img => img.id === imageId);
        if (image) {
            // Remove from favorites if it was favorited
            if (image.isFavorite) {
                favorites = favorites.filter(name => name !== image.name);
                localStorage.setItem('galleryFavorites', JSON.stringify(favorites));
            }
            
            // Remove from images array
            images = images.filter(img => img.id !== imageId);
            saveImagesToStorage();
            renderGallery();
        }
    }
}

// Modal functionality
function openModal(imageId) {
    const image = images.find(img => img.id === imageId);
    if (image) {
        modalImg.src = image.src;
        modalTitle.textContent = image.name;
        modalDate.textContent = `Uploaded on ${formatDate(image.date)} • ${formatFileSize(image.size)}`;
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
    }
}

function closeModal() {
    modal.style.display = 'none';
}

// Storage functions
function saveImagesToStorage() {
    localStorage.setItem('galleryImages', JSON.stringify(images));
}

function loadImagesFromStorage() {
    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
        images = JSON.parse(savedImages);
        // Update favorite status based on current favorites
        images.forEach(img => {
            img.isFavorite = favorites.includes(img.name);
        });
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some sample images for demonstration
function addSampleImages() {
    const sampleImages = [
        {
            id: 'sample1',
            name: 'Sample Image 1',
            src: 'https://picsum.photos/400/300?random=1',
            date: new Date().toISOString(),
            size: 102400,
            type: 'image/jpeg',
            isFavorite: false
        },
        {
            id: 'sample2',
            name: 'Sample Image 2',
            src: 'https://picsum.photos/400/300?random=2',
            date: new Date().toISOString(),
            size: 153600,
            type: 'image/jpeg',
            isFavorite: true
        },
        {
            id: 'sample3',
            name: 'Sample Image 3',
            src: 'https://picsum.photos/400/300?random=3',
            date: new Date().toISOString(),
            size: 204800,
            type: 'image/jpeg',
            isFavorite: false
        }
    ];
    
    if (images.length === 0) {
        images = sampleImages;
        saveImagesToStorage();
        renderGallery();
    }
}

// Initialize with sample images if gallery is empty
setTimeout(addSampleImages, 1000); 