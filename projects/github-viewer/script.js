document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('github-username');
    const searchBtn = document.getElementById('search-btn');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');
    const profileResult = document.getElementById('profile-result');
    const reposContainer = document.getElementById('repos-container');

    const defaultUser = 'vAbdullh';

    async function fetchGitHubUser(username) {
        showLoader();
        try {
            const [userResponse, reposResponse] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
            ]);

            if (!userResponse.ok) {
                throw new Error('User not found');
            }

            const userData = await userResponse.json();
            const reposData = await reposResponse.json();

            updateProfileUI(userData);
            updateReposUI(reposData);
            showResult();
        } catch (error) {
            showError(error.message);
        } finally {
            hideLoader();
        }
    }

    function updateProfileUI(user) {
        document.getElementById('user-avatar').src = user.avatar_url;
        document.getElementById('user-name').textContent = user.name || user.login;
        document.getElementById('user-login').textContent = `@${user.login}`;
        document.getElementById('user-login').href = user.html_url;
        document.getElementById('user-bio').textContent = user.bio || 'This user has no bio.';
        
        const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('user-joined-date').textContent = joinedDate;

        // Stats
        document.getElementById('stat-repos').textContent = user.public_repos;
        document.getElementById('stat-followers').textContent = user.followers;
        document.getElementById('stat-following').textContent = user.following;
        document.getElementById('stat-gists').textContent = user.public_gists;

        // Details
        updateDetail('detail-location', user.location);
        updateDetailLink('detail-website', user.blog);
        updateDetailLink('detail-twitter', user.twitter_username, `https://twitter.com/${user.twitter_username}`);
        updateDetail('detail-company', user.company);

        document.getElementById('view-all-link').href = `${user.html_url}?tab=repositories`;
    }

    function updateReposUI(repos) {
        reposContainer.innerHTML = '';
        if (repos.length === 0) {
            reposContainer.innerHTML = '<p class="no-repos">No public repositories found.</p>';
            return;
        }

        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-item';
            repoCard.innerHTML = `
                <div class="repo-header">
                    <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                    <span class="repo-visibility">${repo.visibility}</span>
                </div>
                <p class="repo-desc">${repo.description || 'No description available.'}</p>
                <div class="repo-meta">
                    ${repo.language ? `<span><i class="fas fa-circle" style="color: ${getLanguageColor(repo.language)}"></i> ${repo.language}</span>` : ''}
                    <span><i class="far fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
            `;
            reposContainer.appendChild(repoCard);
        });
    }

    function updateDetail(id, value) {
        const container = document.getElementById(`${id}-container`);
        const element = document.getElementById(id);
        if (value) {
            element.textContent = value;
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    }

    function updateDetailLink(id, value, url) {
        const container = document.getElementById(`${id}-container`);
        const element = document.getElementById(id);
        if (value) {
            element.textContent = value;
            element.href = url || (value.startsWith('http') ? value : `https://${value}`);
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    }

    function getLanguageColor(lang) {
        const colors = {
            'JavaScript': '#f1e05a',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Python': '#3572A5',
            'Java': '#b07219',
            'TypeScript': '#3178c6',
            'C++': '#f34b7d'
        };
        return colors[lang] || '#8b949e';
    }

    function showLoader() {
        loader.style.display = 'flex';
        errorMessage.style.display = 'none';
        profileResult.style.display = 'none';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    function showResult() {
        profileResult.style.display = 'block';
    }

    function showError(message) {
        errorMessage.style.display = 'flex';
        document.getElementById('error-text').textContent = message;
    }

    // Event Listeners
    searchBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) fetchGitHubUser(username);
    });

    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const username = usernameInput.value.trim();
            if (username) fetchGitHubUser(username);
        }
    });

    // Initial load
    fetchGitHubUser(defaultUser);
});
