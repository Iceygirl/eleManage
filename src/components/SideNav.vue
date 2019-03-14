<template>
    <div class="SideNav"> 
        <Menu theme="dark" @on-select="jumpTo"  accordion>
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

export default {
    data() {
        return {
            menuList: menuData
        }
    },
    methods:{
        jumpTo(name) {
            this.$router.push(name)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
