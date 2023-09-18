<template>
  <div class="overview">
    <div class="left">
        <a-card size="small" title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </a-card>
        <a-card size="small" title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </a-card>
        <a-card size="small" title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </a-card>
    </div>
    <div class="middle" ref="map"></div>
    <div class="right">
        <a-card size="small" title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </a-card>
        <a-card size="small" title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </a-card>
        <a-card size="small" title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </a-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.overview {
    display: grid;
    grid-template-columns: 320px 1fr 320px;
    .left {
        display: grid;
        grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
        grid-row-gap: 15px;
    }
    .right {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-row-gap: 15px;
    }
}
</style>
