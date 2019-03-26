<template>
    <div class="ShopList wrap">
        <Table class="table" width="100%" :columns="theads" :data="data"></Table> 
        <Page class="page" :current="current" :page-size="20" :total="total" @on-change="pageChange" show-total />
        <Modal
            class="modal"
            v-model="showModal" 
            :title="modalTitle"
            :name="modalName">
                <div v-if="modalName === 'editShop'">
                    <Form class="form" ref="form" :model="form" :rules="shopRules">
                        <FormItem class="formitem" prop="name">  
                            <label class="label">店铺名称</label>
                            <Input class="input" type="text" v-model="form.name" placeholder="请输入店铺名称" ></Input>
                        </FormItem>
                        <FormItem class="formitem" prop="address">  
                            <label class="label">详细地址</label>
                            <AutoComplete
                                v-model="form.address"
                                :data="addressList"
                                @on-focus="_getPosition"
                                @on-change="_getPosition"
                                @on-select="confirmAddress"
                                placeholder="请输入详细地址"
                            ></AutoComplete>
                            <p class="cityName">当前城市：{{cityName}}</p>
                        </FormItem>
                        <FormItem class="formitem" prop="description">  
                            <label class="label">店铺介绍</label>
                            <Input class="input" type="text" v-model="form.description" placeholder="请输入店铺介绍" ></Input>
                        </FormItem> 
                        <FormItem class="formitem" prop="phone">  
                            <label class="label">联系电话</label>
                            <Input class="input" type="text" v-model="form.phone" placeholder="请输入联系电话"></Input>
                        </FormItem>
                        <FormItem class="formitem"  prop="category">   
                            <label class="label">店铺分类</label>
                            <Cascader :data="shopCategory" v-model="category" @on-change="confirmCategory"></Cascader>
                        </FormItem>
                        <FormItem class="formitem">  
                            <label class="label">商铺图片</label>
                            <Upload
                                ref="upload"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                type="drag"
                                :action="httpURL + '/v1/addimg/shop'" 
                                style="display: inline-block;width:100px;"
                                class="upload">
                                <img :src="httpURL + '/img/' + form.image_path"  v-if="form.image_path">
                                <div class="upload-list-cover">
                                    <!-- <Icon type="ios-eye-outline" @click.native="handleView"></Icon> -->
                                    <Icon type="ios-camera" size="20"></Icon> 
                                </div>
                            </Upload>
                            <Modal v-model="isLargeImg" title="放大图片"  @on-ok="close">
                                <div>
                                    <img :src="httpURL + '/img/' + form.image_path" alt="" width="488" height="405">
                                </div>
                            </Modal>
                        </FormItem>
                    </Form>
                </div>
 
                <div v-if="modalName === 'removeShop'">
                    <p>你确定要删除{{shopName}}吗？</p>
                </div>
                <div slot="footer">
                    <Button @click="cancel">取消</Button>
                    <Button type="primary" @click="_editShop" v-if="modalName === 'editShop'">确定</Button>
                    <Button type="primary" @click="_removeShop" v-if="modalName === 'removeShop'">确定</Button>
                </div>
        </Modal>

    </div> 
</template> 
  
<script>  

import axios from 'axios'
import { shopThead } from 'js/formTheads'
import { shopRules } from 'js/formRules'
import { getCityInfo, getShop, getShopCount, getShopCategory, getPosition, editShop, removeShop } from 'api/port'
import ShopExtendRow from 'components/ShopExtendRow'
import { ERR_OK,httpURL } from 'api/config' 
import { cloneObj, backToLogin } from 'js/util' 

