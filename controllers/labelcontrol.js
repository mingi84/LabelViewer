const mongoose = require('mongoose');
// Model
const datasettb = require("../models/datasetSchema");
const keypointtb = require("../models/keypointSchema");

// KST Setting
var moment = require('moment-timezone');
const { query } = require('express');
moment.tz.setDefault("Asia/Seoul");

// Controller - 서비스 로직

// 첫 페이지
/*
exports.get = function (req, res) {
    console.log(res);
    console.log("------------!!Datasettb!!------------");
    datasettb.find({}, null, {}, (err, datasetlist) => {
        res.json(datasetlist);
        //res.render("todo", { todoTasks: tasks }); 
    });
};
*/

exports.datasetget = async function (req, res) {
    console.log("------------!!Datasettb!!------------");
    try {
        const datasetlist = await datasettb.find({});
        res.json(datasetlist);
    } catch (err) {
        console.error("Error fetching data from datasettb:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


// 작성
exports.datasetwrite = async function (req, res) {
    console.log(req.body);
    try {
        console.log("try");
        const newDataset = new datasettb({
            'dataset_name': req.body.dataset_name,
            'user_id': req.body.user_id, // If it's needed
            'dataset_import_type': req.body.dataset_import_type,
            'source_list_sto': req.body.source_list_sto,
            'image_location': req.body.image_location,
            'label_location': req.body.label_location,
            'kypt_id': req.body.kypt_id,
            'dataset_createDate': moment().format("YYYY-MM-DD HH:mm:ss"),
            'dataset_last_update': moment().format("YYYY-MM-DD HH:mm:ss"),
        });
        console.log(newDataset);
        const result = await newDataset.save()
            .then((result) => {
                console.log("==== Success!! Save New Dataset ====");
                console.log('New dataset saved:', result);
                console.table([{ id: result._id, dataset_name: result.dataset_name, date: result.dataset_createDate }]);
                res.status(201).json({ message: 'Data saved successfully', data: result });
            })
            .catch((err) => {
                console.error("Error during save operation:", err);
                throw err;
            });
    } catch (err) {
        console.error("==== Fail!! Save Dataset ====");
        res.status(500).json({ message: 'Error saving data', error: err });
    }
};



exports.getDatasetById = async function (req, res) {
    console.log("------------!!GetDatasetById!!------------");
    const datasetId = req.query.datasetId;


    try {
        const dataset = await datasettb.findById(datasetId).exec();

        if (!dataset) {
            res.status(404).json({ message: 'Dataset not found' });
            return;
        }

        res.json(dataset);
    } catch (err) {
        console.error('Error while getting dataset by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



//Update Dataset by ID
exports.datasetUpdate = async function (req, res) {
    console.log("------------!!Update DatasetById!!------------");
    const datasetId = req.query.dataset_id; // assuming the route is defined as "/dataset/:dataset_id"
    const updateData = {
        dataset_name: req.body.dataset_name,
        user_id: req.body.user_id,
        dataset_import_type: req.body.dataset_import_type,
        source_list_sto: req.body.source_list_sto,
        image_location: req.body.image_location,
        label_location: req.body.label_location,
        kypt_id: req.body.kypt_id,
        dataset_last_update: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    try {
        const result = await datasettb.findOneAndUpdate({ dataset_id: datasetId }, updateData, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Dataset not found' });
        }
        console.log('Dataset updated:', result);
        res.json({ message: 'Dataset updated successfully', data: result });
    } catch (err) {
        console.error('Error during update operation:', err);
        res.status(500).json({ message: 'Error updating dataset', error: err });
    }
};

exports.deleteDatasetById = async function (req, res) {
    console.log("------------!!Delete DatasetById!!------------");
    const ObjectId = mongoose.Types.ObjectId;
    const datasetId = new ObjectId(req.query.datasetId);
    console.log(datasetId);
    try {
        const result = await datasettb.deleteOne({ _id: datasetId });
        console.log(result);
        if (result.deletedCount === 0) {
            console.log('Dataset not found');
            res.status(404).json({ message: 'Dataset not found' });
        } else {
            console.log('Dataset deleted successfully');
            res.status(200).json({ message: 'Dataset deleted successfully' });
        }
    } catch (err) {
        console.error('Error during delete operation:', err);
        res.status(500).json({ message: 'Error deleting dataset', error: err });
    }
};









exports.keypointget = async function (req, res) {
    console.log("------------!!keypointtb!!------------");
    try {
        const keypointlist = await keypointtb.find({});
        res.json(keypointlist);
    } catch (err) {
        console.error("Error fetching keylist from keypointtb:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


// 작성
exports.keypointwrite = async function (req, res) {
    console.log(req.body);
    try {
        const newKeypoint = new keypointtb({
            'kypt_name': req.body.kypt_name,
            'kypt_json': req.body.kypt_json,
            'kypt_createDate': moment().format("YYYY-MM-DD HH:mm:ss"),
            'kypt_last_update': moment().format("YYYY-MM-DD HH:mm:ss"),
        });
        console.log(newKeypoint);
        const result = await newKeypoint.save()
            .then((result) => {
                console.log("==== Success!! Save New Keypoint ====");
                console.log('New Keypoint saved:', result);
                console.table([{ keyname: result.kypt_name, kypt_json: result.kypt_json, date: result.kypt_createDate }]);
                res.status(201).json({ message: 'Keyopint saved successfully', data: result });
            })
            .catch((err) => {
                console.error("Error during save operation:", err);
                throw err;
            });
    } catch (err) {
        console.error("==== Fail!! Save Keypoint ====");
        res.status(500).json({ message: 'Error saving keypoint', error: err });
    }
};




//Update Keypoint by ID
exports.keypointUpdate = async function (req, res) {
    console.log("------------!!Update KeypointById!!------------");
    const keypointId = req.query.keypointId; // assuming the route is defined as "/dataset/:dataset_id"
    const updatekeyp = {
        kypt_name: req.body.kypt_name,
        kypt_json: req.body.kypt_json,
        dataset_last_update: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    try {
        const result = await keypointtb.findByIdAndUpdate( keypointId , updatekeyp, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Keypoint Template not found' });
        }
        console.log('Keypoint Template updated:', result);
        res.json({ message: 'Keypoint Template updated successfully', data: result });
    } catch (err) {
        console.error('Error during update Keypoint Template operation:', err);
        res.status(500).json({ message: 'Error updating Keypoint Template', error: err });
    }
};




exports.getKeypById = async function (req, res) {
    console.log("------------!!GetKeypById!!------------");
    const keypointId = req.query.keypointId;


    try {
        const keypoint = await keypointtb.findById(keypointId).exec();

        if (!keypoint) {
            res.status(404).json({ message: 'keypoint not found' });
            return;
        }

        res.json(keypoint);
    } catch (err) {
        console.error('Error while getting keypoint by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};




exports.delKeypById = async function (req, res) {
    console.log("------------!!Delete KeypointById!!------------");
    const ObjectId = mongoose.Types.ObjectId;
    const keypointId = new ObjectId(req.query.keypointId);
    console.log(keypointId);
    try {
        const result = await keypointtb.deleteOne({ _id: keypointId });
        console.log(result);
        if (result.deletedCount === 0) {
            console.log('Dataset not found');
            res.status(404).json({ message: 'Dataset not found' });
        } else {
            console.log('Dataset deleted successfully');
            res.status(200).json({ message: 'Dataset deleted successfully' });
        }
    } catch (err) {
        console.error('Error during delete operation:', err);
        res.status(500).json({ message: 'Error deleting dataset', error: err });
    }
};