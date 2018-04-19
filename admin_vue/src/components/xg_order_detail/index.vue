<template>
	<div class="xg_order_detail">
		<div  class='nav-three-box' style="">
			<div :class="{'load-list-data': true, 'load-previous': true, 'couror-dis':preOffset <= 1}"  @click='loadPre'>
				<span v-if='!preLoading' class="el-icon-arrow-up"></span>
                <span v-else class="el-icon-loading"></span>
			</div>
			<div class="list-box">
				<ul class="list">
					<li v-for='(item, index) in orderList' :key='index' @click='handleClick(item.id ,$event)' :class='{active:item.id == orderId}' :data-id="item.id" :data-ordernum='item.order_num'>
						<div class="list-item">{{ item.order_num }}</div>
						<div class="list-item">{{ item.activity_push_theme_title }}</div>
						<div class="list-item">{{ item.create_time }}</div>
						<span class="list-item-status">{{ item.status }}</span>
					</li>
				</ul>
			</div>
			<div :class="{'load-list-data': true, 'load-next': true, 'couror-dis':nextOffset >= totalPage }" @click='loadNext'>
				<span v-if='!nextLoading' class="el-icon-arrow-down"></span>
                <span v-else class="el-icon-loading"></span>
			</div>
		</div>
		
		<div class="g-container g-three-contailer">
		    <div class="g-content-title">
		        <h3 class="breadcrumb-t">
		        	<router-link to="/order_manage" class="g-superior ">CPC推广管理</router-link>
		        	<span>/ 订单详情</span>
		        </h3>
		    </div>
		    <div class="orde-d-item">
		    	<yfb-smalltitle txt='订单信息' style='padding-bottom:16px;'></yfb-smalltitle>
		    	<div class="order-d-info">
		    		<el-row>
		    			<el-col :span="6">
		    				<div class="o-detail-item o-detail-info-i">订单号： <span>{{orderDetail.order_num}}</span></div>
                            <div class="o-detail-item o-detail-info-i">订单时间： <span>{{orderDetail.create_time}}</span></div>
		    			</el-col>
						<el-col :span="10">
                            <div class="o-detail-item o-detail-info-i">广告主： <span>{{orderDetail.mobile}}</span></div>
		    				<div class="o-detail-item o-detail-info-i">订单状态： <span>{{orderDetail.status}}</span><span class="g-text-warning" style='margin-left:10px;' v-if='orderDetail.abnormal_reason != ""'>备注：{{orderDetail.abnormal_reason}}</span></div>	
		    			</el-col>
		    		</el-row>
		    	</div>
	    		<div>
	    			<el-table  stripe :data='orderDetailArr' style="width: 100%;font-size:12px;" row-style="padding:10px" v-loading="listLoading" >
					  <el-table-column label="接单公众号" width="160px">
					    <template slot-scope="scope">
                            <div class="g-cfix">
                                <div style="border:1px solid #999;width:40px;height:40px;dsiplay:inline-block;margin-right:5px;margin-bottom:5px;" class="g-fl">
                                    <img :src="scope.row.mp_thumb" :alt="scope.row.weixinname" style="dsiplay:inline-block;width:40px;height:40px;" >
                                </div>
                                <div class="g-fl" style="width:70px">
                                    <div class="g-text-ellipsis" style="line-height:18px;width:70px;" :title="scope.row.mp_title">{{scope.row.mp_title}}</div>
                                    <div class="g-text-ellipsis" style="line-height:18px;width:70px;" :title="scope.row.weixinname">{{scope.row.weixinname}}</div>
                                </div>
                            </div>
					    </template>
					  </el-table-column>
					  <el-table-column  label="预计广告位 / 实际广告位	" >
					    <template slot-scope="scope">
					      <div>{{scope.row.pre_push_position}}</div>
					      <div>{{scope.row.actual_push_position}}</div>
					    </template>
					  </el-table-column>
					  <el-table-column label="粉丝数 / 性别比例" width="">
					    <template slot-scope="scope">
					      <div>{{scope.row.fans_num}}</div>
					      <div>{{scope.row.fans_prop}}</div>
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
					  <el-table-column label="广告主预估支出 / 广告主实际支出	" width="">
					    <template slot-scope="scope">
					      <div>{{scope.row.pre_pay_price}}</div>
					      <div>{{scope.row.actual_pay_price}}</div>
					    </template>
					  </el-table-column>
					  <el-table-column label="媒体主预估收入 / 媒体主实际收入" width="">
					    <template slot-scope="scope">
					      <div>{{scope.row.pre_push_income}}</div>
					      <div>{{scope.row.actual_push_income}}</div>
					    </template>
					  </el-table-column>
					  <el-table-column label="实收佣金" width="">
					  	 <template slot-scope="scope">
					      <div>{{scope.row.actual_reward_price}}</div>
					    </template>
					  </el-table-column>
					</el-table>
	    		</div>
			</div>

			<div class="orde-d-item">
				<yfb-smalltitle txt='推送反馈' style='padding-bottom:16px;'></yfb-smalltitle>
				<div class="o-detail-fb-b">
					<el-row>
					  	<el-col :span="12">
					  		<div class="g-cfix o-detail-item">
                                <span class="g-fl">实际推文链接：</span><a style="width:80%" class="g-text-ellipsis g-fl" :href="orderDetail.actual_article_url" target="_blank">
                                    {{orderDetail.actual_article_url ? orderDetail.actual_article_url : "--"}}
                                </a>
                            </div>
					  		<div class="o-detail-item">当前阅读数：<span>{{orderDetail.actual_read_num}}</span><a href="javascrip:;" @click='handleClickViewData' style="margin-left:10px;">查看数据监控</a></div>
					  		<div class="o-detail-item">
                                <el-col style="width:85px;">
                                    <span>平台监测结果：</span>
                                </el-col>
                                <el-col :span="16">
                                    <span v-html="orderDetailHtml"></span>
                                </el-col>
                            </div>
					  	</el-col>
				  		<el-col :span="12">
				  			<div class="">
				  				<el-col :span="3">
				  					<span>手机预览</span>
				  				</el-col>
				  				<el-col :span="8">
					  				<span class="phone-preview article_QRcode">
					  					<img :src="orderDetail.actual_qr_url" style="width:120px;height:120px;">
					  				</span>
				  				</el-col>
				  			</div>
				  		</el-col>
					</el-row>
				</div>
			</div>

			<div class="orde-d-item">
				<yfb-smalltitle txt='派单信息' style='padding-bottom:16px;'></yfb-smalltitle>
				<div class="o-detail-dispatch">
					<div class="o-detail-item">活动ID： <span>{{orderDetail.ad_id}}</span></div>
					<div class="o-detail-item">派单主题： {{orderDetail.activity_push_article_title}} <a href="javascrip:;" style="margin-left:20px;">查看详情</a> </div>
				</div>
				<div>
					<el-row>
					  	<el-col :span="6">
					  		<div class="">
					  			<div>
					  				<img :src="orderDetail.activity_push_thumb" class="" style="position:fixed;top:-10000px;left:-1000px; width:100px;height;100px;" >
					  				<div class="dispatch-order-cover" :style="{backgroundImage: 'url(\'' + orderDetail.activity_push_thumb + '\')'}">
					  				</div>
					  				<div class="dispatch-order-title">
					  					<a :href='"http://www."+ curDomain +".com/Index/order_article_details.html?id=" + orderDetail.order_id' target="_blank">{{orderDetail.activity_push_theme_title}}</a>
					  				</div>
					  			</div>
					  		</div>
					  </el-col>
					  		<el-col :span="18">
					  			<div class="">
				  					<el-row class='disguise-table-header'>
				  						<el-col :span="8"><strong>性别比例</strong></el-col>
				  						<el-col :span="8"><strong>分类</strong></el-col>
				  						<el-col :span="8"><strong>地域</strong></el-col>
				  					</el-row>
				  					<el-row class='disguise-table-body'>
				  						<el-col :span="8">{{orderDetail.ac_fans}}</el-col>
				  						<el-col :span="8">{{orderDetail.ac_class}}</el-col>
				  						<el-col :span="8">{{orderDetail.ac_region}}</el-col>
				  					</el-row>
					  			</div>
					  			<div class="">
					  				<el-row class='disguise-table-header'>
					  					<el-col :span="8"><strong>指定推文日期/时段</strong></el-col>
					  					<el-col :span="8"><strong>单阅价</strong></el-col>
					  					<el-col :span="8"><strong>总预算</strong></el-col>
					  				</el-row>
					  				<el-row class='disguise-table-body'>
					  					<el-col :span="8">
					  						<div>{{orderDetail.activity_push_date}}</div>
					  						<div>{{orderDetail.activity_push_time}}</div>
					  					</el-col>
					  					<el-col :span="8">{{orderDetail.activity_read_price}}元</el-col>
					  					<el-col :span="8">{{orderDetail.activity_push_budget}}</el-col>
					  				</el-row>
					  			</div>
					  		</el-col>
					</el-row>
				</div>
			</div>
		</div>
        <div :class="{'full-bg': viewData}"></div>
        <div class="view_data" v-show='viewData'>
            <div style="padding:20px 30px" class="bomb-box">
                <div class="bomb-header">
                    <div style="position:relative">
                        <span>公众号：{{infoMp_name}} ( {{infoWeixinname}} )</span>
                        <span>推送时间：{{ infoPush_time != '' ? infoPush_time : "--"}}</span>
                        <span class="g-fr g-text-warning">仅监控48小时</span>
                        <span class="el-icon-close " style="position:absolute;right:-15px;top:-10px;cursor:pointer" @click='handleClickCloseBomb'></span>
                    </div>
                    <div>
                        <span style="padding:0 5px;background-color:#0099e5;">{{infoPosition}}</span>
                        <span>{{infoArticle_title}}</span>
                    </div>
                </div>
                <div class="bomb-content">
                    <!-- <div class="no-data" v-show='xAxisData.length <= 0' style='text-align:center'> 
                        <div style="padding-top:200px;"><span>暂无数据</span></div>
                    </div> -->

                    <div  id='order_detail_chart' style="width:640px;height:350px;padding-top:20px;"></div>
                </div>
            </div>
        </div>
  	</div>	
