<template>
    <div id="list">
        <h3>Book list page</h3>
        <div class="col-md-3" v-for="book in books">
            <div class="panel panel-warning">
                <div class="panel-heading">
                    Title：<span>{{book.bookname}}</span>
                </div>
                <div class="panel-body">
                    <img :src="book.bookcover" alt="">
                    <!--<img src="" alt="">-->
                </div>
                <div class="panel-footer">
                    Price：<span>{{book.price}} $</span>
                    <router-link :to="{name:'detail',params:{id:book.id}}">Detail</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'list',
        data(){
            return {books: null};
        },
        beforeMount(){
            this.$http.get('/books').then(res => {
                // 从后台得到数据放在body属性中
                this.books = res.body;
            }, err => {
                console.log(err)
            });
        }
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