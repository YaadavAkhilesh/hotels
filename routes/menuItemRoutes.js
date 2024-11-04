const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Post route to add a menuitem
router.post('/', async (req, res) => {
    try{
        const data = req.body; // Assuming the request body contains the person data
        // Create a new Person document using the Mongoose model
        const newMenuItem = new MenuItem(data);
        // Save the new menuitem to the database
        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

// GET method to get the person
router.get('/', async (req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/:taste', async (req, res) =>{
    try{
        const taste = req.params.taste;
        if(taste == 'spicy' || taste == 'sour' || taste == 'sweet'){
            const response = await MenuItem.find({taste: taste});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error : 'Invalid taste type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});


router.put('/:id', async (req, res) => {
    try{
        const menuItemId = req.params.id; // Extract the id from URL parameter
        const updatedMenuItemData = req.body; // Updated data for the menuitem

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation 
        });

        if(!response){
            return res.status(404).json({ error: 'MenuItem not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const menuItemId = req.params.id; // Extract the id from URL parameter

        // Assuming you have a MenuItem model
        const response = await MenuItem.findByIdAndDelete(menuItemId);

        if(!response){
            return res.status(404).json({error: "MenuItem not found"});
        }

        console.log('data deleted');
        res.status(200).json({message: 'MenuItem deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;