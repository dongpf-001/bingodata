export default `<template>
  <div>
     下拉树单选：
     <bingo-select type="selectTree" v-model="model.treeValue1"
                 @on-change="onChange" :data="treeDatas" class="bingo-select"></bingo-select>
     下拉树多选：
     <bingo-select type="selectTree" v-model="model.treeValue2" show-checkbox
                  @on-change="onChange" :data="treeDatas" multiple class="bingo-select"></bingo-select>
  </div>
</template>
<script>
export default {
  data () {
    return {
        model: {
            model1: 2,
            model2: [1, 2],
            model3: '',
            treeValue1: '',
            treeValue2: ['1', '1-1'],
            treeValue3: '',
            autoValue: ''
        },
       treeDatas: [
            {
                title: 'parent1',
                expand: true,
                value: '1',
                selected: false,
                checked: false,
                children: [
                    {
                        title: 'parent 1-1',
                        expand: true,
                        value: '1-1',
                        selected: false,
                        checked: false,
                        children: [
                            {
                                title: 'leaf 1-1-1',
                                value: '1-1-1',
                                selected: false,
                                checked: false
                            },
                            {
                                title: 'leaf 1-1-2',
                                value: '1-1-2',
                                selected: false,
                                checked: false
                            }
                        ]
                    },
                    {
                        title: 'parent 1-2',
                        expand: true,
                        value: '1-2',
                        selected: false,
                        checked: false,
                        children: [
                            {
                                title: 'leaf 1-2-1',
                                value: '1-2-1',
                                selected: false,
                                checked: false
                            },
                            {
                                title: 'leaf 1-2-2',
                                value: '1-2-2',
                                selected: false,
                                checked: false
                            }
                        ]
                    }
                ]
            }
        ],
    }
  },
  methods: {
     onChange (value) {
        if (value) {
            this.$Message.info(JSON.stringify(value));
        }
     },
  },
  mounted () {

  }
}
</script>
<style>
.bingo-select {
    display: inline-block;
    width: 300px;
}
</style>`
