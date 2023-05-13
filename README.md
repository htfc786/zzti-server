# zzti
帮政治老师开发的抽题系统

zzti 是我帮政治老师开发的抽题系统，可以在用户端随机抽题让学生默写、背诵等等，在管理端对题目进行增删改查等操做。

- 用户端：
1. 抽提，默写
2. 随机抽题的过程是完全在服务器上的，不用担心前端的干扰。
![用户端](https://raw.githubusercontent.com/htfc786/zzti/img/img/indeximg.jpg)

- 管理端：
1. 支持登录，只有管理员才可进入
2. 题目的增删改查功能完全
3. 增加题目支持从文件导入多题增加
4. 支持选择删除，删除更省事
5. 感觉这个项目发散一下可以在不改代码的情况下应用到大部分学科的教学之中，如：语文看音写词、随机抽取课文背诵等等（提示：本人是学生，在这方面没有话语权，好与坏不是我个人说了算的）
![管理端](https://raw.githubusercontent.com/htfc786/zzti/img/img/adminimg.jpg)
![功能](https://raw.githubusercontent.com/htfc786/zzti/img/img/adminimg2.jpg)

## 如何使用？
- 如何安装？[安装教程](INSTALLHELP.md)

## 软件架构
- 用户端：原生html
- 管理端：`Vue` + `ElementUI` + `Axios`
- 后端：[Laf云开发](http://laf.run/)

    为了方便我们政治老师部署，前端没有使用Vite等工具

Made by htfc786
