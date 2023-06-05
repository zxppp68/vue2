<template>
    <div class="type-nav">
    <div class="container">
        <div @mouseleave="changeIndex(-1)" v-on="{mouseenter:enterShow,mouseleave:enterShow}">
            <h2 class="all">全部商品分类</h2>
            <!-- 三级联动 -->
            <!-- 过度动画 -->
            <transition name="sort">
                <div class="sort" v-show="show">
                    <div   div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList.slice(0,16)" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                        <h3 @mouseenter="changeIndex(index)">
                            <a :data-categoryName="c1.categoryName" :data-categoryId="c1.category1Id">{{c1.categoryName}}</a>
                            <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                        </h3>
                        <!-- 二级、三级分类 -->
                        <div class="item-list clearfix" v-show="currentIndex==index">
                            <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                                    </dt>
                                    <dd>
                                        <!-- 三级分类在这里 -->
                                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                            <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
            </div>
                </div>
            </transition>
        </div>
        <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>
    </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
//把lodash全部功能引入了 最好按需引入 默认暴露不需要加括号
import throttle from 'lodash/throttle'

export default {
    name:'TypeNav',
    data(){
        return{
            currentIndex:-1,
            show:true
        }
    },
    //组件挂载完毕，就像服务器发请求
    mounted(){
        // //通知vue发数据，获取数据,储存在仓库中  为了性能这句话转到APP去了
        // this.$store.dispatch('categoryList')
        //跳转change 三级联动show信息
        if(this.$route.path !='/home') this.show = false
    },
    methods:{
        //鼠标进入改数据 index是鼠标放上一级菜单
        // changeIndex(index){
        //     this.currentIndex = index
        // },
        //throttle回调别用箭头函数 可能出现this问题
        changeIndex:throttle(function(index){
            this.currentIndex = index
        },20),
        //鼠标离开停止一级菜单背景
        leaveIndex(index){
            this.currentIndex = -1
        },
        goSearch(event){
            //事件委派也有问题，怎么知道点击的是a标签，以及如何获取参数：：用自定义属性
            let element = event.target
            let {categoryname,category1id,category2id,category3id} = element.dataset
            if(categoryname){
                //整理路由跳转的参数
                let location = { name:"search"}
                let query = {categoryName:categoryname}
                //三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id
                }else if (category2id) {
                    query.category2Id = category2id
                }else {
                    query.category3Id = category3id
                }
                //合并路由跳转参数并判断，如果路由跳转的时候代有parama参数，需要一起传过去
                if (this.$route.params) {
                    location.params = this.$route.params
                    location.query = query
                    this.$router.push(location).catch(err=>err)
                }
            }
        },
        //鼠标移入移出在search里面展示
        enterShow(){
            if(this.$route.path != '/home') this.show = !this.show
        }
    },
    computed:{
        ...mapState({
            categoryList:state=>state.home.categoryList
        })
    }
}
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            // display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }

                    .cur {
                        background-color: skyblue;
                    }
                }
            }
            // 过渡动画样式
            //过渡动画开始状态（进入）
            .sort-enter{
              height: 0px;
            }
            //过渡动画结束状态
            .sort-enter-to {
                height: 461px;
            }
            //动画时间速率
            .sort-enter-active {
                overflow: hidden;
                transition:all .3s linear;
            }
        }
    }
</style>