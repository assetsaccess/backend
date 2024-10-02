const Waitlist = require('../models/waitlist');

module.exports = {
    // Add a user to the waitlist
    async createWaitlist(req, res) {
        try {
            const { name, email } = req.body;
            const exist = await Waitlist.findOne({ where: { email } });
            if (exist) {
                return res.status(400).json({ error: 'User already exists in waitlist' });
            }

            const newEntry = await Waitlist.create({ name, email });
            res.status(201).json(newEntry);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create waitlist entry' });
        }
    },

    // Get all waitlist users
    async getAllWaitlist(req, res) {
        try {
            const waitlist = await Waitlist.findAll();
            res.status(200).json(waitlist);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch waitlist' });
        }
    },

    // Update waitlist status
    async updateWaitlist(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const waitlistEntry = await Waitlist.findByPk(id);

            if (!waitlistEntry) {
                return res.status(404).json({ error: 'Entry not found' });
            }

            waitlistEntry.status = status;
            await waitlistEntry.save();

            res.status(200).json(waitlistEntry);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update waitlist entry' });
        }
    },

    // Remove from waitlist
    async deleteWaitlist(req, res) {
        try {
            const { id } = req.params;
            const waitlistEntry = await Waitlist.findByPk(id);

            if (!waitlistEntry) {
                return res.status(404).json({ error: 'Entry not found' });
            }

            await waitlistEntry.destroy();
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete waitlist entry' });
        }
    },
};
