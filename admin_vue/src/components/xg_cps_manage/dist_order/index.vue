<template>
  <div class="g-container xg-user-manage">
    <div class="g-content-title">
        <h3>分销订单</h3>
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
            <el-form-item label="充值用户" style='width:30%'>
                <el-input v-model="listQuery.nickname" @keyup.enter.native='keyupEvent' placeholder="充值用户昵称"></el-input>
            </el-form-item>
            <el-form-item label="媒体用户" style='width:30%'>
                <el-input v-model="listQuery.phone_num" @keyup.enter.native='keyupEvent' placeholder="媒体用户账号"></el-input>
            </el-form-item>
            <el-form-item label="关键词" style='width:30%'>
                <el-input v-model="listQuery.keyword" @keyup.enter.native='keyupEvent' placeholder="推广计划、产品名称、推荐方案"></el-input>
            </el-form-item>
        </div>
        <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      </el-form>
    </div>
    <div style="padding-top:10px;padding-bottom:20px;">
        <div class="g-cfix">
            <span class="g-fr" style="margin-left:15px;">已结算平台佣金<span class="g-text-base" style="padding-left:3px; padding-right:3px;">&yen;{{orderSum.settle_pt}}</span></span>
            <span class="g-fr" style="margin-left:15px;">平台佣金<span class="g-text-base" style="padding-left:3px; padding-right:3px;">&yen;{{orderSum.pt_commission}}</span></span>
            <span class="g-fr" style="margin-left:15px;">已结算媒体佣金<span class="g-text-base" style="padding-left:3px; padding-right:3px;">&yen;{{orderSum.settle_mt}}</span></span>
            <span class="g-fr" style="margin-left:15px;">媒体佣金 &yen;<span class="g-text-base" style="padding-left:3px; padding-right:3px;">&yen;{{orderSum.mt_commission}}</span></span>
            <span class="g-fr" style="margin-left:15px;">总充值额 &yen;<span class="g-text-base" style="padding-left:3px; padding-right:3px;">{{orderSum.amount}}</span></span>

            <span class="g-fr">共 <span class="g-text-base" style="padding-left:3px; padding-right:3px;">{{orderSum._count}}</span>个订单</span>
        </div>
    </div>
    <el-table stripe :data="tableData" style="width: 100%" v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column  label="充值用户昵称" width='140'>
            <template slot-scope="scope">
                <div class="g-text-ellipsis" :title="scope.row.nickname">{{scope.row.nickname}}</div>
            </template>
        </el-table-column>
        <el-table-column label="推广计划" class="g-text-ellipsis" width="180">
            <template slot-scope="scope">
                <div class="g-text-ellipsis">
                    <span :title="scope.row.plan_name">{{scope.row.plan_name}}</span>                
                </div>
            </template>
        </el-table-column>
        <el-table-column label="媒体用户账号" width="">
            <template slot-scope="scope">
                <span>{{scope.row.phone_num}}</span>
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

        <el-table-column label="充值额" width="">
            <template slot-scope="scope">
                <span>&yen;{{scope.row.amount}}</span>
            </template>
        </el-table-column>
        <el-table-column label="媒体佣金" width="">
            <template slot-scope="scope">
                <div>
                    <div>&yen;{{scope.row.mt_commission}}</div>
                    <div style="color:#999">
                        <div>分成比例</div>
                        <div>{{scope.row.mt_prop}}%</div>
                    </div>
                </div>
            </template>
        </el-table-column>  
        <el-table-column label="平台佣金" width="">
            <template slot-scope="scope">
                <div>
                    <div>&yen;{{scope.row.pt_commission}}</div>
                    <div style="color:#999">
                        <div>分成比例</div>
                        <div>{{scope.row.pt_prop}}%</div>
                    </div>
                </div>
            </template>
        </el-table-column>
        <!-- <el-table-column prop="phone_num" label="创建用户" width=""></el-table-column> -->
        <el-table-column label="充值时间" width="">
            <template slot-scope="scope">
                <div>{{scope.row.create_time.split(' ')[0]}}</div>
                <div>{{scope.row.create_time.split(' ')[1]}}</div>
            </template>
        </el-table-column>
        <el-table-column label="结算状态" >
            <template slot-scope="scope">
                <span v-if='scope.row.status == 1'>已结算</span>
                <span v-else class="g-text-danger">未结算</span>
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
  </div>
</template>
<script>
  export default {
    name: 'xg-dist-order',
    data() {
      return {
        labelPosition: 'left',
        tableData: [],
        seriesList: [],  // 品类数据
        create_time: '', // 创建时间
        orderSum: {
            amount: 0,
            mt_commission: 0,
            pt_commission: 0,
            settle_mt: 0,
            settle_pt: 0,
            _count: 0
        },
        listQuery: { // 搜索条件
            series: '', // 品类
            time_start: '', // 创建开始时间
            time_end: '', // 创建结束时间
            keyword: this.$route.query.keyword ? this.$route.query.keyword : '', // 关键字
            phone_num: '', // 媒体用户
            nickname: '', // 充值用户昵称
            status: '', // 结算状态
            limit: 10,
            offset: 1
        },
        listLoading: true,
        pageTotal: 0,
        dialogVisibleUrl: false,
        dialogVisibleQr: false,
        exUrl: '',
        exQr: ''
      }
    },
    mounted: function() {
        // 获取品类数据
        this.getSeriesList()
        // 获取订单数据
        this.getList()
        // 获取推广计划的统计
        this.getOrderCensus()
    },
    methods: {
        getList() { // 获取订单数据
            let _this = this
            _this.listLoading = true
            // ajax
            this.$http.get('/Noveldata/recharge_order.html', {
                params: _this.listQuery
            }).then(response => {
                _this.tableData = response.data.data
                _this.pageTotal = parseInt(response.data._count)
                _this.listLoading = false
            }, response => {
                console.log(response)
            })
        },
        getOrderCensus() { // 获取推广计划的统计
            let _this = this
            // ajax
            this.$http.get('/Noveldata/order_census.html', {
                params: _this.listQuery
            }).then(response => {
                _this.orderSum = response.data
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
</style>
