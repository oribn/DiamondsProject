var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var mongooseUniqueValidator = require('mongoose-unique-validator');
var moment = require('moment');

var diamondSchema = new Schema({
    id: {type: Number, required: true},
    diamondID: {type: Number, required: true},
    shape: {type: String, required: true},
    weight: {type: Number, required: true},
    color: {type: String, required: true},
    Clarity: {type: String, required: true},
    date: {type: String, required: true},
    pricePerCarat: {type: String, required: true},
    priceList: {type: String, required: true}
});

// schema.plugin(mongooseUniqueValidator);


diamondSchema.statics.addDiamond = function (diamond,cb) {

        var n_diamond = new this();
        n_diamond.diamondID = diamond.diamondID;
        n_diamond.id = diamond.id;
        n_diamond.shape = diamond.shape;
        n_diamond.weight = diamond.weight;
        n_diamond.color = diamond.color;
        n_diamond.Clarity = diamond.Clarity;
        n_diamond.date =diamond.date;
        n_diamond.pricePerCarat = diamond.pricePerCarat;
        n_diamond.priceList = diamond.priceList;
        
        console.log(n_diamond);
        
        n_diamond.save(cb);
  }

diamondSchema.statics.getDiamonds = function (cb) {
    return this.model('Diamond').find(cb);
  }



  diamondSchema.statics.getDiamondsFilter = function (data,cb) {

    var startDay=new Date(data.startDate);
    var endDay=new Date(data.endDate);
    
    var start=moment(startDay).startOf('day');
    var end=moment(endDay).add(1,'days');

    start=moment(start).format();    
    end=end.toDate();
    end=end.toISOString();
    
    return this.model('Diamond').find({"date":{$gte:start,$lte:end}},cb);
    
  }


module.exports = mongoose.model('Diamond', diamondSchema);


