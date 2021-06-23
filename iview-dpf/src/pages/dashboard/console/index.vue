<template>
    <div class="content-bill">
        <mindmap v-model="data"></mindmap>
    </div>
</template>
<script>
    import mindmap from '@hellowuxin/mindmap'
    export default {
        name: 'console',
        components: { mindmap },
        data () {
            return {
                data: [{
                    name: '技术储备',
                    children: [
                        {
                            name:'服务端框架',
                            left: true,
                            children: [
                                { name: 'Express' },
                                { name: 'Koa2.0' },
                            ]
                        },
                        {
                            name: '前端框架',
                            left: true,
                            children: [
                                {
                                    name: 'vue.js',
                                    children: [
                                        { name: '尤雨溪研发：渐进式框架，MVVM模式' },
                                    ]
                                },
                                {
                                    name: 'iview+iview pro',
                                    children: [
                                        { name: 'TalkingData研发：基于vue.js封装的UI组件库' },
                                    ]
                                },
                                {
                                    name: 'ElementUI',
                                    children: [
                                        { name: '饿了么研发：基于vue.js封装的UI组件库，手机端有对应的Mint ' },
                                    ]
                                },
                            ]
                        },
                        {
                            name:'移动端框架',
                            left: true,
                            children: [
                                {
                                    name: 'vant',
                                    children: [
                                        { name: '有赞研发：移动端VUE组件库 ' },
                                    ]
                                },
                                {
                                    name: 'cube-ui',
                                    children: [
                                        { name: '滴滴研发：移动端VUE组件库 ' },
                                    ]
                                },
                            ]
                        },
                        {
                            name:'其他',
                            left: true,
                            children: [
                                {
                                    name: 'bootstrap',
                                    children: [
                                        { name: 'css框架 ' },
                                    ]
                                },
                                {
                                    name: 'three.js',
                                    children: [
                                        { name: '3D动画效果图 ' },
                                    ]
                                },
                                {
                                    name: 'webGL',
                                    children: [
                                        { name: '3D动画效果图 ' },
                                    ]
                                },
                                {
                                    name: 'kendo UI',
                                    children: [
                                        { name: 'UI框架，主要针对Angularjs ' },
                                    ]
                                },
                                {
                                    name: 'webpack',
                                    children: [
                                        { name: '打包工具 ' },
                                    ]
                                },
                                {
                                    name: '响应式布局',
                                },
                                {
                                    name: 'CodePen',
                                    children: [
                                        { name: '在线工具 ' },
                                    ]
                                },
                            ]
                        },
                        {
                            name:'开发工具',
                            children: [
                                {
                                    name: '开发工具',
                                    children: [
                                        { name: 'webstorm  VS Code  sublime ' },
                                    ]
                                },
                                {
                                    name: 'node js',
                                    children: [
                                        { name: '版本10.0以后，自带npm，可自安装淘宝镜像 ' },
                                    ]
                                },
                            ]
                        },
                        {
                            name:'开发语言',
                            children: [
                                {
                                    name: 'javaScript',
                                    children: [
                                        { name: '语法，操作节点 ' },
                                    ]
                                },
                                {
                                    name: 'HTML5+CSS3',
                                    children: [
                                        { name: '基础内容，语义化结构，其他API，CSS3新属性/过度动画/伸缩布局 ' },
                                    ]
                                },
                                {
                                    name: 'jQuery',
                                    children: [
                                        { name: '是javascript库，简化javascript 需要掌握语法 ' },
                                    ]
                                },
                                {
                                    name: 'Es6',
                                    children: [
                                        { name: '是javascript的第六个版本， 需要掌握语法 ' },
                                    ]
                                },
                                {
                                    name: 'TypeScript',
                                    children: [
                                        { name: '微软研发：是javascript的超集，扩展了javascript的语法 ' },
                                    ]
                                },
                                {
                                    name: 'less/sass',
                                    children: [
                                        {
                                            name: '预编译处理语言 ',
                                            children: [
                                                { name: 'less是通过js编译 是在客户端处理 ' },
                                                { name: 'sass是通过ruby编译 是在服务器端处理 ' },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    name: 'ajax',
                                    children: [
                                        { name: '异步请求 ' },
                                    ]
                                },
                                {
                                    name: 'axios',
                                    children: [
                                        { name: '异步请求 ' },
                                    ]
                                },
                            ]
                        },
                        {
                            name:'进阶',
                            children: [
                                {
                                    name: 'javascript高级特性',
                                    children: [
                                        { name: '通过构造函数创建对象、原型对象和原型链继承\n' +
                                            '多种实现方式，函数的本质以及Function构造函数，\n' +
                                            '作用域链，闭包。 ' },
                                    ]
                                },
                                {
                                    name: '前端设计思想',
                                    children: [
                                        { name: '开闭原则，mvc思想，高内聚低耦合，工厂模式 ' },
                                    ]
                                },
                                {
                                    name: '模块化开发',
                                    children: [
                                        { name: 'RequireJS、seaJS、AMD/CMD、统一规范UMD ' },
                                    ]
                                },
                                {
                                    name: 'NodeJS',
                                    children: [
                                        { name: '操作、常用内置模块、高级特性、常用框架 ' },
                                    ]
                                },
                                {
                                    name: 'MongoDB',
                                    children: [
                                        { name: '面向文档存储的数据库 ' },
                                    ]
                                },
                            ]
                        },
                    ]
                }]
            }
        },
        methods: {
        }
    }
</script>
<style lang="less" scoped>
    .console-wrapper {
        height: 100%;
        width: 100%;
    }
</style>
