const express = require("express");
const router = express.Router();
const Subscriber = require("./subscriber");

/**
 * GET subscribers
 */
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    console.log(subscribers);
    res.json(subscribers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET a subscriber by id
 */
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

/**
 * POST a new subscriber
 */
router.post("/", async (req, res) => {
  try {
    const subscriber = new Subscriber({
      name: req.body.name,
      subscribedToChannel: req.body.subscribedToChannel,
    });
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

/**
 * PATCH an existing subscriber
 *
 * Note: we use patch here because we want to update just some data, instead of the whole entity using PUT
 */
router.patch("/:id", getSubscriber, async (req, res) => {
  try {
    if (req.body.name) {
      res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel) {
      res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }

    const updatedSubscriber = await res.subscriber.save();
    res.status(200).json(updatedSubscriber);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE a subscriber
 */
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.deleteOne();
    res.json({ message: "Subscriber deleted!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

async function getSubscriber(req, res, next) {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
    res.subscriber = subscriber;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
  next();
}

module.exports = router;
