module.exports = app =>{
    const router = require('express').Router();
    const clientController= require('../controllers/client.controller');
    const articleController= require('../controllers/article.controller');
    const userController= require('../controllers/users.controller');
    const commandeController= require('../controllers/commande.controller');
    const FornisseurController= require('../controllers/fornisseur.controller');

    router.post('/clients', clientController.create);
    router.get('/clients', clientController.findAll);
    router.get('/clients/:id', clientController.findOne);
    router.get('/client/:id', clientController.findName);
    router.get('/clients/search/:name', clientController.findByName);
    router.delete('/clients/:id', clientController.delete);
    router.put('/clients/:id', clientController.update);

    router.post('/article', articleController.create);
    router.get('/article', articleController.findAll);
    router.get('/article/:id', articleController.findOne);
    router.put('/article/:id', articleController.update);
    router.delete('/article/:id', articleController.delete);

    router.post('/fornisseur', FornisseurController.create);
    router.get('/fornisseur', FornisseurController.findAll);
    router.get('/fornisseur/:id', FornisseurController.findOne);
    router.delete('/fornisseur/:id', FornisseurController.delete);


    router.post('/register', userController.registerUser);
    router.post('/login', userController.loginUser);

    router.post('/commande/:idclient', commandeController.create);
    router.get('/commande', commandeController.findAll);
    router.get('/commande/:id', commandeController.findOne);
    router.delete('/commande/:id', commandeController.delete);
    router.put('/commande/:id', commandeController.update);



    app.use('/api/', router);
}