// models/User.js
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [2, "min length 2 charcters"],
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email!",
    ],
  },
  password: {
    type: String,
    required: true,
    min: [8, "must min Length 8 charcters"],
  },
  role: { type: Schema.Types.ObjectId, required: true, ref: 'Role' , default:config.get("database.defaultRoleId") }
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    bcrypt.hash(this.password, config.get("bcrypt.saltOrRounds"), (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });



 UserSchema.methods.generateToken = (payload , expiresIn) => {
    return jwt.sign(payload, config.get("token.secretKey"),{expiresIn});
  };
  
  const User = mongoose.model('User', UserSchema);

// Export the User model
export default User;