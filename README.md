# examvuetify
exam vuetify


1.先搞github
（1）github仓库，名字可以起与本地不一致，但建议起一致的名字。例子取名myrepo。
（2）本地创建文件夹，取好名字（例子取名mycode），打开文件件，鼠标右键运行git bash。
（3）运行命令：
	A.git init
	B.git config --global user.name "myname"
	C.git config --global user.email "myname@mymail.com"
	D.ssh-keygen -t rsa -C "myname@mymail.com"，命令执行完毕会	生成一个名为id_rsa.pub的文件。
	E.打开GitHub上的myrepo仓库，进入setting，设置deploy keys，将		id_rsa.pub中的内容粘贴进去即可。title随便设置。
	F.git remote add mycode git@github.com:myname/myrepo.git。
	G.ssh -T git@github.com，提示输入yes，只输入y不行。
	H.先拽git pull mycode master，
	再推git push --force mycode master
2.再搞vue
（1）
