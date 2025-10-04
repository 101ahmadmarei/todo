# 👻 Haunted Todo - Advanced Task Management Application

A modern, feature-rich todo application built with React, TypeScript, and Vite. Experience task management with a spooky
twist and professional-grade functionality.

## ✨ Features

### 🎯 **Core Task Management**

- **Create, Edit, Delete Tasks**: Full CRUD operations with intuitive interface
- **Task Descriptions**: Add detailed descriptions to your tasks
- **Star/Favorite Tasks**: Mark important tasks with a star system
- **Task Search**: Real-time search through task titles and descriptions
- **Task Filtering**: Filter tasks by status for better organization

*[Screenshot Placeholder: Task Management Interface]*

### 📊 **Custom Status System**

- **Dynamic Status Creation**: Create custom status categories with color coding
- **Status Management**: Edit and delete status categories
- **Color-Coded Statuses**: Visual status indicators with 7 predefined color schemes:
    - Red, Purple, Blue Light, Blue Dark, Green, Stone, Blue
- **Status Filtering**: Filter tasks by specific status
- **Bulk Status Operations**: Delete status along with associated tasks

*[Screenshot Placeholder: Status Management System]*

### 🎨 **Advanced UI/UX**

- **Responsive Design**: Fully responsive interface for mobile and desktop
- **Professional Table Layout**: Clean, organized task display with pagination
- **Interactive Dropdown Menus**: Context menus for task and status operations
- **Modern Design System**: Built with shadcn/ui components
- **Loading States & Animations**: Smooth transitions and user feedback

*[Screenshot Placeholder: Responsive Design Showcase]*

### 🌐 **Internationalization (i18n)**

- **Multi-Language Support**:
    - English (EN)
    - Arabic (AR) with full RTL support
- **Dynamic Language Switching**: Switch languages on-the-fly
- **RTL Layout Support**: Proper right-to-left layout for Arabic
- **Localized Content**: All UI text, messages, and dialogs translated

*[Screenshot Placeholder: Language Switching Demo]*

### 🎭 **Theme System**

- **Multiple Theme Support**: Light, Dark, and System themes
- **Theme Persistence**: Remembers user's theme preference
- **Dynamic Theme Switching**: Instant theme changes without reload
- **System Theme Detection**: Automatically follows OS theme preference

*[Screenshot Placeholder: Theme Switching Demo]*

### 🔐 **Authentication System**

- **Sign In/Sign Up Pages**: Complete authentication flow
- **Form Validation**: Real-time form validation with Formik
- **User Profiles**: Avatar upload and profile management
- **Protected Routes**: Secure access to application features
- **Input Validation**: Email, password, and form field validation

*[Screenshot Placeholder: Authentication Flow]*

### 💾 **Data Persistence**

- **Local Storage**: All data persists locally using Zustand
- **State Management**: Centralized state management with Zustand stores
- **Data Recovery**: Tasks and settings survive browser restarts
- **Import/Export Ready**: Architecture supports future data import/export

### 📱 **Mobile-First Design**

- **Touch-Friendly Interface**: Optimized for mobile interactions
- **Responsive Tables**: Mobile-optimized task display
- **Swipe Gestures**: Mobile-friendly navigation
- **Progressive Web App Ready**: PWA-compatible architecture

*[Screenshot Placeholder: Mobile Interface]*

### 🛠️ **Developer Experience**

- **TypeScript**: Full type safety throughout the application
- **Modern Build System**: Vite for lightning-fast development
- **Component Architecture**: Reusable, modular components
- **Custom Hooks**: Shared logic in custom React hooks
- **Error Handling**: Comprehensive error boundaries and validation

## 🚀 Tech Stack

### **Frontend**

- **React 19.1.1** - Latest React with modern features
- **TypeScript** - Full type safety and developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework

### **UI Components**

- **Radix UI** - Headless, accessible UI primitives
- **shadcn/ui** - Beautiful, reusable components
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority** - Dynamic className generation

### **State Management**

- **Zustand** - Lightweight, scalable state management
- **Persist Middleware** - Automatic data persistence

### **Forms & Validation**

- **Formik** - Build forms without tears
- **Custom Validation** - Real-time form validation

### **Styling & Theming**

- **next-themes** - Theme management system
- **tailwind-merge** - Intelligent Tailwind class merging
- **clsx** - Conditional className utility

### **Routing**

- **React Router DOM 7.9.3** - Client-side routing

### **Development Tools**

- **ESLint** - Code linting and quality
- **TypeScript Compiler** - Type checking
- **Vite Plugin React** - React integration for Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 Usage

### **Getting Started**

1. Open the application in your browser
2. Choose your preferred language (English/Arabic)
3. Select your theme (Light/Dark/System)
4. Create your first status category
5. Start adding tasks!

### **Creating Tasks**

1. Click the "Create Task" button
2. Fill in task title and description
3. Select a status from your created categories
4. Click "Create" to save

### **Managing Statuses**

1. Click "Create Status" in the header
2. Choose a name and color for your status
3. Use the status in your tasks
4. Filter tasks by status using the dropdown

### **Task Operations**

- **Star Tasks**: Click the star icon to mark favorites
- **Edit Tasks**: Use the dropdown menu (⋯) to edit
- **Delete Tasks**: Remove tasks via the dropdown menu
- **Change Status**: Quickly change task status from dropdown
- **Search**: Use the search bar to find specific tasks

## 🌟 Key Features Deep Dive

### **Responsive Table System**

- Pagination (8 items per page)
- Mobile-optimized display
- Status color indicators
- Sortable columns
- Context menus for actions

### **Internationalization**

- Complete UI translation
- RTL layout for Arabic
- Language-specific formatting
- Dynamic content switching

### **Theme Management**

- Persistent theme selection
- System theme detection
- Smooth transitions
- CSS custom properties

### **State Management Architecture**

- Modular Zustand stores
- Type-safe state updates
- Automatic persistence
- Optimistic updates

## 🎨 Screenshots

*[Add your screenshots here for each feature section]*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **shadcn/ui** for beautiful component designs
- **Tailwind CSS** for rapid styling
- **Lucide** for beautiful icons
- **Zustand** for elegant state management

---

**Built with ❤️ using React + TypeScript + Vite**
