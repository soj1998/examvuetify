<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-header
    class="elevation-1"
    :items-per-page.sync="perpage"
    :page.sync="dqpage"
  >
  <template v-slot:body>
    <v-card
      v-model="page"
      class="mx-auto"
    >
      <v-list three-line>
        <template v-for="(item, index) in mydesserts">
          <v-list-item :key="index">
            <v-list-item-content>
              <v-card-text class="text-start" v-html="item.nr"></v-card-text>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    name: 'ShouYe',
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'nr'
      }
    ],
    mydesserts: [],
    desserts: [],
    dqpage: 1,
    perpage: 10,
    totalrecord: 1,
    isMobile: false
  }),
  watch: {
    dqpage (newValue, oldValue) {
      console.log('dqpage ' + newValue)
      this.mydesserts = []
      let df = this.desserts
      let qidian = (newValue - 1) * this.perpage
      let zhdian = newValue * this.perpage
      let that = this
      for (let i = qidian; i < zhdian; i++) {
        that.mydesserts.push(df[i])
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
      this.perpage = 2
    }
    // this.listall(szid, biaoti)
    if (this.$route.params.zlid === undefined) {
      console.log('router没有带过来')
      this.pagecontent = '非正常进入，没有内容要显示'
      // return
    }
    let zlid = 4027 // this.$route.params.xinxiyuanid
    let btid = -1 // this.$route.params.zlbtid
    this.getPageContent(zlid, btid)
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
            pcsz.forEach(e => {
              if (e.btid === -1) {
                e.nr = '<div class="text-h4 text-center">' +
                e.biaoti + '</div>' +
                '<p style="text-indent: 2em;" class="text-h6 text-start">' + e.nr + '</p>'
              } else {
                let snr = String(e.nr)
                if (snr.indexOf(':8080/houtai/image') >= 0) {
                  console.log(snr)
                  e.nr = '<img style="margin-left:40px;" src= "' + e.nr + '" />'
                } else {
                  e.nr = '<p style="text-indent: 2em;" class="text-h6 text-start">' + e.nr + '</p>'
                }
              }
              that.desserts.push(e)
            })
            for (let i = 0; i < that.perpage; i++) {
              that.mydesserts.push(that.desserts[i])
            }
          })
          .catch(error => {
            console.log('error' + error)
          })
      }
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
#upload {
  height: 0;
  width: 0;
  visibility: hidden;
}
</style>
