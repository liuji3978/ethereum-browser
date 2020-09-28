<template>
  <div class="wrapper">
    <div class="container" style="font-size: 13px;">
      <div class="inner">
        <div class="mod-breadcrumb">
          <a href="/">首页</a>
          <span>&gt;</span>
          <strong>所有账号</strong>
        </div>
        <div class="mod-pagination mod-pagination-top">
          <pagination :currentPage.sync="pageNo"
                      :limit.sync="pageSize"
                      :totalCount="totalCount"
                      @turn="getAccountList"></pagination>
          </div>
        <div class="module mod-list">
          <div class="hd"><h3>所有账号</h3></div>
          <div class="bd">
            <table class="only-pc">
              <thead>
              <tr>
                <th width="8%"><span>排名</span></th>
                <th><span>地址</span></th>
                <th><span>余额</span></th>
                <th><span>占比</span></th>
                <th><span>交易笔数</span></th>
              </tr>
              </thead>
              <tbody>
              <tr class="J_link" v-for="(item) in accountsList" :key="item.id">
                <td><span>{{item.id}}</span></td>
                <td> <router-link class="address"  :to="'/accounts/'+item.address"

                                                      target="_blank">{{item.address}}</router-link>
                </td>
                <td><span>{{item.balance}} FDG</span></td>
                <td><span>{{ item.rate }}</span></td>
                <td><span>850177</span></td>
              </tr>

              </tbody>
            </table>
            <ul class="only-mobile" v-for="(item) in accountsList" :key="item.id">
              <li>
                <div class="item">
                  <div class="field">
                    <div class="key">排名</div>
                    <div class="value"><span>{{item.id}}</span></div>
                  </div>
                  <div class="field">
                    <div class="key">地址</div>
                    <div class="value"> <router-link class="address"  :to="'/accounts/'+item.address"

                                                     target="_blank">{{item.address}}</router-link>
                    </div>
                  </div>
                  <div class="field">
                    <div class="key">余额</div>
                    <div class="value"><span> {{item.balance}} ETH</span></div>
                  </div>
                  <div class="field">
                    <div class="key">占比</div>
                    <div class="value"><span>{{ item.rate }}</span></div>
                  </div>
                  <div class="field">
                    <div class="key">交易笔数</div>
                    <div class="value"><span>850177</span></div>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>
        <div class="mod-pagination">
          <pagination :currentPage.sync="pageNo"
                      :limit.sync="pageSize"
                      :totalCount="totalCount"
                      @turn="getAccountList"></pagination>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import "../assets/css/common.css";
@import "../assets/css/block-index.css";
</style>
<script>
import Vue from 'vue'
import Api from '../api/index.js';
import pagination from './Pagination'
Vue.prototype.$api = Api;
export default {
  name: 'block',
  components:{pagination},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      accountsList:null,
      pageNo:1,
      pageSize:20,
      totalCount:0
    }
  },
  created(){


    this.getAccountList()

  },


  methods: {
    getAccountList () {
      this.$api.get('/public/home/getAccountsList', {pageSize: this.pageSize, pageNo: this.pageNo}, response => {
        console.info(response.data.code + "-----getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          this.accountsList = response.data.data.result;
          this.totalCount = response.data.data.totalCount;
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

