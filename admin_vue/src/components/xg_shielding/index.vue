<template>
  <div class="g-container xg-shielding">
    <div class="g-content-title">
        <h3>西瓜黑名单管理</h3>
    </div>
    <div class="">
      <el-tabs v-model="tabsName" @tab-click="tabsHandleClick">
        <el-tab-pane label="公众号" name="wx" class='tabs-sty'></el-tab-pane>
        <el-tab-pane label="用户" name="user" class='tabs-sty'></el-tab-pane>
      </el-tabs>
    </div>
    <div v-show='tabsName == "wx"'>
        <div class="g-filter-container">
          <el-form :inline="true" :model="listQuery" class="demo-form-inline" label-width="120px" :label-position="labelPosition">
            <div>
                <el-form-item label="公众号" style='width:45%'>
                    <el-input v-model="listQuery.keyword" placeholder="微信号/公众号"></el-input>
                </el-form-item>
                <el-form-item label="媒体主" style='width:45%'>
                    <el-input v-model="listQuery.member" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="分类" class='el-form-item-type'>
                    <el-radio class="radio" v-model="listQuery.class_id" label="0">不限</el-radio>
                    <el-radio v-for='item in mp_categorys' :key='item.catid' class="radio" v-model="listQuery.class_id" :label="item.catid">{{ item.catname}}</el-radio>
                </el-form-item>
            </div>
            <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          </el-form>
        </div>
        <!-- <div style="padding:20px 0">
            <p style="font-size:12px;margin-bottom:10px;">已选择 <span>{{batchMpIds.length}}</span> 个公众号，批量操作</p>
            <div>
                <el-button @click='batchRemoveMp'>批量移出黑名单</el-button>
                <el-button @click='downloadExcel'>导出EXCEL</el-button>
                <el-button type="primary" @click='addMp'>添加公众号</el-button>
            </div>
        </div> -->
        <el-table  stripe :data="tableData" @selection-change="handleSelectionMpChange" style="width: 100%;font-size:12px;" v-loading="listLoading" element-loading-text="给我一点时间">
            <el-table-column type="selection" width="50px"></el-table-column>
            <el-table-column prop="id" label="ID" width="80px"></el-table-column>
            <el-table-column  label="头像/微信号/公众号" width="160px">
                <template slot-scope="scope">
                    <div class="g-cfix">
                        <div style="display:inline-block;width:45px;" class="g-fl">
                            <div class="display:inline-block" style="width:40px;height:40px;border:1px solid #999;overflow:hidden;">
                                <img :src="scope.row.logo" :alt="scope.row.weixinname" style="dsiplay:inline-block;width:40px;height:40px;">
                            </div>
                        </div>
                        <div style="display:inline-block;width:70px;" class="g-fl">
                            <div class="g-text-ellipsis" style="line-height:18px;width:70px;" :title="scope.row.title">{{scope.row.title}}</div>
                            <div class="g-text-ellipsis" style="line-height:18px;width:70px;" :title="scope.row.weixinname">{{scope.row.weixinname}}</div>
                        </div>
                    </div>
                    <div>
                        <span v-if='scope.row.support == 1' style="background-color: #3bb4f2;border-radius:4px;display: inline-block;
    color:#fff;font-size:12px;padding: 0px 4px;margin-right:5px;line-height:18px;">自营</span>
                        <span v-if='scope.row.authorization == 1' style="background-color: #F37B1D;border-radius:4px;display: inline-block;
    color:#fff;font-size:12px;padding: 0px 4px;line-height:18px;">授权</span>
                    </div>

                </template>
            </el-table-column>
            <el-table-column label="粉丝数/分类" width="">
                <template slot-scope="scope">
                    <div>{{scope.row.fans_num}}</div>
                    <div>{{scope.row.catname}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="tags"  label="标签" width=""></el-table-column>
            <el-table-column label="性别比例" width="">
                <template slot-scope="scope">
                    <div>男 {{scope.row.m_sex? scope.row.m_sex : 0}}%</div>
                    <div>女 {{scope.row.w_sex? scope.row.w_sex : 0}}%</div>
                </template>
            </el-table-column>

            <el-table-column label="重要指标" width="">
                <template slot-scope="scope">
                    <div>首条 {{scope.row.first_aberage_read}}</div>
                    <div>2-8 {{scope.row.second_aberage_read}}</div>
                </template>
            </el-table-column>
            <el-table-column label="报价/托管折扣" width="">
                <template slot-scope="scope">
                    <div>头条	&yen;&nbsp;&nbsp; {{scope.row.first_price}} &nbsp;&nbsp; {{scope.row.first_discount}} &nbsp;&nbsp; 折</div>
                    <div>第2条    &yen;&nbsp;&nbsp; {{scope.row.second_price}} &nbsp;&nbsp; {{scope.row.second_discount}} &nbsp;&nbsp; 折</div>
                    <div>第3-N条	&yen;&nbsp;&nbsp; {{scope.row.third_price}} &nbsp;&nbsp; {{scope.row.second_discount}} &nbsp;&nbsp; 折</div>
                </template>
            </el-table-column>
            <el-table-column label="所属公司" width="">
                <template slot-scope="scope">
                    <div>{{scope.row.company_name ? scope.row.company_name : "--"}}</div>
                </template>
            </el-table-column>

            <el-table-column label="所属媒体" width="">
                <template slot-scope="scope">
                    <div>{{scope.row.souce != 1 ? '后台' : scope.row.member ? scope.row.member : "--" }}</div>
                    <div>id: {{scope.row.userid}}</div>
                </template>
            </el-table-column>
            <el-table-column label="拉黑时间" width="">
                <template slot-scope="scope">
                    <div>{{scope.row.black_time.split(' ')[0]}}</div>
                    <div>{{scope.row.black_time.split(' ')[1]}}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                    <a @click='cancelMpOP(scope.row.id)' href="javascript:;">取消拉黑</a>
                </template>
            </el-table-column> -->
        </el-table>
        <div class="g-pagination-container">
            <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleCurrentPageChange1"
                :total="pageTotal"
                :current-page.sync="listQuery.offset">
            </el-pagination>
        </div>
    </div>
    <div v-show='tabsName == "user"'>
        <div class="g-filter-container">
          <el-form :inline="true" :model="userListQuery" class="demo-form-inline" label-width="120px" :label-position="labelPosition">
            <div>
                <el-form-item label="手机号" style='width:45%'>
                  <el-input v-model="userListQuery.mobile" placeholder="手机号/用户ID"></el-input>
                </el-form-item>
                <el-form-item label="公众号" style='width:45%'>
                  <el-input v-model="userListQuery.keyword" placeholder="微信号/公众号"></el-input>
                </el-form-item>
            </div>
            <el-button class="filter-item" type="primary" icon="search" @click="userHandleFilter">搜索</el-button>
          </el-form>
        </div>
        <!-- <div style="padding:20px 0">
            <p style="font-size:12px;margin-bottom:10px;">已选择 <span>{{batchUserIds.length}}</span> 个用户，批量操作</p>
            <div>
                <el-button @click='batchRemoveUser'>批量移出黑名单</el-button>
                <el-button type="primary" @click='addUser'>用户</el-button>
            </div>
        </div> -->
        <el-table  stripe :data="userTableData"  @selection-change="handleSelectionUserChange" style="width: 100%;font-size:12px;" v-loading="listLoading2" element-loading-text="给我一点时间">
            <el-table-column type="selection" width=""></el-table-column>
            <el-table-column  label="用户ID" width="">
                <template slot-scope="scope">
                    <span>{{scope.row.userid}}</span>
                </template>
            </el-table-column>

            <el-table-column label="注册手机号" width="">
                <template slot-scope="scope">
                    <div>{{scope.row.mobile == '' ? '--': scope.row.mobile}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="sale_id"  label="注册时间" width="">
                <template slot-scope="scope">
                    <div>{{scope.row.create_time.split(' ')[0]}}</div>
                    <div>{{scope.row.create_time.split(' ')[1]}}</div>
                </template>
            </el-table-column>

            <el-table-column label="余额" width="">
                <template slot-scope="scope">
                    <span>&yen; {{scope.row.amount}}</span>
                </template>
            </el-table-column>

            <el-table-column label="添加公众号数" width="">
                <template slot-scope="scope">
                    <span>{{scope.row.mp_count}}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户来源" width="">
                <!-- data.souce == 0 ? '平台注册' : data.souce == -1 ? '管理员添加' : data.souce == 1 ? '云联' : data.souce == 2 ? '银联' : '— —'; -->
                <template slot-scope="scope">
                    <div>{{scope.row.souce == 0 ? '平台注册' : scope.row.souce == -1 ? '管理员添加' : scope.row.souce == 1 ? '云联' : scope.row.souce == 2 ? '银联' : '— —'}}</div>
                </template>
            </el-table-column>

            <el-table-column prop="sale_name" label="跟进销售" width=""></el-table-column>
            <el-table-column label="拉黑时间" width="">
            <template slot-scope="scope">
              <div>{{scope.row.black_time.split(' ')[0]}}</div>
              <div>{{scope.row.black_time.split(' ')[1]}}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
                <a @click='cancelUserOP(scope.row.id)' href='javascript:;'>取消拉黑</a>
            </template>
          </el-table-column> -->

        </el-table>
        <div class="g-pagination-container">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentPageChange2"
            :total="userPageTotal"
            :current-page.sync="userListQuery.offset">
          </el-pagination>
        </div>
    </div>
    <!-- <div class="full-screen-bg" style="display:none"></div> -->
  </div>
</template>

<script>
  export default {
    name: 'xg-shielding',
    data() {
       return {
        labelPosition: 'left',
        mp_categorys: [],
        tableData: [],
        userTableData: [],
        batchMpIds: [],
        batchUserIds: [],
        tabsName: 'wx',
        listQuery: { // 公众号
          keyword: '',
          member: '',
          class_id: '0',
          limit: 10,
          offset: 1
        },
        userListQuery: { // 用户
          mobile: '',
          keyword: '',
          limit: 10,
          offset: 1
        },
        listLoading: true,
        listLoading2: true,
        pageTotal: 0,
        userPageTotal: 0,
        value2: []
      }
    },
    mounted: function()	{
        this.getCategorys()
        this.getList()
    },
    methods: {
        getCategorys() {  // 获取分类数据
            let _this = this;
            this.$http.get('/Data/mp_categorys.html?type=2&field=catid,catname')
            .then(response => {
                _this.mp_categorys = response.data.data
            }, response => {
                console.log(response)
            })
        },
        getList() { // 获取公众号列表
             let _this = this
            _this.listLoading = true
            // ajax
            this.$http.get('/BlackData/xg_mp_list.html?offset=1&limit=10', {
                params: _this.listQuery
            }).then(response => {
                _this.tableData = response.data.data
                _this.pageTotal = parseInt(response.data._count)
                _this.listLoading = false
            }, response => {
                console.log(response)
            })
        },
        getUserList() { // 获取用户列表
            let _this = this
            _this.listLoading2 = true
            // ajax
            this.$http.get('/BlackData/xg_user_list.html', {
                params: _this.userListQuery
            }).then(response => {
                _this.userTableData = response.data.data
                _this.userPageTotal = parseInt(response.data._count)
                _this.listLoading2 = false
            }, response => {
                console.log(response)
            })
        },
        handleFilter() {  // 公众号 搜索
            this.getList()
        },
        userHandleFilter() { // 用户搜索
            this.getUserList()
        },
        tabsHandleClick(tab, event) {  // tabs 切换
            if (tab.name == 'wx') {
                this.listQuery.offset = 1
                this.getList()
            } else {
                this.userListQuery.offset = 1
                this.getUserList()
            }
        },
        handleCurrentPageChange1(val) {  // 公众号 页码变化
            this.listQuery.offset = val
            this.getList()
        },
        handleCurrentPageChange2(val) {  // 用户页码变化
            this.userListQuery.offset = val
            this.getUserList()
        },
        handleSelectionMpChange(val) {  // 公众号 多选
            let item
            this.batchMpIds = []
            for (item of val) {
                this.batchMpIds.push(item.id)
            }
        },
        handleSelectionUserChange(val) { // 用户多选
            let item
            this.batchUserIds = []
            for (item of val) {
                this.batchUserIds.push(item.id)
            }
        },
        cancelMpShielding(ids) {  // 取消公众号拉黑
            let _this = this
            _this.$http.get('/BlackData/mp_out_blacklist.html?ids=' + ids)
            .then(response => {
                if (response.data.code == 200) {
                    _this.$message({
                        type: 'success',
                        message: '取消拉黑操作成功!'
                    });
                } else {
                    _this.$message({
                        type: 'success',
                        message: '取消拉黑操作失败!'
                    });
                }
                _this.getList()
            }, response => {
                console.log(response)
            })
        },
        cancelUserShielding(ids) {  // 取消用户拉黑 这个还没对借口
            let _this = this
            _this.$http.get('/BlackData/user_out_blacklist.html?ids=' + ids)
            .then(response => {
                if (response.data.code == 200) {
                    _this.$message({
                        type: 'success',
                        message: '取消拉黑操作成功!'
                    });
                } else {
                    _this.$message({
                        type: 'success',
                        message: '取消拉黑操作失败!'
                    });
                }
                _this.getUserList()
            }, response => {
                console.log(response)
            })
        },
        batchRemoveMp() { // 批量移除公众号
            let _this = this
            let IdsLen = _this.batchMpIds.length
            if (IdsLen <= 0) {
                return false
            }
            _this.$confirm('从黑名单移出后即可正常接单。是否确认将该' + IdsLen + '个公众号移出黑名单？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                _this.cancelMpShielding(_this.batchMpIds.join(','))
            }).catch(() => { // 取消操作
            });
        },
        batchRemoveUser() { // 批量移除公众号
            let _this = this
            let IdsLen = _this.batchUserIds.length
            if (IdsLen <= 0) {
                return false
            }
            _this.$confirm('从黑名单移出后，用户持有的所有公众号可以正常接单。是否确认将该' + IdsLen + '名用户移出黑名单？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.cancelUserShielding(this.batchUserIds.join(','))
            }).catch(() => { // 取消操作
            });
        },
        downloadExcel() { // 导出excel
            const VAR = ['keyword', 'member', 'class_id']
            let parmObj = this.listQuery
            let key
            let parm = '';

            for (key in parmObj) {
                if (VAR.indexOf(key) >= 0 && parmObj[key] != '') {
                    parm += key + '=' + parmObj[key] + '&'
                }
            }
            if (window.VBArray) {
                var gotoLink = document.createElement('a')
                gotoLink.href = '/ExcelData/xg_mp_excel.html?' + parm
                document.body.appendChild(gotoLink)
                gotoLink.click()
            } else {
                window.location.href = '/ExcelData/xg_mp_excel.html?' + parm
            }
        },
        cancelMpOP(id) {
            let _this = this
            _this.$confirm('从黑名单移出后即可正常接单。是否确认将当前公众号移出黑名单？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                _this.cancelMpShielding(id)
            }).catch(() => { // 取消操作
            });
        },
        cancelUserOP(id) {
            let _this = this
            _this.$confirm('从黑名单移出后，用户持有的所有公众号可以正常接单。是否确认将该用户移出黑名单？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                _this.cancelUserShielding(id)
            }).catch(() => { // 取消操作
            });
        },
        addMp() { // 添加公众号
        },
        addUser() { // 添加用户
        }
    }
  }
</script>
<style lang='less' rel='stylesheet/less'>
    .el-form-item-type{
        .el-form-item__content{
            width: 80%;

            .el-radio{
                margin-left: 0px;
                margin-right: 15px;
            }
        }
    }
</style>
<style scoped lang='less' rel='stylesheet/less'>
    .el-form-item{
        min-width: 315px;
        .el-input{
            width: 250px;
            max-width: 250px;
        }
        .el-select,.el-form-item__content{
            width: 250px;
            max-width: 250px;
        }
    }
    .transfer-box{
        position: fixed;
        background:#fff;
        padding:20px;
        top:18%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.12);
        z-index: 10001;

        left: 50%;
        margin-left: -300px;

        &-mp, &-user{
            width: 600px;
        }
    }
    .full-screen-bg{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        background-color: rgba(0,0,0,.8);
        z-index: 10000;
    }


</style>
