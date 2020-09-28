<template>


  <div class="wrapper">
    <div class="container" style="font-size: 13px;">
      <div class="inner">
        <div class="mod-breadcrumb">
          <a href="/">首页</a>
          <span>&gt;</span>
          <a href="/blocks/">区块</a>
          <span>&gt;</span>
          <strong>区块信息</strong>
        </div>
        <div class="module mod-information">
          <div class="hd"><h3>区块信息</h3></div>
          <div class="bd">
            <div class="info">
              <h2>
<!--                <a class="prev" href="/blocks/10943213">&lt;</a>-->
                <span class="number">{{block}}</span>
<!--                <a class="next" href="/blocks/10943215">&gt;</a>-->
              </h2>
              <p class="hash">{{blockObject.hash}}</p>
            </div>
            <table>
              <tbody>
              <tr>
                <td align="right">出块时间</td>
                <td><span class="timestamp">{{blockObject.createTime}}</span></td>
              </tr>
              <tr>
                <td align="right">出块大小</td>
                <td><span class="size">{{blockObject.size}}</span></td>
              </tr>
              <tr>
                <td align="right">交易数量</td>
                <td><a class="txs" href="/txs/10943214" target="_blank">{{blockObject.txNum}}</a></td>
              </tr>
              <tr>
                <td align="right">燃料消耗</td>
                <td><span class="gasUsed">{{blockObject.gasUsed}} (99.95%)</span></td>
              </tr>
              <tr>
                <td align="right">燃料上限</td>
                <td><span class="gasLimit">{{blockObject.gasLimit}}</span></td>
              </tr>
              <tr>
                <td align="right">挖矿难度</td>
                <td><span class="difficulty">{{blockObject.difficulty}} T</span></td>
              </tr>
              <tr>
                <td align="right">总难度</td>
                <td><span class="totalDifficulty">{{blockObject.totalDifficulty}} T</span></td>
              </tr>
              <tr>
                <td align="right">区块奖励</td>
                <td><span class="reward">5 FDG</span></td>
              </tr>
<!--              <tr>-->
<!--                <td align="right">叔伯块奖励</td>-->
<!--                <td><span class="uncleReward">0</span></td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td align="right">父块哈希值</td>-->
<!--                <td><a class="parentHash" href="/blocks/0x141727c0863533b7f4168a6793586cf19a49d143c236e6fc69140f81e8ab76fd" target="_blank">0x141727c0863533b7f4168a6793586cf19a49d143c236e6fc69140f81e8ab76fd</a></td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td align="right">叔伯块哈希值</td>-->
<!--                <td><span class="sha3Uncles">0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347</span></td>-->
<!--              </tr>-->
              <tr>
                <td align="right">附加数据</td>
                <td><span class="extraData">{{blockObject.extraData}}</span></td>
              </tr>
<!--              <tr>-->
<!--                <td align="right">播报放</td>-->
<!--                <td><a class="miner" href="/accounts/0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c" target="_blank">0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c</a></td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td align="right">操作数</td>-->
<!--                <td><span class="nonce">0xb034869800509906</span></td>-->
<!--              </tr>-->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Api from '../api/index.js';
Vue.prototype.$api = Api;
export default {
  name: 'BlockInfo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      amount:0,
      block:'',
      blockObject:null
    }
  },
  created(){
    const block = this.$route.params && this.$route.params.block
    console.log(block+"---1123123---")
    this.block=block;
    this.getBlockInfo(block)
  },
  methods:{
    getBlockInfo(block){
      this.$api.get('/public/home/blockInfoBy', {blockNumber:block},response => {
        console.info(response.data.code+"---123123123--getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          //this.article=response.data.data;
          this.blockObject=response.data.data;
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    },
    getTxList(address){
      this.$api.get('/public/home/txList', {pageNo:1,size:20,address:address},response => {
        console.info(response.data.code+"---123123123--getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          //this.article=response.data.data;
          this.txList=response.data.data.result;
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    }


  }
}
</script>
<style  scoped >


@import '../assets/css/common.css';
@import '../assets/css/detail_tx.css';

</style>


