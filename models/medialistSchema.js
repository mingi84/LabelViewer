// Todo Schema
const mongoose = require('mongoose');


const mediainfoSchema = new mongoose.Schema({
  storageid: {
    type: Number,
    required: false
  },
  mediaid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  mediapath: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  addtime: {
    type: Date,
    required: true
  },
  mediastate: {
    type: Number,
    required: true
  },
  media_createDate: {
    type: Date,
    default: Date.now,
  },
  media_last_update: {
    type: Date,
    default: Date.now,
  }
});



// Add pre hook to log the document before saving
mediainfoSchema.pre('save', function (next) {
  console.log('Before saving the document:', this);
  next();
});

module.exports = mongoose.model('mediainfo', mediainfoSchema);
