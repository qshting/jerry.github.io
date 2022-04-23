const genSidebar = require('../../../../utils/genSidebar');
const filenames = require('../../../filenames.json');
const children = filenames.frameModule.ReactNative;

module.exports = [
    genSidebar('React Native', children, false)
];