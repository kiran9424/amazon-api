const moment = require('moment');
const Order = require('../models/order')
const stripe = require('stripe')(process.env.STRIPE_KEY);
const SHIPMENT_OPTIONS ={
    normal:{
        price:10.00,
        days:7
    },

    prime:{
        price:25.00,
        days:3
    }
}

//to calculate shipment days
function calculateShipment(shipmentOptions){
    const estimate = moment().add(shipmentOptions.days,"d").format("MM dd Do");

    return {estimate,price:shipmentOptions.price};
}

exports.shipment = (req,res,next)=>{
    let shipment;

    if(req.body.shipment === 'normal'){
        shipment=calculateShipment(SHIPMENT_OPTIONS.normal);
    }else{
        shipment=calculateShipment(SHIPMENT_OPTIONS.prime);
    }

    res.status(200).json({success:'true',shipment})
}

exports.createPayment = async (req,res)=>{
    try {
        let totalPrice = Math.round(req.body.totalPrice *100);
        stripe.customers.create({
            email:req.user.email
        }).then(customer=>{
            return stripe.customers.createSource(customer.id,{
                source:"tok_visa"
            })
        })
        .then(source=>{
            return stripe.charges.create({
                amount:totalPrice,
                currency:"usd",
                customer:source.customer
            })
        })
        .then(async charge =>{
            let order = new Order();
            let cart = req.body.cart;
    
            cart.map(product=>{
                order.products.push({
                    productId:product._id,
                    quantity:parseInt(product.quantity),
                    price:product.price
                })
            })
            order.owner = req.user._id;
            order.estimatedDelivery = req.body.estimatedDelivery;
            await order.save();
        })
        
    } catch (error) {
        res.status(200).json(error);
    }
}