//importing sequlize package
const Sequlize = require("sequelize");
const Op = Sequlize.Op;
//importing the gig model
const Gig = require("../model/Gig");
//setting up an empty obeject to wrap and export this modules functions
var gigController = {};

//to display the gig page
gigController.gig = (req, res) => {
  Gig.findAll()
    .then((gig) => {
      res.status(200).render("gigs", {
        data: gig,
        title: "All the Gigis",
      });
    })
    .catch((err) => console.log(err));
};

//displaying the add gig form
gigController.showForm = (req, res) => {
  res.status(200).render("addGig", { title: "Add Gig" });
};

//tempory route which uses a get method to submit/insert data in to the gig's table into the database.
gigController.addGig = (req, res) => {
  //using destructuring to pull out some variables
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email" });
  }
  if (errors.length > 0) {
    res.render("addGig", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email,
    })
      .then((gig) => res.redirect("/gigs"))
      .catch((err) => console.error(err));
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }
    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ",");
  }
};

//search function
gigController.searchGig = (req, res) => {
  const { term } = req.query;
  Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    .then((gigs) => res.render("gigs", { data: gigs, title: "Gig" }))
    .catch((err) => console.log(err));
};
gigController.showUpdateGig = (req, res) => {
  res.render("updatedGig", { title: "Update Gigs" });
};
gigController.updateGig = (req, res) => {
  const id = req.body.id;
  Gig.update(req.body, { where: { id: id } })
    .then((gigs) => res.render("index"))
    .catch((err) => console.log(err));
};
gigController.showDeleteGig = (req, res) => {
  res.render("deleteGig", { title: "Delete Gigs" });
};
gigController.deleteGig = (req, res) => {
  const id = req.body.id;
  Gig.destroy({ where: { id: id } })
    .then((gigs) => res.render("index"))
    .catch((err) => console.log(err));
};
//exporting the module
module.exports = gigController;
