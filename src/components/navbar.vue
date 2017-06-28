<template>
    <nav id="navbar" class="navbar navbar-default navbar-fixed-center">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Simple Bookstore</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active">
                        <router-link to="/list">Book list</router-link>
                    </li>
                    <li>
                        <router-link to="/add">Add book</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    export default{
        name: 'navbar'
    }
</script>