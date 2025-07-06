# 💻 Portfolio OS - Interactive Desktop Experience

A unique and innovative portfolio website that mimics a modern desktop operating system interface. Built with React Router v7, TypeScript, and Tailwind CSS.

![Portfolio OS Demo](https://placeholder-demo-image.com/portfolio-os.png)

## ✨ Features

### 🖥️ OS-Like Interface
- **Desktop Environment**: Beautiful gradient wallpapers with customizable themes
- **Draggable Windows**: Fully interactive windows with minimize, maximize, and close controls
- **Taskbar**: Start button, pinned applications, system tray with live clock
- **Start Menu**: Organized app launcher with search functionality
- **Context Menus**: Right-click anywhere for desktop options

### 📱 Responsive Design
- **Desktop Mode**: Full OS experience on larger screens
- **Mobile Mode**: Simplified interface for mobile devices
- **Adaptive Layout**: Seamlessly switches between modes

### 🎨 Theming & Customization
- **Light/Dark Themes**: Toggle between beautiful light and dark modes
- **Multiple Wallpapers**: 5+ gradient wallpapers included
- **Glassmorphism Effects**: Modern blur and transparency effects
- **Smooth Animations**: Subtle animations throughout the interface

### 🚀 Portfolio Applications

#### 📁 Projects Explorer
- Interactive project showcase
- Links to GitHub repositories and live demos
- Project descriptions and technologies used

#### 📄 Resume Viewer
- Embedded PDF viewer
- Downloadable resume
- Professional experience timeline

#### 🏆 Certificates Gallery
- Achievement and certification showcase
- Visual certificate display
- Institution and date information

#### 📝 Blog Reader
- Blog post listings
- Reading time estimates
- Category filtering

#### 👤 About Me
- Personal introduction
- Skills and technologies
- Professional background

#### 📧 Contact Form
- Interactive contact form
- Social media links
- Professional networking

#### 💻 Terminal App
- Simulated command line interface
- `neofetch` command showing system info
- Easter eggs and hidden commands

#### ⚙️ Settings
- Theme customization
- Wallpaper selection
- System preferences

### ⌨️ Keyboard Shortcuts
- **Windows/Cmd Key**: Open Start Menu
- **Alt + Tab**: Cycle through open windows
- **Escape**: Close menus and context menus
- **Right Click**: Open context menu

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-os.git
   cd portfolio-os
   ```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
npm run start
```

## 🎯 Customization Guide

### Adding Your Content

1. **Update Personal Information**
   ```typescript
   // app/components/apps/AboutApp.tsx
   // Update name, skills, background
   
   // app/components/apps/TerminalApp.tsx
   // Update neofetch information
   ```

2. **Add Your Projects**
   ```typescript
   // app/components/apps/ProjectsApp.tsx
   const projects = [
     {
       title: "Your Project",
       description: "Project description",
       technologies: ["React", "TypeScript"],
       github: "https://github.com/you/project",
       demo: "https://your-project.com"
     }
   ];
   ```

3. **Update Resume**
   ```typescript
   // app/components/apps/ResumeApp.tsx
   // Replace with your resume PDF URL
   const resumeUrl = "path/to/your/resume.pdf";
   ```

4. **Add Certificates**
   ```typescript
   // app/components/apps/CertificatesApp.tsx
   // Add your certificates and achievements
   ```

5. **Configure Contact Info**
   ```typescript
   // app/components/apps/ContactApp.tsx
   // Update email, social links, contact form
   ```

### Theming

1. **Custom Wallpapers**
   ```typescript
   // app/context/OSContext.tsx
   const defaultWallpapers = [
     'your-custom-gradient-or-image-url',
     // Add more wallpapers
   ];
   ```

2. **Theme Colors**
   ```css
   /* app/app.css */
   :root {
     --desktop-bg: your-custom-gradient;
     --glass-bg: your-custom-background;
     /* Customize other CSS variables */
   }
   ```

### Adding New Apps

1. **Create App Component**
   ```typescript
   // app/components/apps/YourNewApp.tsx
   export default function YourNewApp() {
     return (
       <div className="p-6 h-full">
         {/* Your app content */}
       </div>
     );
   }
   ```

2. **Register in Context**
   ```typescript
   // app/context/OSContext.tsx
   const appDefinitions: AppDefinition[] = [
     // ... existing apps
     {
       id: 'your-app',
       title: 'Your App',
       icon: '🎯',
       component: YourNewApp,
       defaultSize: { width: 600, height: 400 },
       category: 'portfolio'
     }
   ];
   ```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload build folder to Netlify
```

### Docker
```bash
docker build -t portfolio-os .
docker run -p 3000:3000 portfolio-os
```

## 🔧 Technical Stack

- **Framework**: React Router v7
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Drag & Drop**: React Draggable
- **Build Tool**: Vite

## 📂 Project Structure

```
app/
├── components/           # React components
│   ├── apps/            # Portfolio application components
│   ├── Desktop.tsx      # Desktop interface
│   ├── Window.tsx       # Window system
│   ├── Taskbar.tsx      # Bottom taskbar
│   └── ...
├── context/             # React context for state management
├── types/               # TypeScript type definitions
├── routes/              # React Router routes
└── app.css             # Global styles and themes
```

## 🎮 Easter Eggs & Fun Features

- **Hidden Terminal Commands**: Try typing special commands in the terminal
- **Desktop Easter Egg**: Look for the hidden egg in the bottom right
- **Window Animations**: Smooth window transitions and effects
- **System Notifications**: Fake system notifications for immersion
- **Boot Sequence**: Optional boot animation on first load

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern desktop operating systems
- Thanks to the React and TypeScript communities
- Special thanks to contributors and testers

## 📧 Contact

- **Website**: [Your Portfolio](https://your-portfolio.com)
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- **GitHub**: [Your GitHub](https://github.com/yourusername)

---

**Made with ❤️ and lots of ☕**

*Portfolio OS - Where creativity meets technology*
