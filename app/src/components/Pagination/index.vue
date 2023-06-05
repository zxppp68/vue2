<template>
    <div class="pagination">
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <!-- 这些自定义事件也可以写在回调里，这里是直接写了 -->
        <button v-show="startNumEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
        <button v-show="startNumEndNum.start>2">···</button>
        <!-- 中间部分 这里其实是在遍历数字-->
        <button v-for="(page,index) in startNumEndNum.end" :key="index" v-show="page>=startNumEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">
            {{page}}
        </button>
        
        <button v-show="startNumEndNum.end<totalPage -1">···</button>
        <button v-show="startNumEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
        <!-- 看好计算属性是这么写的，不用加括号 -->
        <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
        
        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
  </template>
  
  <script>
    export default {
      name: "Pagination",
      props:['pageNo','pageSize','total','continues','totalPage'],
      computed:{
        //总共多少页 直接从props里面拿了
        // totalPage(){
        //     return Math.ceil(this.total/this.pageSize);
        //     //向上取整  Math.floor是向下取整
        // },
        startNumEndNum(){
            // const {continues,pageNo,totalPage} = this
            // 解构，下面就可以不用写this
            let start = 0, end = 0;
            //连续页码数多少就是至少几页，如果页数比这个少
            if(this.continues > this.totalPage){
                start = 1
                end = this.totalPage
            }else{
                //总页数大于连续页码数
                start = this.pageNo - Math.floor(this.continues/2)
                end = this.pageNo + Math.floor(this.continues/2)
                if(this.pageNo <= Math.floor(this.continues/2)){
                    start = 1
                    end = this.continues
                }
                if(end > this.totalPage){
                    end = this.totalPage
                    start = this.totalPage - this.continues + 1
                }
            }
            return{start,end}
        }
      },

    }
  </script>
  
  <style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  </style>