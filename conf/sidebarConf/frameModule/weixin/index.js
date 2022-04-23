const genSidebar = require('../../../../utils/genSidebar');
const filenames = require('../../../filenames.json');
const children = filenames.frameModule.weixin;

module.exports = [
    genSidebar('微信小程序', children, false)
];