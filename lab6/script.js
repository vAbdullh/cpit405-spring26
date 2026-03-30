function setCookie(name, value, days = 7) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

let likes = 100;
let dislikes = 20;
let userVote = null;
let comments = [];
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const likeCountEl = document.getElementById('likeCount');
const dislikeCountEl = document.getElementById('dislikeCount');
const commentInput = document.getElementById('commentInput');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const commentsSection = document.getElementById('commentsSection');

function init() {
    const storedLikes = getCookie('likes');
    const storedDislikes = getCookie('dislikes');
    const storedUserVote = getCookie('userVote');
    const storedComments = getCookie('comments');

    if (storedLikes) likes = parseInt(storedLikes, 10);
    if (storedDislikes) dislikes = parseInt(storedDislikes, 10);
    if (storedUserVote) userVote = storedUserVote;
    if (storedComments) {
        try {
            comments = JSON.parse(storedComments);
        } catch (e) {
            comments = [];
        }
    }

    updateUI();
}

function updateUI() {
    likeCountEl.textContent = likes;
    dislikeCountEl.textContent = dislikes;
    
    if (userVote === 'like') {
        likeBtn.classList.add('active');
        dislikeBtn.classList.remove('active');
    } else if (userVote === 'dislike') {
        dislikeBtn.classList.add('active');
        likeBtn.classList.remove('active');
    } else {
        likeBtn.classList.remove('active');
        dislikeBtn.classList.remove('active');
    }

    commentsSection.innerHTML = '';
    comments.forEach(comment => {
        const div = document.createElement('div');
        div.className = 'comment';
        div.textContent = comment;
        commentsSection.appendChild(div);
    });
}

likeBtn.addEventListener('click', () => {
    if (userVote === 'like') return;
    
    likes++;
    if (userVote === 'dislike') {
        dislikes--;
    }
    userVote = 'like';
    
    setCookie('likes', likes);
    setCookie('dislikes', dislikes);
    setCookie('userVote', userVote);
    
    likeBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
    }, 200);

    updateUI();
});

dislikeBtn.addEventListener('click', () => {
    if (userVote === 'dislike') return; 
    
    dislikes++;
    if (userVote === 'like') {
        likes--;
    }
    userVote = 'dislike';
    
    setCookie('likes', likes);
    setCookie('dislikes', dislikes);
    setCookie('userVote', userVote);
    
    dislikeBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        dislikeBtn.style.transform = 'scale(1)';
    }, 200);

    updateUI();
});

submitBtn.addEventListener('click', () => {
    const text = commentInput.value.trim();
    if (!text) return;

    if (getCookie('hasCommented')) {
        alert("You have already submitted a comment. Reset to comment again.");
        return;
    }

    comments.push(text);
    setCookie('comments', JSON.stringify(comments));
    setCookie('hasCommented', 'true');
    commentInput.value = '';
    
    updateUI();
});

resetBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear your choices and comments?")) {
        likes = 100;
        dislikes = 20;
        userVote = null;
        comments = [];
        commentInput.value = '';

        deleteCookie('likes');
        deleteCookie('dislikes');
        deleteCookie('userVote');
        deleteCookie('comments');
        deleteCookie('hasCommented');

        updateUI();
        alert("Your choices and comments have been reset.");
    }
});

init();
