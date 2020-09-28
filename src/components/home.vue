<template>
  <div class="container" style="font-size: 13px;">
      <div class="inner">
        <div class="module mod-detail">
          <div class="left">

            <table>
              <tbody>
              <tr>
                <td class="th" width="60%">区块高度</td>
                <td class="th" width="40%">交易量</td>
              </tr>
              <tr>
                <td><span class="lastblock">{{blockInfo.block}}</span> (<span class="avgtime">{{blockInfo.timeStamp| formatDate}}s</span>)</td>
                <td><span class="transactions">{{blockInfo.txNum}}</span> (<span class="tps">5.17 TPS</span>)</td>
              </tr>
              <tr>
                <td class="th">全网算力</td>
                <td class="th">区块难度</td>
              </tr>
              <tr>
                <td><span class="hashrate">394.1 TH/s</span></td>
                <td><span class="difficulty">{{blockInfo.difficulty}} TH</span></td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div class="row">
          <div class="col">
            <div class="module mod-list">
              <div class="hd">
                <a href="/blocks/" target="_blank">查看全部 <i>&gt;&gt;</i></a>
                <h3>区块高度</h3>
              </div>
              <div class="bd">
                <ul  v-for="(item) in blockList" :key="item.block">
                  <li>
                    <table>
                      <caption>区块：<router-link  :to="'/blocks/'+item.block"  target="_blank">{{item.block}}</router-link></caption>
                      <tbody>
                      <tr>
                        <td>由 <router-link  :to="'/accounts/'+item.miner"   target="_blank">{{item.miner}}</router-link>
                          开采
                        </td>
                        <td width="150" align="right">矿工费</td>
                      </tr>
                      <tr>
                        <td>在{{item.timeStamp| formatDate}}秒内完成 <router-link :to="'/blocks/'+item.block" target="_blank">{{ item.txNum }}</router-link> 笔交易</td>
                        <td width="150" align="right"><span class="fee">{{ item.gasUsed }} FDG</span></td>
                      </tr>
                      </tbody>
                    </table>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="module mod-list">
              <div class="hd">
                <a href="/txs/" target="_blank">查看全部 <i>&gt;&gt;</i></a>
                <h3>交易</h3>
              </div>
              <div class="bd">
                <ul v-for="(item) in txList" :key="item.id">
                  <li>
                    <table>
                      <thead>
                      <tr>
                        <td><span>交易标识</span>
                          <router-link
                              :to="'/txs/'+item.txHash"
                            target="_blank">{{item.txHash}}</router-link></td>
                        <td width="150" align="right"><span class="time">{{item.tradeTimeString}}</span></td>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td rowspan="2" style="vertical-align:bottom;"><span>从</span> <router-link class="address"

                                                                                                   :to="'/accounts/'+item.fromAddress"

                                                                                         target="_blank">{{item.fromAddress}}</router-link>
                          <span>到</span> <router-link class="address"  :to="'/accounts/'+item.toAddress"
                                            target="_blank">{{item.toAddress}}</router-link></td>
                        <td width="150" align="right">数量</td>
                      </tr>
                      <tr>
                        <td width="150" align="right"><span class="fee">{{item.amount}} FDG</span></td>
                      </tr>
                      </tbody>
                    </table>
                  </li>


                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>


</template>

<script>
import Vue from 'vue'
import Api from '../api/index.js';
import web3 from '../api/fdg';
Vue.prototype.$api = Api;



export default {
  name: 'Home',
  props: {
    msg: String
  },
  data(){
    return{
      CoinBase: "",
      HashRate: 0,
      blockNumber:0,
      blockList:null,
      txList:null,
      blockInfo:null,
      test:""
    }
  },
  filters: {
    formatDate: function (value) {
      var date2 = new Date();    //结束时间
      var date3 = date2.getTime() - value*1000;   //时间差的毫秒数
//计算出相差天数
      var days=Math.floor(date3/(24*3600*1000))

      //计算出小时数
      var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
      var hours=Math.floor(leave1/(3600*1000))
      //计算相差分钟数
      var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
      var minutes=Math.floor(leave2/(60*1000))
      //计算相差秒数
      var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
      var seconds=Math.round(leave3/1000)
      if(minutes==0){
        return seconds;
      }
      return minutes*60+seconds;
    }
  },
  created(){

    this.getBlockList()
    this.getTxList()

  },
  methods:{
    getBlockList(){
      this.$api.get('/public/home/blockList', {size:'7'},response => {
        console.info(response.data.code+"-----getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          this.blockList=response.data.data.result;
          this.blockInfo=response.data.data.result[0];
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    },
    getTxList(){
      this.$api.get('/public/home/txList', {size:'8'},response => {
        console.info(response.data.code+"-----getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          this.txList=response.data.data.result;
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    },


  }
}
</script>
<style scoped>
@import "../assets/css/common.css";
@import "../assets/css/index.css";
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->


