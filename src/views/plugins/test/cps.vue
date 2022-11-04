<template>
    <div>
        
        <div v-for="item in bred" :key="item.id">
            {{item[0]}}
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name:123
        }
    },
    props: {
        bred:Array
    },
    watch:{
        bred(){
            console.log(123)
        }
    },
    
}
</script>