<template>
    <div id="list">
        <h3>Book list page</h3>
        <div class="col-md-3">
            <div class="panel panel-warning">
                <div class="panel-heading">
                    Title：<span>VueJs</span>
                </div>
                <div class="panel-body">
                    <img src="../assets/logo.png" alt="">
                </div>
                <div class="panel-footer">
                    Price：<span>9.9 $</span>
                    <a href="javascript:;">Detail</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'list'
    }
</script>
<style>
    a {
        text-decoration: none;
    }

    h3 {
        text-align: center;
    }

    img {
        width: 100%;
    }
</style>