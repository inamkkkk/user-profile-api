const Profile = require('../models/Profile');
const mongoose = require('mongoose');

exports.getProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: 'Invalid profile ID' });
        }
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        next(err);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOneAndUpdate({ user: req.user._id }, req.body, {
            new: true,
            runValidators: true,
        });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (err) {
        next(err);
    }
};

exports.deleteProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOneAndDelete({ user: req.user._id });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json({ message: 'Profile deleted' });
    } catch (err) {
        next(err);
    }
};

exports.addSocialLink = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.socialLinks.push(req.body);
        await profile.save();

        res.status(201).json(profile);
    } catch (err) {
        next(err);
    }
};

exports.deleteSocialLink = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.socialLinks = profile.socialLinks.filter(link => link.id !== req.params.socialId);
        await profile.save();

        res.json(profile);
    } catch (err) {
        next(err);
    }
};