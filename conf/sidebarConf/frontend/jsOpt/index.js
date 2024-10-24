const genSidebar = require('../../../../utils/genSidebar');
const filenames = require('../../../filenames.json');
const children = filenames.frontend.jsOpt;

module.exports = [
    genSidebar('JS优化', children, false)
];