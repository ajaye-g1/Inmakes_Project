const { connectToDatabase } = require('../CommonFunctions/connectDb');


async function checkLoginUser(req,res)  {
   const email = req.body.email;
   const password = req.body.password;
   let client;
   try {
    client = await connectToDatabase();
    const db = client.db('expenseTracker');
    const collection = db.collection('users');
    const user = await collection.findOne({ email: email, password: password });
    console.log(user);
    
    if (user) {
        res.json({ login: true });
      } else {
        res.json({ login: false });
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

async function signUpUser(req,res) {
    try {
        const userDetails = req.body;
        client = await connectToDatabase();
        const db = client.db('expenseTracker');
        const collection = db.collection('users');
        const result = await collection.insertOne(userDetails);
        if (result.acknowledged && result.insertedId) {
            res.json({ login: true });
        } else {
            res.json({ login: false });
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

module.exports = {
    checkLoginUser,
    signUpUser
}