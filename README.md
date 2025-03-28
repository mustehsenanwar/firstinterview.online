# FirstInterview.online - Early Access Waitlist

This is a landing page for FirstInterview.online, a platform that allows job seekers to create video resumes.

## Project Structure

```
firstinterview.online/
├── index.html          # Main HTML file
├── css/                # CSS stylesheets
│   └── styles.css      # Main stylesheet
├── js/                 # JavaScript files
│   └── main.js         # Main JavaScript file
├── images/             # Images for the website
├── assets/             # Other static assets
└── fonts/              # Custom fonts
```

## Features

- **Video Mosaic**: Dynamic grid of professional faces with video play icons
- **Waitlist Form**: Simple form to collect names and emails for early access
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. Clone this repository
2. Open `index.html` in your browser
3. To deploy, upload all files to your web server

## Adding Images

There are two ways to handle profile images:

### Option 1: Use Placeholders (Default)

The current implementation uses placeholder images automatically, so no additional setup is required.

### Option 2: Add Custom Images

To use your own professional images for the mosaic:

1. Create image files in the `images/` directory with these names:

   - engineer.jpg
   - marketer.jpg
   - hr.jpg
   - designer.jpg
   - finance.jpg
   - healthcare.jpg
   - teacher.jpg
   - customer-service.jpg

2. Modify `js/main.js` to use these images:

   ```js
   const professionals = [
     { role: "Software Engineer", img: "images/engineer.jpg" },
     { role: "Marketing Specialist", img: "images/marketer.jpg" },
     { role: "HR Manager", img: "images/hr.jpg" },
     { role: "Product Designer", img: "images/designer.jpg" },
     { role: "Financial Analyst", img: "images/finance.jpg" },
     { role: "Healthcare Professional", img: "images/healthcare.jpg" },
     { role: "Teacher", img: "images/teacher.jpg" },
     { role: "Customer Service", img: "images/customer-service.jpg" },
   ];
   ```

3. Also add back the image fallback code:
   ```js
   // Create image with placeholder if needed
   const img = document.createElement("img");
   img.src = person.img;
   img.alt = person.role;
   img.onerror = function () {
     this.src = `https://via.placeholder.com/300x300/4a6cf7/ffffff?text=${encodeURIComponent(
       person.role
     )}`;
   };
   ```
