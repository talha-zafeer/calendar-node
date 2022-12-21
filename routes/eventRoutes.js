const { Router } = require("express");
const router = Router();
const eventController = require("../controllers/eventControllers");

router.get("/", eventController.displayEvents);
router.get("/create", eventController.createGet);
router.post("/create", eventController.createPost);
router.put("/update", eventController.updateEvent);
router.delete("/delete/:id", eventController.eventDelete);

module.exports = router;
