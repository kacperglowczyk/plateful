const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Ensure Metro knows the project root
config.projectRoot = __dirname;

// Watch only the current directory and its subdirectories
config.watchFolders = [__dirname];

module.exports = config;
