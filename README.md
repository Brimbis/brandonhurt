# Professional Webpage for Brandon Hurt

This is a full-stack personal portfolio website built with **React**, **Vite**, **TailwindCSS**, **ExpressJS**, and **MongoDB**. It displays professional information stored in a MongoDB database for easy content management and updates.

---

## Project Overview

This application serves as a centralized, professional portfolio to showcase personal background, projects, skills, education, and contact information. All content is dynamically rendered based on data from a MongoDB database, ensuring seamless updates.

---

## Features

### About Me
- Displays a professional photo and name.
- Dynamic age calculation based on birth date from the database.
- Social media links.
- Biography and contact guidance.

### Projects
- Card layout for each project.
- Shows title, description, images, date created, technologies used, and project link.
- Images are stored locally; image paths are retrieved from the database.

### Education
- Card layout for each certificate or degree.
- Shows title, description, image, and date achieved.
- Includes a circular SVG-based progress bar to indicate degree completion progress.

### Skills
- Card layout displaying relevant technologies.
- Each card includes image, title, and date first learned.
- Skill images are clickable and link to their respective documentation.

### Contact
- Social media links with descriptive messages.
- Contact form to submit name, email, and message.
- Submissions are stored in the MongoDB database for later viewing.

---

## Setup Instructions

1. **Clone the repository**
    git clone https://github.com/yourusername/professional-webpage.git

2. **Frontend Setup**
    cd professional-webpage/frontend
    npm install
    npm run dev

3. **Backend Setup**
    cd professional-webpage/backend
    npm install
    nodemon server.js

4. **Database Configuration**
  - Ensure MongoDB is running locally.
  - Use MongoDB Compass to connect and manage database content.
