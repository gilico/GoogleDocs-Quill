const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId, Timestamp } = require('mongodb');
const User = require('./User');

let DocumentSchema = new Schema({
    title:{
        type: String, 
        required: false,
        trim: true,
    },
    content: {
        type: String, 
        required: false,
        trim: true
    },
    userCreator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    userShared: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
},{
    timestamps:true,
}
);

DocumentSchema.pre('findOneAndDelete', async function(){
    let docId = ObjectId(this.getFilter()._id);
    await User.updateMany(
        {$where: "this.documents.length > 0"},
        {$pull :{documents: docId}}
    )
});

DocumentSchema.pre('save', async function(){

   
});


let Document = mongoose.model('document', DocumentSchema);
module.exports = Document;