</template>

<script>
	import SmallTitle from '@/components/common/small_title/index'
    import echarts from 'echarts'

	export default {
	    name: 'xg-order-detail',
	    data() {
	      return {
	      	orderList: [],
	      	orderListOffset: 0, // 订单列表页面
	      	orderDetail: {},
            orderDetailHtml: '',
	      	orderDetailArr: [],
	      	curDomain: document.domain.split('.').slice(1, -1).join('.'),  // 当前domain
	      	preOffset: this.$route.query.offset ? Math.ceil(this.$route.query.offset / 2) : 1,
	      	nextOffset: this.$route.query.offset ? Math.ceil(this.$route.query.offset / 2) : 1,
	      	orderOffset: this.$route.query.offset ? Math.ceil(this.$route.query.offset / 2) : 1,
	      	orderId: this.$route.query.id ? this.$route.query.id : '',
	        listQuery: { // 公众号
	          keyword: '',
	          member: '',
	          class_id: '0',
	          limit: 10,
	          offset: 1
	        },
	        listLoading: false,
            preLoading: false,
            nextLoading: false,
            totalPage: 0,  // 列表条数
            viewData: false,
            chart: null,
            infoMp_name: '',
            infoWeixinname: '',
            infoArticle_title: '',
            infoPush_time: '',
            infoPosition: '',
            xAxisData: [],  // x轴数据
            chartsRead: [], // 阅读数
            chartsLike: [], // 点赞数
            chartsReadRatio: [], // 点赞率
            wwwUrl: './cpc_activity_info.html'
	      }
	    },
	    mounted: function()	{
	    	this.getOrderList()
	        this.getOrderDetail(this.orderId)

            this.initChart()
            this.chart = null
	    },
        beforeDestroy() {
            if (!this.chart) {
              return
            }
            this.chart.dispose()
            this.chart = null
        },
	    methods: {
	        getOrderList(type, page) { // 获取公众号列表
	            let _this = this;
	            let offset = type ? page : _this.orderOffset
	            _this.orderListOffset = []

	            this.$http('/Data/owner_order.html?limit=20&get_type=2&offset=' + offset)
	            .then(response => {
	            	if (type == 'pre') {
	            		_this.orderList = response.data.data.concat(_this.orderList)
                        this.preLoading = false
	            	} else if (type == 'next') {
	                	_this.orderList = _this.orderList.concat(response.data.data)
                        this.nextLoading = false
	            	} else {
	            		_this.orderList = response.data.data
	            	}
	                _this.orderListOffset = response.data.offset
                    _this.totalPage = Math.ceil(response.data._count / 20)
	            }, response => {
	                console.log(response)
	            })
	        },
	        getOrderDetail(id) {
	             let _this = this
	             _this.orderDetailArr = []
	            _this.listLoading = true
	            // ajax
	            this.$http.get('/Data/owner_order_detail.html?id=' + id).then(response => {
	                _this.orderDetail = response.data
                    _this.orderDetailHtml = response.data.abnormal_content != '' ? response.data.abnormal_content.split(',').join('<br/>') : '--'
	                _this.orderDetailArr.push(response.data)
	                _this.listLoading = false
	            }, response => {
	                console.log(response)
	            })
	        },
	        handleClick(id, event) {
	        	this.getOrderDetail(id)
	        	this.orderId = id
	        },
	        loadPre() { // 下一页
	        	if (this.preOffset <= 1) {
	        		return false
	        	} else {
	        		this.preOffset = this.preOffset - 1
	        	}
                this.preLoading = true
	        	this.getOrderList('pre', this.preOffset)
	        },
	        loadNext() { // 下一页
                if (this.nextOffset >= this.totalPage) {
                    return false
                }
	        	this.nextOffset = this.nextOffset + 1
                this.nextLoading = true
	        	this.getOrderList('next', this.nextOffset)
	        },
            handleClickViewData() {
                let _this = this
                _this.viewData = true

				_this.xAxisData = []
				_this.chartsRead = []
				_this.chartsLike = []
				_this.chartsReadRatio = []
				_this.initChart()
                _this.$http.get('/Data/article_data.html?id=' + _this.orderId)
                    .then(response => {
                        _this.infoMp_name = response.data.info.mp_name
                        _this.infoWeixinname = response.data.info.weixinname
                        _this.infoArticle_title = response.data.info.article_title
                        _this.infoPush_time = response.data.info.push_time
                        _this.infoPosition = response.data.info.position

                        // _this.xAxisData = '16:53, 17:04, 17:14, 17:24, 17:34, 17:44, 17:54, 18:04, 18:14, 18:24, 18:34, 18:44, 18:54, 19:04, 19:14, 19:24, 19:34, 19:44, 19:54'.split(',')
						// _this.chartsRead = '19, 22, 23, 25, 26, 28, 30, 31, 31, 31, 32, 32, 33, 33, 35, 35, 36, 36, 36'.split(',')
                        // _this.chartsLike = '1, 2, 4, 8, 16, 32, 64, 0, 0, 5, 7, 0, 8, 0, 0, 0, 6, 0, 0'.split(',')
						// _this.chartsReadRatio = '0.00, 0.00, 0.00, 6.00, 0.00, 6.66, 0.00, 0.00, 0.00, 0.00, 0.00, 4.00, 3.00, 7.00, 0.00, 0.00, 0.00, 10.00, 0.00'.split(',')
						_this.xAxisData = response.data.times == '' ? [] : response.data.times.split(',')
                        _this.chartsRead = response.data.read == '' ? [] : response.data.read.split(',')
                        _this.chartsLike = response.data.like == '' ? [] : response.data.like.split(',')
                        _this.chartsReadRatio = response.data.points == '' ? [] : response.data.points.split(',')
						_this.initChart()
                    }, response => {
                        console.log(response)
                    })
            },
            initChart() {
                let _this = this
                    _this.chart = echarts.init(document.getElementById('order_detail_chart'))
                    _this.chart.setOption(
                        {
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['阅读数', '点赞数', '点赞率']
							},
							color: [
								'#ffee99',
								'#ffac4c',
								'#43e05e'
							],
                            grid: {
                                left: '0%',
                                right: '0%',
                                bottom: '0%',
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: _this.xAxisData
                                    // data: '16:53, 17:04, 17:14, 17:24, 17:34, 17:44, 17:54, 18:04, 18:14, 18:24, 18:34, 18:44, 18:54, 19:04, 19:14, 19:24, 19:34, 19:44, 19:54'.split(',')
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '阅读数',
                                    splitNumber: 5
                                },
                                {
                                    type: 'value',
                                    name: '点赞数',
                                    splitNumber: 5,
                                    splitLine: {
                                        show: false,
                                        lineStyle: {
                                            color: '#e4e4e4'
                                        }
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '阅读数',
                                    type: 'line',
                                    yAxisIndex: 0,
                                    data: _this.chartsRead
                                    // data: '19, 22, 23, 25, 26, 28, 30, 31, 31, 31, 32, 32, 33, 33, 35, 35, 36, 36, 36'.split(',')
                                },
                                {
                                    name: '点赞数',
                                    type: 'line',
                                    yAxisIndex: 0,
                                    data: _this.chartsLike
                                    // data: '1, 2, 4, 8, 16, 32, 64, 0, 0, 5, 7, 0, 8, 0, 0, 0, 6, 0, 0'.split(',')
                                },
                                {
                                    name: '点赞率',
                                    type: 'line',
                                    yAxisIndex: 1,
                                    data: _this.chartsReadRatio
                                    // data: '0.00, 0.00, 0.00, 6.00, 0.00, 6.66, 0.00, 0.00, 0.00, 0.00, 0.00, 4.00, 3.00, 7.00, 0.00, 0.00, 0.00, 10.00, 0.00'.split(',')
                                }
                            ]
                        })
            },
            hideFullBg(event) {
                this.viewData = false
            },
            handleClickCloseBomb() { // 关闭数据图片监听
                this.hideFullBg()
            }
	    },
	    components: {
            'yfb-smalltitle': SmallTitle
        }
	}
