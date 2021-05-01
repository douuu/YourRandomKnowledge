var mongoose = require('mongoose');
var Hero = mongoose.model('Item');


var basketSchema = new mongoose.Schema({
    name : String,
    item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

mongoose.model('Basket', basketSchema);