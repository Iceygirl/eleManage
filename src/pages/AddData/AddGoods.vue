<template>
    <div class="AddGoods">
        <h3 class="subTitle">选择食品品类</h3>  
        <Form class="form" ref="form" :model="form" :rules="addGoodRules">
            <FormItem class="formitem formitem1" prop="category">
                <div class="cwrap">
                    <label class="label">食品品类</label>
                    <Select v-model="form.category"  @on-change="changeCategory" >
                        <Option v-for="(item,index) in categoryList" :value="item.name" :key="index"></Option>
                    </Select>
                </div>
                <!-- 添加食品品类 -->
                <Form class="categoryForm" ref="categoryForm" :model="categoryForm" :rules="addCategoryRules">
                    <FormItem class="formitem">
                        <label class="label">食品品类</label>
                        <Input type="text" v-model="categoryForm.name"></Input>
                    </FormItem>
                    <FormItem class="formitem">
                        <label class="label">种类描述</label>
                        <Input type="text" v-model="categoryForm.description"></Input>
                    </FormItem>
                    <FormItem class="formitem">
                        <Button class="addCategoryBtn" type="primary" @click="_addCategory">提交</Button>
                    </FormItem>
                </Form>
                <p class="moveBtn">
                    <Icon type="md-arrow-dropup-circle"  size="20" color="#999" />     
                    <Icon type="md-arrow-dropdown-circle" size="20" color="#999" />
                    添加食品种类
                </p>
            </FormItem>
        </Form>
        <!-- 弹框提示 -->
        <Modal title="提示" v-model="showModal" @on-ok="confirm" @on-cancel="cancel">
            <p>请先选择商铺再添加食品</p>
        </Modal>
        <!-- <span class="redFlag">*</span> --> 
    </div> 
</template>     
 
<script>
 
import { ERR_OK } from 'api/config'
import { getCategory } from 'api/port'
 
export default { 
    data() {
        return {
            showModal:false,
            categoryForm:{
                name:'',
                description:''
            },
            form: {
                category:''
            },
            categoryList:[],
            addCategoryRules:{},
            addGoodRules:{}
        }
    },
    mounted() {
        this.init()
    },
    methods:{
        // 初始化
        init() {
            if(this.$route.query.id !== undefined) {
                this._getCategory(this.$route.query.id)
            } else {
                this.showModal = true
            }
        },
        // 获取食品种类列表
        _getCategory(id) {
            getCategory(id)
                .then(res=>{
                    if(res.status === ERR_OK) {
                        let list = res.category_list
                        let arr = []
                        list.map(item=>{
                            arr.push({
                                name:item.name
                            })
                        })
                        this.categoryList = arr
                    } else {
                        this.$Message.error('获取食品品类列表失败')
                    }
                })
        },
        // 确定
        confirm() { 
            this.showModal = false
            this.$router.push('ShopList')
        },
        // 取消
        cancel() {
            this.showModal = false
        },
        // 选择食品分类
        changeCategory(val) {
            this.form.category = val
        },
        // 添加食品种类
        _addCategory() {

        }
    }
}
</script>

<style lang="scss" scoped>
.AddGoods {
    width:60%;
    margin:30px auto;
    .subTitle {
        text-align:center;
        line-height:40px;
        font-size:18px;
    }
    .form {
        .formitem1 {
            border:1px solid #eaeefb;
            border-radius:8px;
        }
        .cwrap {
            padding:10px 20px 20px 30px;
            border-bottom:1px solid #eaeefb;
        }
        .categoryForm {
            padding:10px 20px 20px 30px;
            background-color:#f9fafc;
            .formitem {
                margin-bottom:10px;
            }
            .addCategoryBtn {
                margin-left:96px;
            }
        }
        .formitem  {
            .ivu-input-wrapper,.ivu-select {
                width:90%;
            }
        }
        .moveBtn {
            height:40px;
            line-height:40px;
            text-align: center;
            font-size:15px;
            cursor: pointer;
            color:#999;
        }
        .moveBtn:hover { 
            background-color: #f9fafc;
            color:#20a0ff; 
        }
    }
}
</style>
