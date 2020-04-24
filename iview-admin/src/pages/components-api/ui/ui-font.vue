<template>
    <div class="ui-content">
        <Divider orientation="left">标题</Divider>
        <!--标题-->
        <p class="ui-p">HTML 中的所有标题标签，<code>&lt;h1&gt;</code> 到 <code>&lt;h5&gt;</code> 均可使用。另外，还提供了 <code>.h1</code> 到 <code>.h5</code> 类，为的是给内联（inline）属性的文本赋予标题的样式。<br>
            <code>&lt;h1&gt;</code>:整个项目中只允许项目logo标题使用h1标签，其它标签不准使用h1。<br>
            <code>&lt;h2&gt;</code>:大标题，例如任务中心-弹出框标题等。<br>
            <code>&lt;h3&gt;</code>:主体-大模块名称。<br>
            <code>&lt;h4&gt;</code>:菜单类名称、表格标题等。<br>
            <code>&lt;h5&gt;</code>:主体-二级标题名称。<br>
        </p>
        <div>
            <p>使用的字体如下：</p>
            <pre v-highlight><code>font-family:"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;</code></pre>
            <span class="copy"> <i class="ivu-icon ivu-icon-clipboard" style="font-size: 18px;"></i><!--v-component--> <i style="color: rgb(92, 184, 92); display: none; font-size: 18px;" class="ivu-icon ivu-icon-checkmark"></i><!--v-component--> </span> </div>
        <div class="api ivu-row" style="margin-left: -8px; margin-right: -8px;">
            <div class="ivu-col ivu-col-span-12" style="padding-left: 8px; padding-right: 8px;">
                <table>
                    <thead>
                    <tr>
                        <th>中文字体</th>
                        <th>示例</th>
                        <th>粗细</th>
                        <th>颜色</th>
                        <th>字号</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>h1标题</td>
                        <td><h1>我是h1标题</h1></td>
                        <td>加粗</td>
                        <td>#333f48</td>
                        <td>24px</td>
                    </tr>
                    <tr>
                        <td>h2主标题</td>
                        <td><h2>我是h2标题</h2></td>
                        <td>默认</td>
                        <td>#333f48</td>
                        <td>18px</td>
                    </tr>
                    <tr>
                        <td>h3次级标题</td>
                        <td><h3>我是h3标题</h3></td>
                        <td>加粗</td>
                        <td>#333f48</td>
                        <td>16px</td>
                    </tr>
                    <tr>
                        <td>h4标题</td>
                        <td><h4>我是h4标题</h4></td>
                        <td>加粗</td>
                        <td>#333f48</td>
                        <td>14px</td>
                    </tr>
                    <tr>
                        <td>h5小标题</td>
                        <td><h5>我是h5标题</h5></td>
                        <td>默认</td>
                        <td>#333f48</td>
                        <td>14px</td>
                    </tr>
                    <tr>
                        <td>正文</td>
                        <td><span style="color:#262626">我是正文</span></td>
                        <td>默认</td>
                        <td>#262626</td>
                        <td>14px</td>
                    </tr>
                    <tr>
                        <td>辅助文字</td>
                        <td><span style="color:#a6bbc8">我是辅助文字</span></td>
                        <td>默认</td>
                        <td>#a6bbc8</td>
                        <td>14px</td>
                    </tr>
                    <tr>
                        <td>失效文字</td>
                        <td><span style="color:#c3cbd6">我是失效文字</span></td>
                        <td>默认</td>
                        <td>#c3cbd6</td>
                        <td>14px</td>
                    </tr>
                    <tr>
                        <td>链接文字</td>
                        <td><a href="#">我是链接文字</a></td>
                        <td>默认</td>
                        <td>#0077c8</td>
                        <td>14px</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="ivu-col ivu-col-span-12" style="padding-left: 8px; padding-right: 8px;">
                <table>
                    <thead>
                    <tr>
                        <th>英文字体</th>
                        <th>示例</th>
                        <th>粗细</th>
                        <th>颜色</th>
                        <th>字号</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>h1 Head</td>
                        <td><h1>This is an example</h1></td>
                        <td>bold</td>
                        <td>#333f48</td>
                        <td>24px</td>
                    </tr>
                    <tr>
                        <td>h2 Main Head</td>
                        <td><h2>This is an example</h2></td>
                        <td>normal</td>
                        <td>#333f48</td>
                        <td>18px</td>
                    </tr>
                    <tr>
                        <td>h3 Sub Head</td>
                        <td><h3>This is an example</h3></td>
                        <td>bold</td>
                        <td>#333f48</td>
                        <td>16px</td>
                    </tr>
                    <tr>
                        <td>h4 Head</td>
                        <td><h4>This is an example</h4></td>
                        <td>bold</td>
                        <td>#333f48</td>
                        <td>14px</td>
                    </tr>
                    <tr>
                        <td>h5 Small Head</td>
                        <td><h5>This is an example</h5></td>
                        <td>normal</td>
                        <td>#333f48</td>
                        <td>14px</td>
                    </tr>
                    <tr>
                        <td>Text</td>
                        <td><span style="color:#262626">This is an example</span></td>
                        <td>normal</td>
                        <td>#262626</td>
                        <td>14px</td>
                    </tr>
                    <tr>
                        <td>Help</td>
                        <td><span style="color:#a6bbc8">This is an example</span></td>
                        <td>normal</td>
                        <td>#a6bbc8</td>
                        <td>14px</td>
                    </tr>
                    <tr>
                        <td>Disabled</td>
                        <td><span style="color:#c3cbd6">This is an example</span></td>
                        <td>normal</td>
                        <td>#c3cbd6</td>
                        <td>14px</td>
                    </tr>
                    <tr>
                        <td>Link</td>
                        <td><a href="#">This is an example</a></td>
                        <td>normal</td>
                        <td>#0077c8</td>
                        <td>14px</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--v-component-->
        </div>
        <Divider orientation="left">页面主体</Divider>
        <p class="ui-p">body全局 <code>font-size</code> 设置为 <strong>14px</strong>，<code>line-height</code> 设置为 <strong>1.5</strong>。这些属性直接赋予 <code>&lt;body&gt;</code> 元素和所有段落元素。另外，<code>&lt;p&gt;</code> （段落）元素还被设置了15px的底部外边距（margin）。<br>
            标题类字体设置为 <strong>14px</strong><br>
            表格字体设置为 <strong>14px</strong></p>

    </div>
