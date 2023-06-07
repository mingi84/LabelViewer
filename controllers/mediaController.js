const mongoose = require('mongoose');
// Model
const mediainfo = require("../models/medialistSchema");

// KST Setting
const { query } = require('express');

/*----------------------------MediaInfo-------------------------------*/


exports.medialistget = async function (req, res) {
  console.log("------------!!MediaInfo!!------------");
  const { storageid, mediastate } = req.query;
  try {
    const mediainfoall = await mediainfo.find({ storageid, mediastate });
    res.json(mediainfoall);
  } catch (err) {
    console.error("Error fetching data from datasettb:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// 작성
exports.mediawrite = async function (req, res) {
  console.log(req.body);
  try {
    console.log("try");

    const { mediaid } = req.body;

    // Check if mediaid exists in the database
    const existingMedia = await mediainfo.findOne({ mediaid });

    if (existingMedia) {
      // Media already exists, update the record
      const updatedMedia = {
        'storageid': req.body.storageid,
        'mediaid': req.body.mediaid,
        'title': req.body.title,
        'mediapath': req.body.mediapath,
        'type': req.body.type,
        'addtime': req.body.addtime,
        'mediastate': req.body.mediastate,
        'mediapage': req.body.mediapage
      };

      const result = await mediainfo.findOneAndUpdate({ mediaid }, updatedMedia, { new: true });

      console.log("==== Success!! Update Media ====");
      console.log('Updated Media:', result);
      console.table([{ id: result._id, tutle: result.title, date: result.media_createDate }]);
      res.status(200).json({ message: 'Media updated successfully', data: result });
    } else {
      // Media doesn't exist, create a new record
      const newMedia = new mediainfo({
        'storageid': req.body.storageid,
        'mediaid': req.body.mediaid,
        'title': req.body.title,
        'mediapath': req.body.mediapath,
        'type': req.body.type,
        'addtime': req.body.addtime,
        'mediastate': req.body.mediastate,
        'mediapage': req.body.mediapage
      });

      const result = await newMedia.save();

      console.log("==== Success!! Save New Media ====");
      console.log('New Media saved:', result);
      console.table([{ id: result._id, tutle: result.title, date: result.media_createDate }]);
      res.status(201).json({ message: 'Media saved successfully', data: result });
    }
  } catch (err) {
    console.error("==== Fail!! Save Media ====");
    res.status(500).json({ message: 'Error saving media', error: err });
  }
};

// Delete Media by ID
exports.mediaDelete = async function (req, res) {
    console.log("------------!!Delete Media By ID!!------------");
    const mediaid = req.params.mediaid; // assuming the route is defined as "/media/:mediaid"
  
    try {
      const result = await mediainfo.findOneAndDelete({ mediaid });
  
      if (!result) {
        return res.status(404).json({ message: 'Media not found' });
      }
  
      console.log('Media deleted:', result);
      res.json({ message: 'Media deleted successfully', data: result });
    } catch (err) {
      console.error('Error during delete operation:', err);
      res.status(500).json({ message: 'Error deleting media', error: err });
    }
  };
  