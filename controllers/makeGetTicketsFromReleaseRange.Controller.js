module.exports.makeGetTicketsFromReleaseRange = ( { getTicketsFromReleaseRange } ) => {
  return async (req) => {
    const { to, from } = req.body;
    const response = await getTicketsFromReleaseRange(to, from);
    if (Object.keys(response).length === 0){
      throw new Error('Invalid Range or Empty Result');
    }
    return {
      statusCode: 200,
      body: response
    }
  }
}
