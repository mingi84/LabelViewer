const express = require("express");
const app = express();
const router = express.Router();

// Controller 를 불러와서 exports 메소드 사용
const controller = require("../controllers/labelcontrol");

// Main
router.get('/', controller.datasetget); // http://127.0.0.1:8008/apidataset

// Write
router.post('/write', controller.datasetwrite); // http://127.0.0.1:8008/apidataset/write  test page=> http://127.0.0.1:8008/posttest

// Get dataset by ID
router.get('/getdataset', controller.getDatasetById); //http://127.0.0.1:8008/apidataset/getdataset?datasetId=64463cb109f85dcf382a7409

// Update Dataset by ID
router.post('/updataset', controller.datasetUpdate); //http://127.0.0.1:8008/apidataset/updataset?datasetId=64463cb109f85dcf382a7409

// Delete Dataset by ID
router.get('/deldataset', controller.deleteDatasetById); //http://127.0.0.1:8008/apidataset/deldataset?datasetId=644646b5d0217566d6e573c5


// Main
router.get('/keyp', controller.keypointget); // http://127.0.0.1:8008/apidataset/keyp

// Write
router.post('/keypwrite', controller.keypointwrite); // http://127.0.0.1:8008/apidataset/write  test page=> http://127.0.0.1:8008/posttest

// Update Key by ID
router.post('/updatekeyp', controller.keypointUpdate); //http://127.0.0.1:8008/apidataset/updataset?datasetId=64463cb109f85dcf382a7409

// Get Key by ID
router.get('/getkeyp', controller.getKeypById); //http://127.0.0.1:8008/apidataset/updataset?datasetId=64463cb109f85dcf382a7409

// Delete Key by ID
router.get('/delkeyp', controller.delKeypById); //http://127.0.0.1:8008/apidataset/updataset?datasetId=64463cb109f85dcf382a7409


module.exports = router;