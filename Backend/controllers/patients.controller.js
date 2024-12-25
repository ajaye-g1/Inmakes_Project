const { connectToDatabase } = require('../CommonFunctions/connectDb');
const { ObjectId } = require('mongodb');

async function getAllPatients(req,res)  {
    let client;
    try {
     client = await connectToDatabase();
     const db = client.db('expenseTracker');
     const collection = db.collection('patients');
     const patients = await collection.find().toArray();
     console.log(patients);
     
     if (patients) {
         res.json({ patientsList: patients, error: false });
       } else {
         res.json({ error: true });
       }
    } catch (error) {
        console.log(error);
    }
    finally {
        if (client) {
             await client.close();
         }
    }
 
 }

 async function insertPatientDetails(req, res) {
    const patientDetails = req.body;
    let client;
    try {
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const patients = db.collection('patients');

        // Insert patient details into the 'patients' collection
        const result = await patients.insertOne(patientDetails);

        console.log("Inserted document ID:", result);

        // Check if insertion was successful
        if (result.acknowledged === true) {
            res.json({ error: false });
        } else {
            res.json({ error: true, message: "Insertion failed." });
        }
    } catch (error) {
        console.error("Error inserting patient details:", error);
        res.json({ error: true, message: "Internal server error." });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function deletePatientDetails(req, res) {
    const { id } = req.body;
    let client;
    try {
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const patients = db.collection('patients');
        const query = { _id: new ObjectId(id) };

        // Insert patients details into the 'patients' collection
        const result = await patients.deleteOne(query);

        console.log("Inserted document ID:", result);

        // Check if insertion was successful
        if (result.deletedCount > 0) {
            res.json({ error: false });
        } else {
            res.json({ error: true, message: "deletion failed." });
        }
    } catch (error) {
        console.error("Error deletion of patient details:", error);
        res.json({ error: true, message: "Internal server error." });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function getAllPatientsName(req,res)  {
    let client;
    try {
     client = await connectToDatabase();
     const db = client.db('expenseTracker');
     const collection = db.collection('patients');
     const patientNames = await collection.distinct("patientName");

     if (patientNames.length > 0) {
        const formattedDoctors = patientNames.map((patientName, index) => ({
            value: index + 1,
            label: patientName
        }));
        res.json({ patientName: formattedDoctors, error: false });
       } else {
         res.json({ error: true });
       }
    } catch (error) {
        console.log(error);
    }
    finally {
        if (client) {
             await client.close();
         }
    }
}

async function updatePatientDetails(req, res) {
    const { id, data } = req.body;
    let client;

    try {
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const patients = db.collection('patients');
        

        // Prepare the update fields
        const updateFields = {};
        if (data.patientName) updateFields.patientName	 = data.patientName;
        if (data.gender) updateFields.gender = data.gender;
        if (data.age) updateFields.age = data.age;
        const query = { _id: new ObjectId(id) };
        console.log("updateFields",updateFields);
        console.log("id",id);
        // Update the document in the 'patients' collection
        const result = await patients.updateOne( query, { $set: updateFields });

        if (result.modifiedCount > 0) {
            res.json({ error: false, message: "Doctor details updated successfully." });
        } else {
            res.json({ error: true, message: "Doctor not found or no changes were made." });
        }
    } catch (error) {
        console.error("Error updating doctor details:", error);
        res.json({ error: true, message: "Internal server error." });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

 module.exports = {
    getAllPatients,
    insertPatientDetails,
    deletePatientDetails,
    getAllPatientsName,
    updatePatientDetails
}
 