const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const auth = require('../../middleware/auth');

const Player = require('../../models/Player');

// @route   GET api/roster
// @desc    Get all players
// @acess   Private
router.get('/', auth, async (req, res) => {
    try {
        const players = await Player.find({ user: req.user.id }).populate('user', [ 'name' ]);
        res.json(players);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/roster/player
// @desc    Create a player in a roster
// @acess   Private
router.post('/player', [ auth, [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('primaryPosition', 'Primary position is required').not().isEmpty(),
    check('potential', 'Potential is required').not().isEmpty(),
    check('overall', 'Overall is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('league', 'League is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { firstName, lastName, primaryPosition, secondaryPosition, potential, overall, year, league } = req.body;
    const playerFields = {};
    playerFields.user = req.user.id;

    if (firstName) playerFields.firstName = firstName;
    if (lastName) playerFields.lastName = lastName;
    if (primaryPosition) playerFields.primaryPosition = primaryPosition;
    if (secondaryPosition) playerFields.secondaryPosition = secondaryPosition;
    if (league) playerFields.league = league;
    if (year) playerFields.year = year;
    if (potential) playerFields.potential = potential;
    if (overall) playerFields.overall = overall;

    playerFields.progression = [];
    const progress = {};
    if (year) progress.year = year;
    if (league) progress.league = league;
    if (potential) progress.potential = potential;
    if (overall) progress.overall = overall;
    playerFields.progression.push(progress); 

    try {
        const player = new Player(playerFields);
        await player.save();
        res.json(player);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/roster/player/:id
// @desc    Update a player
// @acess   Private
router.put('/player/:id', [ auth, [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('primaryPosition', 'Primary position is required').not().isEmpty(),
    check('potential', 'Potential is required').not().isEmpty(),
    check('overall', 'Overall is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('league', 'League is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { firstName, lastName, primaryPosition, secondaryPosition, potential, overall, year, league } = req.body;
        const player = await Player.findById(req.params.id);
        let playerProgression = player.progression;
        let updatedProgression = [];
        const progressionExists = playerProgression.filter(progress => progress.year === year).length > 0;

        if (progressionExists) {
            updatedProgression = playerProgression.map(progress => progress.year === year ? ({ year, league, potential, overall }) : progress);
            playerProgression = updatedProgression;
        } else {
            playerProgression.unshift({ year, league, potential, overall });
        }

        const playerFields = {
            user: req.user.id,
            firstName,
            lastName,
            primaryPosition,
            secondaryPosition,
            potential,
            overall,
            year,
            league,
            progression: playerProgression
        };
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, { $set: playerFields }, { new: true });
        return res.json(updatedPlayer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/roster/player/:id
// @desc    Delete a player
// @acess   Private
router.delete('/player/:id', auth, async (req, res) => {
    try {
        const player = await Player.findByIdAndRemove(req.params.id);
        return res.json(player);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;