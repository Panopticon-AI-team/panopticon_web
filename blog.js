// blog.js
async function fetchBlogPosts() {
    const response = await fetch('blog/posts.json');
    const posts = await response.json();
    const blogPostsContainer = document.getElementById('blog-posts');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
            <h2 class="title is-3"><a href="blog/html/${post.slug}.html">${post.title}</a></h2>
            <p class="subtitle is-6">${post.date}</p>
            <p>${post.excerpt}</p>
            <a href="blog/html/${post.slug}.html" class="button is-primary">Read More</a>
        `;
        blogPostsContainer.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', fetchBlogPosts);