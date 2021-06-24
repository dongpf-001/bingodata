<template>
    <div class="create-wrapper">
        <bingo-grid-item style="width: 50%">
            <bingo-form-item label="创建信息">
                <Input v-model="data.creator + '      ' + data.createTime" disabled/>
            </bingo-form-item>
        </bingo-grid-item>
        <bingo-grid-item style="width: 50%">
            <bingo-form-item label="修改信息">
                <Input v-model="data.modifier + '      ' + data.modifyTime" disabled/>
            </bingo-form-item>
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
