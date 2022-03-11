const { Router } = require('express');
const documentControlles = require('../controllers/documentControlles');
const {requireAuth, checkUser} = require('../middlewares/authMiddleware');
const router = Router({ mergeParams: true });


router.all('*', checkUser, requireAuth)
router.get('/', documentControlles.getAllDocs);
router.post('/create', documentControlles.createDoc);
router.get('/:id', documentControlles.getById);
router.put('/:id', documentControlles.updateDoc);
router.delete('/:id', documentControlles.deleteDoc);


module.exports = router;