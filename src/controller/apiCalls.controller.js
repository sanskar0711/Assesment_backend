// apiCalls.controller.js

const ApiCallsModel = require('../model/apiCalls.model');

exports.getAPICallCount = async (req, res) => {
  try {
    const apiCalls = await ApiCallsModel.findOne(); // Assuming there's only one document in the ApiCallsModel collection
    if (!apiCalls) {
      return res.status(404).json({ message: 'API call count data not found.' });
    }
    res.status(200).json(apiCalls);
  } catch (error) {
    console.error('Error fetching API call count:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
