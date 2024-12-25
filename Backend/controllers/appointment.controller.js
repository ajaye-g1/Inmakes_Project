const { connectToDatabase } = require('../CommonFunctions/connectDb');
const { ObjectId } = require('mongodb');


async function getAllAppointments(req,res)  {
    let client;
    try {
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const collection = db.collection('appointments');
        const appointments = await collection.find().toArray();
        console.log("as",appointments);
        if (appointments) {
            res.json({ appointments: appointments, error: false });
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

async function addAnAppointment(req, res) {
    const appointmentDetails = req.body;
    let client;
    try {
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const appointments = db.collection('appointments');

        // Insert appointment details into the 'appointments' collection
        const result = await appointments.insertOne(appointmentDetails);

        console.log("Inserted document ID:", result);

        // Check if insertion was successful
        if (result.acknowledged === true) {
            res.json({ error: false });
        } else {
            res.json({ error: true, message: "Insertion failed." });
        }
    } catch (error) {
        console.error("Error inserting Appointmet details:", error);
        res.json({ error: true, message: "Internal server error." });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function deleteAppointment(req, res) {
    const { id } = req.body;
    let client;
    try {
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const appointments = db.collection('appointments');
        const query = { _id: new ObjectId(id) };

        // Insert doctor details into the 'appointments' collection
        const result = await appointments.deleteOne(query);

        console.log("Inserted document ID:", result);

        // Check if insertion was successful
        if (result.deletedCount > 0) {
            res.json({ error: false });
        } else {
            res.json({ error: true, message: "Deletion failed." });
        }
    } catch (error) {
        console.error("Error deleting Appointment details:", error);
        res.json({ error: true, message: "Internal server error." });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function updateAppointmentDetails(req, res) {
    const { id, data } = req.body;
    let client;

    try {
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const appointments = db.collection('appointments');
        

        // Prepare the update fields
        const updateFields = {};
        if (data.patientName) updateFields.patientName = data.patientName;
        if (data.doctorName	) updateFields.doctorName = data.doctorName;
        if (data.date	) updateFields.date	 = data.date;
        const query = { _id: new ObjectId(id) };
        console.log("updateFields",updateFields);
        console.log("id",id);
        // Update the document in the 'appointments' collection
        const result = await appointments.updateOne( query, { $set: updateFields });

        if (result.modifiedCount > 0) {
            res.json({ error: false, message: "appointments details updated successfully." });
        } else {
            res.json({ error: true, message: "appointments details not found or no changes were made." });
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
    getAllAppointments,
    addAnAppointment,
    deleteAppointment,
    updateAppointmentDetails
}