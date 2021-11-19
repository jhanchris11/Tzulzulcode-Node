const mongoose = require('mongoose');
const config = require('./index');

async function connection() {
	try {
		await mongoose.connect(`mongodb+srv://${config.dbUsername}:${config.dbPassword}@dbcluster.ikiuh.mongodb.net/${config.dbName}`,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log(`Successfully connected to ${config.dbName} database`);
	} catch(error) {
		console.log(error);
	}
}

connection()

module.exports = mongoose;