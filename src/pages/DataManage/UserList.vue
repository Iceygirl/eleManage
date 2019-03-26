<template>
    <div class="UserList wrap">
        <Table class="table" width="100%" :columns="userThead" :data="data"></Table>
        <Page class="page" :current="current" :page-size="20" :total="total" @on-change="pageChange" show-total />
    </div> 
</template> 
  
<script>
 
import { userThead } from 'js/formTheads'
import { getUser, getUserCount } from 'api/port'
import { ERR_OK } from 'api/config'
import axios from 'axios'

export default {
    data() {
        return { 
            userThead:userThead,
            data:[],
            total:0,
            current:1
        }
    },
    mounted() {
        this.init() 
    },
    methods:{
        init() {
            axios.all([this._getUser(),this._getUserCount()])
        },
        // 获取用户列表
        _getUser(offset) { 
            offset = offset !== undefined ? offset : 0
            let data = {
                offset:offset,
                limit:20
            }
            getUser(data)
                .then(res=>{
                    let arr = []
                    res.map((item,index)=>{
                        arr.push({
                            registeTime:item.registe_time,
                            username:item.username,
                            city:item.city
                        })
                    })

                    this.data = arr
                })
        },
        // 获取用户列表总数
        _getUserCount() {
            getUserCount()
                .then(res=>{
                    if(res.status == ERR_OK) {
                        this.total = res.count
                    } else {
                        this.$Notice.error({
                            title:'获取数据失败'
                        })
                    }
                })
        },
        // 分页
        pageChange(page) {
            this.current = page
            let offset = (page-1)*20
            this._getUser(offset)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
