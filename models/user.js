var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model

var shoeSchema = mongoose.Schema({
	brand: String, 
	size: String, 
    image_url: String,
}); 

var searchSchema = mongoose.Schema({
	brand_original: String, 
	brand_result: String, 
	size: String,
    original_image_url: String,
    result_image_url: String,
});

var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
    }, 
    favorite_shoes : [shoeSchema],
    history: [searchSchema],
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);