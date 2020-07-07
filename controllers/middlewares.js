const jwt = require('jsonwebtoken');

const middlewares = {
  paginateResults: (model) => async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};


    // remove prev and next for start and end
    if (endIndex < await model.countDocuments()) {
      results.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.results = await model.find().limit(limit).skip(startIndex);
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(401);
      }
      req.user = user;
      next();
    });
  },
};

module.exports = middlewares;
