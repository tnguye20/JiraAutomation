module.exports.express_callback = ( controller ) => {
  return async (req, res) => {
    try {
      const response = await controller(req);
      const { header, statusCode, body } = response;
      if( header !== null && header !== undefined){
        res.set(header)
      }
      res.status(statusCode !== null ? statusCode : 200).json({
        body
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        isError: true,
        body: err.message
      })
    }
  }
}
