<template>
    <div class="UserList">
        <Table class="table" width="100%" :columns="userThead" :data="data"></Table>
    </div> 
</template> 
  
<script>

import { userThead } from 'js/formTheads'
import { getUser } from 'api/port'
import { ERR_OK } from 'api/config'

export default {
    data() {
        return {
            userThead:userThead,
            data:[]
        }
    },
    mounted() {
        this._getUser()
    },
    methods:{
        _getUser() {
            let data = {
                offset:0,
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
                .catch(error=>{
                    console.log(error)
                })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
