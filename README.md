# Microfrontend Project

This repository is a **microfrontend-based architecture** project with multiple frontend modules and a backend API. It is designed to provide scalable, maintainable, and modular web applications.

---

## 📂 Project Structure

The project is organized into the following main directories:

- **`core/`**: The main shell or container application that integrates and orchestrates all the microfrontends.
- **`express-api/`**: The backend API serving data for the frontend modules.
- **`live-results/`**: A microfrontend module for displaying live match results.
- **`scoreboards/`**: A microfrontend module for displaying match scoreboards.
- **`team-stats/`**: A microfrontend module for displaying detailed team statistics.

### Directory Layout

```
.
├── README.md                  # Main README for the project
├── core/                      # Main shell application
├── express-api/               # Backend API
├── live-results/              # Microfrontend: Live results
├── scoreboards/               # Microfrontend: Scoreboards
└── team-stats/                # Microfrontend: Team stats
```

Each directory contains its own `package.json` and `node_modules`, enabling independent development, testing, and deployment of each module.

---

## 🚀 Features

1. **Microfrontend Architecture**:
   - Decoupled development and deployment of frontend modules.
   - Independent builds for each module.

2. **Core Integration**:
   - The `core` application acts as a host, seamlessly integrating all the microfrontends.

3. **API Backend**:
   - The `express-api` directory contains an API built with Express.js to serve mock and real data to the frontends.

4. **Tailwind CSS**:
   - All frontend modules use Tailwind CSS for consistent and modern styling.

5. **Vite**:
   - Fast builds and HMR provided by Vite for all frontend modules.

6. **ESLint**:
   - Enforced coding standards across all modules.

---

## 🛠️ Installation

Follow these steps to set up the project:

### Clone the Repository

```bash
git clone <repository-url>
cd microfrontend-project
```

### Install Dependencies

Run the following commands in the **root** directory and each subdirectory:

```bash
npm install
```

---

## 🏃‍ Running the Project

### Start the API

Navigate to the `express-api` directory and start the backend server:

```bash
cd express-api
npm start
```

### Start the Core Application

Navigate to the `core` directory and start the main shell application:

```bash
cd core
npm run dev
```

### Start Microfrontends

Run the following commands in the respective directories to start each microfrontend:

#### Live Results

```bash
cd live-results
npm run dev
```

#### Scoreboards

```bash
cd scoreboards
npm run dev
```

#### Team Stats

```bash
cd team-stats
npm run dev
```

Each microfrontend will be available on a separate port (e.g., `http://localhost:3001`, `http://localhost:3002`, etc.).

---

## 🔧 Development Notes

### Environment Variables

The project uses `.env` files to manage environment-specific variables. Add these files to the respective directories:

#### Example `.env` File for `express-api`

```env
API_FOOTBALL_KEY=your_api_key_here
USE_MOCK_DATA=true
```

### Mock Data

Mock data is available in the `mocks/` directory of the `express-api` module. Set `USE_MOCK_DATA=true` in the `.env` file to use mock data during development.

### Build

Run the following command in any module to create a production build:

```bash
npm run build
```

---

## 📦 Deployment

### Microfrontends

Each microfrontend can be independently deployed to a CDN or server. The `core` application dynamically loads them at runtime.

### Backend

Deploy the `express-api` module to any Node.js-compatible hosting service (e.g., Heroku, AWS, or Vercel).

---

## 🌟 Contributions

Feel free to open issues or submit pull requests. Please ensure that all changes are tested and adhere to the existing coding standards.

---

## 🖋️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

