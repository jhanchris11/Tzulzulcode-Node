const mongoose = require('mongoose');
const config = require('./index');

async function connection() {
	try {
		await mongoose.connect(`mongodb+srv://${config.dbUsername}:${config.dbPassword}@cluster0.tcvfx.mongodb.net/${config.dbName}?retryWrites=true&w=majority`,{
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