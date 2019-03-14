<template>
    <div class="Head">
        <div class="breadNav pull-left">
            <BreadNav></BreadNav>
        </div>
        <div class="avadarWrap pull-right">
            <Dropdown @on-click="dropdown">
                <a href="javascript:void(0)">
                    <i class="iconfont icontouxiang-kong"></i>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="(item,index) in dropDownList" :key="index" :name="item.name">{{item.title}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>

         <Modal
            v-model="showModal"
            title="提示"
            @on-ok="_logout"
            @on-cancel="cancel">
            <p>你确定要注销吗？</p>
        </Modal>
    </div> 
</template> 
  
<script>
 
import BreadNav from 'components/BreadNav'
import { dropDownList } from 'js/gobalData'
import { ERR_OK } from 'api/config'
import { logout } from 'api/port'

export default {
    components: {
        BreadNav
    },
    data() { 
        return {
            showModal:false,
            dropDownList:dropDownList
        }
    },
    methods:{
        // 选中下拉
        dropdown(name) {
            if(name === 'index') {
                this.$router.replace('/main')
            } else if(name === 'logout') {
                this.showModal = true
            }
        },
        // 退出登录
        _logout() {
            logout()
                .then(res=>{
                    if(res.status === ERR_OK) {
                        this.$Notice.success({
                            title:res.success
                        })
                        this.$router.replace('/')
                    } else {
                        this.$Notice.error({
                            title:res.message
                        })
                    }
                })
        },
        // 取消
        cancel() {
            this.showModal = false
        }
    }
} 
</script>

<style lang="scss" scoped>
.Head {
    height:60px;
    line-height: 60px;
    background: #EFF2F7;
    padding:0 20px;
    .avadarWrap {
        i {
            font-size:30px;
        }
    }
}
</style>
