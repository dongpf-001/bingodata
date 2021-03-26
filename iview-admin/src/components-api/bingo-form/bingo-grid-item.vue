<template>
    <div class="ivu-grid-item" :style="styles" ref="col">
        <div class="ivu-grid-item-main" :style="mainStyles">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import {getStyle} from '@/components-api/utils/assist.js'

    export default {
        name: 'bingo-grid-item',
        inject: ['GridInstance'],
        props: {
            // 合并的列数
            colspan: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                height: 0
            }
        },
        computed: {
            col() {
                return this.GridInstance.col
            },
            square() {
                return this.GridInstance.square
            },
            styles() {
                const style = {
                    width: `${(100 / this.col) * this.colspan}%`
                }

                if (this.height && this.square) {
                    style.height = `${this.height}px`
                }
                return style
            },
            mainStyles() {
                return {
                    padding: this.GridInstance.padding
                }
            }
        },
        watch: {
            col() {
                this.$nextTick(() => {
                    this.handleChangeHeight()
                })
            },
            square() {
                this.handleChangeHeight()
            },
            'GridInstance.resizeCount'() {
                this.handleChangeHeight()
            }
        },
        methods: {
            handleChangeHeight() {
                if (this.square) {
                    const $col = this.$refs.col
                    this.height = parseFloat(getStyle($col, 'width'))
                }
            }
        },
        mounted() {
            this.handleChangeHeight()
        }
    }
</script>
