
module.exports = responsableRouter

const { newResponsable, receptionVoiture, validationPaiement } = require('../services/responsable-service');
const jwt = require('jsonwebtoken');
const { login } = require('../services/responsable-service');
const { authenticateToken } = require('../middleware/client-middleware');
const { authenticateAtelierToken } = require('../middleware/atelier-middleware');
const { authenticateFinancierToken } = require('../middleware/financier-middleware');

var responsableRouter = express.Router();

// login
responsableRouter.post('/login', login);

// ajouter un nouveau responsable
responsableRouter.post("/add", newResponsable);

//faire une réception d'une voiture
responsableRouter.post("/atelier/reception", receptionVoiture);

// validation d'une paiement 
responsableRouter.post("/financier/paiements/validation", validationPaiement)

module.exports = responsableRouter;
