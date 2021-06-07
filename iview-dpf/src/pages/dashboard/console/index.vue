<template>
    <div class="console-wrapper">
        <vue-mindmap
                :nodes="nodes"
                :connections="connections"
                :editable="true">
        </vue-mindmap>
    </div>
</template>
<script>
    export default {
        name: 'console',
        components: {},
        data () {
            return {
                nodes: [
                    {
                        'text': 'python',
                        'url': 'http://www.wikiwand.com/en/Python_(programming_language)',
                        'fx': -13.916222252976013,
                        'fy': -659.1641376795345,
                        'category': 'wiki',
                        'note': ''
                    }
                ],
                connections: [

                    {
                        'source': 'python',
                        'target': 'basics',
                        'curve': {
                            'x': -43.5535,
                            'y': 299.545
                        }
                    }
                ]
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
