import markdown
import json
import os
import yaml


def read_template(filename):
    with open(filename, "r", encoding="utf-8") as f:
        return f.read()


def write_html(filename, content):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)


def generate_blog_posts_html(posts):
    blog_posts_html = ""
    for post in posts:
        blog_posts_html += f"""
        <div class="box mb-5">
            <h2 class="title is-3"><a href="blog/{post['slug']}.html">{post['title']}</a></h2>
            <p class="subtitle is-6">{post['date']}</p>
            <p class="mb-4">{post['excerpt']}</p>
            <a href="blog/{post['slug']}.html" class="button is-primary is-red">Read More</a>
        </div>
        """
    return blog_posts_html


def convert_md_to_html(md_file, template, output_file):
    with open(md_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Split front matter and content
    _, fm, md_content = content.split("---", 2)
    front_matter = yaml.safe_load(fm)

    # Convert Markdown to HTML
    html_content = markdown.markdown(md_content.strip())

    # Replace placeholders in template
    final_html = template.replace("{{content}}", html_content)
    for key, value in front_matter.items():
        final_html = final_html.replace(f"{{{{post.{key}}}}}", str(value))

    write_html(output_file, final_html)


# Read templates
blog_index_template = read_template("templates/blog_index.html")
blog_post_template = read_template("templates/blog_post.html")

# Read posts metadata
with open("blog/posts.json", "r", encoding="utf-8") as file:
    posts = json.load(file)

# Generate blog index
blog_posts_html = generate_blog_posts_html(posts)
blog_index_html = blog_index_template.replace("{blog_posts}", blog_posts_html)
write_html("blog.html", blog_index_html)

# Generate individual blog posts
for post in posts:
    md_file = f"blog/markdown/{post['slug']}.md"
    output_file = f"blog/{post['slug']}.html"
    convert_md_to_html(md_file, blog_post_template, output_file)

print("Blog generated successfully!")
