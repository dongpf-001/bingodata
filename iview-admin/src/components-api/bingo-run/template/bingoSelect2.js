export default `<template>
  <div>
    远程查询：
    <bingo-select ref="element" class="bingo-components-wrapper" v-model="model.model3" :data="datas1" :multiple="true"
                  :labelInValue="true" :remote="true" :max-tag-count="2" :filterable="true"
                   :remoteMethod="remoteMethod" :loading="loading">
    </bingo-select>
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
            treeValue2: '',
            treeValue3: '',
            autoValue: ''
        },
        datas1: [],
        list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
        loading: false,
    }
  },
  methods: {
     remoteMethod (query) {
        if (query !== '') {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                const list = this.list.map(item => {
                    return {
                        value: item,
                        label: item
                    };
                });
                this.datas1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 200);
        } else {
            this.datas1 = [];
        }
        this.showSelectAll = true
     },
  },
  mounted () {

  }
}
</script>
<style>

</style>`
