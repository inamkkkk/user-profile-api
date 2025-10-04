const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/me', authenticate, profileController.getMe);
router.get('/:id', profileController.getProfile);
router.put('/:id', authenticate, profileController.updateProfile);
router.delete('/:id', authenticate, profileController.deleteProfile);
router.post('/:id/social', authenticate, profileController.addSocialLink);
router.delete('/:id/social/:socialId', authenticate, profileController.deleteSocialLink);

module.exports = router;