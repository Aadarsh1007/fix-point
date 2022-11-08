const mongoose = require("mongoose");
const conn = require("../config/dbconnection");
var bcrypt = require("bcryptjs");
const { useradd } = require("../controllers/userControlles");
var jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  phone: {
    type: Number,
    require: true,
    
  },
  name: {
    type: String,
    require: true,
    
  },
  password: {
    type: String,
    select: true,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  var salt = bcrypt.genSaltSync(10);
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.getAuthToken = async function (data) {
  let params = {
    id: this._id,
    phone: this.phone,
    name: this.name,
  };
  var tokenValue = jwt.sign(params, process.env.SECRETKEY,{expiresIn:"20000s"});
  this.tokens = this.tokens.concat({ token: tokenValue });
  await this.save();
  return tokenValue;
};






module.exports = conn.model("users", userSchema);
