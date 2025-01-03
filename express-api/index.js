require('dotenv').config();
const express = require('express');
const cors = require('cors');
const footballRoutes = require('./routes/routes'); // Importa las rutas
const { PORT = 4000, SCOREBOARDS_URL, LIVE_RESULTS_URL, CORE_URL, TEAM_DETAILS_URL } = process.env;

const app = express();

// Lista de orígenes permitidos
const allowedOrigins = [SCOREBOARDS_URL, LIVE_RESULTS_URL, CORE_URL, TEAM_DETAILS_URL];

// Configura CORS para manejar múltiples orígenes
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Permitir acceso
    } else {
      callback(new Error('Not allowed by CORS')); // Bloquear acceso
    }
  },
  methods: ['GET'], // Métodos HTTP permitidos
}));

// Configura las rutas de la API
app.use('/api', footballRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
