// All Routers Exports

/*
 새로운 routes 인덱스가 생길때마다
 리팩토링해서 함께 관리한다
 
 ex)
 const NewRouter = require('./new');
 router.use('/new', newRouter);
*/

const express = require("express");
const app = express();
const router = express.Router();

// Todo Router
const datasetapi = require('./apidataset');


// Refactoring
router.use('/apidataset', datasetapi); // http://localhost:3000/todo 로 라우팅


module.exports = router;