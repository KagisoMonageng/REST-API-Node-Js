const express = require('express');
const Model = require('../models/model');



const router = express.Router()

//post method
router.post('/add', async (request, response) => {
    const data = new Model({
        title: request.body.title,
        artist: request.body.artist,
        album: request.body.album,
        year: request.body.year
    })

    try {
        const dataToSave = await data.save();
        response.status(200).json(dataToSave)
        response.send('New entry added successfully');
    }catch (error) {
        response.status(400).json({ message: error.message });
    }

})

//get method
router.get('/find-all', async (request, response) => {
    try {
        const data = await Model.find();
        response.status(200).json(data);

    }catch (error) {    
        response.status(400).json({ message: error.message });
    }
    
})

//delete method
router.delete('/delete/:id', async (request, response) =>{
    try {
    
        const data = await Model.findByIdAndDelete(request.params.id);
        response.send('Deleted successfully');
    }
    catch (error) {
        response.status(400).json({ message: error.message });
    }
    
})

//get one
router.get('/find-one/:title', async (request, response) =>{
    try {
        const data = await Model.findOne({
            title: request.params.title
        });
        response.status(200).json(data);
    }
    catch (error) {
        response.status(400).json({ message: error.message });
    }
    
})

//update
router.patch('/update/:id', async (request, response) => {
    try {
    
        const id = request.params.id;
        const newData = request.body;
        const data = await Model.findByIdAndUpdate(id, newData);
        response.status(200).json({ message:'Update Success'});
    }
    catch (error) {
        response.status(400).json({ message: error.message });
    }
})

module.exports = router;