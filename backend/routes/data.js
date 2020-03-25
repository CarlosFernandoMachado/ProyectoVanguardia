const { Router } = require('express');
const router = Router();

const Data = require('../models/Data');

router.get('/', async (req,res) => {
    const data = await Data.find();
    res.json(data);
});
router.post('/', async (req,res) => {
    const {distance, sensor} = req.body;
    const newdata = new Data({distance, sensor})
    await newdata.save();
    res.json({message: 'Data saved successfully'});
});

router.delete('/:id', async (req, res) => {
    await Data.findByIdAndDelete(req.params.id);
    res.send('deleted successfully');
});

module.exports = router;