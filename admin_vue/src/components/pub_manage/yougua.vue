<template>
  <div class="g-container xg-pub-manage">
     <div class="g-content-title">
        <h3>优瓜公众号管理</h3>
    </div>
    <div class="">
      <el-tabs v-model="tabsName" @tab-click="tabsHandleClick">
        <el-tab-pane label="全部公号" name="all_wx" class='tabs-sty' data-status="-2"></el-tab-pane>
        <el-tab-pane label="待审核" name="wait_audit" class='tabs-sty' data-status="0"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="g-filter-container">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" label-width="130px" :label-position="labelPosition">
            <div>
                <el-form-item label="公众号" style='width:30%'>
                    <el-input v-model="listQuery.keyword" placeholder="公众号"></el-input>
                </el-form-item>
                <el-form-item label="是否授权" style='width:30%'>
                    <el-select v-model="listQuery.accredit" placeholder="不限">
                        <el-option label="不限" value="-1">不限</el-option>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规模" style='width:30%'>
                    <el-select v-model="listQuery.mp_type" placeholder="不限">
                        <el-option label="不限" value=""></el-option>
                        <el-option label="微信500强" value="1"></el-option>
                        <el-option label="微信自媒体" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="CPC黑名单" style='width:30%'>
                    <el-select v-model="listQuery.is_black" placeholder="全部">
                        <el-option label="不限" value=""></el-option>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                
            </div>
            <div style="display:inline-block;padding:10px 0 20px;">
                    <a href='javascript:;' class="g-cfix" @click='highFilterShow' style="display:inline-block">
                        <span class="g-fl">高级搜索</span>
                        <span :class='{"el-icon-arrow-down": true, "g-fl": true, "g-rotate-180": highFilter }' style="font-size:14px;margin-left:5px;height:12px;margin-top:2px;"></span>
                    </a>
            </div>
            <el-collapse-transition>
                <div class="transition-box high-filter " v-if='highFilter' >
                    <el-form-item label="媒体主" style='width:30%'>
                        <el-input v-model="listHighQuery.member" placeholder="媒体主"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体合集/主题..." style='width:30%'>
                        <el-input v-model="listHighQuery.theme_title" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="所在地" style='width:30%'>
                        <el-input v-model="listHighQuery.city_name" placeholder="请输入地址"></el-input>
                    </el-form-item>

                    <el-form-item label="跟进渠道" style='width:30%'>
                        <el-select v-model="listHighQuery.sale_id" placeholder="全部">
                            <el-option label="不限" value="0"></el-option>
                            <el-option v-for="(sale, index) in saleList" :label="sale.truename" :key='index' :value="sale.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="托管状态" style='width:30%'>
                        <el-select v-model="listHighQuery.support" placeholder="不限">
                            <el-option label="不限" value=""></el-option>
                            <el-option label="媒体自营" value="1"></el-option>
                            <el-option label="平台托管" value="2"></el-option>
                            <el-option label="申请托管" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" style='width:30%' v-if='tabsChangeStatus'>
                        <el-select v-model="listHighQueryStatus.status" placeholder="全部">
                            <el-option label="不限" value="-2"></el-option>
                            <el-option label="待审核" value="0"></el-option>
                            <el-option label="正常接单" value="2"></el-option>
                            <el-option label="暂不接单" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属公司" style='width:30%'>
                        <el-input v-model="listHighQuery.company_name" placeholder="请输入地址"></el-input>
                    </el-form-item>

                    <el-form-item label="平均阅读数" style='width:30%' class='double-input'>
                        <el-input v-model="listHighQuery.aberage_read_start" placeholder=""></el-input>
                        <el-input v-model="listHighQuery.aberage_read_end" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="首条平均阅读数" style='width:30%' class='double-input'>
                        <el-input v-model="listHighQuery.first_aberage_read_start" placeholder=""></el-input>
                        <el-input v-model="listHighQuery.first_aberage_read_end" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="头条报价" style='width:30%' class='double-input'>
                        <el-input v-model="listHighQuery.first_start" placeholder=""></el-input>
                        <el-input v-model="listHighQuery.first_end" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="2条报价" style='width:30%' class='double-input'>
                        <el-input v-model="listHighQuery.second_start" placeholder=""></el-input>
                        <el-input v-model="listHighQuery.second_end" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="3-N条报价" style='width:30%' class='double-input'>
                        <el-input v-model="listHighQuery.third_start" placeholder=""></el-input>
                        <el-input v-model="listHighQuery.third_end" placeholder=""></el-input>
                    </el-form-item>
                </div>
            </el-collapse-transition>
            <div style="padding-top:20px;">
                <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
            </div>
        </el-form>
    </div>
    <!-- <div style="padding-top:10px;padding-bottom:20px;">
        <p style="margin-bottom:10px;">已选择<span>{{batchIds.length}}</span>个公众号，批量操作</p>
        <div>
            <el-button type="primary" @click="batchJoinShielding">批量放入黑名单</el-button>
            <span class="g-fr">共 {{pageTotal}} 个公众号</span>
        </div>
    </div> -->
    <el-table  stripe :data="tableData" style="width: 100%" :row-style='{"padding-top":"10px","padding-bottom":"10px"}' @selection-change="handleSelectionChange" v-loading="listLoading" element-loading-text="给我一点时间">
      <el-table-column type="selection" width="50px"></el-table-column>
      <el-table-column prop="id" label="ID" width="70px"></el-table-column>
      <el-table-column  label="头像/微信号/公众号" width="160px">
        <template slot-scope="scope" >
            <div>
                <div class="g-cfix">
                    <div style="display:inline-block;width:45px;margin-right:5px;" class="g-fl">
                        <div class="display:inline-block" style="width:40px;height:40px;border:1px solid #999;overflow:hidden;">
                            <img :src="scope.row.imgs.logo" :alt="scope.row.weixinname" style="dsiplay:inline-block;width:40px;height:40px;">
                        </div>
                    </div>
                    <div style="display:inline-block;width:70px;" class="g-fl">
                        <div class="g-text-ellipsis" style="width:70px;line-height:18px;" :title='scope.row.title'>{{scope.row.title}}</div>
                        <div class="g-text-ellipsis" style="width:70px;line-height:18px;" :title='scope.row.weixinname'>{{scope.row.weixinname}}</div>
                    </div>
                </div>
                <div>
                    <span v-if='scope.row.authorization == 1' style="background-color: #F37B1D;border-radius:4px;display: inline-block;
    color:#fff;font-size:12px;padding: 0px 4px;line-height:18px;">授权</span>
                </div>
            </div>
        </template>
      </el-table-column>

      <el-table-column label="粉丝数 分类" width="80px">
        <template slot-scope="scope">
          <div>{{scope.row.fans_num}}</div>
          <div>{{scope.row.catname}}</div>
        </template>
      </el-table-column>
      <el-table-column label="接单备注">
          <template slot-scope="scope">
            <span v-if="scope.row.is_black == 1" style="padding:0 6px;border-radius:8px; background-color:#333;color:#fff">黑</span>
            <span v-else>--</span>
          </template>
      </el-table-column>

      <el-table-column label="性别比例" width="">
        <template slot-scope="scope">
          <div>男 {{scope.row.sex_property ? scope.row.sex_property['1'] : 0}}%</div>
          <div>女 {{scope.row.sex_property ? scope.row.sex_property['2'] : 0}}%</div>
        </template>
      </el-table-column>

      <el-table-column label="重要指标" width="">
        <template slot-scope="scope">
          <div>平均阅读数	{{scope.row.aberage_read}}</div>
          <div>首条平均阅读数	{{scope.row.first_aberage_read}}</div>
        </template>
      </el-table-column>


      <el-table-column label="报价/托管折扣" width="">
        <template slot-scope="scope">
          <div>头条	&yen;{{scope.row.fans_num}}</div>
          <div>第2条	&yen;{{scope.row.fans_num}}</div>
          <div>第3-N条		&yen;{{scope.row.fans_num}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="company_name" label="所属公司" width=""></el-table-column>

      <el-table-column label="所属媒体" width="">
        <template slot-scope="scope">
            <div v-if="scope.row.userid > 0">
                <div>{{scope.row.mobile}}</div>
                <div>id:{{scope.row.userid}}</div>
            </div>
            <div v-else>后台</div>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="85px">
        <template slot-scope="scope">
            <!-- 0:待审核  1:正常  2:隐藏  3:未完善  -1: 已拒绝 -->
          <span v-if="scope.row.status == 0" class="g-bg-danger">待审核</span>
          <span v-if="scope.row.status == 1" class="g-bg-success">正常</span>
          <span v-if="scope.row.status == 2" class="g-bg-warning">隐藏</span>
          <span v-if="scope.row.status == 3" class="g-bg-danger">未完善</span>
          <span v-if="scope.row.status == -1" class="g-bg-warning">已拒绝</span>

        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="">
        <template slot-scope="scope">
          <div>{{scope.row.update_time.split(' ')[0]}}</div>
          <div>{{scope.row.update_time.split(' ')[1]}}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="">
        <template slot-scope="scope">
          <div>{{scope.row.create_time.split(' ')[0]}}</div>
          <div>{{scope.row.create_time.split(' ')[1]}}</div>
        </template>
      </el-table-column>
      <el-table-column label="跟进渠道" width="">
          <template slot-scope="scope"><div>--</div></template>
      </el-table-column>

      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <a v-if="scope.row.is_black == 0" @click='joinOP(scope.row.id)' href='javascript:;'>拉黑</a>
          <a v-if="scope.row.is_black == 1" @click='cancelOP(scope.row.id)' href='javascript:;'>取消拉黑</a>
        </template>
      </el-table-column> -->
    </el-table>
    <div v-show="!listLoading" class="g-pagination-container">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="pageTotal"
        :current-page.sync="listQuery.offset">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  // import tableList from './index.json'
  export default {
    name: 'xg-pub-manage',
    data() {
      return {
        labelPosition: 'left',
        highFilter: false, // 默认不显示高级搜索
        tabsChangeStatus: true, // tabs切换时 高级搜索 状态是否显示
        tabsName: 'all_wx',
        saleList: [],
        tableData: [],
        batchIds: [],
        listQuery: {
          keyword: '',
          accredit: '-1',
          mp_type: '',
          is_blick: '',
          sorts: 'desc',
          order: 'id',
          limit: 10,
          offset: 1
        },
        listHighQuery: {
            member: '',
            theme_title: '',
            city_name: '',
            sale_id: '',
            support: '',
            company_name: '',
            aberage_read_start: '',
            aberage_read_end: '',
            first_aberage_read_start: '',
            first_aberage_read_end: '',
            first_start: '',
            first_end: '',
            second_start: '',
            second_end: '',
            third_start: '',
            third_end: ''
        },
        listHighQueryStatus: {
            status: '-2'
        },
        listLoading: true,
        pageTotal: 0
      }
    },
    mounted: function()	{
        this.getSaleData()
        this.getList()
    },
    methods: {
        getList() {
            let _this = this
            let requestData = {}
            if (_this.tabsName == 'all_wx') {
                    requestData = _this.highFilter ? Object.assign({}, _this.listQuery, _this.listHighQuery, _this.listHighQueryStatus.status) : _this.listQuery
            } else {
                    requestData = _this.highFilter ? Object.assign({}, _this.listQuery, _this.listHighQuery, {state: 0}) : Object.assign(_this.listQuery, {state: 0})
            }
            _this.listLoading = true
            // ajax
            this.$http.get('/ygData/mps.html', {
                params: requestData
            })
            .then(response => {
                _this.tableData = response.data.data
                _this.pageTotal = parseInt(response.data._count)
                _this.listLoading = false
            }, response => {
                console.log(response)
            })
        },
        getSaleData() { // 跟进渠道  已完成
            const _this = this;
            this.$http.get('/Data/commerces.html?all=1&type=2')
            .then(response => {
                _this.saleList = response.data.data
            }, response => {
                console.log(response)
            })
        },
        tabsHandleClick(tab, event) {
            if (this.tabsName === 'all_wx') {
                this.tabsChangeStatus = true
                this.listQuery.offset = 1
            } else {
                this.tabsChangeStatus = false
                this.listQuery.offset = 1
            }
            this.listHighQuery.status = '-2'
            this.getList()
        },
        handleFilter() {
            this.getList()
        },
        highFilterShow() {
            this.highFilter = !this.highFilter;
        },
        handleSizeChange(val) {
            this.listQuery.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.offset = val
            this.getList()
        },
        handleSelectionChange(val) {
            let item
            this.batchIds = []
            for (item of val) {
                this.batchIds.push(item.id)
            }
        },
        joinShielding(id) {  // type 我也忘了 它是干什么的了。
            let _this = this;
            _this.$http.get('/BlackData/mp_enter_blacklist.html?ids=' + id + '&type=2')
            .then(response => {
                if (response.data.code == 200) {
                    _this.$message({
                        type: 'success',
                        message: '拉黑成功!'
                    });
                } else {
                    _this.$message({
                        type: 'success',
                        message: '拉黑失败!'
                    });
                }
                this.getList()
            }, response => {
                console.log(response)
            })
        },
        cancelShielding(id) {
            let _this = this;
            _this.$http.get('/BlackData/admin_mp_out.html?id=' + id + '&type=2')
            .then(response => {
                if (response.data.code == 200) {
                    _this.$message({
                        type: 'success',
                        message: '取消拉黑成功!'
                    });
                } else {
                    _this.$message({
                        type: 'success',
                        message: '取消拉黑失败!'
                    });
                }
                this.getList()
            }, response => {
                console.log(response)
            })
        },
        cancelOP(id) {
            let _this = this
            _this.$confirm('从黑名单移出后即可正常接单。是否确认将当前公众号移出黑名单？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                _this.cancelShielding(id)
            }).catch(() => { // 取消操作
            });
        },
        joinOP(id) {
            let _this = this
            _this.$confirm('放入黑名单的公众号将无法接任何CPC广告。是否确认将该公众号放入黑名单？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                _this.joinShielding(id)
            }).catch(() => { // 取消操作
            });
        },
        batchJoinShielding() { // 批量拉黑
            let _this = this
            let idsLen = _this.batchIds.length
            if (idsLen <= 0) {
                return false
            }
            _this.$confirm('放入黑名单的公众号将无法接任何CPC广告。是否确认将该' + idsLen + '个公众号放入黑名单？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                _this.joinShielding(_this.batchIds.join(','))
            }).catch(() => { // 取消操作
            });
        }
    }
  }
</script>
<style scoped lang='less' rel='stylesheet/less'>
    .el-form-item{
        min-width: 315px;
        .el-input{
            width: 200px;
            max-width: 200px;
        }
        .el-select,.el-form-item__content{
            width: 200px;
            max-width: 200px;
        }
    }
    .double-input{
        & .el-input{
            width: 90px;
            max-width: 90px;
        }
        & .el-form-item__content{
            width: 90px;
            max-width: 90px;


            .el-input{
                &:first-child{
                    margin-right:16px;
                }           
            }
        }
    }

    .icon-arrow-top{
        font-size: 25px;
        margin-right: 5px;
        margin-top: 10px;
    }


    </style>
