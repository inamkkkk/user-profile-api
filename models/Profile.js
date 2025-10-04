const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    bio: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    socialLinks: [{
        platform: {
            type: String,
        },
        url: {
            type: String,
        },
    }],
});

module.exports = mongoose.model('Profile', profileSchema);