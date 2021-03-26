<template>
    <div class="my_video">
        <div class="player" @mouseover="overPlayer($event)" @mouseout="outPlayer($event)">
            <div class="icon-close" v-show="closeIcon" @click="closePlayer">
                <Icon color="#fff" type="ios-close" size="24"/>
            </div>
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions"
                          @play="onPlayerPlay($event)"
                          @pause="onPlayerPause($event)"
            >
            </video-player>
        </div>
    </div>
</template>
<script>
    import {videoPlayer} from 'vue-video-player';

    export default {
        name: 'my-video',
        props: {
            viSrc: [String]
        },
        data() {
            return {
                closeIcon: false,
                // 参考修改属性的地址 https://docs.videojs.com/tutorial-options.html
                playerOptions: {
                    // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, // 如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: 'video/mp4',
                        src: this.viSrc // 你的视频地址（必填）
                    }],
                    poster: 'poster.jpg', // 你的封面地址
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    // controlBar: {
                    //  timeDivider: true,
                    //  durationDisplay: true,
                    //  remainingTimeDisplay: false,
                    //  fullscreenToggle: true  //全屏按钮
                    // }
                }
            }
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            onPlayerPlay(player) {
                // console.log('play');
            },
            onPlayerPause(player) {
                // console.log('pause');
            },
            overPlayer(e) {
                if (e.currentTarget.className === 'icon-close' || e.currentTarget.tagName === 'i') {
                    return false;
                }
                this.closeIcon = true;
            },
            outPlayer(e) {
                if (e.currentTarget.className === 'icon-close' || e.currentTarget.tagName === 'i') {
                    return false;
                }
                this.closeIcon = false;
            },
            closePlayer() {
                this.$emit('closePlayer')
            }
        },
        components: {
            videoPlayer
        }
    }
</script>
<style lang="less">
    .my_video {
        position: fixed;
        top: 141px;
        right: 0;
        width: 500px;
        z-index: 20;
        .icon-close {
            width: 34px;
            height: 24px;
            padding: 0 5px;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 6;
            background-color: rgba(43, 51, 63, 0.7);
            cursor: pointer;
        }
    }
</style>
