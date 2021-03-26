<template>
    <div>
        <div ref='gantt' :gantt='this' style='height: 100%'></div>
    </div>
</template>

<script>
    import {Gantt} from 'dhtmlx-gantt'
    // import Helper from '../../libs/statics/Helper';
    import request from '@/plugins/request'

    const gantt = Gantt.getGanttInstance()
    // const DAY_MINUTES = 1440; // 一天的分钟数
    const GRID_WIDTH = 500 // 列表默认宽度
    // const ELEMENT_ID = 'progressTask'; // 甘特图标签id
    // const PROGRESS_COLOR = '#02f892'; // 任务进度条的颜色
    const server = 'planCenter' // 微服务名称
    export default {
        name: 'bingo-gantt',
        mounted() {
            // 行编辑按钮
            gantt.clickGridButton = function (id, action) {
                switch (action) {
                    case 'edit':
                        gantt.showLightbox(id)
                        break
                    case 'add':
                        gantt.createTask(null, id)
                        break
                    case 'delete':
                        gantt.confirm({
                            title: gantt.locale.labels.confirm_deleting_title,
                            text: gantt.locale.labels.confirm_deleting,
                            callback: function (res) {
                                if (res) {
                                    gantt.deleteTask(id)
                                }
                            }
                        })
                        break
                }
            }
            // 数据接口
            gantt.createDataProcessor({
                task: {
                    create(data) {
                        request.post(`${server}/tasks`, data)
                    },
                    update(data) {
                    },
                    delete(id) {
                    }
                },
                link: {
                    create(data) {
                    },
                    update() {
                    },
                    delete(id) {
                    }
                }
                // url: baseURL,
                // mode: 'REST'
            })
            // 自定义行编辑组件
            this.customEditors()
            this.setConfigs()
            // this.setTemplates();
            // this.registerEvents();
            this.$emit('beforeInit', gantt)
            gantt.init(this.$refs.gantt)
            gantt.parse({
                data: [
                    {
                        'id': 1,
                        'text': 'Office itinerancy',
                        'type': gantt.config.types.project,
                        'order': '10',
                        progress: 0.4,
                        open: false
                    },
                    {
                        'id': 2,
                        'text': 'Office facing',
                        'type': gantt.config.types.project,
                        'start_date': '02-04-2017',
                        'duration': '8',
                        'order': '10',
                        progress: 0.6,
                        'parent': '1',
                        open: true
                    },
                    {
                        'id': 3,
                        'text': 'Furniture installation',
                        'type': gantt.config.types.project,
                        'start_date': '11-04-2017',
                        'duration': '8',
                        'order': '20',
                        'parent': '1',
                        progress: 0.6,
                        open: true
                    },
                    {
                        'id': 4,
                        'text': 'The employee relocation',
                        'type': gantt.config.types.project,
                        'start_date': '13-04-2017',
                        'duration': '6',
                        'order': '30',
                        'parent': '1',
                        progress: 0.5,
                        open: true
                    },
                    {
                        'id': 5,
                        'text': 'Interior office',
                        'start_date': '02-04-2017',
                        'duration': '7',
                        'order': '3',
                        'parent': '2',
                        progress: 0.6,
                        open: true
                    },
                    {
                        'id': 6,
                        'text': 'Air conditioners check',
                        'start_date': '03-04-2017',
                        'duration': '7',
                        'order': '3',
                        'parent': '2',
                        progress: 0.6,
                        open: true
                    },
                    {
                        'id': 7,
                        'text': 'Workplaces preparation',
                        'start_date': '11-04-2017',
                        'duration': '8',
                        'order': '3',
                        'parent': '3',
                        progress: 0.6,
                        open: true
                    },
                    {
                        'id': 8,
                        'text': 'Preparing workplaces',
                        'start_date': '14-04-2017',
                        'duration': '5',
                        'order': '3',
                        'parent': '4',
                        progress: 0.5,
                        open: true
                    },
                    {
                        'id': 9,
                        'text': 'Workplaces importation',
                        'start_date': '14-04-2017',
                        'duration': '4',
                        'order': '3',
                        'parent': '4',
                        progress: 0.5,
                        open: true
                    },
                    {
                        'id': 10,
                        'text': 'Workplaces exportation',
                        'start_date': '14-04-2017',
                        'duration': '3',
                        'order': '3',
                        'parent': '4',
                        progress: 0.5,
                        open: true
                    },
                    {
                        'id': 11,
                        'text': 'Product launch',
                        'type': gantt.config.types.project,
                        'order': '5',
                        progress: 0.6,
                        open: true
                    },
                    {
                        'id': 12,
                        'text': 'Perform Initial testing',
                        'start_date': '03-04-2017',
                        'duration': '5',
                        'order': '3',
                        'parent': '11',
                        progress: 1,
                        open: true
                    },
                    {
                        'id': 13,
                        'text': 'Development',
                        'type': gantt.config.types.project,
                        'start_date': '02-04-2017',
                        'duration': '7',
                        'order': '3',
                        'parent': '11',
                        progress: 0.5,
                        open: true
                    },
                    {
                        'id': 14,
                        'text': 'Analysis',
                        'start_date': '02-04-2017',
                        'duration': '6',
                        'order': '3',
                        'parent': '11',
                        progress: 0.8,
                        open: true
                    },
                    {
                        'id': 15,
                        'text': 'Design',
                        'type': gantt.config.types.project,
                        'start_date': '02-04-2017',
                        'duration': '5',
                        'order': '3',
                        'parent': '11',
                        progress: 0.2,
                        open: false
                    },
                    {
                        'id': 16,
                        'text': 'Documentation creation',
                        'start_date': '02-04-2017',
                        'duration': '7',
                        'order': '3',
                        'parent': '11',
                        progress: 0,
                        open: true
                    },
                    {
                        'id': 17,
                        'text': 'Develop System',
                        'start_date': '03-04-2017',
                        'duration': '2',
                        'order': '3',
                        'parent': '13',
                        progress: 1,
                        open: true
                    },
                    {
                        'id': 25,
                        'text': 'Beta Release',
                        'start_date': '06-04-2017',
                        'order': '3',
                        'type': gantt.config.types.milestone,
                        'parent': '13',
                        progress: 0,
                        open: true
                    },
                    {
                        'id': 18,
                        'text': 'Integrate System',
                        'start_date': '08-04-2017',
                        'duration': '2',
                        'order': '3',
                        'parent': '13',
                        progress: 0.8,
                        open: true
                    },
                    {
                        'id': 19,
                        'text': 'Test',
                        'start_date': '10-04-2017',
                        'duration': '4',
                        'order': '3',
                        'parent': '13',
                        progress: 0.2,
                        open: true
                    },
                    {
                        'id': 20,
                        'text': 'Marketing',
                        'start_date': '10-04-2017',
                        'duration': '4',
                        'order': '3',
                        'parent': '13',
                        progress: 0,
                        open: true
                    },
                    {
                        'id': 21,
                        'text': 'Design database',
                        'start_date': '03-04-2017',
                        'duration': '4',
                        'order': '3',
                        'parent': '15',
                        progress: 0.5,
                        open: true
                    },
                    {
                        'id': 22,
                        'text': 'Software design',
                        'start_date': '03-04-2017',
                        'duration': '4',
                        'order': '3',
                        'parent': '15',
                        progress: 0.1,
                        open: true
                    },
                    {
                        'id': 23,
                        'text': 'Interface setup',
                        'start_date': '03-04-2017',
                        'duration': '5',
                        'order': '3',
                        'parent': '15',
                        progress: 0,
                        open: true
                    },
                    {
                        'id': 24,
                        'text': 'Release v1.0',
                        'start_date': '15-04-2017',
                        'order': '3',
                        'type': gantt.config.types.milestone,
                        'parent': '11',
                        progress: 0,
                        open: true
                    }
                ],
                links: [
                    {id: '1', source: '1', target: '2', type: '1'},
                    {id: '2', source: '2', target: '3', type: '0'},
                    {id: '3', source: '3', target: '4', type: '0'},
                    {id: '4', source: '2', target: '5', type: '2'},
                    {id: '5', source: '2', target: '6', type: '2'},
                    {id: '6', source: '3', target: '7', type: '2'},
                    {id: '7', source: '4', target: '8', type: '2'},
                    {id: '8', source: '4', target: '9', type: '2'},
                    {id: '9', source: '4', target: '10', type: '2'},
                    {id: '10', source: '11', target: '12', type: '1'},
                    {id: '11', source: '11', target: '13', type: '1'},
                    {id: '12', source: '11', target: '14', type: '1'},
                    {id: '13', source: '11', target: '15', type: '1'},
                    {id: '14', source: '11', target: '16', type: '1'},
                    {id: '15', source: '13', target: '17', type: '1'},
                    {id: '16', source: '17', target: '25', type: '0'},
                    {id: '23', source: '25', target: '18', type: '0'},
                    {id: '17', source: '18', target: '19', type: '0'},
                    {id: '18', source: '19', target: '20', type: '0'},
                    {id: '19', source: '15', target: '21', type: '2'},
                    {id: '20', source: '15', target: '22', type: '2'},
                    {id: '21', source: '15', target: '23', type: '2'},
                    {id: '22', source: '13', target: '24', type: '0'}
                ]
            })
            // gantt.clearAll();
        },
        methods: {
            customEditors() {
                // gantt.editors
            },
            setConfigs() {
                gantt.config.auto_scheduling = true
                gantt.config.auto_scheduling_strict = true
                gantt.config.auto_types = true
                gantt.config.correct_work_time = true
                gantt.config.date_format = '%Y-%m-%d %H:%i:%s'
                gantt.config.details_on_create = false
                gantt.config.details_on_dblclick = false
                // 拖拽调整任务工期
                gantt.config.drag_resize = false
                // 自动调整整体时间
                gantt.config.fit_tasks = true
                // gantt.config.drag_links = false;// 拖拽创建连接线
                // gantt.config.drag_progress = false;// 拖拽进度
                // 底层按照分钟计算
                gantt.config.duration_unit = 'minute'
                gantt.config.fit_tasks = true
                gantt.config.grid_resizer_attribute = 'gridresizer'
                gantt.config.grid_width = GRID_WIDTH
                gantt.config.min_column_width = 50
                // 拖拽
                gantt.config.order_branch = true
                gantt.config.order_branch_free = true
                gantt.config.row_height = 22
                gantt.config.round_dnd_dates = false
                // 时间刻度
                gantt.config.scales = [
                    {
                        unit: 'year',
                        format: '%Y 年'
                    },
                    {
                        unit: 'month',
                        step: 1,
                        date: '%F'
                    }
                ]
                gantt.config.scale_height = 40
                // 是否显示进度
                gantt.config.show_progress = false
                // 是否显示连接线
                gantt.config.show_links = false
                gantt.config.task_height = 25
                // gantt.config.type_renderers[gantt.config.types.milestone] = function(task, defaultRender){//自定义里程碑图形
                //   let html = defaultRender(task);
                //   $(html).css({
                //     'border': 'none',
                //     'background': 'none'
                //   });
                //   let size = (!task.graphCode || task.graphCode === 'diamond') ? '11px' : '15px';
                //   let graph = kendo.format('<i class='fa {0}' style='color: {1}; font-size: {2}; -webkit-text-stroke: 1px {3}'></i>', task.graphCss || 'fa-stop fa-rotate-45', task.backColor || '#d33daf', size, task.borderColor || 'gray');
                //   $('.gantt_task_content', html).css('transform', 'none').append(graph);
                //
                //   return html;
                // };
            },
            setTemplates() {
                /* 任务条显示的文本 */
                gantt.templates.task_text = function (start, end, task) {
                    return task.shortName || ''
                }

                /* tooltip显示内容 */
                gantt.templates.tooltip_text = function (start, end, task) {
                    let temp =
                            '<b>任务:</b> ' +
                            (task.shortName || '') +
                            '<br/><b>开始日期:</b> ' +
                            gantt.templates.tooltip_date_format(start) +
                            '<br/><b>结束日期:</b> ' +
                            gantt.templates.tooltip_date_format(end)
                    return temp
                }

                /* 任务进度 */
                gantt.templates.progress_text = function (start, end, task) {
                    let html = '<span style="text-align:left;">' +
                            Math.round(task.progress * 100) +
                            '% </span>'
                    return html
                }
            },
            registerEvents() {
                // gantt.attachEvent('onTaskCreated', function (task) {
                //     // task.id = Helper.guid();
                //     task.parentId = task.parent;
                //     task.vsiStartTime = task.start_date;
                //     task.vsiEndTime = task.end_date;
                //     task.vsiDay = task.duration;
                //     task.completPercentage = task.progress; // 进度
                //     task.type = 'task'; // 任务类型
                //     task.unitCN = 'day';
                //     task.duration = DAY_MINUTES; // 默认一天
                //     task.period = 1;
                //     task.progressColor = PROGRESS_COLOR; // 进度条颜色
                //     // pms.statics.Helper.setPartSystemColumnValue(self, task, true);
                //     return true;
                // });
                // gantt.attachEvent('onTaskLoading', function (task) {
                //   task.parent = task.parentId;
                //   task.progress = task.completPercentage; // 进度
                //   task.type = task.typeCN; // 任务类型
                //   task.progressColor = PROGRESS_COLOR;//进度条颜色
                //   task.$index = task.orderId;
                //   task.$level = task.levelId;
                //   task.render = '';
                //
                //   return true;
                // });
                // gantt.attachEvent('onBeforeTaskUpdate', function (id, task) {
                //   if (task.duration <= 0) {//防止负数
                //     task.duration = 0;
                //     task.type = gantt.config.types.milestone;
                //   }
                //   task.parentId = task.parent;
                //   task.vsiStartTime = task.start_date;
                //   task.vsiEndTime = task.end_date;
                //   task.vsiDay = task.duration;
                //   task.typeCN = task.type; // 任务类型
                //   task.completPercentage = task.progress; // 进度
                //   task.orderId = task.$index;
                //   task.levelId = task.$level;
                //   pms.statics.Helper.setModifier(task);
                //   self.updatePeriod(task);
                //
                //   return true;
                // });
                // gantt.attachEvent('onBeforeLinkAdd', function (id, link) {
                //   pms.statics.Helper.setPartSystemColumnValue(self, link, true);
                //   return true;
                // });
                // gantt.attachEvent('onTaskDrag', function (id, mode, task, original) {
                //   /* 按单位逆推工期 */
                //   if (mode === 'resize') {
                //     self.updatePeriod(task);
                //   }
                //   return true;
                // });
                // gantt.attachEvent('onTaskClick', function (id, e) {
                //   try {
                //     let isCancel = $(e.target).hasClass('gantt_button_grid');//点击按钮时，防止冒泡
                //     return !isCancel;
                //   } catch (ex) {
                //     bingo.ui.SosDialog.showMsg(ex);
                //   }
                //   return true;
                // });
                // gantt.attachEvent('onBeforeGanttReady', function(){
                //   self.setConfigLayout(gantt.config.grid_width);
                // });
                // gantt.attachEvent('onGanttReady', function(){
                //   let tooltips = gantt.ext.tooltips;
                //   tooltips.tooltip.setViewport(gantt.$task_data);
                // });
                // gantt.attachEvent('onTaskDblClick', function(id, e){
                //   try {
                //     let isCancel = $(e.target).hasClass('k-icon');
                //     if (!isCancel) {
                //       let task = gantt.getTask(id);
                //       self.showEditDialog(task);
                //     }
                //     return !isCancel;
                //   } catch (ex) {
                //     bingo.ui.SosDialog.showMsg(ex);
                //   }
                // });
                // gantt.attachEvent('onRowDragEnd', function(id, target){
                //   try {
                //     let task = gantt.getTask(id);
                //     task.parentId = task.parent;
                //     task.orderId = task.$index;
                //     task.levelId = task.$level;
                //     return true;
                //   } catch (e) {
                //     bingo.ui.SosDialog.showMsg(e);
                //   }
                // });
            }
        }
    }
</script>

<style scoped>
    @import '~dhtmlx-gantt/codebase/dhtmlxgantt.css';
</style>
