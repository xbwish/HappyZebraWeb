<template>
    <NuxtLayout name="common-layout">
        <div class="site">
            <div class="site__body">
               <CoreshopHeaderNavigation :breadcrumb="breadcrumb"></CoreshopHeaderNavigation>
           
                <div class="block">
                    <div class="container">
                        <div class=" mb-0">
                            <div class="card-body contact-us">
                                <div class="contact-us__container">
                                    <div class="row">
                                        <div class="col-12 pb-4 pb-lg-0">
                                            <h4 class="contact-us__header">{{$t('我们的地址')}}</h4>
                                            <div class="contact-us__address">
                                                <p class="address">
                                                    联系地址：湖南省怀化市鹤城区迎丰街道迎丰中路北侧（佳慧中央商厦南栋）1514-A<br>
                                                    联系邮箱: jianweie@163.com<br>
                                                    手机号码: 19145919666<br />
                                                    联系QQ ：27888677
                                                </p>
                                                <p class="account">
                                                    <strong>{{$t('对公账户')}}</strong><br>
                                                    账户名称：怀化南山田舍科技有限公司<br>
                                                    账户号码：595221888013000112762<br>
                                                    开户银行：交通银行股份有限公司怀化河西支行<br>
                                                </p>
                                                <p class="feedback">
                                                    <strong>{{$t('交流反馈')}}</strong><br>
                                                    {{$t('快乐搬馬系统开源协议')}}<br>
                                                    官方QQ群：70494974<br>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">import { HeaderNavigation } from '@/model/header-navigation';

    definePageMeta({
        layout: false, // 手动关闭 default 布局
    })

const breadcrumb:Array<HeaderNavigation> =[
    {title:'首页',link:'/'},
    {title:'联系我们', link:''}
];

</script>

<style lang="scss" scoped>
  .card-body{
     padding-top:  0rem !important;
  }
  .contact-us__address{
    font-size: 14px;
    p{
        margin-bottom: 6px;
    }
  }
</style>
