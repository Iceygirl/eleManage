<template>
    <div class="SideNav"> 
         <!-- accordion -->
        <Menu theme="dark" @on-select="jumpTo" :active-name="routerName" :open-names="openMenu">
            <!-- 没有子项  -->
            <MenuItem v-for="(item,index) in menuList"  v-if="!item.children" :key="index" :name="item.name"  :to="item.path">
                <i class="iconfont" :class="item.icon"></i> {{item.title}}
            </MenuItem>

            <!-- 有子项 -->
            <Submenu v-for="(item,index) in menuList" :key="index" :name="item.name" v-if="item.children">
                <template slot="title">
                    <i class="iconfont" :class="item.icon"></i> {{item.title}}
                </template> 
                <MenuItem v-for="(subItem,subIndex) in item.children" :key="subIndex" :name="subItem.name"  :to="subItem.path">{{subItem.title}}</MenuItem>
            </Submenu>
 
 
        </Menu>  
    </div> 
</template> 
 
<script>

import { menuData } from 'js/gobalData'
import { mapState, mapMutations } from 'vuex'

export default {
    computed:{
        ...mapState(['routerName']),
        // 处于subMenu下的页面，subMenu要展开
        openMenu() {
            let arr = []
            this.menuList.map(item =>{
                if(item.children) {
                    item.children.map(subItem=>{
                        if(subItem.name === this.routerName) {
                            arr.push(item.name)
                        }
                    }) 
                }
            })
            return arr
        }
    },
    data() {
        return {
            menuList: menuData,
        }
    },
    methods:{
        jumpTo(name) {
            this.$router.push(name)
            this.set_routerName(name)
        },
        ...mapMutations(['set_routerName'])
    }
}
</script>

<style lang="scss" scoped>
</style>
