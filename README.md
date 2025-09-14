# PlusOne's - Wedding Planner App

A simple React Native (Expo) mobile app for managing your wedding guest list. It allows you to manually add guests, fetch random guest data using an API, manage RSVP statuses, and view real-time guest statistics.

---

## Features

### Core Features

1. **Guest List Management**

   - Add a guest with `Name` and `RSVP` status (Yes / No / Maybe)
   - View a complete list of added guests
   - Delete guests from the list
   - See total number of guests and confirmed (`Yes`) RSVP count

2. **Random Guest Entry (API Integration)**
   - Add a random guest using the [Random User API] with RSVP status of **Maybe**
   - Random guest details are saved to the list after confirmation
   - Friendly error handling for API failures

---

### Additional Features

- **Search** guests by name (powered by `lodash`)
- **Filter** guests based on RSVP status (Yes / No / Maybe)

---

## Tech Stack

- **React Native (Expo)**
- **Axios** – for HTTP requests
- **Lodash** – for search functionality
- **Reanimated** – for gesture handling
- **Lucide React** – for icons

---

## Getting Started

### Prerequisites

- Node.js
- Expo CLI
- Expo Go application

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/adityasriv2317/PlusOnes
   cd PlusOnes
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

---

## Screenshots

> _(Include screenshots here if available – e.g., guest list, add guest, API guest, search/filter UI)_

---

## API Used

- [https://randomuser.me/api/](https://randomuser.me/api/)

This API is used to fetch random user data (first and last name), which is then added as a guest with a default RSVP status of `Maybe`.

---

## Project Structure (Simplified)

```bash
├── app/
│   ├── _layout.tsx        # Outlines the basic structure for the app and setting up tab navigation
│   ├── welcome.tsx        # Welcome screen for app
│   ├── (tabs)/        # Creates tab layout for the app
│        ├── _layout.tsx        # Outlines the basic structure for the app and setting up tab navigation
│        ├── index.tsx        # The home screen of our app featuring the guest lists, stats, search and filer features and delete buttons
│        ├── create.tsx        # This screen has the input section to add new gust to the list by entering their name and RSVP status and the feature to add a random guest using the API
├── assets
│   └── fonts/        # This folder contains fonts for the app
│   └── images/        # This folder contains app and splash icon assets
│   └── HeartBG.jsx   # Animated Heart Background for welcome screen
├── contexts/
│   └── AppContexts.jsx   # The context provider for the app to maintain the data all over the app
├── .gitignore                  # gitignore file
├── answers.md                  # Answers to the questions in the assignment document
├── app.json                  # App configuration file
├── babel.config.js                  # React Native Reanimated plugin setup
├── README.md

## Project Folder also contains eslint.config.js, package-lock.json, package.json, tsconfig.json
```

## License

PlusOne's is not bounded by any strict license since it was an assignment project
