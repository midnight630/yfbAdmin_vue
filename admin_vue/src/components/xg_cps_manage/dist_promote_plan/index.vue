<template>
  <div class="g-container xg-user-manage">
    <div class="g-content-title">
        <h3>分销推广计划</h3>
    </div>
    <div class="g-filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" label-width="100px" :label-position="labelPosition">
        <div>
            <el-form-item label="品类" style='width:30%' >
                <el-select v-model="listQuery.series" placeholder="全部品类" >
                    <el-option label="全部品类" value=""></el-option>
                    <el-option v-for= '(item, key) in seriesList ' :key='item.tag + key' :label="item.tag" :value="item.id">{{item.tag}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间" style='width:30%'>
                <el-date-picker
                    v-model="create_time"
                    type="daterange"
                    align="right"
                    range-separator=" 至 "
                    placeholder="选择日期范围"
                    @change='dataChange'
                    >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="关键词" style='width:30%'>
                <el-input v-model="listQuery.keyword" @keyup.enter.native='keyupEvent' placeholder="推广计划、产品名称、推荐方案"></el-input>
            </el-form-item>
            <el-form-item label="用户账号" style='width:30%'>
                <el-input v-model="listQuery.phone_num" @keyup.enter.native='keyupEvent' placeholder="用户账号"></el-input>
            </el-form-item>
        </div>
        <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      </el-form>
    </div>
    <div style="padding-top:10px;padding-bottom:20px;">
        <div class="g-cfix">
            <span class="g-fr" style="margin-left:15px;">媒体总佣金 <span class="g-text-base" style="padding-left:3px; padding-right:3px;">&yen;{{planSum.total_commission}}</span></span>
            <span class="g-fr" style="margin-left:15px;">总充值额 <span class="g-text-base" style="padding-left:3px; padding-right:3px;">&yen;{{planSum.total_recharge}}</span></span>
            <span class="g-fr" style="margin-left:15px;">总订单数 <span class="g-text-base" style="padding-left:3px; padding-right:3px;">{{planSum.order_num}}</span></span>
            <span class="g-fr">共 <span class="g-text-base" style="padding-left:3px; padding-right:3px;">{{planSum._count}}</span>个推广计划</span>
        </div>
    </div>
    <el-table stripe :data="tableData" style="width: 100%" v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column  label="推广计划" width='140'>
            <template slot-scope="scope">
                <div class="g-text-ellipsis" :title="scope.row.name">{{scope.row.name}}</div>
            </template>
        </el-table-column>
        <el-table-column label="产品" class="g-text-ellipsis" width="180">
            <template slot-scope="scope">
                <div class="g-text-ellipsis">
                    <span v-if='scope.row.series_name !=  ""' style="display: inline-block;min-width: 10px;padding: 2px 5px;line-height:16px;;border-radius: 2px;color: #fff;background-color: #999;">{{scope.row.series_name}}</span>
                    <span :title="scope.row.novel_title">{{scope.row.novel_title}}</span>                
                </div>
            </template>
        </el-table-column>
        <el-table-column label="订单数" width="">
            <template slot-scope="scope">
                <span class="g-text-base">{{scope.row.order_num}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="amount" label="充值额" width="">
        </el-table-column>
        <el-table-column prop="mt_commision" label="媒体佣金" width="">
        </el-table-column>
        <el-table-column prop="settle_commision" label="已结算佣金" width="">
        </el-table-column>

        <el-table-column prop="phone_num" label="创建用户" width=""></el-table-column>
        <el-table-column label="创建时间" width="">
            <template slot-scope="scope">
                <div>{{scope.row.create_time.split(' ')[0]}}</div>
                <div>{{scope.row.create_time.split(' ')[1]}}</div>
            </template>
        </el-table-column>
        <el-table-column label="操作" width='180'>
            <template slot-scope="scope">
                <a @click='extendUrl(scope.row.extend_url)' href='javascript:;'>专属推广链接</a>
                <a @click='extendQrcode(scope.row.extend_qrcode)' href='javascript:;' >专属二维码</a>
                <br/>
                <a href='javascript:;' @click='HandleClickPromote(scope.row.id)'>推广文案</a>
                <router-link :to='"/cps_manage/dist_order?keyword="+ scope.row.name'>查看订单</router-link>
            </template>
        </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="g-pagination-container">
      <el-pagination
        layout="total,prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :total="pageTotal"
        :current-page.sync="listQuery.offset">
      </el-pagination>
    </div>

    <el-dialog
      title="专属推广链接"
      :visible.sync="dialogVisibleUrl"
      size="tiny">
      <div>
          <span>{{exUrl}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openUrl">打开链接</el-button>
        <el-button type="primary" @click="dialogVisibleUrl = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="专属二维码"
      :visible.sync="dialogVisibleQr"
      size="tiny">
      <div style="text-align:center">
          <img :src="exQr" style="font-size:0">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleQr = false">确 定</el-button>
      </span>
    </el-dialog>
    <yfb-iphone :content="phoneCon" :iphvisable='iphvisable' :wentitle='phoneTitle' :wencover='phoneCover' :hidePhone="hidePhone"></yfb-iphone>
  </div>
</template>
<script>
  // import users from './user.json'
  import IPhone from '@/components/common/iphone/index'
  export default {
    name: 'xg-dist-promote-plan',
    data() {
      return {
        labelPosition: 'left',
        tableData: [],
        seriesList: [],  // 品类数据
        create_time: '', // 创建时间
        planSum: {
            order_num: 0,
            total_commission: 0,
            total_recharge: 0,
            _count: 0
        },
        listQuery: { // 搜索条件
            series: '', // 品类
            time_start: '', // 创建开始时间
            time_end: '', // 创建结束时间
            keyword: '', // 公众号
            phone_num: '', // 用户账号
            limit: 10,
            offset: 1
        },
        listLoading: true,
        pageTotal: 0,
        dialogVisibleUrl: false,
        dialogVisibleQr: false,
        exUrl: '',
        exQr: '',
        iphvisable: false,
        phoneCon: '',
        phoneTitle: '',
        phoneCover: ''
      }
    },
    mounted: function() {
        // 获取品类数据
        this.getSeriesList()
        // 获取订单数据
        this.getList()
        // 获取推广计划的统计
        this.getPlanCensus()
    },
    methods: {
        getList() { // 获取订单数据
            let _this = this
            _this.listLoading = true
            // ajax
            this.$http.get('/Noveldata/promotion_plan.html', {
                params: _this.listQuery
            }).then(response => {
                _this.tableData = response.data.data
                _this.pageTotal = parseInt(response.data._count)
                _this.listLoading = false
            }, response => {
                console.log(response)
            })
        },
        getPlanCensus() { // 获取推广计划的统计
            let _this = this
            // ajax
            this.$http.get('/Noveldata/plan_census.html', {
                params: _this.listQuery
            }).then(response => {
                _this.planSum = response.data
            }, response => {
                console.log(response)
            })
        },
        getSeriesList() { // 品类数据
            let _this = this
            _this.$http.get('/Noveldata/series_list.html')
            .then(response => {
                _this.seriesList = response.data.data
            }, response => {
                console.log(response)
            })
        },
        handleFilter() {
            this.getList()
        },
        dataChange(val) {
            this.listQuery.time_start = val.split(' 至 ')[0]
            this.listQuery.time_end = val.split(' 至 ')[1]

            this.getList()
        },
        keyupEvent() {
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.offset = val
            this.getList()
        },
        HandleClickPromote(id) { // 查看
            let _this = this
            this.iphvisable = !this.iphvisable
            _this.phoneCon = ''
            _this.phoneTitle = ''
            _this.phoneCover = ''
            _this.$http.get('/NovelApi/plan_details.html', {
                params: {id: id}
            }).then(response => {
                _this.phoneCon = response.data.content
                _this.phoneTitle = response.data.plan_title
                _this.phoneCover = response.data.plan_img
            })
        },
        hidePhone() {
            this.iphvisable = !this.iphvisable
            return false
        },
        extendUrl(url) { // 专属推广链接
            this.exUrl = url
            this.dialogVisibleUrl = true
        },
        openUrl() { // 打开专属推广链接
            this.dialogVisibleUrl = false
            window.open(this.exUrl)
        },
        extendQrcode(url) { // 专属二维码
            this.exQr = url
            this.dialogVisibleQr = true
        }
    },
    components: {
        'yfb-iphone': IPhone
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
</style>
