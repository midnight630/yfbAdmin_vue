<template>
  <div class="top">
    <el-row :gutter="20" class="top-data">
      <el-col :span="8">
        <div class="grid-content bg-purple cb">
            <el-col :span="12">
              <div class="item item1">
                <div class="tit">今日新增用户数</div>
                <em class="num">0</em>
                <div class="data cb">
                  <el-col :span="12"><p>投广告</p><span>0</span></el-col>
                  <el-col :span="12"><p>投广告</p><span>0</span></el-col>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="item item1">
                <div class="tit">平台用户总数</div>
                <em class="num">1820</em>
                <div class="data cb">
                  <el-col :span="12"><p>投广告</p><span>0</span></el-col>
                  <el-col :span="12"><p>投广告</p><span>0</span></el-col>
                </div>
              </div>
            </el-col>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple cb">
          <el-col :span="12">
            <div class="item item1">
              <div class="tit">今日新增公号</div>
              <em class="num">0</em>
              <div class="data cb">
                <el-col :span="8"><p>后台导入</p><span>0</span></el-col>
                <el-col :span="8"><p>媒体添加</p><span>0</span></el-col>
                <el-col :span="8"><p>授权添加</p><span>0</span></el-col>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item item1">
              <div class="tit">公众号总数</div>
              <em class="num">39924</em>
              <div class="data cb">
                <el-col :span="8"><p>后台导入</p><span>33227</span></el-col>
                <el-col :span="8"><p>媒体添加</p><span>6697</span></el-col>
                <el-col :span="8"><p>授权添加</p><span>22</span></el-col>
              </div>
            </div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple cb">
          <el-col :span="12">
            <div class="item item1">
              <div class="tit">今日接单数（CPC）</div>
              <em class="num">0</em>
              <div class="data cb">
                <el-col :span="12"><p>预计支出</p><span>￥0</span></el-col>
                <el-col :span="12"><p>今日佣金</p><span>￥0</span></el-col>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item item1">
              <div class="tit">今日订单数（直投）</div>
              <em class="num">0</em>
              <div class="data cb">
                <el-col :span="24"><p>订单金额</p><span>￥0</span></el-col>
              </div>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="top-money bg-purple">      
      <el-col :span="6">
        <p class="money-desc">平台账户余额</p>
        <span class="money-num">¥ 1010449000.17</span>
      </el-col>
      <el-col :span="6">
        <p class="money-desc">今日充值总额</p>
        <span class="money-num">¥ 0</span>
      </el-col>
      <el-col :span="6">
        <p class="money-desc">待处理提现申请</p>
        <span class="money-num">11</span>
      </el-col>
      <el-col :span="6">
        <p class="money-desc">待处理提现总额</p>
        <span class="money-num">¥ 574012.23</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'top'
}
</script>

<style lang="less" scoped>
  .el-row.top-data {
    margin-bottom: 20px;
    &>.el-col{
      &:first-child{
        padding-left: 0 !important;
      }
      &:nth-child(2){
        .item{
          padding: 25px 10px;
        }
      }
      &:last-child{
        padding-right: 0 !important;
      }
    }
   
    &:last-child {
      margin-bottom: 0;
    }
  }
  .bg-purple {
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .1)
  }
  .grid-content {
    border-radius: 4px;
  }
  .item{
    padding: 25px 15px;
    .tit{
      color: #999;
      font-size: 14px;
    }
    .num{
      display: block;
      margin-top: 15px;
      margin-bottom: 25px;
      color: #333;
      font-size: 30px;
    }
    .data{
      .el-col{
        padding-left: 0 !important;
        p{
          margin-bottom: 5px;
          color: #999;
        }
        span{
          color: #666;
        }
      }
    }
  }

  .top-money{
    padding: 30px;
  }
  .money-desc{
    display: inline-block;
    width:40%;
    font-size: 14px;
    color: #333;
    line-height: 30px;
    vertical-align: middle;
  }
  .money-num{
    display: inline-block;
    font-size: 30px;
    width: 50%;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow:ellipsis;
    vertical-align: middle;
  }

  @media screen and (max-width:1660px) {
    .el-row.top-data {
    &>.el-col{
      &:nth-child(2){
        padding: 0 !important;
        .item{
          padding: 25px 5px;
        }
        .grid-content{
          &>.el-col{
            padding: 0 !important;
          }
       }
      }
    }
   
    &:last-child {
      margin-bottom: 0;
    }
  }
  }
</style>

