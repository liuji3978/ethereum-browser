<template>
  <div class="wrapper">
    <div class="container" style="font-size: 13px;">
      <div class="inner">
        <div class="mod-breadcrumb">
          <a href="/">首页</a>
          <span>&gt;</span>
          <strong>区块</strong>
        </div>
        <div class="mod-pagination mod-pagination-top">
          <pagination :currentPage.sync="pageNo"
                      :limit.sync="pageSize"
                      :totalCount="totalCount"
                      @turn="getBlockList"></pagination>
        </div>
        <div class="module mod-list">
          <div class="hd"><h3>区块</h3></div>
          <div class="bd">
            <table class="only-pc">
              <thead>
              <tr>
                <th><span>区块高度</span></th>
                <th><span>出块时间</span></th>
                <th><span>交易量</span></th>

                <th><span>矿工</span></th>
                <th><span>燃料上限</span></th>
                <th><span>挖矿难度</span></th>
<!--                <th><span>算力</span></th>-->
                <th><span>奖励</span></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item) in blockList" :key="item.block">
                <td><router-link :to="'/block/'+item.block" target="_blank">{{item.block}}</router-link></td>
                <td><span>{{item.createTime}}</span></td>
                <td><router-link :to="'/txs/'+item.block" target="_blank">{{item.txNum}}</router-link></td>

                <td> <router-link  :to="'/accounts/'+item.miner"
                                                      target="_blank">{{item.miner}}</router-link>
                </td>
                <td><span>{{ item.gasLimit }}</span></td>
                <td><span>{{item.difficulty}} TH</span></td>
<!--                <td><span>313.88 TH/s</span></td>-->
                <td><span>5 FDG</span></td>
              </tr>

              </tbody>
            </table>
            <ul class="only-mobile" v-for="(item) in blockList" :key="item.block">
              <li>
                <div class="item">
                  <div class="field">
                    <div class="key">区块高度</div>
                    <div class="value"><router-link :to="'/block/'+item.block" target="_blank">{{item.block}}</router-link></div>
                  </div>
                  <div class="field">
                    <div class="key">出块时间</div>
                    <div class="value"><span>{{item.createTime}}</span></div>
                  </div>
                  <div class="field">
                    <div class="key">交易量</div>
                    <div class="value"><router-link :to="'/block/'+item.block" target="_blank">{{item.txNum}}</router-link></div>
                  </div>

                  <div class="field">
                    <div class="key">矿工</div>
                    <div class="value">
                      <router-link  :to="'/accounts/'+item.miner"
                                    target="_blank">{{item.miner}}</router-link>
                    </div>
                  </div>
                  <div class="field">
                    <div class="key">燃料上限</div>
                    <div class="value"><span>{{ item.gasLimit }}</span></div>
                  </div>
                  <div class="field">
                    <div class="key">挖矿难度</div>
                    <div class="value"><span>{{item.difficulty}} TH</span></div>
                  </div>

                  <div class="field">
                    <div class="key">奖励</div>
                    <div class="value"><span>5 FDG</span></div>
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
                      @turn="getBlockList"></pagination>
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
import web3 from '../api/fdg';
Vue.prototype.$api = Api;
export default {
  name: 'block',
  components:{pagination},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      blockList:null,
      pageNo:1,
      pageSize:20,
      totalCount:0,
      currentBlock:null,
      queryBlock:0
    }
  },
  created(){
    this.getBlockList()
  },

  methods: {
    getBlockList () {
      if(this.currentBlock!=null&&this.currentBlock>=0){
        this.queryBlock=this.currentBlock-(this.pageNo*this.pageSize)
      }
      this.$api.get('/public/home/blockList', {size: this.pageSize, start: this.queryBlock}, response => {
        console.info(response.data.code + "-----getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          this.blockList = response.data.data.result;
          this.currentBlock=response.data.data.result[0].block;
          if(this.totalCount==0){
            this.totalCount=this.currentBlock;
          }

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

