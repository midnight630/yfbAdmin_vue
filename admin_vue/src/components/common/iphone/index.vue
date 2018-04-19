<template>
    <div class="iph_box">
        <div class="full_screen_bg" v-show='iphvisable' >
            <span class="el-icon-close full_screen_bg_close" @click="hidePhone"></span>
        </div>
        <div class="iph_container" v-show="iphvisable">
            <div class="iph_content">
                <div class="iph_content_wen_title" v-show='wentitle != ""'><h2>{{wentitle}}</h2></div>
                <div class="iph_content_wen_cover" v-show='wencover != ""'> <img :src="wencover"></div>
                <div v-html='content' class="iph_content_wen_content"></div>
            </div>
        </div>
    </div>
</template>
<script>
    // import FullScreenBg from '@/components/common/fix_bg/index'
    export default {
        name: 'iphone',
        props: {
            iphvisable: { // 是否显示
                type: Boolean,
                default () {
                    return false
                }
            },
            content: { // 手机中内容
                type: String,
                default() {
                    return ''
                }
            },
            wentitle: { // 文章标题
                type: String,
                default() {
                    return ''
                }
            },
            wencover: {  // 文章封面
                type: String,
                default() {
                    return ''
                }
            },
            hidePhone: {
                type: Function
            },
            style: {
                type: String,
                default() {
                    return ''
                }
            },
            class: {
                type: String
            }
        },
        data () {
            return {
            }
        },
        mounted: function() {
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                    console.log(that.screenWidth)
                })()
            }
        },
        methods: {
            // handleClickCloseFullScreen() {
            //     this.iphvisable = !this.iphvisable
            // }
        },
        components: {
            // 'yfb-full-screen-bg': FullScreenBg
        }
    }
</script>
<style scope lang='less' rel='stylesheet/less'>
    .iph_box{

        @iph_width: 350px;
        @iph_height: 715px;
        @iph_container_padding_top: 85px;
        @iph_container_padding_left: 20px;

        .iph_container{
            position: fixed;
            top:15%;
            left: 50%;
            margin-left: -(@iph_width / 2);
            width: @iph_width - @iph_container_padding_left * 2;
            height: @iph_height - @iph_container_padding_top * 2;
            z-index:2015;
            background-image: url(../../../../../../../../../Public/Admin_vue_imgs/phone_preview.png);
            background-repeat: no-repeat;
            padding:@iph_container_padding_top @iph_container_padding_left;
        }

        @iph_content_padding: 10px;
        .iph_content{
            background:#fff;
            width:@iph_width - @iph_content_padding * 2 - @iph_container_padding_left * 2;
            height: @iph_height - 2 * @iph_container_padding_top - @iph_content_padding * 2;
            padding: @iph_content_padding;
            overflow: auto;

            &_wen_title{

                & > h2{
                    font-size: 20px;
                    font-weight: bold;
                }
            }

            &_wen_cover{
                width: 100%;
                margin-top: 20px;
                img{
                    max-width: 100%;
                }
            }

        }
    }

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