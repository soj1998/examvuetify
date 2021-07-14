<template>
  <v-container class="grey lighten-5">
    <BreadcrumbsNav>
    </BreadcrumbsNav>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="10"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
        <div class="text-left teal cyan lighten-5"  v-cloak>
          <div v-html="pagecontent"></div>
        </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BreadcrumbsNav from '@/sloter/BreadcrumbsNav'
export default {
  name: 'ZhuanLanMx',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pagecontent: '',
      active: [],
      openids: [],
      shoucidian: false,
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar' },
            { id: 3, name: 'Chrome' },
            { id: 4, name: 'Webstorm' }
          ]
        }
      ],
      item: {
        text: 'Dashboard1',
        disabled: false,
        href: 'breadcrumbs_dashboard'
      },
      t_items: [],
      active2: [],
      gotop: false, // 判断是否应该上滚
      atcid: 1,
      ymszmc: ''
    }
  },
  components: {
    BreadcrumbsNav
  },
  methods: {
    getPageContent (zhuanlanid, btid) {
      console.log('1 zhuanlanid. ' + zhuanlanid + ',2 btid. ' + btid)
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
      if (btid === -100) {
        this.$post('sys/zhuanlan/getzlztbyid', {tid: zhuanlanid})
          .then(res => {
            let neir = res
            that.pagecontent = ''
            if (neir.wzlaiyuan !== null) {
              that.pagecontent = that.pagecontent + '<div class="text-h5" style="margin-top:20px;margin-bottom:20px">来源:  ' + neir.wzlaiyuan + '</div>'
            }
            if (that.$globalfunc.strNotNil(neir.zlxilie)) {
              that.pagecontent = that.pagecontent + '<div class="text-h5" style="margin-top:20px;">系列:  ' + neir.zlxilie + '</div>'
            }
            that.pagecontent = that.pagecontent + '<div class="text-h5" style="margin-top:20px;margin-bottom:20px">录入时间:  ' + that.$globalfunc.getZhiDingYYMMDD(new Date(neir.lrsj)) + '</div>'
            that.pagecontent = that.pagecontent + '<div class="text-h5" style="margin-top:20px;margin-left:120px;">' + neir.biaoti + '</div>'
            that.pagecontent = that.pagecontent + '<div class="text-body-1" style="margin-top:20px;margin-bottom:20px;">' + neir.zlzhengge + '</div>'
            that.pagecontent = '<div class="text-body-1 text-start" style="margin-top: 10px">' + that.pagecontent + '</div>'
          })
          .catch(error => {
            console.log('error' + error)
          })
      }
    },
    test () {
      console.log('error')
    }
  },

  mounted () {
    console.log('赋予初始值zlmx')
    if (this.$route.params.xinxiyuanid === undefined) {
      console.log('router没有带过来')
      this.pagecontent = '非正常进入，没有内容要显示'
      return
    }
    let zlid = this.$route.params.xinxiyuanid
    let btid = this.$route.params.zlbtid
    btid = -1
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
  text-indent: 2em; /*em是相对单位，2em即现在一个字大小的两倍*/
}
#divmar {
  color: red;
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
.tiltemargin {
  margin: 140px;
  color: red;
}
</style>
