<template>
    <div id="detail">
        <div id="list">
            <h3>Book Detail</h3>
            <div class="col-md-6">
                <div class="panel panel-warning">
                    <div class="panel-heading">
                        Title：<span v-show="!flag">{{book.bookname}}</span>
                        <input type="text" v-show="flag" v-model="book.bookname">
                    </div>
                    <div class="panel-body">
                        <img :src="book.bookcover" alt="">
                    </div>
                    <div class="panel-footer">
                        Price：<span v-show="!flag">{{book.price}}</span>
                        <input type="text" v-show="flag" v-model="book.price">
                        <button type="button" class="btn btn-danger" v-show="!flag" @click="remove">Delete</button>
                        <button type="button" class="btn btn-warning" v-show="!flag" @click="flag=true">Modify</button>
                        <button type="button" class="btn btn-primary" v-show="flag" @click="update">Confirm change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'detail',
        data(){
            return {id: null, book: {bookname: '', bookcover: '', price: ''}, flag: false};
        },
        beforeMount(){
            this.id = this.$route.params.id;
            this.$http.get('/books?id=' + this.id).then(res => {
                this.book = res.body;
            }, err => {
                console.log(err);
            })
        },
        methods: {
            remove(){
                this.$http.delete('/books?id=' + this.book.id).then(res => {
                    this.$router.push('/list');
                }, err => {
                    console.log(err);
                })
            },
            update(){
                this.$http.put('/books', this.book).then(res => {
                    this.$router.push('/list');
                }, err => {
                    console.log(err);
                })
            }
        }
    }
</script>
<style>
    h3{
        text-align: center;
    }
    img {
        width: 100%;
    }
</style>