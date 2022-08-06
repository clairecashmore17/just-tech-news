const router = require('express').Router();

const apiRoutes = require('./api');


//we will send any requests make with /api to the apiRoutes file 
router.use('/api', apiRoutes);

// This is so if we make a request to an endpoint that doesnt exist
router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;