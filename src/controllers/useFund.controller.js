import { useFund } from '../models/fundUsed.model.js';
import { Project } from '../models/project.model.js';  // Ensure to import the Project model
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dfkqxasbm",
  api_key: "134148367263393",
  api_secret: "8iqgMRbkWY0Wr_PwNjTIphe5GAw",
});

const addUseFund = async (req, res) => {
  try {
    const { projectId, projectTitle,fund, fundUsedType, description } = req.body;

    // Find the project by ID using the imported Project model
    const foundProject = await Project.findById(projectId);
     console.log(foundProject);
    if (!foundProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Find the matching budget allocation for the specified fundUsedType
    const budgetAllocation = foundProject.budgetAllocation.find(budget => budget.fundType === fundUsedType);

     console.log(budgetAllocation," --->  asldkansdkfna");

    if (!budgetAllocation) {
      return res.status(400).json({ message: `No budget allocation found for fund type: ${fundUsedType}` });
    }

    // Check if the available funds are sufficient
    if (budgetAllocation.totalAmount < fund) {
      return res.status(400).json({ message: 'Fund not available' });
    }

    // Deduct the used fund from the totalAmount
    budgetAllocation.totalAmount -= fund;

    // Save the updated project with the new fund balance
    await foundProject.save();

    if (req.file) {
      // Upload file to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'raw' }, async (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return res.status(500).send('Error uploading file');
        }

        console.log('Uploaded File URL:', result.secure_url);

        try {
          // Create the new useFund entry
          const newUseFund = new useFund({
            projectId,
            projectTitle,
            fund,
            fundUsedType,
            description,
            url: result.secure_url, // Store the Cloudinary URL in the database
          });

          // Save the new useFund entry
          await newUseFund.save();

          res.status(201).json({
            message: 'File uploaded to Cloudinary, and form data saved to the database',
            data: newUseFund,
          });
        } catch (dbError) {
          console.error('Database Error:', dbError);
          res.status(500).send('Error saving data to the database');
        }
      });

      // Pipe the file buffer to the upload stream
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } else {
      console.log('No file uploaded');
      res.status(400).send('No file uploaded');
    }
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).send('Server error');
  }
};

export { addUseFund };
