//importing the packages
const express = require("express");
const router = express.Router();

var {
  gig,
  addGig,
  showForm,
  searchGig,
  updateGig,
  showUpdateGig,
  showDeleteGig,
  deleteGig,
} = require("../controller/gig_controller");

//setting up the routes
router.get("/", gig);
router.post("/add", addGig);
router.get("/add", showForm);
router.get("/search", searchGig);
router.get("/update", showUpdateGig);
router.post("/update", updateGig);
router.get("/delete", showDeleteGig);
router.post("/delete", deleteGig);

//exporting the router
module.exports = router;
