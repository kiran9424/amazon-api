const AddressModel = require('../models/address');
const axios = require('axios');
exports.createAddress = async (req, res) => {
    try {
        const address = new AddressModel();
        address.user = req.user._id;
        address.country = req.body.country;
        address.fullName = req.body.fullName;
        address.streetAddress = req.body.streetAddress;
        address.city = req.body.city;
        address.state = req.body.state;
        address.zipCode = req.body.zipCode;
        address.phoneNumber = req.body.phoneNumber;
        address.deliverInstructions = req.body.deliverInstructions;
        address.securityCode = req.body.securityCode;

        await address.save();
        res.status(200).json({ message: 'address created successfully', address })

    } catch (error) {
        res.status(200).json(error);
    }
}

exports.getAddress = async (req,res)=>{
    try {
        const address = await AddressModel.findOne({user:req.user._id});
        if(!address){
            res.status(200).json({message:'address not found for this user'})
        }else{
            res.status(200).json({ message: 'address fetched successfully', address })
        }
    } catch (error) {
        res.status(200).json(error);
    }
}

exports.getCountries = async( req,res)=>{
    try {
        const countries = await axios.get('https://restcountries.eu/rest/v2/all');
        if(!countries){
            res.status(200).json({message:'countries not found'})
        }else{
            res.status(200).json({ message: 'countries fetched successfully',countries:countries.data })
        }
    } catch (error) {
        res.status(200).json(error);
    }
}