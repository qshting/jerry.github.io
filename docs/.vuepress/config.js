const sidebar = require('../../conf/sidebarConf/index');
const headConf = require('../../conf/headConf');
const nav = require('../../conf/navConf');
const pluginConf = require('../../conf/pluginConf');

module.exports = {
    title: '雪山之巅',
    description: '我与夏风皆过客1',
    base:'/jerry.github.io/',
    // theme: 'awesome',
    locales: {
        '/': {
            lang: 'zh-CN',
        }
    },
    host:'localhost',
    port:'8066',
    head: headConf,
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        // lastUpdated: '上次更新', // 文档更新时间：每个文件git最后提交的时间
        nav,
        sidebar,
        sidebarDepth: 2, // 将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        searchMaxSuggestions: 10,
        // 假定GitHub。也可以是一个完整的 GitLab URL。
        // 自定义项目仓库链接文字
        // 默认根据 `themeConfig.repo` 中的 URL 来自动匹配是 "GitHub"/"GitLab"/"Bitbucket" 中的哪个，如果不设置时是 "Source"。
        // repoLabel: '贡献代码！',
        // 以下为可选的 "Edit this page" 链接选项
        // 如果你的文档和项目位于不同仓库：
        // 如果你的文档不在仓库的根目录下：
        docsDir: 'docs',
        // 如果你的文档在某个特定的分支（默认是 'master' 分支）：
        docsBranch: 'master',
        // 默认为 false，设置为 true 来启用，当前 markdown 的 github 代码链接
        editLinks: true,
    },
    plugins: pluginConf
}