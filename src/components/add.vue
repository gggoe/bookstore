<template>
    <div id="add">
        <h3>Book add page</h3>
        <form>
            <div class="form-group">
                <label for="name">Title</label>
                <input type="text" class="form-control" id="name" v-model="book.bookname">
            </div>
            <div class="form-group">
                <label for="cover">Bookcover</label>
                <input type="text" class="form-control" id="cover" v-model="book.bookcover">
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="text" class="form-control" id="price" v-model="book.price">
            </div>
            <button class="btn btn-primary" @click="add">Confirm change</button>
        </form>
    </div>
</template>
<script>
    export default {
        name:'add',
        data(){
            return {book: {bookname: null, bookcover: null, price: null}}
        },
        methods: {
            add(){
                if (this.book.bookname && this.book.bookcover && this.book.price) {
                    this.$http.post('/books', this.book).then(res => {
                        this.$router.push('/list');
                    }, err => {
                        console.log(err);
                    })
                } else {
                    alert('请把信息填写完整！');
                }
            }
        }
    }
</script>