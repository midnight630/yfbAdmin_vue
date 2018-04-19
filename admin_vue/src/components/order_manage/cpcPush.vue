<template>
  <div class="g-container xg-order-manage">
    <div class="g-content-title">
        <h3>CPC推广管理</h3>
    </div>
     <div class="">
      <el-tabs v-model="tabsName" @tab-click="tabsHandleClick">
        <el-tab-pane label="订单管理" name="order"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="g-filter-container">
        <el-form :inline="true" :model="listQuery" label-width="100px" :label-position="labelPosition" >
            <div>
                <el-form-item label="订单号" style='width:30%'>
                  <el-input  v-model="listQuery.order_no" placeholder="订单号"></el-input>
                </el-form-item>
                <el-form-item label="订单时间" style='width:30%'>
                  <el-date-picker
                    v-model="date1"
                    type="daterange"
                    align="right"
                    range-separator=" 至 "
                    placeholder="选择日期范围"
                    @change='dataChange1'
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="实际推送" style='width:30%'>
                  <el-date-picker
                    v-model="date2"
                    type="daterange"
                    align="right"
                    range-separator=" 至 "
                    placeholder="选择日期范围"
                    @change='dataChange2'
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="接单公众号" style='width:30%'>
                  <el-input v-model="listQuery.wx_title" placeholder="接单公众号"></el-input>
                </el-form-item>
                <el-form-item label="活动ID" style='width:30%'>
                  <el-input v-model="listQuery.ad_id" placeholder="活动ID"></el-input>
                </el-form-item>

                <el-form-item label="派单主题" >
                  <el-input v-model="listQuery.ad_title" placeholder="派单主题"></el-input>
                </el-form-item>

                <el-form-item label="预计广告位"  style='width:30%'>
                  <el-select v-model="listQuery.push_position" placeholder="全部">
                    <el-option label="全部" value=''></el-option>
                    <el-option label="多图文头条" value='1'></el-option>
                    <el-option label="多图文第二条" value='2'></el-option>
                    <el-option label="多图文第三条" value='3'></el-option>
                    <el-option label="多图文第四条" value='4'></el-option>
                    <el-option label="多图文第五条" value='5'></el-option>
                    <el-option label="多图文第六条" value='6'></el-option>
                    <el-option label="多图文第七条" value='7'></el-option>
                    <el-option label="多图文第八条" value='8'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="来源" style='width:30%'>
                  <el-select v-model="listQuery.source" placeholder="全部">
                    <el-option label="全部" value=''></el-option>
                    <el-option label="优瓜" value='5'></el-option>
                    <el-option label="西瓜君" value='2'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="CPC黑名单" style='width:30%'>
                  <el-select v-model="listQuery.is_black" placeholder="全部">
                    <el-option label="不限" value=''></el-option>
                    <el-option label="是" value='1'></el-option>
                    <el-option label="否" value='2'></el-option>
                  </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="订单状态" >
                    <el-checkbox :indeterminate="isIndeterminate" style='margin-right:10px;' v-model='checkAll' label="0" @change='checkboxAll'>全部</el-checkbox>
                    <el-checkbox-group v-model="checkedStatusArr" @change='checkboxChange' style='display:inline-block'>
                        <el-checkbox v-for="(item,index) in statusArr" :label='index + 1' :key='index + "checkbbox"'>{{item}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <!-- status -->
            <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
        </el-form>
    </div>
    <div style="padding:20px 0;height:36px;">
        <!-- <el-button @click='downloadExcel'>导出EXCEL</el-button> -->
        <div style="display:inline-block;float:right">
            <span class="statistics-txt" >订单数量 <span class="statistics-num" >{{ statistics.count }}</span> </span> 
            <span class="statistics-txt">预估支出 <span class="statistics-num" >&yen; {{ statistics.pre_pay_price}}</span></span>
            <span class="statistics-txt">实际支出 <span class="statistics-num" >&yen; {{ statistics.aut_pay_price}}</span></span>
            <span class="statistics-txt">平台佣金 <span class="statistics-num" >&yen; {{ statistics.rew_price}}</span></span>
            <span class="statistics-txt">实际阅读 <span class="statistics-num" >&yen; {{ statistics.aut_read}}</span></span>
        </div>
    </div>

    <el-table  stripe :data="tableData" style="width: 100%;font-size:12px;" v-loading="listLoading" element-loading-text="给我一点时间" >
      <el-table-column label="订单号/订单时间" width="180px">
        <template slot-scope="scope">
          <div>{{scope.row.order_num}}</div>
          <div>{{scope.row.create_time}}</div>
          <span v-if='scope.row.is_xiguajun == 1' style="padding:0 6px;border-radius:4px; background-color:#5eb95e;color:#fff">西</span>
          <span v-if='scope.row.is_xiguajun == 5' style="padding:0 6px;border-radius:4px; background-color:#f80;color:#fff">优</span>
        </template>
      </el-table-column>
      <el-table-column  label="活动ID/派单主题" width="">
        <template slot-scope="scope">
          <div>{{scope.row.ad_id}}</div>
          <div>{{scope.row.activity_push_theme_title}}</div>
        </template>
      </el-table-column>
         <el-table-column label="接单公众号" width="160px">
            <template slot-scope="scope">
                <div>
                    <div class="g-cfix">
                        <div style="display:inline-block;width:45px;margin-right:5px;" class="g-fl">
                            <div class="display:inline-block" style="width:40px;height:40px;border:1px solid #999;overflow:hidden;">
                                <img :src="scope.row.thumb" :alt="scope.row.weixinname" style="dsiplay:inline-block;width:40px;height:40px;">
                            </div>
                        </div>
                        <div style="display:inline-block;width:70px;" class="g-fl">
                            <div class="g-text-ellipsis" style="line-height:18px;width:70px" :title="scope.row.mp_title">{{scope.row.mp_title}}</div>
                            <div class="g-text-ellipsis" style="line-height:18px;width:70px" :title="scope.row.weixinname">{{scope.row.weixinname}}</div>
                        </div>
                    </div>
                    <div style="margin-top:10px;">
                         <span v-if='scope.row.is_black == 1' style="padding:0 6px;border-radius:8px; background-color:#333;color:#fff">黑</span>
                    </div>
                </div>
            </template>
        </el-table-column>
      <el-table-column label="预计广告位 / 实际广告位" width="">
        <template slot-scope="scope">
          <div>{{scope.row.pre_push_position}}</div>
          <div>{{scope.row.actual_push_position}}</div>
        </template>
      </el-table-column>
      <el-table-column label="预计推送 / 实际推送" width="">
        <template slot-scope="scope">
          <div>{{scope.row.pre_push_date}}</div>
          <div>{{scope.row.actual_push_date == ''? '--':scope.row.actual_push_date}}</div>
        </template>
      </el-table-column>
      <el-table-column label="预估阅读量 / 实际阅读量" width="">
        <template slot-scope="scope">
          <div>{{scope.row.read_num}}</div>
          <div>{{scope.row.actual_read_num}}</div>
        </template>
      </el-table-column>
      <el-table-column label="预估支出 / 实际支出" width="">
        <template slot-scope="scope">
          <div>{{scope.row.pre_pay_price}}</div>
          <div>{{scope.row.actual_pay_price}}</div>
        </template>
      </el-table-column>
      <el-table-column label="预估收入 / 实际收入" width="">
        <template slot-scope="scope">
          <div>{{scope.row.pre_push_income}}</div>
          <div>{{scope.row.actual_push_income}}</div>
        </template>
      </el-table-column>
      <el-table-column label="实收佣金" width="">
        <template slot-scope="scope">
          <div>{{scope.row.actual_reward_price ? scope.row.actual_reward_price : '--'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop='status' label="状态"></el-table-column>
      <el-table-column label="操作" width='90px'>
        <template slot-scope="scope">
          <router-link  :to="{path:'/index/order_manage/order_detail',query: {id: scope.row.id, offset: listQuery.offset}}">查看详情</router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="g-pagination-container">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="pageTotal"
        :current-page.sync="listQuery.offset">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'xg-order-manage',
    data() {
      return {
        labelPosition: 'left',
        tabsName: 'order',
        isIndeterminate: false,
        pickerOptions: {
          disabledDate(time) {
          }
        },
        pickerOptions2: {
        },
        statusArr: ['待推送', '待结算', '待验收', '验收异常', '已完成', '已取消', '已申诉'],
        checkedStatusArr: [],
        checkAll: false,
        tableData: [],
        listQuery: {
          'order_no': '',
          'date_time': '',
          'push_time': '',
          'wx_title': '',
          'ad_id': '',
          'ad_title': '',
          'push_position': '',
          'status': '',
          'is_black': '',
          'get_type': 1,
          'limit': 10,
          'offset': 1,
          'source': ''
        },
        statistics: {
            aut_pay_price: 0,
            aut_read: 0,
            count: '0',
            pre_pay_price: 0,
            rew_price: 0
        },
        listLoading: true,
        pageTotal: 0,
        date1: '',
        date2: ''
      }
    },
    mounted: function()	{
        this.getStatisticsData()
        this.getList()
    },
    methods: {
        getStatisticsData() { // 获取统计值
            let _this = this;
            this.$http.get('/Data/owner_order_major.html', {
                params: _this.listQuery
            })
            .then(response => {
                _this.statistics = response.data.Statistics
            }, response => {
                console.log(response)
            })
        },
        getList() { // 获取列表的数据
            let _this = this
            _this.listLoading = true
            // ajax
            this.$http.get('/Data/owner_order.html', {
                params: _this.listQuery
            })
            .then(response => {
                _this.tableData = response.data.data
                _this.pageTotal = parseInt(response.data._count)
                _this.listLoading = false
            }, response => {
                console.log(response)
            })
        },
        tabsHandleClick() {
            this.getList()
        },
        handleFilter() {
            this.getStatisticsData()
            this.getList()
        },
        downloadExcel() { // 导出excel表格
            let parmObj = this.listQuery
            let key
            let parm = '';
            const keyS = ['ad_title', 'ad_id', 'status', 'push_position', 'date_time', 'wx_title', 'order_no']

            for (key in parmObj) {
                if (keyS.indexOf(key) >= 0 && parmObj[key] != '') {
                    parm += key + '=' + parmObj[key] + '&'
                }
            }
            window.location.href = '/data/excel_cpc_order.html?' + parm;
        },
        handleSizeChange(val) {
            this.listQuery.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.offset = val
            this.getList()
        },
        dataChange1(data) {
            this.listQuery.date_time = data
        },
        dataChange2(data) {
            this.listQuery.push_time = data
        },
        checkboxChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.statusArr.length;
            this.listQuery.status = this.checkedStatusArr.join(',')
        },
        checkboxAll(event) {
            this.checkedStatusArr = event.target.checked ? [1, 2, 3, 4, 5, 6, 7] : []
            this.isIndeterminate = false
            this.listQuery.status = this.checkedStatusArr.join(',')
        }
    }
  }
</script>
<style scoped lang='less' rel='stylesheet/less'>
    @color:#0099e5;

    .el-form-item{
        min-width: 330px;
        .el-input{
            width: 220px;
            max-width: 220px;
        }
        .el-select,.el-form-item__content{
            width: 220px;
            max-width: 220px;
        }
    }

    .statistics-txt{
        margin-left:10px;
        font-size: 12px;

        .statistics-num{
            color:@color;
        }
    }
</style>
