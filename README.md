# Ahia Gboo Frontend

Ahia Gboo is an e-commerce platform dedicated to showcasing and selling authentic African artisanal products. This repository contains the frontend implementation of the platform, built with React and modern web technologies.

## 🌟 Features

### For Customers
- Browse and search through a curated collection of African artisanal products
- View detailed product information and artisan profiles
- Secure shopping cart functionality
- User authentication and profile management
- Responsive design for all devices

### For Artisans
- Dedicated artisan dashboard
- Product management (create, update, delete)
- Profile customization
- Order tracking and management
- Analytics and insights

### General Features
- Modern, responsive UI with Tailwind CSS
- State management with Redux Toolkit
- Protected routes for authenticated users
- Form validation and error handling
- Loading states and error boundaries
- Mobile-first design approach

## 🛠️ Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Authentication:** JWT
- **Build Tool:** Vite

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ahia-gboo.git
   cd ahia-gboo/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── common/
│   │   └── forms/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── ArtisanProfile.jsx
│   │   ├── ArtisanDashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AboutUs.jsx
│   │   └── ContactUs.jsx
│   ├── store/
│   │   ├── index.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── productSlice.js
│   │       ├── cartSlice.js
│   │       └── artisanSlice.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── artisanService.js
│   ├── utils/
│   ├── hooks/
│   ├── config/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication. The token is stored in localStorage and automatically included in API requests through an Axios interceptor.

## 🎨 Styling

The application uses Tailwind CSS for styling, providing a responsive and modern design. Custom colors and components are defined in the Tailwind configuration.

## 📱 Responsive Design

The application is fully responsive and works on all device sizes:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🧪 Testing

To run tests:
```bash
npm test
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔍 Code Quality

The project uses:
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- lint-staged for staged files

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

## 📞 Support

For support, email support@ahia-gboo.com or join our Slack channel.

## 🔄 Deployment

The application can be deployed to various platforms:
- Vercel
- Netlify
- AWS Amplify
- Firebase Hosting

## 📈 Performance Optimization

The application implements various performance optimizations:
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Bundle size optimization

## 🔐 Security

Security measures implemented:
- JWT authentication
- Protected routes
- Input validation
- XSS prevention
- CSRF protection
- Secure HTTP headers

## 🌐 Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
