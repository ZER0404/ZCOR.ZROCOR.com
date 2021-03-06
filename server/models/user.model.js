const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
  },
  createdDate: { type: Date, default: Date.now }
  
});

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;











// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     email: { type: String, unique: true, required: true },
//     hash: { type: String, required: true },

//     createdDate: { type: Date, default: Date.now }
// });

// userSchema.set('toJSON', { virtuals: true });

// module.exports = mongoose.model('User', userSchema);
