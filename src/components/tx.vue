<template>
  <div class="container" style="font-size: 13px;">
    <div class="inner">
      <div class="mod-breadcrumb">
        <a href="/">首页</a>
        <span>&gt;</span>
        <strong>交易</strong>
      </div>

<div  class="mod-pagination mod-pagination-top">
  <pagination :currentPage.sync="pageNo"
              :limit.sync="pageSize"
              :totalCount="totalCount"
              @turn="getTxList"></pagination>
</div>

<!--      </div>-->
      <div class="module mod-list">
        <div class="hd"><h3>交易</h3></div>
        <div class="bd">
          <table class="only-pc">
            <thead>
            <tr>
              <th><span>交易标识(TX)</span></th>
              <th><span>区块高度</span></th>
              <th><span>交易时间</span></th>
              <th><span>发送方</span></th>
              <th>&nbsp;</th>
              <th><span>接收方</span></th>
              <th><span>交易量</span></th>
              <th><span>交易费</span></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item) in txList" :key="item.id">
              <td><router-link class="address"  :to="'/txs/'+item.txHash"
                     target="_blank">{{item.txHash}}</router-link></td>
              <td><a href="/blocks/10931033" target="_blank">{{item.blockNumber}}</a></td>
              <td><span class="time">{{item.tradeTimeString}}</span></td>
              <td class="from"> <router-link class="address"
                                             :to="'/accounts/'+item.fromAddress"
                                                                 target="_blank">{{item.fromAddress}}</router-link>
              </td>
              <td>➜</td>
              <td class="to"> <router-link class="address"
                                           :to="'/accounts/'+item.toAddress"
                                                               target="_blank">{{item.toAddress}}</router-link>
              </td>
              <td><span>{{item.amount}} FDG</span></td>
              <td><span>{{item.gasUsed}} GWei</span></td>
            </tr>

            </tbody>
          </table>
          <ul class="only-mobile" v-for="(item) in txList" :key="item.id">
            <li>
              <div class="item">
                <div class="field">
                  <div class="key">交易标识(TX)</div>
                  <div class="value"><router-link class="address"  :to="'/txs/'+item.txHash"
                                                  target="_blank">{{item.txHash}}</router-link>
                  </div>
                </div>
                <div class="field">
                  <div class="key">区块高度</div>
                  <div class="value"><a href="/blocks/10931033" target="_blank">{{item.blockNumber}}</a></div>
                </div>
                <div class="field">
                  <div class="key">交易时间</div>
                  <div class="value"><span class="time">{{item.tradeTimeString}}</span></div>
                </div>
                <div class="field">
                  <div class="key">发送方</div>
                  <div class="value"> <router-link class="address"
                                                   :to="'/accounts/'+item.fromAddress"
                                                   target="_blank">{{item.fromAddress}}</router-link>
                  </div>
                </div>
                <div class="field">
                  <div class="key">接收方</div>
                  <div class="value"> <router-link class="address"
                                                   :to="'/accounts/'+item.toAddress"
                                                   target="_blank">{{item.toAddress}}</router-link>
                  </div>
                </div>
                <div class="field">
                  <div class="key">交易量</div>
                  <div class="value"><span>{{item.amount}}FDG</span></div>
                </div>
                <div class="field">
                  <div class="key">交易费</div>
                  <div class="value"><span>{{item.gasUsed}}GWei</span></div>
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
                    @turn="getTxList"></pagination>
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
      txList:null,
      pageNo:1,
      pageSize:20,
      totalCount:0
    }
  },
  created(){

    this.txList=null;
    this.getTxList()

  },


  methods:{
    getTxList(){
      this.$api.get('/public/home/txList', {size:this.pageSize,pageNo:this.pageNo},response => {
        console.info(response.data.code+"-----getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          this.txList=response.data.data.result;
          this.totalCount=response.data.data.totalCount;
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    },


}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
