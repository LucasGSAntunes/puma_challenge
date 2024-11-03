const express = require('express');
const userRouter = require('./userRouter');
const router = express.Router();

router.use('/api/users', (userRouter));

router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});


module.exports = router;