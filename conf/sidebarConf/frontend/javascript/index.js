const genSidebar = require('../../../../utils/genSidebar');
const filenames = require('../../../filenames.json');
const children = filenames.frontend.javascript;

module.exports = [
    genSidebar('JS基础', children, false)
];