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

### Option 1: Direct Opening
Simply open `index-susu.html` in your browser.

### Option 2: Local Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Then visit http://localhost:8000/index-susu.html
```

## 📁 Project Structure

```
├── index-susu.html      # Main application file
├── styles-susu.css      # Styles and theme
├── script-susu.js       # Application logic
├── pic/                 # Image assets
│   └── *.webp          # Media card images
└── README.md           # This file
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
Edit the `cards` array in `script-susu.js`:
```javascript
const cards = [
  { id: 'unique-id', title: 'Card Title', type: 'Data', ... }
];
```

### Adjust Layout
Modify layout constants in `script-susu.js`:
```javascript
const LAYOUT = {
  CARD_W: 120,  // Card width
  CARD_H: 90,   // Card height
  GAP_X: 160,   // Horizontal gap
  GAP_Y: 120    // Vertical gap
};
```

## 📝 License

MIT License - Feel free to use and modify

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for better data visualization