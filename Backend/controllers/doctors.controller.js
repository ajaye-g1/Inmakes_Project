const { connectToDatabase } = require('../CommonFunctions/connectDb');
const { ObjectId } = require('mongodb');

async function getAllDoctors(req,res)  {
    let client;
    try {
     client = await connectToDatabase();
     const db = client.db('expenseTracker');
     const collection = db.collection('doctors');
     const doctors = await collection.find().toArray();
     console.log(doctors);
     
     if (doctors.length > 0) {
         res.json({ doctorsList: doctors, error: false });
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

 async function getAllSpecialisedCourses(req,res)  {
    let client;
    try {
     client = await connectToDatabase();
     const db = client.db('expenseTracker');
     const collection = db.collection('common');
     const specialisedCourses = await collection.find({}, { projection: { specialization: 1 } }).toArray();
     console.log(specialisedCourses);
     
     if (specialisedCourses) {
         res.json({ specialisedCoursesList: specialisedCourses, error: false });
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

 async function insertDoctorDetails(req, res) {
    const doctorDetails = req.body;
    let client;
    try {
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const doctors = db.collection('doctors');

        // Insert doctor details into the 'doctors' collection
        const result = await doctors.insertOne(doctorDetails);

        console.log("Inserted document ID:", result);

        // Check if insertion was successful
        if (result.acknowledged === true) {
            res.json({ error: false });
        } else {
            res.json({ error: true, message: "Insertion failed." });
        }
    } catch (error) {
        console.error("Error inserting doctor details:", error);
        res.json({ error: true, message: "Internal server error." });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function deleteDoctorDetails(req, res) {
    const { id } = req.body;
    let client;
    try {
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const doctors = db.collection('doctors');
        const query = { _id: new ObjectId(id) };

        // Insert doctor details into the 'doctors' collection
        const result = await doctors.deleteOne(query);

        console.log("Inserted document ID:", result);

        // Check if insertion was successful
        if (result.deletedCount > 0) {
            res.json({ error: false });
        } else {
            res.json({ error: true, message: "Insertion failed." });
        }
    } catch (error) {
        console.error("Error inserting doctor details:", error);
        res.json({ error: true, message: "Internal server error." });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function getAllDoctorsName(req,res)  {
    let client;
    try {
     client = await connectToDatabase();
     const db = client.db('expenseTracker');
     const collection = db.collection('doctors');
     const doctorNames = await collection.distinct("doctorName");

    //Using projection to get only doctorName field:
    //  const doctors = await collection.find({}, { projection: { doctorName: 1, _id: 0 } }).toArray();
    //Using aggregation pipeline:
    //const doctors = await collection.aggregate([{ $project: { doctorName: 1, _id: 0 } }]).toArray();
    //Using distinct to get unique doctor names:
    //const doctorNames = await collection.distinct("doctorName");


     if (doctorNames.length > 0) {
        console.log("hii");
        
        const formattedDoctors = doctorNames.map((doctorName, index) => ({
            value: index + 1,
            label: doctorName
        }));
        res.json({ doctorsName: formattedDoctors, error: false });
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

async function updateDoctorDetails(req, res) {
    const { id, data } = req.body;
    let client;

    try {
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const doctors = db.collection('doctors');
        

        // Prepare the update fields
        const updateFields = {};
        if (data.doctorName	) updateFields.doctorName = data.doctorName;
        if (data.specialization	) updateFields.specialization = data.specialization;
        if (data.gender) updateFields.gender = data.gender;
        if (data.fee) updateFields.fee = data.fee;
        const query = { _id: new ObjectId(id) };
        console.log("updateFields",updateFields);
        console.log("id",id);
        // Update the document in the 'doctors' collection
        const result = await doctors.updateOne( query, { $set: updateFields });

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
    getAllDoctors,
    getAllSpecialisedCourses,
    insertDoctorDetails,
    deleteDoctorDetails,
    getAllDoctorsName,
    updateDoctorDetails
}
 