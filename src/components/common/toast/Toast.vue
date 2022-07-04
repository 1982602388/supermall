<!--  -->
<template>
  <div>
     <div class="toast" v-show="isShow">
          {{message}}
     </div>
  </div>
</template>

<script>
export default {
name:'Toast',
data(){
    return{
        message:'',
        isShow:false
    }
},
methods: {
    show(message,duration){
        this.message=message
        this.isShow=true
        setTimeout(()=>{
            this.message=''
            this.isShow=false
        },duration)
    }
}
}

</script>

<style  scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    height: 40px;
    width: 200px;
    border-radius: 10px;
    transform: translate(-50%,-50%);
    text-align: center;
    line-height: 40px;
    background-color: rgba(0, 0, 0, .75);
    color: #fff;
    z-index: 999;
}

</style>
