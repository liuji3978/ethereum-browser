<template>


  <div id="app">

    <div class="header">
      <div class="module mod-head">
        <div class="inner inner-hide">

          <div  style="margin-right: 2px;float: right;margin-top: 20px;font-size: 14px;">

            <div>中文<i></i></div>
            <ui style="display: none">
              <li>中文</li>
              <li>英文</li>
            </ui>

          </div>
          <div class="search" style="margin-right: 50px;">

              <input type="text"v-model="searchName" name="word" value="" placeholder="搜索地址/交易等..." autocomplete="off"  style="">
              <button @click="searchRouter" >搜索</button>
              <div class="suggestion" style="position: absolute; display: none; top: 28px; left: 0px; width: 248px;"><ul></ul>
              </div>
          </div>





          <div class="logo"><a href="/"><img src="/static/image/public/logo.jpg" alt="FDG Block Browser" width="161" height="42"></a></div>
          <div class="nav">
            <ul>



              <li  style="position: relative;">
                <router-link  to="/txs/">交易</router-link>

              </li>
              <li  style="position: relative;">
                <router-link  to="/blocks/">区块</router-link>

              </li>
<!--              <li><router-link to="/tokens/">代币</router-link></li>-->
              <li><router-link to="/accounts/">账户</router-link></li>
<!--              <li><router-link to="/qianbao/">钱包</router-link></li>-->



            </ul>


          </div>



<!--          <div class="header_nav" style="float:right;margin-left: 10px;">-->
<!--            <Menu mode="horizontal" width="auto" @on-select="changelanguage" style="height: 50px;line-height:50px;">-->
<!--              <Submenu name="lang">-->
<!--                <template slot="title" class="lang-title">-->
<!--                  <span style="display: none;">{{languageValue}}</span>-->
<!--                  <img class="lang-img" v-if="lang=='简体中文'" src="./assets/images/lang-zh.png"></img>-->
<!--                  <img class="lang-img" v-if="lang=='English'" src="./assets/images/lang-en.png"></img>-->
<!--                </template>-->
<!--                <MenuItem name="zh" class="lang-item"><img src="./assets/images/lang-zh.png"></img>简体中文</MenuItem>-->
<!--                <MenuItem name="en" class="lang-item"><img src="./assets/images/lang-en.png"></img>ENGLISH</MenuItem>-->
<!--              </Submenu>-->
<!--            </Menu>-->
<!--          </div>-->
          <div class="nav-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="mask"></div>
        </div>
      </div>


    </div>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import Api from './api/index.js';
Vue.prototype.$api = Api;
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchName:'',
      languageValue:''
    }
  },
  methods:{
    searchRouter(){
        if(this.searchName.length>50){
          this.$router.push('/txs/'+this.searchName)
        }else if(this.searchName.length>30&&this.searchName.length<=50){
          this.$router.push('/accounts/'+this.searchName)
        }
    },
    changelanguage: function(name) {
      //console.log("change language: " + name);
      if (name == "en") {
        this.$store.commit("setlang", "English");
        this.$i18n.locale = "en";
        this.reload();
      }
      if (name == "zh") {
        this.$store.commit("setlang", "简体中文");
        this.$i18n.locale = "zh";
        this.reload();
      }
    }

  }
}
</script>
<style  scoped >


@import './assets/css/common.css';


</style>


