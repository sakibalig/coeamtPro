import { useFund } from '../models/fundUsed.model.js';

// Controller to get all records by projectCode
const getFundsByProjectCode = async (req, res) => {
  try {
    const { projectCode } = req.params;

    // Find all records with the given projectCode
    const funds = await useFund.find({ projectCode });

    if (funds.length > 0) {
      res.status(200).json({
        message: `Found ${funds.length} records for project code ${projectCode}`,
        data: funds,
      });
    } else {
      res.status(404).json({
        message: `No records found for project code ${projectCode}`,
      });
    }
  } catch (error) {
    console.error('Error retrieving records:', error);
    res.status(500).send('Server error');
  }
};

export { getFundsByProjectCode };
