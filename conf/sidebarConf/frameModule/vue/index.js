const genSidebar = require('../../../../utils/genSidebar');
const filenames = require('../../../filenames.json');
const children = filenames.frameModule.vue;

module.exports = [
    genSidebar('vue', children, false)
];