export default {
    data() {
        return {
            showModal:false,
            modalTitle:'',
            modalName:'',
            loading:false,
            isLargeImg:false,
            current:1,
            total:0,
            data:[], 
            cityInfo:{},
            form: {
                name:'',
                address:'',
                description:'',
                phone:'',
                category:'',
                image_path:'',
                id:0,
                rating:0,
                recent_order_num:0
            },
            cityName:'',
            cityId:0,
            shopRules:shopRules,
            category:[],
            shopCategory:[],
            httpURL:httpURL,
            addressList:[],
            shopName:'',
            shopId:0,
            theads:[
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(ShopExtendRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },{
                title: '操作',
                key: 'action',
                width: 220,
                align: 'center',
                fixed: 'right',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.edit(params.row)
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'success',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.addGoods(params.row)
                                }
                            }
                        }, '添加食品'),
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
                                    this.remove(params.row)
                                }
                            }
                        }, '删除')
                    ]);
                }
            }]
        }
    },
    created() {
        this.getThead()
    },
    mounted() {
        this.init()
    },
    methods:{
        // 插入表头
        getThead() {
            shopThead.map(item=>{
                this.theads.push(item)
            })  
        },
        async init() {
            const res = await this._getCityInfo()
            axios.all([this._getShop(),this._getShopCount()])
        },
        // 获取城市的经纬度
        _getCityInfo() {
            return new Promise((resolve,reject) => {
                let data = {
                    type:'guess'
                }
                getCityInfo(data) 
                    .then(res=>{
                        let result = res
                        this.cityInfo.latitude = res.latitude
                        this.cityInfo.longitude = res.longitude
                        this.cityName = res.name
                        this.cityId = res.id
                        resolve({})
                    })
                    .catch(error => {
                        reject({})
                    })
            })
        }, 
        // 获取商品列表  
        _getShop(offset) {
            offset = offset !== undefined ? offset : 0
            let data = {
                offset: offset,
                limit: 20,
                ...this.cityInfo
            }
            getShop(data, 'get')
                .then(res=>{
                    let arr = []
                    let list = res
                    list.map(item => {
                        arr.push({
                            name: item.name,
                            address: item.address,
                            description: item.description,
                            id:item.id,
                            phone:item.phone,
                            rating:item.rating,
                            recentOrderNum:item.recent_order_num,
                            category:item.category,
                            image_path:item.image_path
                        })
                    })

                    this.data = arr
                })
        },
        // 获取商品列表总数
        _getShopCount() {
            getShopCount()
                .then(res=>{
                    if(res.status === ERR_OK) {
                        this.total = res.count
                    } else {
                        this.$Notice.error({
                            title: '获取数据失败'
                        })
                    }
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
                    let list = res
                    let arr = []
                    list.map(item=>{
                        arr.push(item.address)
                    })
                    this.addressList = arr
                })
        },
        // 确定地址
        confirmAddress(val) {
            this.form.address = val
            console.log(this.form.address)
        },
        // 分页 
        pageChange(page) {
            this.current = page
            let offset = (page-1)*20
            this._getShop(offset)
        },
        // 编辑
        async edit(item) {
            const res = await this._getShopCategory()
            this.showModal = true 
            this.modalTitle = '修改商铺信息'
            this.modalName = 'editShop'
            this.form = {
                name: item.name,
                address: item.address,
                description: item.description,
                phone: item.phone,
                category: item.category,
                image_path: item.image_path,
                id: item.id,
                rating: item.rating,
                recent_order_num: item.recentOrderNum
            }
            // 显示商铺分类
            item.category.split('/').map(citem=>{
                this.category.push(citem)
            })
        },
        // 编辑商铺
        _editShop() { 
            this.$refs.form.validate((valid)=>{
                if(valid) {
                    let data = cloneObj(this.form)
                    editShop(data) 
                        .then(res=>{
                            if(res.status === ERR_OK) {
                                this.showModal = false
                                this.$Notice.success({
                                    title:'修改成功'
                                })
                                this._getShop()
                            } else {
                                this.$Notice.error({
                                    title:res.message
                                })
                                // backToLogin(res.type)
                            }
                        }) 
                }
            })
        },
        cancel() {
            this.showModal = false
        },
        // 添加食品
        addGoods(item) {
            this.$router.push({
                path:'/addGoods',
                query:{
                    id:item.id
                }
            }) 
        },
        // 删除
        remove(item) {
            this.showModal = true
            this.modalName = 'removeShop'
            this.modalTitle = '删除店铺'
            console.log(item)
            this.shopName = item.name
            this.shopId = item.id
        }, 
        _removeShop() {
            removeShop(this.shopId)
                .then(res=>{
                    if(res.status === ERR_OK) {
                        this.$Notice.success({
                            title:'删除成功'
                        })
                        this._getShop()
                    } else {
                        this.$Notice.warning({
                            title:res.message
                        })
                        // backToLogin(res.type)
                    }
                })
                
        },        
        // 放大图片
        handleView (url) {
            this.isLargeImg = true
        },
        close() {
            this.isLargeImg = false
        },
        // 上传成功
        handleSuccess (res, file) {
            if(res.status === ERR_OK) {
                this.form.image_path = res.image_path
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
        }
    }
}
</script>

<style lang="scss">
.ivu-table {
  td.ivu-table-expanded-cell {
    padding: 20px 50px;
    background-color: #fbfdff;
    box-shadow: inset 0 2px 0 #f4f4f4;
  }
}

</style>
