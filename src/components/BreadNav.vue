<template>
    <div class="BreadNav">
        <Breadcrumb>
            <BreadcrumbItem to="/main">首页</BreadcrumbItem>
            <BreadcrumbItem v-for="(item,index) in $route.meta" :key="index">{{item}}</BreadcrumbItem>
        </Breadcrumb>
    </div> 
</template> 
 
<script>
  

export default {
    data() {
        return {
        }
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
</style>
