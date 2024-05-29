// models/Role.js
import mongoose from 'mongoose';
mongoose.set('strictPopulate', false);

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum : ['user' , 'super_admin' , 'admin' ]
  },

});

const Role = mongoose.model('Role', RoleSchema);
// Export the Role model
export default Role;