# 🎮 PlayStation Gaming Website

A modern, responsive gaming website that showcases PlayStation games with user authentication, game discovery, and interactive features.

## ✨ Features

### 🏠 **Homepage**

- **Dynamic Carousel** - Showcases latest games with smooth transitions
- **Game Categories** - Browse games by "Days of Play", "New Releases", and "Coming Soon"
- **Search Functionality** - Find games instantly with real-time search
- **VR Section** - Dedicated PlayStation VR2 showcase
- **Highest Rated Games** - Interactive carousel of top-rated games

### 👤 **User Authentication**

- **Sign Up/Sign In** - Complete user registration and login system
- **Password Recovery** - Secure password reset functionality
- **User Profiles** - Personalize your gaming profile with bio, age, and preferences
- **Session Management** - Persistent login with localStorage

### 🎯 **Game Discovery**

- **Game Search** - Find games by title with instant results
- **Genre Filtering** - Filter games by category (Shooter, RPG, Strategy, etc.)
- **Game Details** - Comprehensive game information including release dates, platforms, and descriptions
- **External Links** - Direct links to game websites and PlayStation Store

### 📞 **Contact System**

- **Contact Form** - Send messages and feedback
- **User Feedback** - Store and manage user messages
- **Responsive Design** - Works seamlessly on all devices

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.3
- **Icons**: Bootstrap Icons
- **APIs**:
  - [Free-to-Play Games Database API](https://rapidapi.com/digiwalls/api/free-to-play-games-database/) - Game data
  - [MockAPI](https://mockapi.io/) - User authentication backend
- **HTTP Client**: Axios for API requests

## 📁 Project Structure

```
playstation/
├── assets/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── images/                # Game images and icons
│   └── javascript/
│       ├── home.js           # Homepage functionality
│       ├── signin.js         # Authentication logic
│       ├── signup.js         # User registration
│       ├── game.js           # Game search and filtering
│       ├── contactus.js      # Contact form handling
│       ├── userprofile.js    # User profile management
│       └── forgetpass.js     # Password recovery
├── pages/
│   ├── signin.html          # Login page
│   ├── signup.html          # Registration page
│   ├── game.html            # Game discovery page
│   ├── contactUs.html       # Contact page
│   ├── userprofile.html     # User profile page
│   └── forgetpassword.html  # Password reset page
└── index.html               # Main homepage
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/playstation-gaming-website.git
   cd playstation-gaming-website
   ```

2. **Open the project**

   - Simply open `index.html` in your web browser
   - Or use a local server for better development experience

3. **Start exploring**
   - Navigate through different pages using the navigation menu
   - Try the search functionality to find games
   - Create an account to access all features

## 🎮 How to Use

### **Browsing Games**

1. Visit the homepage to see featured games
2. Use the search bar to find specific games
3. Click on game cards to view details
4. Filter games by genre using the dropdown menus

### **User Account**

1. Click "Sign In" to access your account
2. Create a new account if you don't have one
3. Update your profile with personal information
4. Use the contact form to send feedback

### **Game Discovery**

1. Navigate to the Games page
2. Select a genre from the first dropdown
3. Choose a specific game from the second dropdown
4. View detailed game information and screenshots

## 🔧 API Configuration

The project uses two main APIs:

### **Free-to-Play Games Database API**

- **Endpoint**: `https://free-to-play-games-database.p.rapidapi.com/api/`
- **Purpose**: Fetch game data, images, and details
- **Rate Limit**: 100 requests per month (free tier)

### **MockAPI (User Authentication)**

- **Endpoint**: `https://66681ccef53957909ff69fee.mockapi.io/users`
- **Purpose**: User registration, login, and profile management
- **Features**: CRUD operations for user data

## 🎨 Design Features

### **Responsive Design**

- Mobile-first approach
- Bootstrap grid system
- Flexible layouts for all screen sizes

### **Interactive Elements**

- Hover effects on game cards
- Smooth carousel transitions
- Dynamic search with real-time results
- Animated navigation elements

### **User Experience**

- Intuitive navigation
- Clear call-to-action buttons
- Consistent design language
- Loading states and feedback

## 🔒 Security Features

- **Input Validation** - Email format and password strength validation
- **Session Management** - Secure user session handling
- **Form Sanitization** - Prevents XSS attacks
- **Error Handling** - Graceful error messages

## 🚧 Future Enhancements

- [ ] **Enhanced Security** - Password hashing and JWT tokens
- [ ] **Game Wishlist** - Save favorite games for later
- [ ] **User Reviews** - Rate and review games
- [ ] **Dark Mode** - Toggle between light and dark themes
- [ ] **Offline Support** - Service worker for offline functionality
- [ ] **Performance Optimization** - Image lazy loading and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PlayStation** - For inspiration and branding
- **Bootstrap** - For the responsive framework
- **RapidAPI** - For the game data API
- **MockAPI** - For the backend services

## 📞 Support

If you have any questions or need support:

- Create an issue in the repository
- Contact: PlayStation@gmail.com
- Visit: [PlayStation Official Website](https://www.playstation.com/)

---

**Made with ❤️ for the gaming community**
