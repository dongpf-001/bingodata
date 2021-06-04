<template>
    <div class="shrink-view" :style="{height: (mIsOpen?contentHeight:0) + 'px'}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Boolean,
                default: true
            },
            height: {
                type: String
            }
        },
        updated () {
            this.init();
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                if (this.height) {
                    this.contentHeight = this.height;
                } else {
                    this.$nextTick(() => {
                        this.contentHeight = this.$el.scrollHeight;
                    });
                }
            }
        },
        watch: {
            value (newValue) {
                this.mIsOpen = newValue;
            },
            mIsOpen (newValue) {
                this.$emit('input', newValue);
            }
        },
        data () {
            return {
                contentHeight: 0,
                mIsOpen: this.value,
            }
        }
    }
</script>
