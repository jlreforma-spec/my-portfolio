# CEEL Personal Portfolio — GitHub Pages Ready

A responsive student portfolio built with plain HTML, CSS, and JavaScript. It includes a personal introduction, skills, academic experience, education, searchable/filterable projects, individual project detail pages, theme switching, and a contact form template.

## Included features
- Responsive desktop, tablet, and mobile layout
- Purple/lavender visual theme based on the previous portfolio
- Home, About, Skills, Experience, Projects, Education, CV, and Contact sections
- Project search and category filters (no page reload)
- Five individual project detail pages under `/projects/`
- Dark/light theme preference saved in browser local storage
- Accessible labels, keyboard-friendly controls, image alt text, and reduced-motion support
- SEO metadata, Open Graph metadata, `robots.txt`, `sitemap.xml`, and a 404 page
- Previous portfolio images retained in `assets/images/`

## Before publishing — personalize these items
1. Review `index.html` and edit the introduction, school, year level, location, email, education, and experience. Existing student/program details were carried over from the previous portfolio; verify they are still correct.
2. Replace the hero photo `assets/images/photo-5.jpg` if you prefer another profile image. Replace or remove any gallery/project images you do not want public.
3. Add your own CV PDF as `assets/cv.pdf`. Then edit the disabled CV buttons in `index.html` to use `<a href="assets/cv.pdf" download>` and `<a href="assets/cv.pdf" target="_blank" rel="noopener">`.
4. In `assets/site.js`, replace `your-email@example.com` with an email address you are comfortable sharing. The form uses a `mailto:` link and opens the visitor's email app; it does not send/store messages on a server. For a true online form, connect a trusted form backend and configure spam protection.
5. Replace `YOUR-USERNAME` in `index.html`, `robots.txt`, and `sitemap.xml` with your GitHub username. Update the repository name in the canonical URL and sitemap if you rename the repository.
6. Add real dates, credentials, project technologies, and external links only when you have verified information. No fabricated employment, certificates, demo URLs, or GitHub project links are included.

## Preview locally
- Extract the ZIP.
- Open the folder in Visual Studio Code.
- Use the Live Server extension, or open `index.html` in a browser.
- For best testing, use a local server so project detail pages and relative paths behave like deployment.

## Publish using GitHub Pages
1. Create a public repository named `ceel-portfolio-v2` (or choose your own name).
2. Upload the **contents** of this folder to the repository root. Do not upload only the ZIP file.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then Save.
6. Wait for GitHub Pages to publish. Your URL will look like `https://YOUR-USERNAME.github.io/ceel-portfolio-v2/`.
7. Replace the placeholder URL in metadata, `robots.txt`, and `sitemap.xml`, then commit the changes.
8. Test the public site on desktop and mobile. Check every project page, theme toggle, search/filter, and links.

## Important notes
- GitHub Pages serves static files over HTTPS but does not provide a server-side contact-form processor.
- The CV buttons are intentionally disabled until you add your own PDF.
- Do not publish passwords, student ID numbers, private documents, or contact details you do not want public.
