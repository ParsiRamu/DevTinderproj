
const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const RazorpayInstance = require("../utils/razorpay")
const Payment  = require("../models/payment.js")

const paymentRouter = express.Router()

paymentRouter.post("/payment/create",userAuth,async(req,res)=>{
    try{
        const {memberShiptype} = req.body;
        const {firstName,lastName,emailId}= req.user;
        const order = await RazorpayInstance.orders.create({
          amount: 50000,
          currency: "INR",
          receipt: "receipt#1",
          notes: {
            key1: "value3",
            key2: "value2",
            memberShiptype: "silver",
          },
        });

        const payment = new Payment({
            userId:req.user_id,
            paymentId: order.id,
            orderId: order.id,
            status: order.status,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            notes: order.notes
        })
        const savedPayment=  await payment.save()
        //Save in the Database
        console.log(order)
        // Return back my order details to the frontend
        res.json(...savedPayment.toJSON())
    }
    catch(err){
        return res.status(500).json({msg:err.message})

    }


})



module.exports = paymentRouter;