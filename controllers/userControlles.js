const { json } = require("express")
const { findOne } = require("../models/users")
const users = require("../models/users")
const otp = require("../models/optuser")
var bcrypt = require("bcryptjs");
// const fast2sms = require('fast-two-sms')

const client = require('twilio')("ACca324bfe96cdce122a09e7c137623201", "eb6994ecfcc1005be71809dc04d8fa37", {
    lazyLoading: true
});

exports.userlist = async (req, res) => {
    let data = await users.find()
    res.send(data)
    // middleware()
}


exports.useradd = async (req, res) => {
    let { name, phone, password } = req.body;
    let existuser = await users.findOne({ phone: req.body.phone })
    if (existuser) {
      res.status(403).render("auth-registration",{message: "User Already Exists",data:true})
    }
    else {
        let data = new users({ name, phone, password });
        let mytoken = await data.getAuthToken()
        let respond = await data.save();
       res.status(200).render("chooseEV",{message:"ok", mytoken})
  }
}


exports.login = async (req, res) => {
    if (!req.body.phone || !req.body.password) {
        res.status(401).json({ message: "please select phone/password" })
        // console.log(req.body)
    }
    let user = await users.findOne({ phone: req.body.phone });
    let responeType = {
        message:"ok"
    }
    if (user) {
        var match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            let mytoken = await user.getAuthToken()
            responeType.message = "Login Successfully";
            responeType.token = mytoken;
            responeType.user = user;
            res.status(200).render("chooseEv",{message:"ok",data :user})
            
        } else {
            res.status(401).render("login",{message:"Invalid password",data:true})
            // responeType.message = "Invalid Password"
        }
    }
    else {
        res.status(404).render("login",{message:"No user Found",data:true})
        // responeType.message = "Invalid user"
    }
//    res.status(200).render("profile",{message:"ok",data :responeType})
}

exports.forgotpassword = (req,res) => {
    res.render("forgotpassword",{data:false})
}
exports.forgotpassword1 = (req,res) => {
    res.render("forgotpassword",{ message: "Invalid OTP", data:true })
    
}
exports.forgotpassword2 = (req,res) => {
    res.render("forgotpassword",{ message: "OTP has Expire", data:true })
    
}
exports.otpverify = (req, res) => {
    res.render("otpverify")
}

exports.mobilesend = async (req, res) => {
    let data = await users.findOne({ phone: req.body.phone })
    if (data) {
        let otpcode = Math.floor((Math.random() * 10000) + 1)
        let otpdata = new otp({
            phone: req.body.phone,
            code: otpcode,
            time: new Date().getTime() + 300*1000
        })
        let otprespones = await otpdata.save()
        res.status(200).render("otpverify",{ message: "OTP SENT" ,phone:req.body.phone ,data:true})
        fastsms(req.body.phone,otpcode)
        
    } else {
        // alert("Number don't Exit")
        res.status(404).render("forgotpassword", { message: "Number don't Exit" ,data:true })
    }
   

    // res.status(200).json({message:"ok"})
}
exports.changepassword = async (req,res) => {
    
    let data = await otp.findOne({ phone: req.params.id, code: req.body.code })
    if (data) {
        let currentTime = new Date().getTime();
        let diff = data.time - currentTime
        console.log(diff)
        console.log(currentTime)
        console.log(data)
        if (diff < 0) {
            res.status(404).redirect("/forgotpassword2")
        }
        else {
            let user = await users.findOne({ phone: data.phone })
            user.password = req.body.password;
            user.save();
            res.redirect("/login")
        } 
    } else {
        res.redirect("/forgotpassword1")
        // console.log("hii forgot")
     }
    // res.render("forgotpassword")
}


const fastsms = async (mobile, otp) => {
    client.messages.create({
        body: `your Otp is ${otp} . Valid for 5 mins `,
        to: `+91${mobile}`,
        from: '+18583301869'
     }).then(message => console.log(message))
       // here you can implement your fallback code
       .catch(error => console.log(error))
}