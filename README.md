# 📸 Simple Image Gallery

A beautiful, modern image gallery built with vanilla HTML, CSS, and JavaScript. Upload, organize, and view your favorite images with an intuitive drag-and-drop interface.

## ✨ Features

- **Drag & Drop Upload**: Simply drag images onto the upload area or click to browse
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Image Search**: Find images quickly with the search functionality
- **Filtering Options**: View all images, recent uploads, or favorites only
- **Favorite System**: Mark your favorite images with a heart icon
- **Modal View**: Click any image to view it in full size
- **Local Storage**: Your images and favorites are saved locally in your browser
- **File Validation**: Supports JPG, PNG, GIF with 5MB size limit
- **Modern UI**: Beautiful gradient design with smooth animations

## 🚀 Getting Started

1. **Download the files**:
   - `index.html` - Main HTML structure
   - `styles.css` - Modern styling and responsive design
   - `script.js` - All functionality and interactions

2. **Open in browser**:
   - Simply open `index.html` in any modern web browser
   - No server setup required - it works offline!

3. **Start uploading**:
   - Drag and drop images onto the upload area
   - Or click "Choose Files" to browse your computer
   - Your images will be stored locally in your browser

## 🎯 How to Use

### Uploading Images
- **Drag & Drop**: Drag image files directly onto the upload area
- **Click to Browse**: Click the upload area or "Choose Files" button
- **Multiple Files**: Select multiple images at once

### Managing Images
- **View**: Click any image to open it in full-screen modal
- **Favorite**: Click the heart icon to mark/unmark favorites
- **Delete**: Click the trash icon to remove images
- **Search**: Type in the search box to filter images by name
- **Filter**: Use the filter buttons to view All, Recent, or Favorites

### Keyboard Shortcuts
- **Escape**: Close the modal view

## 🛠️ Technical Details

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Support
- **Formats**: JPG, JPEG, PNG, GIF
- **Size Limit**: 5MB per image
- **Storage**: Local browser storage (no server required)

### Performance Features
- **Lazy Loading**: Images load as you scroll
- **Debounced Search**: Smooth search performance
- **Optimized Rendering**: Efficient gallery updates

## 📱 Responsive Design

The gallery automatically adapts to different screen sizes:
- **Desktop**: Full grid layout with hover effects
- **Tablet**: Adjusted grid columns and spacing
- **Mobile**: Single column layout with touch-friendly controls

## 🎨 Customization

### Colors
The main color scheme uses a purple gradient. To customize:
1. Open `styles.css`
2. Look for the gradient definitions in the `body` and button styles
3. Modify the color values to match your preference

### Layout
- **Grid Columns**: Adjust `minmax(250px, 1fr)` in `.gallery` for different column sizes
- **Image Height**: Change `height: 200px` in `.gallery-item img` for different image heights
- **Spacing**: Modify `gap: 20px` in `.gallery` for different spacing

## 🔧 Troubleshooting

### Images Not Loading
- Check that the file format is supported (JPG, PNG, GIF)
- Ensure file size is under 5MB
- Try refreshing the page

### Upload Not Working
- Make sure you're using a modern browser
- Check that JavaScript is enabled
- Try dragging files instead of clicking

### Storage Issues
- Clear browser cache if you run out of storage
- Images are stored locally and won't be lost unless you clear browser data

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Enjoy your new image gallery!** 🎉
