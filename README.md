# Q1 Growth Analysis - Knowledge Management System

A modern, interactive knowledge management system with a card-based layout for data visualization and AI-powered insights.

## 🎯 Features

- **Interactive Card Network**: Visual representation of data relationships
- **AI Assistant**: Get intelligent suggestions and insights
- **Data Overview Panel**: Real-time statistics on data saturation, nodes, and subjects
- **Drag & Drop**: Reorganize cards with smooth animations
- **Multiple Card Types**: Data, KPI, Document, Media, Checklist
- **Responsive Design**: Clean, modern UI with blue-green theme

## 🚀 Quick Start

### For First-Time Users
Open `onboarding/step1-welcome.html` in your browser to begin the guided onboarding flow:
1. Name your project
2. Upload data or connect database
3. Data cleaning (automatic)
4. Business understanding Q&A
5. Data saturation assessment
6. Enter main dashboard

### For Returning Users
Simply open `index.html` to access the main dashboard directly.

### Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Then visit:
# - New users: http://localhost:8000/onboarding/step1-welcome.html
# - Existing users: http://localhost:8000/index.html
```

### GitHub Pages
Visit the live demo: [Your GitHub Pages URL]

## 📁 Project Structure

```
├── onboarding/          # Onboarding flow (first-time users)
│   ├── step1-welcome.html      # Name project
│   ├── step2-upload.html       # Upload data
│   ├── step3-cleaning.html     # Data cleaning
│   ├── step4-qa.html           # Business Q&A
│   ├── step5-saturation.html   # Saturation check
│   ├── onboarding.css          # Onboarding styles
│   └── onboarding.js           # Onboarding logic
├── index.html           # Main application file
├── styles.css           # Styles and theme
├── script.js            # Application logic
├── bi-dashboard.html    # BI Dashboard view
├── star/                # Star Version backup (retro sci-fi style)
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── pic/                 # Image assets
│   └── *.webp          # Media card images
└── README.md            # This file
```

## 🎨 Technologies

- **Pure HTML/CSS/JavaScript** - No frameworks required
- **SVG** for connection lines and card rendering
- **CSS3** animations and transitions
- **Responsive design** principles

## 💡 Usage

1. **View Cards**: Browse the knowledge network on the left panel
2. **Select Cards**: Click any card to view details
3. **Chat with AI**: Use the right panel to ask questions
4. **Upload Data**: Click "Upload Data" in the top panel
5. **Create Views**: Use the "Create View" button for templates
6. **Auto Layout**: Reset card positions with one click

## 🔧 Customization

### Modify Card Data
Edit the `cards` array in `script.js`:
```javascript
const cards = [
  { id: 'unique-id', title: 'Card Title', type: 'Data', ... }
];
```

### Adjust Layout
Modify layout constants in `script.js`:
```javascript
const LAYOUT = {
  CARD_W: 240,  // Card width
  CARD_H: 180,  // Card height
  GAP_X: 300,   // Horizontal gap
  GAP_Y: 220    // Vertical gap
};
```

## 📝 License

MIT License - Feel free to use and modify

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for better data visualization