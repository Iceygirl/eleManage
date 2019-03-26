<template>
    <section class="Extend">
        <Row class="row">
            <Col span="12">
                <span class="key">店铺名称 </span>
                <span class="value">{{ row.name }}</span>
            </Col>
            <Col span="12">
                <span class="key">店铺地址 </span>
                <span class="value">{{ row.address }}</span>
            </Col>
        </Row>
        <Row class="row">
            <Col span="12">
                <span class="key">店铺介绍 </span>
                <span class="value">{{ row.description }}</span>
            </Col>
            <Col span="12">
                <span class="key">店铺ID</span>
                <span class="value">{{ row.id }}</span>
            </Col>
        </Row>
        <Row class="row">
            <Col span="12">
                <span class="key">联系电话 </span>
                <span class="value">{{ row.phone }}</span>
            </Col>
            <Col span="12">
                <span class="key">评分</span>
                <span class="value">{{ row.rating }}</span>
            </Col>
        </Row>
        <Row class="row">
            <Col span="12">
                <span class="key">销售量</span>
                <span class="value">{{ row.recentOrderNum }}</span>
            </Col>
            <Col span="12">
                <span class="key">分类 </span>
                <span class="value">{{ row.category }}</span>
            </Col>
        </Row>
    </section>
</template>
 
<script>
export default {
    props:{
        row: Object
    }
}
</script>
<style lang="scss">
.Extend {
    .row {
        line-height:30px;
        .key {
            width: 90px;
            color: #99a9bf;
        }
    }
}
</style>

