# React Native User Management App

A simple React Native app for managing users. You can login, view users, **add new users**, **update existing users**, and **delete users**. It uses **Redux**for state management and **React Navigation** for screen navigation.





## Features

### User Management (CRUD)
- **Login Screen** – A simple login form with email and password validation.
- **Users List Screen** – Shows all users, allows searching and navigating to user details.
- **User Details Screen** – Add or edit user details, including name, email, phone, age, and active status.
- **Delete User** – Delete users directly from the user details screen.
- **Form Validation** – Email, password, phone number, and name fields are validated.
- **Persistent Storage** – Users are saved locally using AsyncStorage, so they remain after closing the app.





### Screens

- **LoginScreen**
    - Fields: Email, Password
    - On successful login, navigates to UsersListScreen.
**UsersListScreen**
    - Shows a list of users with a search bar.
    - Displays active/inactive status with colored indicators (green = active, red = inactive).
    - Navigate to UserDetailsScreen to add/edit a user.
**UserDetailsScreen**
    - Add a new user or edit an existing user.
    - Delete a user if editing an existing one.
    - Fields: Name, Email, Phone, Age, Active Status.




### Technical Stack
- **React Native** For building the mobile app
- **TypeScript** For type safety
- **Redux Toolkit** For managing users state
- **React Navigation** For navigation between screens
- **React Hook Form** For handling forms and validations
- **AsyncStorage** For saving users data locally
- **Hooks** Custom useDebounce for search functionality





### Folder Structure


└── 📁src
    └── 📁app
        ├── store.ts
    └── 📁components
        ├── FormInput.tsx
        ├── UserForm.tsx
    └── 📁features
        └── 📁users
            ├── usersSlice.ts
    └── 📁hooks
        ├── useDebounce.ts
    └── 📁navigation
        ├── AppNavigator.tsx
    └── 📁screens
        ├── LoginScreen.tsx
        ├── UserDetailsScreen.tsx
        ├── UsersListScreen.tsx
    └── 📁types
        ├── index.ts
    └── 📁utils
        ├── inputValidations.ts
        ├── storage.js
    └── App.tsx




## How to Run

## 1. Clone the repo:
git clone https://github.com/waqar-ansari/raqmiyat.git
cd raqmiyat

## 2. Install dependencies:

npm install

## 3. Run the app:

npx react-native run-android
# or
npx react-native run-ios


## Notes
Default login credentials are set as and can be logged in with any email and password:
Email: waqar@raqmiyat.com
Password: asdfgh


###  If you have any query regarding the project kindly contact on

**waqar.78692@yahoo.com**
