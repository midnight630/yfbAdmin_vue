<template>
  <div class="g-container xg-user-manage">
    <div class="g-content-title">
        <h3>优瓜用户管理</h3>
    </div>
    <div class="g-filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" label-width="100px" :label-position="labelPosition">
        <div>
            <el-form-item label="注册手机号:" style='width:30%'>
                <el-input v-model="listQuery.mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="公众号：" style='width:30%'>
                <el-input v-model="listQuery.keyword" placeholder="公众号"></el-input>
            </el-form-item>
            <el-form-item label="CPC黑名单：" style='width:30%'>
                <el-select v-model="listQuery.is_black" placeholder="不限">
                    <el-option label="不限" value="">不限</el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="跟进销售：" style='width:30%' >
                <el-select v-model="listQuery.sale_id" placeholder="全部" >
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for= '(item, key) in saleJson ' :key='item + key' :label="item" :value="key">{{item}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="绑定微信：" style='width:30%'>
                <el-radio-group v-model="listQuery.author">
                    <el-radio class="radio" label="0">不限</el-radio>
                    <el-radio class="radio" label="1" >是</el-radio>
                    <el-radio class="radio" label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="注册目的：" style='width:30%'>
                <el-radio-group v-model="listQuery.intention">
                    <el-radio label="0">不限</el-radio>
                    <el-radio label="1">投广告</el-radio>
                    <el-radio label="2">接广告</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      </el-form>

    </div>
    <el-table stripe :data="tableData" style="width: 100%" v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column prop="id" label="ID" resizable ></el-table-column>
        <el-table-column  label="注册手机号" resizable>
            <template slot-scope="scope">
              <span v-if="scope.row.mobile == ''">--</span>
              <span v-else>{{scope.row.mobile}}</span>
            </template>
        </el-table-column>
        <el-table-column label="注册时间" width="">
            <template slot-scope="scope">
                <div>{{scope.row.create_time.split(' ')[0]}}</div>
                <div>{{scope.row.create_time.split(' ')[1]}}</div>
            </template>
        </el-table-column>
        <el-table-column prop="intention" label="注册目的" width=""></el-table-column>
        <el-table-column label="绑定微信" width="">
            <template slot-scope="scope">--</template>
        </el-table-column>
        <el-table-column prop="amount" label="余额" width=""></el-table-column>
        <el-table-column prop="mp_num" label="添加公众号数" width=""></el-table-column>
        <el-table-column prop="souce" label="用户来源" width=""></el-table-column>
        <el-table-column label="上次登录时间" width="">
            <template slot-scope="scope">
                <div>{{scope.row.last_login_time.split(' ')[0]}}</div>
                <div>{{scope.row.last_login_time.split(' ')[1]}}</div>
            </template>
        </el-table-column>
        <el-table-column prop="sale_id" label="跟进销售"></el-table-column>
        <!--<el-table-column-->
        <!--label="操作">-->
            <!--<template slot-scope="scope">-->
              <!--<a v-if="scope.row.is_black == 0" @click='joinOP(scope.row.userid)' href='javascript:;' size="small" >拉黑-->
              <!--</a>-->
              <!--<a v-else @click='cancelOP(scope.row.userid)' href='javascript:;' size="small" >取消拉黑-->
              <!--</a>-->
            <!--</template>-->
        <!--</el-table-column>-->
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
  import users from './user.json'

  export default {
    name: 'xg-user-manage',
    data() {
      return {
        labelPosition: 'left',
        tableData: [],
        saleJson: users,
        processingOrders: 0,
        saleList: [], //  跟进销售数据
        listQuery: { // 搜索条件
          mobile: '',
          is_black: '',
          sale_id: '', // 跟进销售
          intention: '0', // 注册目的
          limit: 10,
          offset: 1,
          order: 'id',
          author: '0', // 绑定微信
          keyword: '' // 公众号
        },
        listLoading: true,
        pageTotal: 0
      }
    },
    mounted: function()	{
        // 获取订单数据
        this.getList()
    },
    methods: {
        getList() {
            let _this = this
            _this.listLoading = true
            // ajax
            this.$http.get('/ygData/members.html', {
                params: _this.listQuery
            }).then(response => {
                _this.tableData = response.data.data
                _this.pageTotal = parseInt(response.data._count)
                _this.listLoading = false
            }, response => {
                console.log(response)
            })
        },
        getSaleData() { // 获取跟进销售数据
        },
        handleFilter() {
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.offset = val
            this.getList()
        },
        joinShielding(id) { // 拉黑
            let _this = this
            // ajax
            _this.$http.get('/BlackData/user_enter_blacklist.html?userid=' + id + '&type=2')
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
                _this.getList()
            }, response => {
                console.log(response)
            })
        },
        cancelShielding(id) { // 取消拉黑
            let _this = this
            // ajax
            _this.$http.get('/BlackData/admin_user_out.html?id=' + id + '&type=2')
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
                _this.getList()
            }, response => {
                console.log(response)
            })
        },
        cancelOP(id) {
            let _this = this
            _this.$confirm('移出黑名单后，该用户的所有公众号均移出黑名单。确定将用户从黑名单中移出？', '提示', {
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
            _this.$confirm('用户被放入黑名单后，其持有的所有公众号将被拉黑。确定将该用户拉入黑名单?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                _this.joinShielding(id)
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
</style>
