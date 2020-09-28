<template>
  <div class="wrapper">
    <div class="container" style="font-size: 13px;">
      <div class="inner">
        <div class="mod-breadcrumb">
          <a href="/">首页</a>
          <span>&gt;</span>
          <strong>交易信息</strong>
        </div>
        <div class="module mod-information">
          <div class="hd"><h3>交易信息</h3></div>
          <div class="bd">
            <table>
              <tbody>
              <tr>
                <td width="190" align="right">交易标识</td>
                <td><span class="tx">{{txInfo.txHash}}</span></td>
              </tr>
              <tr>
                <td align="right">交易状态</td>
                <td><span class="status success">成功</span></td>
              </tr>
              <tr>
                <td align="right">区块高度</td>
                <td><a class="blockNumber" href="/blocks/10941648" target="_blank">{{txInfo.blockNumber}}</a></td>
              </tr>
              <tr>
                <td align="right">交易时间</td>
                <td><span class="timestamp">{{txInfo.tradeTimeString}}</span></td>
              </tr>
              <tr>
                <td align="right">发送方</td>
                <td><router-link class="from"  :to="'/accounts/'+txInfo.fromAddress" target="_blank">{{txInfo.fromAddress}}</router-link></td>
              </tr>
              <tr>
                <td align="right">接收方</td>
                <td><router-link class="to"  :to="'/accounts/'+txInfo.toAddress" target="_blank">{{txInfo.toAddress}}</router-link></td>
              </tr>
              <tr>
                <td align="right">交易量</td>
                <td><span class="value">{{txInfo.amount}} FDG </span></td>
              </tr>
              <tr>
                <td align="right">燃料上限</td>
                <td><span class="gasLimit">{{txInfo.gasUsed}}</span></td>
              </tr>
              <tr>
                <td align="right">燃料消耗</td>
                <td><span class="gasUsed">132479 (76.34%)</span></td>
              </tr>
              <tr>
                <td align="right">燃料价格</td>
                <td><span class="gasPrice">0.0000001 FDG (100 Gwei)</span></td>
              </tr>

              <tr>
                <td align="right">交易费用</td>
                <td><span class="txFee">0.0132479 FDG ($4.78)</span></td>
              </tr>
              <tr>
                <td align="right">确认数</td>
                <td><span class="nonce">{{txInfo.confirmations}}</span></td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/css/common.css";
@import "../assets/css/detail_tx.css";
</style>
<script>
import Vue from 'vue'
import Api from '../api/index.js';
Vue.prototype.$api = Api;

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      txInfo:null

    }
  },
  created(){
    const txhash = this.$route.params && this.$route.params.txhash
    console.log(txhash+"---1123123---")
    this.getTxInfo(txhash)
  },
  methods:{
    getTxInfo(txhash){
      this.$api.get('/public/home/getTxInfoByTxHash', {txHash:txhash},response => {
        console.info(response.data.code+"---123123123--getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          //this.article=response.data.data;
          this.txInfo=response.data.data;
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
