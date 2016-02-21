module.exports = {
  // App settings
  MONGO_URI: process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost:27017/test',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',
};