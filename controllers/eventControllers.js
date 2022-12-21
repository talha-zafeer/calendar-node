const Event = require("../models/Event");

const displayEvents = (req, res) => {
  Event.find({ createdBy: req.user._id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {});
};

const createGet = (req, res) => {
  res.render("create");
};

const createPost = (req, res) => {
  const event = new Event({ ...req.body, createdBy: req.user._id });
  event
    .save()
    .then((result) => {
      res.redirect("/events");
    })
    .catch((e) => {});
};

const updateEvent = (req, res) => {
  const { id, title, location, startAt, endAt } = { ...req.body };
  console.log(req.body);

  Event.findByIdAndUpdate(
    id,
    {
      $set: { title, location, startAt, endAt },
    },
    { useFindAndModify: false }
  )
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((error) => {
      console.log(error);
    });
};

const eventDelete = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((error) => {
      console.log("error");
    });
  res.json({ redirect: "/" });
};

module.exports = {
  displayEvents,
  createGet,
  createPost,
  updateEvent,
  eventDelete,
};
