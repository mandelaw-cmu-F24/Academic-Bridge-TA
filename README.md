
# Task Manager App - React + TypeScript + Vite

This project is a fully-featured Task Manager app, built with **React**, **TypeScript**, and **Vite**. The app is designed for a dynamic, responsive, and interactive user experience, with seamless support for **light and dark themes**, **i18n** (internationalization for English and French), and **CRUD functionality** for managing tasks. The app also integrates with a dummy REST API to handle CRUD operations effectively.

## Table of Contents
- [Project Features](#project-features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Folder Structure](#folder-structure)
- [Configuration and Customization](#configuration-and-customization)
- [Scripts](#scripts)
- [ESLint Configuration](#eslint-configuration)

## Project Features

### 1. **User Interface (UI) & User Experience (UX)**
   - **Responsive Design**: The app is fully responsive, designed to look great on all devices, from desktop to mobile.
   - **Smooth Animations**: Elements animate on load and interaction, enhancing the overall user experience.
   - **Dark Mode**: The app includes dark mode support, providing a seamless experience based on user preference.
  
### 2. **Internationalization (i18n)**
   - The app supports both **English and French** languages.
   - Users can easily switch between languages, with all content updating dynamically.

### 3. **CRUD Operations**
   - **Create** new tasks.
   - **Read** tasks, fetching task data from the dummy JSON API.
   - **Update** tasks by clicking on the text to edit.
   - **Delete** tasks, with confirmation for user actions.
   - **API**: The app uses a dummy API for data management, simulating real-world task handling.

### 4. **Task Overview Panel**
   - **Project Timeline**: Displays task timelines with icons for intuitive navigation.
   - **Team Management**: Simulates avatars for task assignment, enhancing task management realism.
   - **Chat Support**: Features a simulated team chat for communication on task updates.

## Technologies Used
- **React** with **Vite** for a fast, modern development environment
- **TypeScript** for type safety and better maintainability
- **Tailwind CSS** for easy, responsive styling and dark mode configuration
- **i18next** for localization
- **Lucide Icons** for high-quality, customizable icons

## Setup and Installation

### Prerequisites
- **Node.js** (version 16 or above recommended)
- **npm** or **yarn**

### Installation Steps


1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the app**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Build the app**:
   ```bash
   npm run build
   # or
   yarn build
   ```

## Folder Structure
- **src/components**: Reusable components for UI and functionality.
- **src/context**: Context providers (e.g., theme context, settings context).
- **src/i18n**: i18n configuration and language files.
- **src/hooks**: Custom hooks for shared logic.
- **src/services**: API service functions for CRUD operations.

## Configuration and Customization

### ESLint Configuration

The app follows ESLint rules with TypeScript-specific checks to ensure code quality. To expand the ESLint configuration for a production environment:
1. Configure `parserOptions`:
   ```js
   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   });
   ```

2. Install **eslint-plugin-react** for additional React-specific linting:
   ```bash
   npm install eslint-plugin-react
   ```

3. Update `eslint.config.js` to include the React plugin:
   ```js
   import react from 'eslint-plugin-react';

   export default tseslint.config({
     settings: { react: { version: '18.3' } },
     plugins: {
       react,
     },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs['jsx-runtime'].rules,
     },
   });
   ```

## Scripts
- **`npm run dev`** - Starts the app in development mode with hot reloading.
- **`npm run build`** - Builds the app for production.
- **`npm run lint`** - Lints the code using ESLint.

## API Integration
The app interacts with the [Dummy JSON Todo API](https://dummyjson.com/docs/todos) to manage tasks. It includes endpoints for **getting, adding, updating, and deleting tasks**, which helps simulate real-world usage for task management applications.

Feel free to explore and extend the app with additional features and improvements!