</template>

<script>
export default {
  name: 'ui-font',
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  watch: {},
  methods: {
  }
}
</script>

<style scoped>
    h3 {
        font-size: 16px;
        font-weight: 400;
        margin: 8px 0;
    }
    .api table {
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
        border: 1px solid #e9e9e9;
        width: 100%;
        margin-bottom: 24px;
    }
    .api table th {
        background: #f7f7f7!important;
        white-space: nowrap;
        color: #5c6b77;
        font-weight: 600;
    }
    .api table td, .api table th {
        border: 1px solid #e9e9e9;
        padding: 8px 16px;
        text-align: left;
        background-color:#fff;
    }

    .ui-content{
        padding:20px;
    }
    .ui-p{
        line-height:2;
        margin-bottom: 20px !important;
    }
    .ui-p img{
        width:auto;
    }

    h1 {
        font-size: 24px;
        font-weight: bold;
        color:#333f48;
    }
    h2 {
        font-size: 18px;
        font-weight: normal;
        color:#333f48;
    }
    h3 {
        font-size: 16px;
        font-weight: bold;
        color:#333f48;
    }
    h4 {
        font-size: 14px;
        font-weight: bold;
        color:#333f48;
    }
    h5 {
        font-size: 14px;
        font-weight: normal;
        position: relative;
        clear: both;
        border-bottom: #dddddd 1px solid;
        line-height: 26px;
        height: 26px;
        color:#333f48;
    }
    h5:first-child {
        margin-top: 0;
    }
    h5.first {
        padding-top: 0px;
    }
    h5:before {
        content: "\e600";
        font-family: "iconfont" !important;
        padding-right: 5px;
        color:#0077c8;
        font-size:16px;
    }
    h5:after {
        content: "";
        position: absolute;
        height: 2px;
        width: 120px;
        bottom: -2px;
        left: 0;
        background: #0077c8;
    }
    code{
        display: inline-block;
        background: #f7f7f7;
        font-family: Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;
        margin: 0 3px;
        padding: 1px 5px;
        border-radius: 3px;
        color: #666;
        border: 1px solid #eee;
        line-height: 1.5;
    }
</style>
