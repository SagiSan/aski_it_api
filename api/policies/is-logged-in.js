module.exports = function (req, res, proceed) {
  console.log(req.me);
  if (req.me) {
    return proceed();
  }

  res.sendStatus(403);
};
