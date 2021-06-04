<template>
    <FormItem v-bind="$attrs" v-on="$listeners">
        <span slot="label">
            <Tooltip :content="label" transfer>
                {{label}}
            </Tooltip>
        </span>
        <slot></slot>
    </FormItem>
</template>
<script>
    export default {
        name: 'bingo-form-item',
        props: {
            label: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
            };
        },
        computed: {
        },
        watch: {
        },
        methods: {
        },
        mounted () {
        }
    };
</script>
