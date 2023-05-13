# 安装说明

如出现图片打不开的情况请访问：
[Github](https://github.com/htfc786/zzti/blob/img/INSTALLHELP.md)
[Gitee(在中国会快)](https://gitee.com/htfc786/zzti/blob/img/INSTALLHELP.md)

提示：因为是帮政治老师开发的抽题系统，为防止老师不会用，安装文档会写的详细亿点点。

#### 注册云开发，创建应用
1. 打开打开云开发官网： `Laf云开发官网` ： http://laf.run/
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp1.png)

2. 进入登录：点击“立即体验”
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp2.png)

3. 登录&注册：进入登录页面，可以直接用手机号登录
- 提示：如果您没有账号会自动注册
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp3.png)

4. 新建项目：登录进去后，点击“新建”
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp4.png)

5. 新建项目：来到新建页面，填写应用名称，选择应用规格（一般免费就行），然后点击创建
- 注意：一个账号只能创建一个免费应用！
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp5.png)

6. 等待启动：等待新创建的项目的状态这里显示"Started"之后，点击“开发”按钮
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp6.png)

7. 进入开发：之后会进入这样的一个开发页面
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp7.png)

#### 下载源码
8. 打开仓库：用浏览器打开这个项目的GitHub地址 https://github.com/htfc786/zzti
- 提示： 这个网站有时候会非常慢，甚至打不开，如果打不开，可以访问码云上的仓库( https://gitee.com/htfc786/zzti )，就是有时候更新会不及时，其他操做步骤和下面说的类似（除了下载源码需要登录）
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp8.png)

9. 下载源码：点击右上角绿色的“Code”按钮，然后点击"Download ZIP"下载源码
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp9.png)

10. 打开下载的压缩包，解压
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp10.png)

#### 后端上线

11. 打开解压的文件夹，打开"src"文件夹，然后打开“server-laf”文件夹
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp11.png)

12. 回到刚才的页面，点击左上角的加号，新建函数
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp12.png)

13. 点击新建云函数的按钮，新建三个函数，分别是`login` `register` `zzapi`（见下面3张图）
- `login`
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp13-1.png)
- `register`
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp13-2.png)
- `zzapi`
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp13-3.png)

14. 向云函数里粘贴代码（login为例）
- 用记事本打开云函数对应的代码文件（与云函数名相同）
- 复制代码，替换掉云函数里原有的代码
- 然后点击“发布”
- 如果出现第2张图的弹框，点击“确认发布”
- 等待出现提示，小红点消失即发布成功
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp14-1.png)
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp14-2.png)
- 其他的函数也像这样操作

（这样我们就成功的上线了一个网站的后端，在云计算下搭建一个网站是不是没有想象中的那么难，对的，就是没有想象中的那么难！）

#### 上线前端

15. 替换后端调用地址
    - 用户端 
    1. 再次打开刚才的云函数页面，复制`zzapi`函数的调用地址
    ![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp15-1-1.png)
    2. 找到`web`文件夹里的`index.html`，用记事本打开它
    ![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp15-1-2.png)
    3. 找到`var APIURL = "https://axskyv.laf.run/zzapi?action=generate"`这一行代码，把图中标蓝色部分的地址替换成`复制下来`的地址，保存文件
    - 注意：一点要写你自己的地址，不要写我的
    ![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp15-1-3.png)
    ![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp15-1-4.png)
    - 管理端
    1. 再次打开刚才的云函数页面，复制`zzapi``login`函数的调用地址(图参考上面的)
    2. 进入`web`文件夹里的`admin`文件夹里的`index.html`，用记事本打开它
    2. 找到`axios.defaults.baseURL = 'https://axskyv.laf.run/zzapi';`这一行代码，把地址替换成`复制下来`的`zzapi`函数的调用地址
    3. 找到`const LOGINURL = "https://axskyv.laf.run/login";`这一行代码，把地址替换成`复制下来`的`login`函数的调用地址，保存文件
    - 注意：一点要写你自己的地址，不要写我的
    ![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp15-2-1.png)
    ![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp15-2-2.png)

16. 再次回到刚才的网站，选择`存储`选项，点击左上角的加号
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp16.png)

17. 弹出的页面里，名称随便，权限一定要选择`公共读`，然后点确定，创建
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp17.png)

18. 在创建的文件桶里，点击上方的`上传`按钮，在弹出的框里选择上传的文件，进行上传
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp18.png) 
- 您可以新建一个`admin`文件夹，点进去之后，上传管理端网页文件(本地admin文件夹里的文件)
- 当然，您也可以选择不上传，直接在本地打开管理端的html网页，也可进行管理

19. 点击右上角`开启网站托管`按钮
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp19.png)

20. 复制自动生成的地址到浏览器里，即可查看网页的效果
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp20.png)

（现在我们基本上也算成功的上线了一个网站了，是不是比你想象的方便多了呢？）

（所以要感谢科技的进步，感谢网络的发达，感谢云服务技术，感谢serverless技术，感谢laf项目，能有这些成就，都是因为中国共产党的正确领导，历史证明只有中国共产党才能救中国，所以要坚持中国共产党领导！[doge]）

- 如果你按我上传的地址进行上传，访问路径将如下：
    - 用户端访问地址：自动生成的域名
    - 管理端访问地址：自动生成的域名/admin/index.html


#### 注册管理员账户
- 当我们现在打开后台会发现他要求登录，可是我们并没有账号啊
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp21-1.png)

- 本项目没有设计注册页面，所以请到后台来注册

1. 再次回到刚才的页面，点击左侧`函数`
2. 在左侧函数列表，选择 `register` 云函数
3. 找到右侧的接口调试
4. 下方请求方法选择 `POST`，下面选 `Body`，在下面选项选择 `from data`
5. 看到底下的列表后，点击 `添加` 按钮，直到上面列表变成三行
6. 在列表左侧参数名，分别填入`username` `password` `confirm` ，右侧下拉框全部选择 `text` 选项
7. 右侧值一栏，填入`用户名` `密码` `确认密码` 具体如下图所示
    - 注意，用户名，密码，确认密码不能为空，不能为中文，密码和确认密码保持一致
8. 点击请求方法旁边的`运行`按钮
9. 看到下方运行结果显示`注册成功`即成功
10. 如您以后不需要注册功能，为避免函数被别人访问而被v注册，可以在左侧函数列表把`register`函数删掉
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp21-2.png)

- 然后在回到刚才的页面登录一下就行了

#### 注意
1. 免费版会根据云平台资源负载情况，不定期停止应用实例，如果出现下图表示应用被停止了
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/serverstop.png)
- 如出现这种情况，可以在`我的应用`页面手动启动
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/startserver.png)


2. 免费版需在到期前2天在`我的应用`页面点击`续期`按钮进行续期，不然到期会自动删除的，请注意一下
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp22-1.png)
![](https://raw.githubusercontent.com/htfc786/zzti/img/img/installhelp22-2.png)
