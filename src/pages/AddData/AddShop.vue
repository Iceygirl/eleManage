<template>
    <div class="AddShop">
        <Form class="form" ref="form" :model="form" :rules="addShopRules">
            <FormItem class="formitem" prop="name">  
                <label class="label"><span class="redFlag">*</span>店铺名称</label>
                <Input class="input" type="text" v-model="form.name" placeholder="请输入店铺名称" ></Input>
            </FormItem>
            <FormItem class="formitem" prop="address">  
                <label class="label"><span class="redFlag">*</span>详细地址</label>
                <!-- @on-focus="_getPosition" -->
                <AutoComplete
                    v-model="form.address"
                    :data="addressList"
                    @on-change="_getPosition"
                    @on-select="confirmAddress"
                    placeholder="请输入详细地址"
                ></AutoComplete>
                <p class="cityName">当前城市：{{cityName}}</p>
            </FormItem>
            <FormItem class="formitem" prop="phone">  
                <label class="label"><span class="redFlag">*</span>联系电话</label>
                <Input class="input" type="text" v-model="form.phone" placeholder="请输入联系电话"></Input>
            </FormItem>
            <FormItem class="formitem">  
                <label class="label">店铺简介</label>
                <Input class="input" type="text" v-model="form.description" placeholder="请输入店铺介绍" ></Input>
            </FormItem> 
            <FormItem class="formitem" >  
                <label class="label">店铺标语</label>
                <Input class="input" type="text" v-model="form.promotion_info" placeholder="请输入店铺标语" ></Input>
            </FormItem> 
            <FormItem class="formitem"  prop="category">   
                <label class="label">店铺分类</label>
                <Cascader :data="shopCategory" v-model="category" @on-change="confirmCategory"></Cascader>
            </FormItem> 
            <FormItem class="formitem" >   
                <label class="label" style="position:relative;bottom:16px;">店铺特点</label>
                <div style="display:inline-block;">
                    <div>
                        <span class="text">品牌保证</span><i-switch class="switch" v-model="form.is_premium" @on-change="isPremiumChange"></i-switch>
                        <span class="text">蜂鸟专送</span><i-switch class="switch" v-model="form.delivery_mode" @on-change="deliveryModeChange"></i-switch>
                        <span class="text">新开店铺</span><i-switch class="switch" v-model="form.new" @on-change="newChange"></i-switch>
                    </div>
                    <div>
                        <span class="text">外卖保</span><i-switch class="switch" v-model="form.bao" @on-change="baoChange"></i-switch>
                        <span class="text">准时达</span><i-switch class="switch" v-model="form.zhun" @on-change="zhunChange"></i-switch>
                        <span class="text">开发票</span><i-switch class="switch" v-model="form.piao" @on-change="piaoChange"></i-switch>
                    </div>
                </div>
            </FormItem> 
            <FormItem class="formitem" >   
                <label class="label">配送费</label>
                <InputNumber :min="0" v-model="form.float_delivery_fee" @on-change="changeDeliveryFee"></InputNumber>
            </FormItem> 
            <FormItem class="formitem" >   
                <label class="label">起送价</label>
                <InputNumber :min="0" v-model="form.float_minimum_order_amount" @on-change="changeOrderAmount"></InputNumber>
            </FormItem> 
            <FormItem class="formitem" >   
                <label class="label">配送时间</label>
                <TimePicker
                    type="time"
                    format="HH:mm"
                    placeholder="开始时间"
                    :steps="[1, 15]"
                    style="width: 160px"
                    :value="form.startTime"
                    @on-change="confirmStartTime"
                    clearable></TimePicker>
                <TimePicker
                    type="time"
                    format="HH:mm"
                    placeholder="结束时间"
                    :steps="[1, 15]"
                    style="width: 160px"
                    :value="form.endTime"
                    @on-change="confirmEndTime"
                    clearable></TimePicker>
            </FormItem> 
            <FormItem class="formitem">  
                <label class="label" style="position:relative;bottom:40px;">上传店铺头像</label>
                <Upload
                    ref="upload"
                    :on-success="handleSuccessAvadar"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    :action="httpURL + '/v1/addimg/shop'" 
                    style="display: inline-block;width:100px;"
                    class="upload">   
                    <img :src="httpURL + '/img/' + form.image_path"  v-if="form.image_path">
                    <div style="width: 100px;height:100px;line-height: 100px;" v-else>
                        <Icon type="ios-camera" size="30"></Icon>
                    </div>
                </Upload>
            </FormItem>
            <FormItem class="formitem">  
                <label class="label" style="position:relative;bottom:40px;">上传营业执照</label>
                <Upload
                    ref="upload"
                    :on-success="handleSuccessLicense"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError" 
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    :action="httpURL + '/v1/addimg/shop'" 
                    style="display: inline-block;width:100px;"
                    class="upload">   
                    <img :src="httpURL + '/img/' + form.business_license_image"  v-if="form.business_license_image">
                    <div style="width: 100px;height:100px;line-height: 100px;" v-else>
                        <Icon type="ios-camera" size="30"></Icon>
                    </div>
                </Upload>
            </FormItem>
            <FormItem class="formitem">  
                <label class="label" style="position:relative;bottom:40px;">上传餐饮服务许可证</label>
                <Upload
                    ref="upload"
                    :on-success="handleSuccessCatering"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError" 
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    :action="httpURL + '/v1/addimg/shop'" 
                    style="display: inline-block;width:100px;"
                    class="upload">   
                    <img :src="httpURL + '/img/' + form.catering_service_license_image"  v-if="form.catering_service_license_image">
                    <div style="width: 100px;height:100px;line-height: 100px;" v-else>
                        <Icon type="ios-camera" size="30"></Icon>
                    </div>
                </Upload>
            </FormItem>
            <FormItem class="formitem" >   
                <label class="label">优惠活动</label> 
                <Select v-model="activity" style="width:200px" clearable @on-change="changeActivity" :label-in-value="true">
                    <Option v-for="item in activityList" :value="item.icon_name" :key="item.icon_name">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <Table class="table" stripe :columns="activityThead" :data="form.activities"></Table>  

            <Button type="primary" class="btn" @click="_addShop">立即创建</Button>
        </Form> 
        <Modal title="提示" v-model="showModal" @on-ok="confirmDetail" @on-cancel="cancel">
            <p style="margin-bottom:10px;font-size:14px;">请输入活动详情：</p>
            <Input type="text" v-model="detail"></Input>
        </Modal>
    </div> 
