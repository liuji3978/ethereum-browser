<template>
  <div v-if="totalPage>1">

    <ul >
      <li class="prev" :class="{'disabled':currentPage<=1}" @click="currentPage<=1?'':turn(currentPage-1)">
        <a>上一页</a>
      </li>

      <li><span>当前页：{{currentPage}}</span></li>

      <li v-for="i in showPageBtn" class="num" :class="{'active':i==currentPage}"  v-if="i>0" @click="turn(i)">
        <a :data-page="i">{{i}}</a>
      </li>
 <!--      <li><a href="javascript:;" data-page="3">3</a></li>-->
<!--      <li><a href="javascript:;" data-page="4">4</a></li>-->
<!--      <li><a href="javascript:;" data-page="5">5</a></li>-->
      <li class="next-page"><a href="javascript:;" :data-page="currentPage+1" @click="turn(currentPage+1)">下一页</a></li>
    </ul>


  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    currentPage: {
      //当前页
      type: Number,
      default: 1
    },
    limit: {
      //每页显示条数
      type: Number,
      default: 10
    },
    totalCount: {
      //总条数
      type: Number,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    all: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      goPage: "",
      limitNum: "",
      limitNums: [5, 10, 15, 20, 25, 30],
      toPrev: false,
      toNext: false
    };
  },
  created: function() {
    this.initLimitNums();
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalCount / this.limit);
    },
    showPageBtn() {
      let pageNum = Number(this.totalPage),
          index = Number(this.currentPage),
          arr = [];
      if (pageNum <= 9) {
        for (let i = 1; i <= pageNum; i++) {
          arr.push(i);
        }
        return arr;
      }
      if (index < 5) return [1, 2, 3, 4, 5, 6, 7, "+", pageNum];
      if (index >= pageNum - 1)
        return [
          1,
          2,
          "-",
          pageNum - 5,
          pageNum - 4,
          pageNum - 3,
          pageNum - 2,
          pageNum - 1,
          pageNum
        ];
      if (index === pageNum - 2)
        return [
          1,
          2,
          "-",
          pageNum - 5,
          pageNum - 4,
          pageNum - 3,
          pageNum - 2,
          pageNum - 1,
          pageNum
        ];
      return [
        1,
        "-",
        index - 2,
        index - 1,
        index,
        index + 1,
        index + 2,
        "+",
        pageNum
      ];
    }
  },
  methods: {
    initLimitNums() {
      this.limitNum = this.limit;
      //if (this.limitNums.indexOf(this.limit) == -1) {
      if (!this.limitNums.includes(this.limit)) {
        this.limitNums.push(this.limit);
        this.limitNums.sort(function(a, b) {
          return a - b;
        });
      }
    },
    //翻页，显示条数变化
    turn(page) {
      let i = parseInt(Number(page));
      if (i < 1) {
        i = 1;
      } else if (i > this.totalPage) {
        i = this.totalPage;
      }
      if (this.limitNum !== this.limit && this.limitNum !== "") {
        //每页显示条数改变
        let pages = Math.ceil(this.totalCount / this.limitNum);
        if (page > pages) {
          i = pages;
        }
        this.$emit("update:limit", this.limitNum);
      }
      this.$emit("update:currentPage", i);
      this.$emit("turn");
    }
  }
};
</script>
<style scoped>
@import "../assets/css/common.css";
@import "../assets/css/block-index.css";
</style>
