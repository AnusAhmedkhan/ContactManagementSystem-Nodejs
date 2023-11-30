const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(statusCode, "rescode");
  switch (statusCode) {
    case 404:
      res.json({ title: "Not Found", message: err.message });
      break;
    case 400:
      res.json({ title: "Validation Error", message: err.message });
      break;
    case 401:
      res.json({ title: "Unauthorized", message: err.message });
      break;
    case 403:
      res.json({ title: "forbidden", message: err.message });
      break;
    case 200:
      res.json({ title: "forbidden", message: err.message });
      break;
    default:
      console.log("All Good");
      break;
  }
};

module.exports = errorHandler;
