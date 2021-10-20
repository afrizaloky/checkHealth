const express = require("express");
const router = express.Router();
const webtorrentHealth = require("webtorrent-health");

/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get("/", function (req, res) {
  res.json({ status: 200 });
});

// GET /check
router.get("/check", function (req, res) {
  if (!req.query.magnet)
    return res.send({ error: { code: 404, message: "Missing magnet link" } });

  webtorrentHealth(
    req.query.magnet,
    {
      timeout: 2000,
    },
    function (err, data) {
      if (err) return res.send({ error: { code: 500, message: err.message } });

      result = {
        status: 200,
        result: {
          seeder: data.seeds,
          leecher: data.peers,
        },
      };
      // Send results
      res.json(result);
    }
  );
});

module.exports = router;
