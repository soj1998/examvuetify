<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-header
    sort-by="id"
    class="elevation-1"
    :items-per-page.sync="perpage"
    :page.sync="dqpage"
  >
    <template v-slot:top>
      <BreadcrumbsNav>
      </BreadcrumbsNav>
      <v-toolbar
        flat
      >
        <v-toolbar-title>文章内容</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:body>
      <v-card
        class="mx-auto"
      >
        <v-list three-line>
          <template v-for="(item, index) in mydesserts">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-html="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
            ></v-divider>

            <v-list-item
              v-else
              :key="item.ycid"
            >
              <v-list-item-content>
                <v-card-text class="text-start" v-html="item.xsid"></v-card-text>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </template>
    <template v-slot:no-data>
      暂无数据
    </template>
  </v-data-table>
</template>

<script>
import BreadcrumbsNav from '@/sloter/BreadcrumbsNav'
export default {
  name: 'ExamMx',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pagecontent: '',
      active: [],
      openids: [],
      shoucidian: false,
      desserts: [],
      mydesserts: [],
      dqpage: 1,
      perpage: 10,
      totalrecord: 1,
      szlist: [],
      pttimuzihao: 20,
      datimuzihao: 25,
      checkbox: -1,
      isMobile: false
    }
  },
  components: {
    BreadcrumbsNav
  },
  methods: {
    getPageContent (zhuanlanid, btid) {
      let that = this
      if (btid === -1) {
        this.$post('sys/zhuanlan/getzlbyid', {tid: zhuanlanid})
          .then(res => {
            that.pagecontent = []
            let neir = res
            let pcsz = []
            neir.forEach(element => {
              // console.log('2.' + element.hangshu + that.pagecontent + element.qbneirong)
              let json =
              {
                'hangshu': element.hangshu,
                'nr': element.zlduanluo,
                'biaoti': element.biaoti,
                'btid': element.btid,
                'lrsj': element.lrsj,
                'wzly': element.wzlaiyuan
              }
              pcsz.push(json)
            })
            pcsz.sort((n1, n2) => {
              return n1.hangshu - n2.hangshu
            })
            that.totalrecord = pcsz.length
            // console.log(pcsz)
            that.mydesserts = pcsz
            if (neir[0].wzlaiyuan !== null) {
              that.pagecontent = that.pagecontent + '<div class="text-h5" style="margin-top:20px;margin-bottom:20px">来源:  ' + neir[0].wzlaiyuan + '</div>'
            }
            if (that.$globalfunc.strNotNil(neir[0].zlxilie)) {
              that.pagecontent = that.pagecontent + '<div class="text-h5" style="margin-top:20px;">系列:  ' + neir[0].zlxilie + '</div>'
            }
            that.pagecontent = that.pagecontent + '<div class="text-h5" style="margin-top:20px;margin-bottom:20px">录入时间:  ' + that.$globalfunc.getZhiDingYYMMDD(new Date(neir[0].lrsj)) + '</div>'
            pcsz.forEach(e => {
              if (e.btid === -1) {
                e.nr = '<div class="text-h4 text-center">' +
                 e.biaoti + '</div>' +
                '<p style="text-indent: 2em;">' + e.nr + '</p>'
              } else {
                let snr = String(e.nr)
                if (snr.indexOf(':8080/houtai/image') >= 0) {
                  console.log(snr)
                  e.nr = '<img style="margin-left:40px;" src= "' + e.nr + '" />'
                } else {
                  e.nr = '<p style="text-indent: 2em;">' + e.nr + '</p>'
                }
              }
              that.pagecontent = that.pagecontent + e.nr
            })
            that.pagecontent = '<div class="text-body-1 text-start" style="margin-top: 10px">' + that.pagecontent + '</div>'
          })
          .catch(error => {
            console.log('error' + error)
          })
      }
    },
    listall (szid, biaoti) {
      // this.desserts.push({ header: '今日试题' })
      let that = this
      let data2 = {sid: szid, biaoti: biaoti}
      let psz = []
      psz.push({url: 'wbzt/getquanbuxitibyszidbiaoticount', data: data2})
      psz.push({url: 'wbzt/getquanbuxitibyszidbiaoti', data: data2})
      this.$postalldayu2(psz)
        .then(res => {
          that.totalrecord = res[0]
          let lb = res[1]
          let ind = 1
          let indda = 1
          let templx = null
          lb.forEach(e => {
            // let tmlx = that.zhuanhuan('tmlx', e.examtype)
            let xx = []
            let zihao = that.pttimuzihao
            let xxlai = e.xuanxiang
            let youxx1 = 'weizhi'
            let xxdaan = []
            let xxdaan2 = []
            if (xxlai !== undefined && xxlai !== null) {
              youxx1 = e.examtype
              xxlai.forEach(e => {
                let ae = that.zhuandaziti(e, zihao - 3)
                xx.push(ae)
                let ae2 = e.substr(0, 1)
                xxdaan.push(ae2)
                xxdaan2.push(false)
              })
            }
            // let xxg = xx.join('')
            if (templx == null) {
              templx = e.examtype
            } else {
              if (e.examtype !== templx) {
                templx = e.examtype
                indda++
              }
            }
            let ifshow1 = false
            if ((String)(e.jiexi).length > 0) {
              ifshow1 = true
            }
            let it = {dxh: indda, xxh: ind, ycid: e.id, leix: e.examtype, timu: that.zhuandaziti(e.que, zihao), youxx: youxx1, tmxuanx: xx, xzdaan: xxdaan, duoxuandaan: xxdaan2, daan: that.zhuandaziti('答案：' + e.ans, zihao), jiexi: that.zhuandaziti('解析：' + e.jiexi, zihao), ifshow: false, ifshow1: ifshow1}
            that.desserts.push(it)
            // that.desserts.push({ divider: true })
            ind++
          })
          if (that.mydesserts.length === 0) {
            console.log('当前为空 ' + that.perpage)
            let df = that.desserts
            let qidian = (that.dqpage - 1) * that.perpage
            let zhdian = that.dqpage * that.perpage
            for (let i = qidian; i < zhdian; i++) {
              let hed = that.zhuandaziti(that.zhuanhuan('datimu', df[i].dxh) + that.zhuanhuan('tmlx', df[i].leix), that.datimuzihao)
              if (i > qidian && i < zhdian) {
                let a = df[i - 1].leix
                let b = df[i].leix
                if (a !== b) {
                  that.mydesserts.push({ header: hed })
                  df[i].id = df[i].xxh - df[i - 1].xxh
                } else {
                  df[i].id = df[i - 1].id + 1
                }
              }
              if (i === qidian) {
                that.mydesserts.push({ header: hed })
                df[i].id = df[i].xxh
              }
              console.log('shouci塞几次 ' + i + ',qidian' + qidian + ',zhdian' + zhdian + ',ycid' + df[i].ycid)
              df[i].timu = '<span style= "font-size:20px; " >' + df[i].timu + '</span>'
              df[i].xsid = that.zhuandaziti(df[i].id, that.pttimuzihao) + '.' + df[i].timu
              df[i].yxid = i
              that.mydesserts.push(df[i])
              that.mydesserts.push({ divider: true })
            }
          }
        }).catch(err => {
          console.log(err)
        })
    },
    zhuandaziti (nr, zihao) {
      return '<span style= "font-size:' + zihao + 'px; " >' + nr + '</span>'
    },    
    toTop () {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      console.log('滚不滚' + top)
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    }    
  },
  watch: {
    dqpage (newValue, oldValue) {
      console.log('dqpage ' + newValue)
      this.mydesserts = []
      let df = this.desserts
      let qidian = (newValue - 1) * this.perpage
      let zhdian = newValue * this.perpage
      let that = this
      for (let i = qidian; i < zhdian; i++) {
        let hed = that.zhuandaziti(that.zhuanhuan('datimu', df[i].dxh) + that.zhuanhuan('tmlx', df[i].leix), that.datimuzihao)
        if (i > qidian && i < zhdian) {
          let a = df[i - 1].leix
          let b = df[i].leix
          if (a !== b) {
            that.mydesserts.push({ header: hed })
            df[i].id = df[i].xxh - df[i - 1].xxh
          } else {
            df[i].id = df[i - 1].id + 1
          }
        }
        if (i === qidian && qidian > 0) {
          that.mydesserts.push({ header: hed })
          df[i].id = df[qidian - 1].id + 1
        }
        console.log('perpage塞几次 ' + i + ',qidian' + qidian + ',zhdian' + zhdian)
        df[i].xsid = that.zhuandaziti(df[i].id, that.pttimuzihao)
        df[i].timu = '<span style= "font-size:20px; " >' + df[i].timu + '</span>'
        df[i].xsid = that.zhuandaziti(df[i].id, that.pttimuzihao) + '.' + df[i].timu
        df[i].yxid = i
        that.mydesserts.push(df[i])
        that.mydesserts.push({ divider: true })
      }
      that.toTop()
    },
    perpage (newValue, oldValue) {
      console.log('perpage ' + newValue)
    }
  },
  mounted () {
    let szid = this.$route.params.szid
    let biaoti = this.$route.params.biaoti
    this.isMobile = window.matchMedia('(max-width: 425px)').matches
    console.log(szid + '  ' + biaoti + ' ismobile' + this.isMobile)
    if (this.isMobile) {
      this.perpage = 1
    }
    //this.listall(szid, biaoti)
    if (this.$route.params.zlid === undefined) {
      console.log('router没有带过来')
      this.pagecontent = '非正常进入，没有内容要显示'
      return
    }
    let zlid = this.$route.params.xinxiyuanid
    let btid = this.$route.params.zlbtid
    this.getPageContent(zlid, btid)
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
[v-cloak] {
  display: none;
}
p {
  background-color: red;
}
.divmar {
  background-color: red;
}
#zzsdh-title-right {
  width: 5px;
  height: 23px;
  background: #AB0B22;
  display: inline-block;
  margin-top: 3px;
  vertical-align: top;
  margin-right: 10px;
}
</style>
