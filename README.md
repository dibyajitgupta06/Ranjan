# Dr. Ranjan Prashad Das Gupta - Executive Portfolio

A premium, highly responsive portfolio website designed for **Dr. Ranjan Prashad Das Gupta**, Chief Operating Officer in Healthcare & Hospital Management. 

This portfolio showcases over 25 years of healthcare operations experience, strategic leadership competencies, qualifications (Ph.D., MPH, MBA, PGD-SCM), certifications, and voluntary achievements with a modern design system tailored to healthcare tech aesthetics.

## Features
- **Executive Aesthetics**: Trustworthy and premium design featuring a slate/teal color palette.
- **Dual-Theme Support**: Instant Light/Dark mode toggling with persistence and automatic system preference matching.
- **Dynamic Timeline**: Collapsible interactive resume timeline highlighting operational milestones.
- **Credentials Filter**: Interactive filtering for professional certifications (Hospital Admin, Quality/Safety, HR/Leadership).
- **Responsive Layout**: Designed with fluid CSS Grid & Flexbox, fully optimized for mobile devices, tablets, and wide monitors.
- **Scroll Entrance Animations**: Subtle fade-in reveals powered by lightweight Intersection Observers.
- **Contact Form Validation**: Full front-end verification.

---

## Local Development & Viewing

Since this is a high-performance static website, it does not require any build tools or compilation. You can run it instantly:

### Method 1: Direct File Open
Simply double-click the [index.html](index.html) file to open it in any web browser.

### Method 2: Local HTTP Server (Recommended)
To test assets and scroll observations under correct web protocols, run a lightweight HTTP server in the project folder:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

**Using Node (npx):**
```bash
npx live-server
```

---

## Deploying to GitHub & GitHub Pages (Step-by-Step)

Follow these simple commands to publish this portfolio live to the web under a free custom domain.

### Step 1: Initialize Git Local Repository (Done)
We have already initialized a local Git repository in this folder and committed the baseline files.

### Step 2: Create a New GitHub Repository
1. Log in to your account at [GitHub](https://github.com).
2. Click **New** (or "+" in the top-right corner) to create a new repository.
3. Name it `ranjan-portfolio` or similar.
4. Leave it **Public** and **DO NOT** check any checkboxes (like "Add a README", ".gitignore", or "Choose a license") as we already have these files.
5. Click **Create Repository**.

### Step 3: Link Local Project to GitHub
In your terminal, inside the project folder, run the following commands (substitute with your real GitHub username):

```bash
# Add your GitHub remote repository link
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ranjan-portfolio.git

# Set default branch to main
git branch -M main

# Push the committed files to GitHub
git push -u origin main
```

### Step 4: Turn on GitHub Pages (Free Hosting)
1. Go to your repository settings page on GitHub.
2. In the left navigation menu, click **Pages**.
3. Under the **Build and deployment** section:
   - **Source**: Select "Deploy from a branch".
   - **Branch**: Choose `main` and directory `/ (root)`.
4. Click **Save**.
5. Within 1-2 minutes, GitHub will build your site and show a URL (e.g., `https://YOUR_GITHUB_USERNAME.github.io/ranjan-portfolio/`) where your website is live!

---

## Directory Structure
```
├── assets/
│   └── ranjan-profile.jpg   # Profile headshot
├── .gitignore               # Ignored version files
├── index.html               # Semantic HTML5 layout
├── README.md                # Deployment guidelines
├── script.js                # Interactive logic & animations
└── styles.css               # Modern layout & color styling
```
