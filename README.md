## Licence
Code released under [the MIT license](https://github.com/restylianos/bulma-tropico-template/blob/main/LICENSE).

# Blog Generator for Panopticon AI

This README explains how to use the `convert_blog.py` script to generate a static blog for the Panopticon AI website.

## Prerequisites

- Python 3.6 or higher
- Required Python packages:
  - markdown
  - pyyaml

Install the required packages using:

```
pip install markdown pyyaml
```

## Directory Structure

Ensure your project has the following structure:

```
root/
├── convert_blog.py
├── templates/
│   ├── blog_index.html
│   └── blog_post.html
├── blog/
│   ├── posts.json
│   └── markdown/
│       ├── first-post.md
│       ├── second-post.md
│       └── ...
└── css/
    └── styles.css
```

## Usage

1. Write your blog posts as Markdown files in the `blog/markdown/` directory.
2. Update the `blog/posts.json` file with metadata for each post:

   ```json
   [
     {
       "title": "Your First Blog Post",
       "date": "2024-08-11",
       "slug": "first-post",
       "excerpt": "This is a brief excerpt of your first blog post..."
     },
     {
       "title": "Another Interesting Article",
       "date": "2024-08-12",
       "slug": "interesting-article",
       "excerpt": "A short preview of another fascinating blog post..."
     }
   ]
   ```

3. Run the script:

   ```
   python convert_blog.py
   ```

4. The script will generate:
   - `blog.html` in the root directory (blog index page)
   - Individual HTML files for each blog post in the `blog/` directory

## Markdown File Format

Each Markdown file should include a YAML front matter:

```markdown
---
title: Your Blog Post Title
date: YYYY-MM-DD
slug: post-slug
excerpt: A brief excerpt of the post
---

Your blog post content goes here...
```

## Customization

- Edit `templates/blog_index.html` to modify the blog index page layout.
- Edit `templates/blog_post.html` to change the layout of individual blog posts.
- Adjust the CSS in `css/styles.css` to modify the appearance of your blog.

## Troubleshooting

- Ensure all file paths in the templates and Python script are correct.
- Check that the Markdown files have the correct front matter format.
- Verify that the `posts.json` file is properly formatted and up-to-date.

For any issues or further customization needs, refer to the `convert_blog.py` script comments or consult the developer.