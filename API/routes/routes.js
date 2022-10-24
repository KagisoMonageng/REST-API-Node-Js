const express = require('express');
//const bodyParser = require('body-parser');

const multer = require('multer');// Create multer object
const imageUpload = multer({
    storage: multer.diskStorage(
        {
            destination: function (req, file, cb) {
                cb(null, 'images');
            },
            filename: function (req, file, cb) {
                cb(
                    null,
                    new Date().valueOf() + 
                    '_' +
                    file.originalname
                );
            }
        }
    ), 
});

const Model = require('../models/model');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',  //Database username
    host: 'localhost', 
    database: 'api',
    password: 'admin12345',
    port: 5432
  })
  
const router = express.Router()

// //post method
// router.post('/add', async (request, response) => {
//     const data = new Model({
//         title: request.body.title,
//         artist: request.body.artist,
//         album: request.body.album,
//         year: request.body.year
//     })

//     try {
//         const dataToSave = await data.save();
//         response.status(200).json(dataToSave)
//         response.send('New entry added successfully');
//     }catch (error) {
//         response.status(400).json({ message: error.message });
//     }


router.post('/add-image',imageUpload.single('image'), (req, res) => {
    const { filename, mimetype, size } =req.file;
    res.send('Uploaded :'+ req.file.filename);


})

router.get('/get-image/:filename', (req, res) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'images/' + filename);
    return res.sendFile(fullfilepath);
    
})

router.post('/add',(request, response) => {
    try{
        const { name, email } = request.body; 
        pool.query(
        'INSERT INTO users (name, email) VALUES ($1,$2) RETURNING identity',[name, email],
        (error, results) => {
            if (error) {
                throw error;
            }else{
                response.status(201).send('User added with ID:'+results.rows[0].identity);
            }
        })
    }
    catch (error) { response.status(400).json({ message: error.message }); }
})
// })

//post method


//get method
router.get('/find-all', async (request, response) => {
    try {
        // const data = await Model.find();
        // response.status(200).json(data);
        pool.query('SELECT * FROM users', (error, results) =>{
            if (error){
              throw error
             }
           response.status(200).json(results.rows)
        })

    }catch (error) {    
        response.status(400).json({ message: error.message });
    }
    
})

//delete method
router.delete('/delete/:id', async (request, response) =>{
    try {
        //const data = await Model.findByIdAndDelete(request.params.id);
        const id = parseInt(request.params.id)
 
        pool.query('DELETE FROM users WHERE identity = $1', [id], (error, results) => {
          if (error){
            response.status(400).send('Not Found');
         }else{
        response.status(200).send('Users deleted with ID: ${id}')
         }
       })
    }catch (error) {
        response.status(400).send('Caught exception');
    }
    
})

//get one
// router.get('/find-one/:title', async (request, response) =>{
//     try {
//         const data = await Model.findOne({
//             title: request.params.title
//         });
//         response.status(200).json(data);
//     }
//     catch (error) {
//         response.status(400).json({ message: error.message });
//     }
    
// })

//update
router.patch('/update/:id', async (request, response) => {
    try {
    
        const id = request.params.id;
        const {name, email} = request.body

        pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
            [name, email, id],
        (error, results) => {
        if( error) {
            throw error
        }
        response.status(200).send('User modified with ID:'+ id)
        })
        
    }
    catch (error) {
        response.status(400).json({ message: error.message });
    }
})

// module.exports = router;
module.exports = router;