</template> 
   
<script> 
 
import axios from 'axios'
import { addShopRules } from 'js/formRules'
import { cloneObj } from 'js/util'
import { ERR_OK, httpURL } from 'api/config'
import { activityList } from 'js/gobalData'
import { getCityInfo, getShopCategory, getPosition, addShop } from 'api/port'

export default {
    data() {
        return {
            addShopRules:addShopRules,
            addressList:[],
            form: {
                name:'', 
                address:'',
                description:'',
                phone:'',
                category:'',
                promotion_info:'',
                startTime:'',
                endTime:'',
                float_delivery_fee:0,
                float_minimum_order_amount:0,
                image_path:'',
                business_license_image:'',
                catering_service_license_image:'',
                bao:true,
                delivery_mode:true,
                is_premium:true,
                new:true,
                piao:true,
                zhun:true,
                latitude:0,
                longitude:0,
                activities:[]
            },
            cityInfo:{},
            cityName:'',
            shopCategory:[],
            category:[],
            httpURL:httpURL,
            activityList:activityList,
            activity:'',
            activityObj:{},
            showModal:false,
            detail:'',
            // 优惠活动列表表头
            activityThead :  [{
                title: '活动标题',
                key: 'icon_name',
                width: 120,
                align: 'center'
            },{
                title: '活动名称',
                key: 'name',
                width: 120,
                align: 'center'
            },{
                title: '活动详情',
                minWidth: 120,
                key: 'description',
                align: 'center'
            },{
                title: '操作',
                key: 'action',
                width: 100,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index)
                                }
                            }
                        }, '删除')
                    ]);
                }
            }]
        }
    },
    mounted(){
        axios.all([this._getCityInfo(),this._getShopCategory()])
    },
    methods:{
        // 获取城市的经纬度
        _getCityInfo() {
            return new Promise((resolve,reject) => {
                let data = {
                    type:'guess'
                }
                getCityInfo(data) 
                    .then(res=>{
                        let result = res
                        this.form.latitude = res.latitude
                        this.form.longitude = res.longitude
                        this.cityName = res.name
                        resolve({})
                    })
                    .catch(error => {
                        reject({})
                    })
            })
        }, 
        // 获取商铺分类
        _getShopCategory() {
            return new Promise((resolve,reject)=>{
                getShopCategory()
                    .then(res=>{
                        let list = res
                        let arr = []
                        list.map(item=>{
                            let subArr = []
                            if(item.sub_categories.length) {
                                item.sub_categories.map((subItem,index)=>{
                                    if(index == 0) {
                                        return
                                    }
                                    subArr.push({
                                        value:subItem.name,
                                        label:subItem.name
                                    })
                                })
                                arr.push({
                                    value:item.name,
                                    label:item.name,
                                    children:subArr
                                })
                            }   
                        })
                        this.shopCategory = arr
                        resolve({})
                    })
                    .catch(error=>{
                        reject({})
                    })
            })
           
        },
        // 确定商铺分类
        confirmCategory(value) {
            this.form.category = value.join('/')
        },
        // 搜索，获取地址
        _getPosition() {
            if(!this.form.address) {
                this.loading = true
                return
            }
            this.loading = false
            let data = {
                type:'search',
                city_id:this.cityId,
                keyword:this.form.address    
            }
            getPosition(data) 
                .then(res=>{
                    if(Array.isArray(res) && res.length) {
                        let list = res 
                        let arr = []
                        list.map(item=>{
                            arr.push(item.address)
                        })   
                        this.addressList = arr
                    }
                })
        },
        // 确定地址
        confirmAddress(val) {
            this.form.address = val
            console.log(this.form.address)
        },
        // 店铺特点
        isPremiumChange(val) {
            this.form.is_premium = val
            console.log('is_premium',this.form.is_premium)
        },
        deliveryModeChange(val) {
            this.form.delivery_mode = val
            console.log('delivery_mode',this.form.delivery_mode)
        }, 
        newChange(val) {
            this.form.new = val
            console.log('new',this.form.new)
        },
        baoChange(val) {
            this.form.bao = val
            console.log('bao',this.form.bao)
        },
        zhunChange(val) {
            this.form.zhun = val
            console.log('zhun',this.form.zhun)
        },
        piaoChange(val) {
            this.form.piao = val
            console.log('piao',this.form.piao)
        },
        // 改变配送费
        changeDeliveryFee(val) {
            this.form.float_delivery_fee = val
        },
        // 改变起送价
        changeOrderAmount(val) {
            this.form.float_minimum_order_amount = val
        },
        // 确定开始时间
        confirmStartTime(val) {
            this.form.startTime = val
        },
        // 确定结束时间
        confirmEndTime(val) {
            this.form.endTime = val
        },
        // 选中优惠活动
        changeActivity(item) {
            this.detail = ''
            this.showModal = true
            this.activityObj.icon_name = item.value
            this.activityObj.name = item.label
        },
        // 确定活动详情
        confirmDetail() {
            this.showModal = false
            this.activityObj.description = this.detail
            this.form.activities.push(this.activityObj)
        },
        // 取消活动详情
        cancel() {
            this.showModal = false
            this.$Message.info('取消输入')
        },
        // 删除优惠活动
        remove(index) {
            this.form.activities.splice(index,1)
        },
        // 上传头像成功
        handleSuccessAvadar (res, file) {
            if(res.status === ERR_OK) {
                this.form.image_path = res.image_path
            } else {
                this.$Notice.error({
                    title:'图片上传失败'
                })
            }
        },
        // 上传营业执照成功
        handleSuccessLicense(res, file) {
            if(res.status === ERR_OK) {
                this.form.business_license_image = res.image_path
            } else {
                this.$Notice.error({
                    title:'图片上传失败'
                })
            }
        },
        // 上传餐厅许可证成功
        handleSuccessCatering(res, file) {
            if(res.status === ERR_OK) {
                this.form.catering_service_license_image = res.image_path
            } else {
                this.$Notice.error({
                    title:'图片上传失败'
                })
            }
        },
        // 上传文件格式错误
        handleFormatError (file) {
            this.$Notice.warning({
                title: '提示',
                desc:  file.name + '格式不正确，请选择jpg,jpeg,png格式的图片！'
            });
        },
        // 上传文件超过2M
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '提示',
                desc: file.name + '文件过大，请选择小于2M的图片！'
            });
        },
        resetForm() {
            this.$refs.form.resetFields()
        },
        // 添加商铺
        _addShop() {
            this.$refs.form.validate((valid)=>{
                if(valid) {
                    let data = cloneObj(this.form)
                    console.log(data) 
                    addShop(data)
                        .then(res=>{
                            this.$Message.success('添加成功')
                            this.resetForm()
                        })
                } 
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.AddShop {
    margin-left:10%;
    margin-top:2%;
    .form {
        .text {
            font-size:14px;
        }
        .switch {
            margin:0 10px;
        }
        .table {
            width:60%;
        }
        .btn {
            margin:30px 0 30px 100px;
        }
    }
}
</style>
<style lang="scss" > 
.AddShop {
    .ivu-table {
        width:100%;
    }
    .ivu-form-item-error-tip {
        left: 6.5%;
    } 
}
</style>

