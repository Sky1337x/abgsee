const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
var favicon = require('serve-favicon');

const app = express();
const port = 3000;

// Load environment variables
dotenv.config({ path: './.env' });

// Set views folder correctly
app.set('views', path.join(__dirname, 'views'));

// Set view engine to Handlebars
app.set('view engine', 'hbs');

// Serve static files (like images, CSS, etc.)
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// API endpoint to get gallery images
app.get('/api/gallery-images', (req, res) => {
    const galleryPath = path.join(__dirname, 'public', 'images', 'gallery');
    
    // Create gallery folder if it doesn't exist
    if (!fs.existsSync(galleryPath)) {
        fs.mkdirSync(galleryPath, { recursive: true });
    }

    try {
        // Read all files from gallery folder
        const files = fs.readdirSync(galleryPath);
        
        // Filter only image files
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });

        // Map files to image objects with metadata
        const images = imageFiles.map((file, index) => {
            // Expected filename format: category_title_location.jpg
            // Example: events_conference_delhi.jpg
            const nameParts = file.split('_');
            const nameWithoutExt = file.replace(path.extname(file), '');
            
            let category = 'events';
            let title = nameWithoutExt;
            let location = '';

            if (nameParts.length >= 2) {
                category = nameParts[0];
                title = nameParts[1];
                location = nameParts[2] || '';
            }

            return {
                id: index,
                filename: file,
                src: `/images/gallery/${file}`,
                title: title.replace(/-/g, ' '),
                location: location.replace(/-/g, ' ').replace(path.extname(location), ''),
                category: category,
                uploadDate: fs.statSync(path.join(galleryPath, file)).mtime
            };
        });

        // Sort by upload date (newest first)
        images.sort((a, b) => b.uploadDate - a.uploadDate);

        res.json({
            success: true,
            count: images.length,
            images: images
        });

    } catch (error) {
        console.error('Error reading gallery:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to load gallery images',
            message: error.message
        });
    }
});

// Define routes
app.get('/', (req, res) => {
    res.render("index"); // render index.hbs
});

app.get('/notices', (req, res) => {
  res.render("notices"); // render notices.hbs
});

app.get('/gallery', (req, res) => {
  res.render("gallery"); // render gallery.hbs
});

app.get('/memberlist', (req, res) => {
  res.render("members_list"); // render members_list.hbs
});

app.get('/about', (req, res) => {
  res.render("about"); // render about.hbs
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});