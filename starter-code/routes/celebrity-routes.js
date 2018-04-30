const express = require('express');
const celebrityRouter  = express.Router();
const Celebrity = require("../models/celebrity-model");

/* GET home page. */
celebrityRouter.get('/', (req, res, next) => {
  Celebrity.find({})
  .then( responseFromDB => {
    // console.log(responseFromDB)
    res.render('celebrities/list-view', { celebrities: responseFromDB });
  })
  .catch( error => {
    console.log("Error while displaying: ", error );
  })

});

//CREATE - GET ROUTE
celebrityRouter.get('/add-new', (req, res, next) => {
  res.render("celebrities/new-view")
})

//CREATE - post ROUTE
celebrityRouter.post("/create", (req, res, next) => {
  const celebName = req.body.theName;
  // console.log(celebName);
  const celebOcc = req.body.theOccupation;
  const celebCP = req.body.theCatchPhrase;
  const newCelebrity = new Celebrity ({
    name: celebName,
    occupation: celebOcc,
    catch_phrase: celebCP
  })
  newCelebrity.save()
  .then( () => {
    res.redirect('/celebrities');
  })
  .catch( err => {
    console.log("Error while saving:", err)
  })
})


//EDIT - GET ROUTE

celebrityRouter.get('/edit/:id', (req, res, next) => {
  const celebId = req.params.id;
  // console.log(celebId)
  Celebrity.findById(celebId)
  .then(celebrityFromDB => {
    res.render("celebrities/edit-view", {celebrity: celebrityFromDB})
  })
}) 

//EDIT - POST ROUTE

celebrityRouter.post("/update/:id", (req, res, next) => {
  const celebId = req.params.id;
  const editedName = req.body.editedName;
  const editedOcc = req.body.editedOccupation;
  const editedCP = req.body.editedCatchPhrase;

  // console.log("editedName: ", editedName);

  Celebrity.findByIdAndUpdate(celebId, {
    name: editedName,
    occupation: editedOcc,
    catch_phrase: editedCP
  })

.then(() => {
    res.redirect(`/celebrities/${celebId}`)
})
.catch(err => {
   console.log("Error while updating: ", err)
 })
})


//DELETE

celebrityRouter.post("/:theId/delete", (req, res, next) => {
  const celebId = req.params.theId;
  Celebrity.findByIdAndRemove(celebId)
  .then(() => {
    res.redirect("/celebrities");
  })
  .catch(err => {
    console.log("Error while deleting: ", err)
  })
})



celebrityRouter.get('/:theId', (req, res, next) => {
  const celebId = req.params.theId;
  // console.log(celebId)
  Celebrity.findById(celebId)
  .then( oneCelebrityFromDB => {
    // console.log(oneCelebrityFromDB)
    res.render('celebrities/details-view', { celebrity: oneCelebrityFromDB})
  })
  .catch( error => {
    console.log("Error while getting details: ", error)
  })
})

module.exports = celebrityRouter;