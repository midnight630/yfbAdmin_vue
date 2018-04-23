<template>
  <nav class="nav" id='nav'>
    <div class="side_bar" :style="'width:'+leftPadding+'px'">
        <div style="background-color: #12181f;border-bottom: 1px solid #353C44;">
          <!-- <router-link to="/"> -->
            <div class="side-bar-logo" :style="{backgroundImage: 'url(\'' + (isCollapse ? adminLogo2 : adminLogo) + '\')'}">
                <!-- 下面这一行不用管。这是SEO优化的部分  你懂的-->
                <img :src="adminLogo" class="g-img-fixed" alt="优粉吧 youfenba">
                <span v-if="!isCollapse" class="side-bar-logo-name">- 优粉吧运营后台  -</span>
            </div>
          <!-- </router-link> -->
        </div>
        <div class="side-bar-menu">
            <el-menu unique-opened :default-active="menuActive" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <template v-for="(item,index) in sideData" v-key='index'>
                    <el-submenu v-if='item.submenu.length > 0' :index="item.url" >
                        <template slot="title">
                            <i :class='"img-icon " + item.icon_name + " side-bar-icon"' style="width:18px;height:18px;display:inline-block"></i>
                            <span slot="title" class="side-bar-txt">{{item.menu_name}}</span>
                        </template>
                        <el-menu-item-group>
                            <router-link v-for='(childitem,cIndex) in item.submenu' :to="childitem.url" :key="''+index + 1+ '-'+cIndex+''">
                                <el-menu-item :index="childitem.url">{{childitem.menu_name}}</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <router-link v-else :to="item.url">
                        <el-menu-item :index='item.url'>
                            <template slot="title">
                                <i :class='"img-icon " + item.icon_name + " side-bar-icon"' style="width:18px;height:18px;display:inline-block"></i>
                                <span slot="title" class="side-bar-txt">{{item.menu_name}}</span>
                            </template>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-menu>
        </div>
    </div>
    <header class="g-cfix top_bar" :style="'padding-left:'+leftPadding+'px;width:calc(100% - '+ (isCollapse? '70px' : '260px') +')'">
        <span type="default" class='img-icon img-icon-shrink shrink-button'  @click='handleShrink'></span>
        <div class="g-fr">
            <el-dropdown class=" g-fr user-container" @command="handleCommand">
                <div class="user-wrapper">
                    <i class="icon icon-user user-face g-fl" style=""></i>
                    <span class="user-name">17706531630</span>
                    <i class="el-icon-arrow-down"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <el-dropdown-item class='' command="handleClickUpdatePs">
                        <div class="hedare-dropdown-item"><span class="icon icon-edit h-d-item-icon"></span><span>修改密码</span></div>
                    </el-dropdown-item>
                    <el-dropdown-item  command="logout">
                        <div class="hedare-dropdown-item"><span class="icon icon-shutdown h-d-item-icon"></span><span>退出登录</span></div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="g-fr processing-orders-nums-b" style="display:inline-block">
                <el-badge :value="pONums" class="item">
                     <span class="g-cfix processing-orders-nums"><i class="icon icon-msg g-fl header-msg-icon"></i><span class="g-fl">待处理</span></span>
                </el-badge>        
            </div>
      </div>
    </header>

    <el-dialog title="修改密码" size='tiny'  :visible.sync="dialogFormVisible" styly="width:200px">
        <el-form :model="updatePs" :rules="rules" ref='updatePsForm' :label-position="labelPosition" >
            <div>
                <el-form-item label="原 密 码" prop='old_password' >
                    <el-input v-model="updatePs.old_password" type="password" auto-complete="off"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="新 密 码" prop='new_password'>
                    <el-input v-model="updatePs.new_password" type="password" auto-complete="off"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="确认密码" prop='rep_password'>
                    <el-input v-model="updatePs.rep_password" type="password" auto-complete="off"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelUpdatePs">取 消</el-button>
            <el-button type="primary" @click="sureUpdatePs">确 定</el-button>
        </div>
    </el-dialog>
  </nav>
