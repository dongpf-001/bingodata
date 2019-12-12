<template>
    <div class="ui-content">
        <Divider orientation="left">基础色</Divider>
        <p class="ui-p"><code>白色-color-bg-white</code>：可作为大面积的底色来使用<br>
            <code>蓝色-color-bg-blue</code>：可作为背景色使用，同时可作为小块点缀或突出强调<br>
            <code>浅灰-color-bg-gray</code>：可作为大面积的背景色使用<br>
            <code>深灰-color-bg-dark-gray</code>：不可作为底色使用<br>
            <code>黑色-color-bg-black</code>：不可作为底色使用<br>
            <code>银色-color-bg-silvery</code>：在极少数需要特殊工艺的高端用品上出现<br>
        </p>
        <div class="ivu-row">
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-bg-white">
                    <div class="ivu-card-body">
                        <div class=""><strong class="ui-strong">Class</strong>color-bg-white</div>
                        <div class=""><strong class="ui-strong">Color</strong>#ffffff</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-bg-blue" style="color:#fff">
                    <div class="ivu-card-body">
                        <div class="demo-color-name"><strong class="ui-strong">Class</strong>color-bg-blue</div>
                        <div class="demo-color-desc"><strong class="ui-strong">Color</strong>#0077c8</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-bg-gray" style="color:#fff">
                    <div class="ivu-card-body">
                        <div class="demo-color-name"><strong class="ui-strong">Class</strong>color-bg-gray</div>
                        <div class="demo-color-desc"><strong class="ui-strong">Color</strong>#a6bbc8</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-bg-dark-gray" style="color:#fff">
                    <div class="ivu-card-body">
                        <div class="demo-color-name"><strong class="ui-strong">Class</strong>color-bg-dark-gray</div>
                        <div class="demo-color-desc"><strong class="ui-strong">Color</strong>#333f48</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-bg-black" style="color:#fff">
                    <div class="ivu-card-body">
                        <div class="demo-color-name"><strong class="ui-strong">Class</strong>color-bg-black</div>
                        <div class="demo-color-desc"><strong class="ui-strong">Color</strong>#000000</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-bg-silvery" style="color:#fff">
                    <div class="ivu-card-body">
                        <div class="demo-color-name"><strong class="ui-strong">Class</strong>color-bg-silvery</div>
                        <div class="demo-color-desc"><strong class="ui-strong">Color</strong>#8e8f90</div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <Divider orientation="left">辅色</Divider>
        <p class="ui-p">所有辅助色仅用于小面积点缀与提亮，可用于<code>少量文字</code>，<code>红黄绿灯状态</code>，<code>信息图表</code>等，辅助色应和基础色配合使用。<br>
            在使用辅助色时，应使用白色为背景色，以清晰地展示各个色彩，且能很好地平衡含有多种颜色的界面。</p>
        <div class="ivu-row">
            <div class="ivu-col ivu-col-span-6">
                <div class="ivu-card color-bg-yellow">
                    <div class="ivu-card-body">
                        <div class="demo-color-name"><strong class="ui-strong">Class</strong>color-bg-yellow</div>
                        <div class="demo-color-desc"><strong class="ui-strong">Color</strong>#ffc72c</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-6">
                <div class="ivu-card color-bg-red" style="color:#fff">
                    <div class="ivu-card-body">
                        <div class="demo-color-name"><strong class="ui-strong">Class</strong>color-bg-red</div>
                        <div class="demo-color-desc"><strong class="ui-strong">Color</strong>#cb333b</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-6">
                <div class="ivu-card color-bg-green" style="color:#fff">
                    <div class="ivu-card-body">
                        <div class="demo-color-name"><strong class="ui-strong">Class</strong>color-bg-green</div>
                        <div class="demo-color-desc"><strong class="ui-strong">Color</strong>#84bd00</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-6">
                <div class="ivu-card color-bg-turquoise" style="color:#fff">
                    <div class="ivu-card-body">
                        <div class="demo-color-name"><strong class="ui-strong">Class</strong>color-bg-turquoise</div>
                        <div class="demo-color-desc"><strong class="ui-strong">Color</strong>#115740</div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <Divider orientation="left">字体颜色</Divider>
        <p class="ui-p">主标题可用颜色：<code>蓝色-color-text-blue</code>、<code>深灰-color-text-darkgray</code>、<code>白色-color-text-white</code><br>
            正文标题颜色：<code>深灰-color-text-dark-gray</code><br>
            正文强调文字颜色：<code>85%黑色-color-text-black</code>、<code>蓝色-color-text-blue</code><br>
            正文颜色：<code>85%黑色-color-text-black</code><br>
            辅助色可用于<code>标题文字</code>、<code>小段文字</code>以及<code>段落文字的标题</code>，作为基础色的辅助，使版面更有丰富多样；同时，辅助色也可基于某个恰当的主题来进行使用，例如<code>警告</code>，<code>错误</code>，<code>通过</code>等，成为点睛之笔。</p>
        <div class="ivu-row">
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-text-blue">
                    <div class="ivu-card-body">
                        <div><strong class="ui-strong">Class</strong>color-text-blue</div>
                        <div><strong class="ui-strong">Color</strong>#0077c8</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-text-dark-gray">
                    <div class="ivu-card-body">
                        <div><strong class="ui-strong">Class</strong>color-text-darkgray</div>
                        <div><strong class="ui-strong">Color</strong>#333f48</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-text-white">
                    <div class="ivu-card-body">
                        <div><strong class="ui-strong">Class</strong>color-text-white</div>
                        <div><strong class="ui-strong">Color</strong>#ffffff</div>
                    </div>
                </div>

            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-text-gray">
                    <div class="ivu-card-body">
                        <div><strong class="ui-strong">Class</strong>color-text-gray</div>
                        <div><strong class="ui-strong">Color</strong>#a6bbc8</div>
                    </div>
                </div>
            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-text-black">
                    <div class="ivu-card-body">
                        <div><strong class="ui-strong">Class</strong>color-text-black</div>
                        <div><strong class="ui-strong">Color</strong>#262626</div>
                    </div>
                </div>

            </div>

            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-text-yellow">
                    <div class="ivu-card-body">
                        <div><strong class="ui-strong">Class</strong>color-text-yellow</div>
                        <div><strong class="ui-strong">Color</strong>#ffc72c</div>
                    </div>
                </div>

            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-text-red">
                    <div class="ivu-card-body">
                        <div><strong class="ui-strong">Class</strong>color-text-red</div>
                        <div><strong class="ui-strong">Color</strong>#cb333b</div>
                    </div>
                </div>

            </div>

            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-text-green">
                    <div class="ivu-card-body">
                        <div><strong class="ui-strong">Class</strong>color-text-green</div>
                        <div><strong class="ui-strong">Color</strong>#84bd00</div>
                    </div>
                </div>

            </div>
            <div class="ivu-col ivu-col-span-8">
                <div class="ivu-card color-text-turquoise">
                    <div class="ivu-card-body">
                        <div><strong class="ui-strong">Class</strong>color-text-turquoise</div>
                        <div><strong class="ui-strong">Color</strong>#115740</div>
                    </div>
                </div>

            </div>
        </div>
        <br/>
    </div>
</template>

<script>
export default {
  name: 'ui-color',
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
    .ivu-col{
        padding: 8px;
    }
    .ui-content{
        padding:20px;
    }
    .ui-strong{
        width:60px;
        display: inline-block;
    }
</style>
