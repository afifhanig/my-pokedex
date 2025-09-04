# 📱 My Pokedex

A cross-platform Pokédex application built with **React Native + Expo**, running seamlessly on **Android, iOS, and Web**.  
This project showcases API integration, offline-first data handling, state management with **Zustand**, and testing with **Jest**.

🔗 **GitHub Repository:** [afifhanig/my-pokedex](https://github.com/afifhanig/my-pokedex)

---

## 🚀 Overview

The goal of this project is to demonstrate:

- Building a **cross-platform Expo app** (Android, iOS, Web).  
- **State management** with Zustand.  
- **Offline-first capability** – favorites are available even without internet, and changes sync automatically when back online.  
- **Testing** critical logic with Jest.  
- Clean architecture and folder structure for maintainability.

---

## ✨ Features

### 🔍 Core Features
- **PokéAPI Integration**  
  - Fetch and display Pokémon with pagination.  
  - Detail screen with name, types, abilities, and image.  

- **Favorites Management**  
  - Add/remove Pokémon from a favorites list.  
  - Favorites stored **offline** with sync when reconnected.  

- **Offline-first**  
  - Works fully offline for reading/updating favorites.  
  - Sync queued changes once online.  

- **Navigation**  
  - Powered by [Expo Router](https://expo.github.io/router) for smooth cross-platform navigation.  

- **State Management**  
  - Global state with [Zustand](https://zustand-demo.pmnd.rs/).  

- **API Handling**  
  - [Axios](https://axios-http.com/) for network requests with error handling & retries.  

- **Testing**  
  - Unit tests using [Jest](https://jestjs.io/) (see `__tests__` folder).  

---

## 🛠️ Tech Stack

- **Framework:** [Expo](https://expo.dev/) (Managed workflow)  
- **Language:** TypeScript  
- **Navigation:** Expo Router / React Navigation  
- **State Management:** Zustand  
- **API:** PokéAPI ([pokeapi.co](https://pokeapi.co/))  
- **Persistence:** AsyncStorage / localStorage (offline support)  
- **Testing:** Jest + React Native Testing Library  

---

## 📂 Project Structure

```plaintext
my-pokedex/
├── src/
│   ├── api/            # API calls (PokéAPI integration)
│   ├── components/     # Shared UI components
│   ├── store/          # Zustand stores (favorites, connectivity, etc.)
│   ├── screens/        # List & detail screens
│   ├── hooks/          # Custom hooks
│   └── utils/          # Helpers & constants
├── __tests__/          # Jest test files
├── app/                # Expo Router entry
├── app.json            # Expo app config
├── tsconfig.json       # TypeScript config
└── package.json
```

---

## 🧪 Testing
- Run unit tests with:
```bash
npm test
```

---

📲 Running the App
- Clone the repo
```bash
git clone https://github.com/afifhanig/my-pokedex.git
cd my-pokedex
```
- Install dependencies
```bash
npm install
```
- Start development server
```bash
npm run start
```
  - Android: Press a or run npm run android
  - iOS: Press i or run npm run ios
  - Web: Run npm run web

---


