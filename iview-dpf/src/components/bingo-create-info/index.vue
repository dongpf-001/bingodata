<template>
    <div class="create-wrapper">
        <bingo-grid-item style="width: 50%">
            <FormItem label="创建信息">
                <Input v-model="data.creator + '      ' + data.createTime" disabled/>
            </FormItem>
        </bingo-grid-item>
        <bingo-grid-item style="width: 50%">
            <FormItem label="修改信息">
                <Input v-model="data.modifier + '      ' + data.modifyTime" disabled/>
            </FormItem>
        </bingo-grid-item>
    </div>
</template>
<script>
    import bingoGridItem from '../bingo-grid-item/index';
    export default {
        name: 'bing-create-info',
        data () {
            return {
            }
        },
        components: {
            bingoGridItem
        },
        props: {
            data: {
                type: Object,
                default () {
                    return {
                        creator: '',
                        createTime: '',
                        modifier: '',
                        modifyTime: ''
                    };
                }
            }
        },
        methods: {
        }
    }
</script>
