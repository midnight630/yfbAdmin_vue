<template>
    <div class="full_screen_bg" v-show='visable' >
        <span class="el-icon-close full_screen_bg_close" @click="handleClickCloseFullScreen"></span>
    </div>
</template>
<script>
    export default{
        name: 'full_screen_bg',
        props: {
            visable: {  // 是否显示背景
                type: Boolean,
                default () {
                    return false
                }
            }
        },
        data () {
            return {
            }
        },
        methods: {
            handleClickCloseFullScreen() {
                this.visable = false
            }
        }
    }
</script>
<style lang='less' rel='stylesheet/less'>
    .full_screen_bg{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: fixed;
        overflow: auto;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,.5);
        z-index: 1000;

        .full_screen_bg_close{
            font-size: 20px;
            position: absolute;
            top:100px;
            right:100px;
            cursor: pointer;
            color:#fff;

            &:hover{
                color:#0099e5;
            };
        }

    }
</style>