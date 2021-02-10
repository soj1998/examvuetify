# examvuetify
exam vuetify

# 1.先搞github
``` 
  （1）github仓库，名字可以起与本地不一致，但建议起一致的名字。例子取名myrepo。
  （2）本地创建文件夹，取好名字（例子取名mycode），打开文件件，鼠标右键运行git bash。
  （3）运行命令：
	A.git init 
	B.git config --global user.name "myname" 
	C.git config --global user.email "myname@mymail.com" 
	D.ssh-keygen -t rsa -C "myname@mymail.com"，命令执行完毕会	生成一个名为id_rsa.pub的文件。
   （4）做好github的deploy设置。
	A.打开GitHub上的myrepo仓库，进入setting，设置deploy keys，将id_rsa.pub中的内容粘贴进去即可。
	title随便设置。
	B.git remote add mycode git@github.com:myname/myrepo.git。
	C.ssh -T git@github.com，提示输入yes，只输入y不行。 	
	D.先拽git pull examvuetify master，修改README.md，保存关闭。
	git add README.md
	git commit -m '1224'
	E.再推git push --force examvuetify master 
```
#  2.再搞vue
```
（1）运行vscode 打开terminal 运行命令 vue init webpack mycode1。	
（2）如果直接pull，要注意安装webpack3.6版本， npm install --save-dev webpack@3.6.0。
	先重新搞 .gitignore
	git rm -r --cached .
	git add .
	git commit -m 'update .gitignore'
	package-lock.json要记得加入到gitignore
（2）把mycode1文件加下内容，复制到上面git生成的文件夹mycode下，注意改名readme.md，让两个都保留。
（3）git add. 意思是将当前目录下的所有文件再add到index，git commit -m 'ddd'完成提交
（4）也可以用vscode带的工具，暂存提交，提交按钮上方输入message
（5）用git push --force mycode master 推送到github
```
# 3.搞vuetify
```
	（1）搞cdn模式 设置index.html
	安装vue，放到body最下方
	<script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>  
	安装vuetify.css 和字体
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  	（2）设置webpack external 打开build->webpack.base.conf.js
	在  
	  module.exports = {
		resolve 和 output之间
	下添加	
	externals : {
		'vue': 'Vue',
		'vuetify': "Vuetify"
	},
	设置完，运行npm run dev，没问题后继续。
	（2）增加新的routerview。
	复制hellowold.vue，改名content.vue,改template为
	<div>123</div>
	更改router index.js
	改变地址栏带有# 添加 mode: 'history',
	添加
	{
      path: '/1',
      name: 'Content',
      component: Content
    }
	path中一定要有'/'。搞完后运行npm run dev测试
	（3）增加vuetify	
	src下增加文件夹plugins,新建文件vuetify.js，内容为
	import Vue from 'vue'
	import Vuetify from 'vuetify'
	// import 'vuetify/dist/vuetify.min.css'
	Vue.use(Vuetify)
	const opts = {}
	export default new Vuetify(opts)
	在main.js导入
	import vuetify from '@/plugins/vuetify' // path to vuetify export
	改变Content。vue为
	<v-app><!-- 必须有app属性 --><v-app-bar app></v-app-bar>
	<v-main>
		Hello World
	</v-main>
	</v-app>
	搞完后运行npm run dev测试，看看有没有vuetify的效果
	（4）搞瘦身
	config文件夹下的index.js
	改productionSourceMap: true, 为false
	productionGzip: false, 为true
	安装特定版本npm install --save-dev compression-webpack-plugin@1.1.12
	搞完后运行npm run dev测试
	运行npm run build看看文件大小
	上述都搞完 就可以编程序啦 引入axios 搞跨域访问
```
# 4.搞axios
```
	(1)首先是引入<script src="https://unpkg.com/axios/dist/axios.min.js"></script>,
	webpack.base external 'axios': 'axios',
	(2)挂到vue原型上
	import axios from 'axios'//引入axios
	Vue.prototype.$axios = axios;//把axios挂载到vue上
	(3)vue method不加function，chrome console.lo有黄色的警告提示
	change: function () {
	(4)见文件夹api，新建axios.js，在里面引入axios，做好跨域的设置		

```
# 5.mock
```
	（1）设好mock cdn引入<script src="http://mockjs.com/dist/mock.js"></script>
	（2）搞好webpack external
```
# 6.搞vuetify 设置tree 和页面显示
```
	（1）vuetify颜色显示，在App.vue里面rooterview要用v-app包围
	（2）axios 发送object spring 后台用requestbody接收并处理对象 且一次只能处理一个对象
	（3）用requestbody的方式接受，前台以json方式发送对象，当有多个对象时，前台发送的是map格式，后台用map转json，然后json转类
```

# 7.运行网站
```
	npm run dev
```


	
