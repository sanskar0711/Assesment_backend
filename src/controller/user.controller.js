const UserModel = require('../model/user.model');
const ApiCallsModel = require('../model/apiCalls.model');
const dotenv = require('dotenv').config({ path: '../../.env' });
const fs = require('fs');

// Function to log execution time
const logExecutionTime = (startTime, apiName) => {
  const endTime = new Date();
  const executionTime = endTime - startTime; // Calculate execution time in milliseconds

  // Format execution time
  const formattedExecutionTime = `${executionTime}ms`;

  // Log execution time to console
  console.log(`API '${apiName}' executed in ${formattedExecutionTime}`);

  // Log execution time to a dedicated log file (optional)
  fs.appendFileSync('execution.log', `${apiName}: ${formattedExecutionTime}\n`);
};


exports.add = async (req, res) => {
        const startTime = new Date(); // Record start time
        const {...userData} = req.body;

        console.log("Recevied Data: ", req.body);


        // Validate all the fields
        if (!userData.userName || !userData.userEmail || !userData.userPhone || !userData.userAddress) {
            return res.status(400).json({ message: "All Fields are Mandatory" });
        }


        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.userEmail)){
            return res.status(400).json({ message: "Invalid email format." });        
        }
        
        // Check if user already exists
        let existingUser = await UserModel.findOne({ userEmail: userData.userEmail })
        if (existingUser) {
            return res.status(409).json({ message: `User already exists` });
        }
      

        // If user doesn't exist, Save the user to the database
        const Details = await UserModel.create({
            ...userData
        });

        // Increment the addAPICalls count
        const apiCalls = await ApiCallsModel.findOne(); // Assuming there's only one document in the ApiModel collection
        if (apiCalls) {
            // If apiCalls document exists, update the addAPICalls count
            apiCalls.addAPICalls += 1;
            await apiCalls.save(); // Save the updated API calls count
        } else {
            // If apiCalls document doesn't exist, create a new one with addAPICalls = 1
            await ApiCallsModel.create({ addAPICalls: 1 });
        }
        //res.status(201).json(Details);
        res.status(200).json({ message: `User with email ${userData.userEmail} has been created successfully.` });

        // Call logExecutionTime function to log execution time
        logExecutionTime(startTime, 'Add');
    };
        
    exports.update = async (req, res) => {
        const startTime = new Date(); // Record start time
        const { userEmail, ...updatedData } = req.body;
    
        // Check if userEmail is provided
        if (!userEmail) {
            return res.status(400).json({ message: "User email is required for updating." });
        }
    
        // Check if user exists
        let existingUser = await UserModel.findOne({ userEmail });
    
        if (!existingUser) {
            // If user does not exist, return a response without incrementing the updateAPICalls count
            return res.status(404).json({ message: `User with email ${userEmail} does not exist.` });
        }
    
        // Update the user data
        await UserModel.findOneAndUpdate({ userEmail }, updatedData);
    
        // If user exists, update the updateAPICalls count
        const apiCalls = await ApiCallsModel.findOne(); // Assuming there's only one document in the ApiCallsModel collection
        if (apiCalls) {
            // If apiCalls document exists, update the updateAPICalls count
            apiCalls.updateAPICalls += 1;
            await apiCalls.save(); // Save the updated API calls count
        } else {
            // If apiCalls document doesn't exist, create a new one with updateAPICalls = 1
            await ApiCallsModel.create({ updateAPICalls: 1 });
        }
    
        res.status(200).json({ message: `User with email ${userEmail} has been updated successfully.` });
        // Call logExecutionTime function to log execution time
        logExecutionTime(startTime, 'Update');        
    };


        