</script>
<style scoped lang='less' rel='stylesheet/less'>
	@color_list_bg:#F2F2F2;
	@color_table_header_bg:#eef1f6;
    .g-three-contailer{
    	padding-left:230px;
    }
    .nav-three-box{
    	position:fixed;
    	width:210px;
    	height:100%;
    	background-color: @color_list_bg;
    	top:0;
    	z-index:10;
    	overflow:hidden;
    }

    .list-box{
    	position: absolute;
    	top:75px;
    	width: 100%;
    	height: ~'calc(100% - 100px)';
		box-sizing: border-box;
		overflow:auto;
		.list{

    		li{
    			padding: 10px 0;
	    		position: relative;
	    		cursor: pointer;

	    		&.active{
	    			background-color:#fff;
	    		}

	    		&:hover{
	    			background-color:#fff;
	    		}
    		}
		 	.list-item{
				padding: 2px 10px;
			}
			.list-item-status{
				position: absolute;
				right:10px;
				top:10px;
				color:#999;
			}
		}
    }
    /**/
    .load-list-data{ 
    	height:25px;
    	background: #fff;
    	width: 100%;
    	cursor: pointer;
    	text-align: center;

    	& > span{
    		margin-top: 6px;
    	}

    	&:hover{
    		color:#0099e5;
    	};
    }
    .load-previous{
    	position: absolute;
    	top: 50px;
    	z-index: 11;
    	box-shadow: 0 2px 5px rgba(0,0,0,0.12);
    }
    .couror-dis{
        cursor: no-drop;
        &:hover{
            color:unset;
        };
    }

    .load-next{
    	position: absolute;
    	bottom: 0px;
    	box-shadow: 0 -2px 5px rgba(0,0,0,0.12);
    }

	/*面包屑*/
    .breadcrumb-t{
    	font-size: 20px;
    	padding-left: 15px;
    	& > span{
    		font-size: 20px;
    	}
    }

    .orde-d-item{
    	padding:20px 15px;
    }
	/*订单信息*/
	.o-detail-item{
		margin: 10px 0;
	}

	.order-d-info{
		padding-bottom: 15px;
	}

    /*推送反馈*/

    /*派单信息*/
    .o-detail-dispatch{
    	padding-bottom: 15px;
    }
    .dispatch-order{
    	&-cover{
    		height: 150px;
	    	width: 80%;
	    	background-repeat: no-repeat;
	    	background-size: cover;
	    	background-position: center;
	    	border:1px solid @color_list_bg;
    	}
    	&-title{
    		width: 80%;
    		text-align: center;
    		margin-top: 10px;
    	}
    }

    .disguise-table{
    	&-header,&-body{
    		padding: 10px 0;
    	}
    	&-header{
    		background-color: @color_table_header_bg;
    	}
    }

    .full-bg{
        position: fixed;
        height: 100%;
        width:100%;
        top:0;
        left: 0;
        background-color: rgba(0,0,0,.8);
        z-index: 100000;
    }

    .view_data{
        position: fixed;
        width: 700px;
        height: 440px;
        top:50%;
        left:50%;
        margin-top:-220px;
        margin-left: -350px;
        background-color: #fff;
        z-index: 100000;
    }

</style>
