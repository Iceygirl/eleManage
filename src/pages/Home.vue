<template>
    <div class="Home clearfix">
        <div class="sidenav pull-left">
            <SideNav></SideNav>
        </div>
        <div class="main pull-left">
            <Head></Head> 
            <router-view></router-view>
        </div>
    </div> 
</template>  
  
<script>

import SideNav from 'components/SideNav' 
import Head from 'components/Head' 

export default {
    components: {
        SideNav,
        Head
    },
    data() {
        return {
        }
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
.Home {
    height:100%;
    .sidenav {
        height:100%;
        background-color:#515a6e;
    }
    .main {
        width:calc(100% - 240px);
    }
}
</style>
