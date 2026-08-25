# TravelLog - Frontend (Client)

TravelLog is a modern, responsive, and dynamic travel management platform. This repository contains the frontend client, built with React and Vite, delivering a seamless user experience for travelers, vendors, and administrators. 

🔗 **Server Repository:** [https://github.com/Ajithnp/Travel-Log-Api.git](https://github.com/Ajithnp/Travel-Log-Api.git)

## 🏗 Architecture & Design Patterns

The frontend is architected for scalability, maintainability, and clean code separation:

- **Container-Presenter Pattern:** Business logic and data fetching are strictly separated from UI rendering. Components are split into "Smart" containers and "Dumb" presenters.
- **Custom Hooks Pattern:** Heavy business logic, state management, and side effects are abstracted into reusable custom hooks, keeping components clean and focused solely on rendering.
- **Component-Driven Development:** Emphasizes highly modular and reusable components.

## 🚀 Key Features & Implementations

- **Multi-Role Dashboards:** Distinct and personalized interfaces for Users, Vendors, and Admins.
- **Form Handling & Validation:** Robust, type-safe forms powered by **React Hook Form** and **Zod** schema validation.
- **File Management:** Seamless integration with **AWS S3** for uploading and managing profile pictures, package galleries, and documents.
- **Payments:** Integrated with **Stripe** for secure checkout and booking flows.
- **Real-Time Features:** Live chat and instant notifications via WebSockets.
- **Premium UI/UX:** Smooth animations using **Framer Motion** and highly polished UI components crafted with the help of **Replit AI Agent**.

## 🛠 Tech Stack & Tools

- **Core:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS, class-variance-authority, clsx, tailwind-merge
- **UI Components:** **Shadcn UI** (Radix UI primitives) for accessible, highly customizable, and reusable components.
- **API State Management:** **TanStack Query** (React Query) for efficient data fetching, caching, synchronization, and optimistic updates.
- **Application State:** **Redux Toolkit** for managing global app state (e.g., Auth state, UI preferences).
- **Form Handling:** React Hook Form + Zod
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Network Requests:** Axios

## 🚢 Deployment

- **Hosting:** Deployed on **AWS Amplify**, providing continuous deployment, automatic SSL, and global CDN distribution.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- Backend server running locally or accessible via URL.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TravelLog/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and configure the necessary keys:
   ```env
   VITE_API_URL=your_backend_api_url
   VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 🎨 UI/UX Acknowledgments
Special thanks to the **Replit AI Agent** for assisting in crafting the stunning and modern UI components used throughout the application.




