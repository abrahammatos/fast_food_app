<div align="center">
  <img src="assets/images/logo.png" alt="Fast Food Logo" width="150"/>
  <h1>Fast Food Mobile App</h1>
  <p>
    A modern, cross-platform mobile application for browsing and ordering from a fast-food menu, built with React Native and Expo.
  </p>
</div>

---

## 🚀 Features

-   **Authentication:** Secure sign-up and sign-in functionality.
-   **Profile Management:** Users can view and edit their profile information.
-   **Product Catalog:** Browse a list of available food items with details.
-   **Product Details:** View detailed information for each menu item.
-   **Shopping Cart:** Add/remove items and manage the order before checkout.
-   **Search:** Quickly find desired menu items.

## 🛠️ Tech Stack

-   **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
-   **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [NativeWind](https://www.nativewind.dev/)
-   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Backend & Database:** [Appwrite](https://appwrite.io/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/en/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Expo CLI](https://docs.expo.dev/get-started/installation/)

```bash
npm install -g expo-cli
```

## ⚙️ Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/fast-food-app.git
    cd fast-food-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Then, fill in the required values in the `.env` file with your Appwrite project credentials.

    ```dotenv
    EXPO_PUBLIC_APPWRITE_PROJECT_ID=<YOUR_APPWRITE_PROJECT_ID>
    EXPO_PUBLIC_APPWRITE_PROJECT_NAME=<YOUR_APPWRITE_PROJECT_NAME>
    EXPO_PUBLIC_APPWRITE_PLATFORM=<YOUR_APPWRITE_PLATFORM>
    EXPO_PUBLIC_APPWRITE_DATABASE_ID=<YOUR_APPWRITE_DATABASE_ID>
    EXPO_PUBLIC_APPWRITE_BUCKET_ID=<YOUR_APPWRITE_BUCKET_ID>
    EXPO_PUBLIC_APPWRITE_USER_TABLE_ID=<YOUR_APPWRITE_USER_TABLE_ID>
    EXPO_PUBLIC_APPWRITE_CATEGORIES_TABLE_ID=<YOUR_APPWRITE_CATEGORIES_TABLE_ID>
    EXPO_PUBLIC_APPWRITE_MENU_TABLE_ID=<YOUR_APPWRITE_MENU_TABLE_ID>
    EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_TABLE_ID=<YOUR_APPWRITE_CUSTOMIZATIONS_TABLE_ID>
    EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_TABLE_ID=<YOUR_APPWRITE_MENU_CUSTOMIZATIONS_TABLE_ID>
    EXPO_PUBLIC_APPWRITE_ENDPOINT=<YOUR_APPWRITE_ENDPOINT>
    ```

## ▶️ Running the Application

Once the setup is complete, you can run the application on your desired platform:

-   **To start the development server:**

    ```bash
    npx expo start
    ```

-   **To run on Android:**

    ```bash
    npm run android
    ```

-   **To run on iOS:**

    ```bash
    npm run ios
    ```

-   **To run on Web:**
    ```bash
    npm run web
    ```

This will open the Expo Dev Tools in your browser. You can then use the Expo Go app on your mobile device to scan the QR code or run the app in an emulator/simulator.

## 📜 Available Scripts

In the project directory, you can run the following scripts:

-   `npm start`: Starts the Expo development server.
-   `npm run android`: Runs the app on a connected Android device or emulator.
-   `npm run ios`: Runs the app on an iOS simulator.
-   `npm run web`: Runs the app in a web browser.
-   `npm run lint`: Lints the project files using ESLint.

## 📁 Folder Structure

The project follows a feature-based folder structure:

```
├── app/                  # Main application folder (using Expo Router)
│   ├── (auth)/           # Authentication screens
│   ├── (tabs)/           # Main app tabs (Home, Cart, Profile, etc.)
│   └── product/          # Product-related screens
├── assets/               # Static assets (fonts, icons, images)
├── components/           # Reusable UI components
├── constants/            # Global constants
├── lib/                  # Libraries and helper functions (e.g., Appwrite config)
├── store/                # State management stores (Zustand)
└── tailwind.config.js    # Tailwind CSS configuration
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.