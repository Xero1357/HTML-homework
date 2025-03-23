const router = require('express').Router();
const {dataReq} = require('../controller/data-controller');

// router.get('/', (req, res) => {
//   res.status(200).send('This is the root route!');
// });

router.get('/data', dataReq);

module.exports = router;