require('dotenv').config();

module.exports = {
	devMode: (process.env.DEV_MODE === "true") ? true : false,
	port: parseInt(process.env.PORT) || 4000,
	dbName: process.env.DB_NAME,
	dbUsername: process.env.DB_USERNAME,
	dbPassword: process.env.DB_PASSWORD	
};