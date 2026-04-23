// Configuration
const config = {
    apiKey: localStorage.getItem('unsplash_access_key') || '',
    method: 'async-await'
};

// DOM Elements
const elements = {
    apiKeyInput: document.getElementById('api-key-input'),
    saveKeyBtn: document.getElementById('save-key-btn'),
    searchInput: document.getElementById('search-input'),
    searchXhrBtn: document.getElementById('search-xhr-btn'),
    searchPromisesBtn: document.getElementById('search-promises-btn'),
    searchAsyncBtn: document.getElementById('search-async-btn'),
    gallery: document.getElementById('image-gallery'),
    loader: document.getElementById('loader'),
    setupSection: document.getElementById('setup-section')
};

// Initialize the application
function init() {
    if (config.apiKey) {
        if (elements.apiKeyInput) elements.apiKeyInput.value = 'SET'; // Masked key
        if (elements.setupSection) elements.setupSection.classList.add('hidden');
    }

    // Add event listeners
    if (elements.saveKeyBtn) elements.saveKeyBtn.addEventListener('click', saveApiKey);
    if (elements.searchXhrBtn) elements.searchXhrBtn.addEventListener('click', () => handleSearch('xhr'));
    if (elements.searchPromisesBtn) elements.searchPromisesBtn.addEventListener('click', () => handleSearch('promises'));
    if (elements.searchAsyncBtn) elements.searchAsyncBtn.addEventListener('click', () => handleSearch('async-await'));

    if (elements.searchInput) elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch('async-await');
    });
}

function saveApiKey() {
    const key = elements.apiKeyInput.value.trim();
    if (key && key !== 'SET') {
        config.apiKey = key;
        localStorage.setItem('unsplash_access_key', key);
        alert('Access Key saved locally.');
        elements.setupSection.classList.add('hidden');
    } else {
        alert('Please enter a valid key.');
    }
}

async function handleSearch(method = 'async-await') {
    const query = elements.searchInput.value.trim();
    if (!query) {
        alert('Please enter a search term.');
        return;
    }
    if (!config.apiKey) {
        alert('Please set your API key first.');
        return;
    }

    elements.gallery.innerHTML = '';
    elements.loader.classList.remove('hidden');

    try {
        let results = [];
        if (method === 'xhr') {
            results = await searchWithXHR(query);
        } else if (method === 'promises') {
            results = await searchWithPromises(query);
        } else {
            results = await searchWithAsyncAwait(query);
        }
        renderResults(results);
    } catch (error) {
        console.error(error);
        renderError(error.message);
    } finally {
        elements.loader.classList.add('hidden');
    }
}

// Method 1: XMLHttpRequest (Legacy)
function searchWithXHR(query) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`;

        xhr.open('GET', url);
        xhr.setRequestHeader('Authorization', `Client-ID ${config.apiKey}`);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                resolve(data.results);
            } else {
                reject(new Error(`API Error: ${xhr.status} ${xhr.statusText}`));
            }
        };
        xhr.onerror = () => reject(new Error('Network request failed'));
        xhr.send();
    });
}

// Method 2: Fetch with Promises (.then)
function searchWithPromises(query) {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`;

    return fetch(url, {
        headers: {
            'Authorization': `Client-ID ${config.apiKey}`
        }
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return response.json();
        })
        .then(data => data.results);
}

// Method 3: Fetch with Async/Await (Modern)
async function searchWithAsyncAwait(query) {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Client-ID ${config.apiKey}`
        }
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    return data.results;
}

function renderResults(results) {
    if (results.length === 0) {
        elements.gallery.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #888;">No images found.</div>';
        return;
    }

    results.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'image-item';
        item.innerHTML = `
            <img src="${photo.urls.small}" alt="${photo.alt_description || 'Image'}">
            <p>Photo by ${photo.user.name}</p>
        `;
        item.addEventListener('click', () => window.open(photo.links.html, '_blank'));
        elements.gallery.appendChild(item);
    });
}

function renderError(message) {
    elements.gallery.innerHTML = `<div class="error-msg" style="grid-column: 1 / -1;">Error: ${message}</div>`;
}

// Run init
init();
