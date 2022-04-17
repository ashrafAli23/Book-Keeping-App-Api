const errorHandler = (err, req, res, next) => {
  const errStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(errStatusCode).json({ message: err.message });
  console.log(err.message);
};

module.exports = errorHandler;