</template>
<script>
  import sideData from './index.json'
  import qs from 'qs'
  export default {
    name: 'nav',
    props: {
      handleShrink: {
        type: Function
      },
      leftPadding: {
        type: Number
      },
      isCollapse: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        adminLogo: require('../../assets/images/side_bar/yfb_admin_logo.png'),
        adminLogo2: require('../../assets/images/side_bar/yfb_admin_logo_2.png'),
        sideData: [],
        activeIndex: '1',
        activeIndex2: '1',
        pONums: 0, // 待处理订单数
        orPs: '', // 原密码
        newPs: '', // 新密码1
        newPs2: '', // 验证密码
        menuActive: this.$route.path,
        menuOpen: this.$route.path,
        updatePs: {
            old_password: '',
            new_password: '',
            rep_password: ''
        },
        dialogFormVisible: false,
        labelPosition: 'left',
        rules: {
            old_password: [
                { required: true, message: '请输入原密码', trigger: 'blur' },
                { min: 3, max: 5, message: '密码长度在三个，三个以上', trigger: 'blur' }
            ],
            new_password: [
                { required: true, message: '请输入新密码', trigger: 'blur' },
                { min: 3, message: '密码长度在三个，三个以上', trigger: 'blur' }
            ],
            rep_password: [
                { required: true, message: '请输入确认密码', trigger: 'blur' },
                { min: 3, message: '密码长度在三个，三个以上', trigger: 'blur' }
            ]
        }
      }
    },
    mounted: function() {
      this.sideData = sideData.data
      this.getProcessingOrdersNums()
    },
    methods: {
        getProcessingOrdersNums() { // 获取待处理的订单shu ju
            const _this = this
            _this.$http.get('/Data/processing_orders_nums.html')
            .then(response => {
                _this.pONums = response.data.draw
            }, response => {
                console.log(response)
            })
        },
        sureUpdatePs() { // 确定更新密码
            let _this = this

            if (_this.updatePs.new_password != _this.updatePs.rep_password && _this.updatePs.new_password != '') {
                // 新密码和确认密码不相同
                _this.$message.error('新密码和确认密码不相同');
                return false
            } else if (_this.updatePs.old_password == _this.updatePs.new_password && _this.updatePs.old_password != '') {
                // 新密码和原密码相同
                _this.$message.error('新密码和原密码相同');
                return false
            }

            _this.$refs.updatePsForm.validate(valid => {
                if (valid) {
                    // ajax
                    _this.$http({
                            url: '/Data/managers_password.html',
                            method: 'PUT',
                            data: qs.stringify({
                                old_password: _this.updatePs.old_password,
                                new_password: _this.updatePs.new_password,
                                rep_password: _this.updatePs.new_password
                            })
                        }).then(response => {
                        if (response.data.code == 200) {
                            _this.dialogFormVisible = true
                            // window.location.href = '/index/loginout.html'
                        } else {
                            _this.$message.error(response.data.msg);
                            // 失败
                        }
                    }, response => {
                        console.log(response)
                    })
                } else {
                    return false
                }
            })
        },
        cancelUpdatePs() { // 取消更新密码
            this.dialogFormVisible = false
            this.updatePs.old_password = ''
            this.updatePs.new_password = ''
            this.updatePs.rep_password = ''
        },
        logout() {
            window.location.href = '/xigua/loginout.html'
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath)
        },
        handleSelect(key, keyPath) {
            // console.log(key, keyPath)
        },
        handleCommand(command) {  // 下拉菜单 操作
            if (command == 'logout') { // 退出登录
                this.logout()
            } else if (command == 'handleClickUpdatePs') { // 修改密码
                this.dialogFormVisible = true
            }
        }
    }
  }
</script>
<style  lang='less' rel='stylesheet/less'>
  nav{

    @li_item_bg: rgb(43, 49, 56);
    @hover_color: #FFF;
    @default_color:rgb(163, 163, 163);

    .el-menu{
      border-radius: 0;
      background-color: transparent;
      color: @default_color !important;

      & > .is-opened{
        background-color: @li_item_bg;
      }

      & > .is-active{
        .el-submenu__title{
          background-color: @li_item_bg;
          color:@hover_color;
        }
      }

      & > li{

        &:hover{
          background-color: @li_item_bg;
        }

        .el-menu-item-group{
          background-color: @li_item_bg;

          .el-menu-item:hover{
            background-color: @li_item_bg;
            color:@hover_color;
          }
        }
      }

      .el-menu-item, .el-submenu__title{
        color: @default_color;

        &:hover{
          background-color: @li_item_bg;
        }

        &.is-active{
          color:@hover_color;
        }

        & > i, & > span{
          font-size: 14px;
        }
      }

      .el-menu-item:hover{
        &:hover{
          color:@hover_color;
        }
      }
    }

    .el-menu--collapse{
      .menu-collapse-active{
        display: none;
      }
    }

    .processing-orders-nums-b{
        .el-badge__content{
            top:15px;
            right: 25px;
        }
    }
  }
</style>

<style scoped lang='less' rel='stylesheet/less'>
  @side_bg: #21252a;
  @logo_txt: #5c7a99;
  .side_bar{
    position: fixed;
    top:0;
    z-index: 1000;
    height: 100%;
    text-align:left;
    background: @side_bg;

    .side-bar-logo{
        width: 100%;
        height: 140px;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        transition: background-image 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
        cursor: pointer;
    }

    .side-bar-logo-name{
        display: inline-block;
        width: 160px;
        font-family: "微软雅黑";
        position: absolute;
        bottom: 8px;
        left: 50px;
        font-size: 18px;
        text-align: center;
        color: @logo_txt;
    }

    .side-bar-menu{
        padding-top: 20px;
    }

    .side-bar-icon{
      margin-top: -2px;
    }
    .side-bar-txt{
        margin-left: 7px;
    }
  }
  .top_bar{
    position: fixed;
    top:0;
    background-color: #fff;
    /*width: ~'calc(100% - 260px)';*/
    height:50px;
    padding-left: 260px;
    z-index: 999;
    box-shadow: 0 1px 5px #999;

    .shrink-button{
      float: left;
      width: 52px;
      height: 24px;
      margin:13px;
      cursor: pointer;
      border: 1px solid transparent;
      border-right: 1px solid #e6e9eb;
    }


    .processing-orders-nums{
        display: inline-block;
        width: 80px;
        line-height: 20px;
        padding: 15px 10px;
        text-align: center;
        cursor: pointer;

        &:hover{
            box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);
        }

        .header-msg-icon{
            font-size: 20px;
            margin-right: 15px;
        }
    }



    .user-container{
        height: 50px;
        margin-right: 30px;
        display: inline-block;
        &:hover{
            box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);
        }

        .user-wrapper{
            padding:15px 10px;
            cursor: pointer;

            .user-name{
                padding-right: 20px;
            }
        }

        .user-face{
            font-size: 18px;
            margin-right: 15px;        
        }

    }
  }

    .hedare-dropdown-item{
        width: 113px;

        .h-d-item-icon{
            font-size: 16px;
            margin-right: 5px;
            margin-top: 8px;
        }
    }
</style>
