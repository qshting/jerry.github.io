const genSidebar = require('../../../../utils/genSidebar');
const filenames = require('../../../filenames.json');
const children = filenames.frontend.html;

module.exports = [
    genSidebar('优秀博文', children, false)
];