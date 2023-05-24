import cloud from '@lafjs/cloud'
import { createHash } from "crypto";
var fs = require("fs");

const CANREGISTER = false;
const USERS_DB = "users";
const TIKU_DB = "zz_tiku_test";
const PAGESIZE = 10;

export async function main(ctx) {
  // body, query 为请求参数, auth 是授权对象
  const { auth, body, query } = ctx;
  const db = cloud.database()

  const _action = query?.action || "";

  const access_token = body?.access_token || "";
  const user_info = cloud.parseToken(access_token);
  if (_action != "login" && _action != "register" && !user_info) {
    return { code: 401, msg: "请先登录！" };
  }

  switch (_action) {
    case "admin.get":
      const page = body?.page || 1;
      //需要多少次
      const tiDataNumQuery = await db //解决数据库读取限制
        .collection(TIKU_DB)
        .count()
      var tinum = tiDataNumQuery?.total || 0;
      var pageNum = Math.ceil(tinum / PAGESIZE);
      //查询
      const tiDataQuery = await db
        .collection(TIKU_DB)
        .orderBy("_id", "asc")
        .skip((page - 1) * PAGESIZE)
        .limit(PAGESIZE)
        .get()
      const tiDataFromDbList = tiDataQuery?.data || [];
      var tiData = [];
      for (var i = 0; i < tiDataFromDbList.length; i++) {
        const tiDataFromDb = tiDataFromDbList[i];
        var index = ((page - 1) * PAGESIZE) + (i + 1);
        tiData.push({
          index: index,
          id: tiDataFromDb._id,
          ti: tiDataFromDb.ti,
        });
      }
      return {
        action: _action,
        code: 200,
        msg: "查询成功！",
        data: tiData,
        pageNum: pageNum,
      }
    case "admin.add":
      var isDelSame = body?.isDelSame || "false"
      var add_tilist = body?.ti || [];
      if (typeof (add_tilist) == "string") {
        add_tilist = [add_tilist];
      }
      for (i = 0; i < add_tilist.length; i++) {
        var add_tilist_id = add_tilist[i];
        if (!add_tilist_id) { continue } //空字符串
        //去重
        if (isDelSame == "true") {
          var tiCount = await db
            .collection(TIKU_DB)
            .where({ ti: add_tilist_id })
            .count();
          if (tiCount.total != 0) { continue }
        }
        //插入
        await db
          .collection(TIKU_DB)
          .add({
            ti: add_tilist_id
          });
      }
      return {
        action: _action,
        code: 200,
        msg: "添加成功！"
      }
    case "admin.add_file":
      var isDelSame = body?.isDelSame || "false";
      //获取上传文件的对象
      var data = await fs.readFileSync(ctx.files[0].path);

      try {
        var add_list = data.toString().split("\n");
        add_list.forEach((item, index) => { if (!item) { data.splice(index, 1); } })
      } catch (err) {
        return {
          action: _action,
          code: 400,
          msg: "请上传正确格式的文件！",
        }
      }

      for (i = 0; i < add_list.length; i++) {
        var add_tilist_id = add_list[i];
        if (!add_tilist_id) { continue } //空字符串
        //去重
        if (isDelSame == "true") {
          var tiCount = await db
            .collection(TIKU_DB)
            .where({ ti: add_tilist_id })
            .count();
          if (tiCount.total != 0) { continue }
        }
        //插入
        await db
          .collection(TIKU_DB)
          .add({
            ti: add_tilist_id
          });
      }
      return {
        action: _action,
        code: 200,
        msg: "添加成功！"
      }
    case "admin.remove":
      var remove_idlist = body?.id || [];
      if (typeof (remove_idlist) == "string") {
        remove_idlist = [remove_idlist];
      }
      for (i = 0; i < remove_idlist.length; i++) {
        var remove_idlist_id = remove_idlist[i];
        await db
          .collection(TIKU_DB)
          .where({ _id: remove_idlist_id })
          .remove()
      }
      return {
        action: _action,
        code: 200,
        msg: "删除成功！"
      }
    case "admin.edit":
      const edit_id = body?.id || "";
      const edit_ti = body?.ti || "";
      await db
        .collection(TIKU_DB)
        .where({ _id: edit_id })
        .update({ ti: edit_ti })

      return {
        action: _action,
        code: 200,
        msg: "修改成功！"
      }

    case "login": //登录
      // 获取密码，没有为空
      var username = body?.username || "";
      var password = body?.password || "";

      // 数据库操作
      //查询数据库
      var res = await db
        .collection(USERS_DB)
        .where({
          username: username,
          password: createHash("sha256").update(password).digest("hex"),
        })
        .getOne();

      if (!res.data) return { code: 400, error: "用户名或密码错误" };

      // 生成jwt
      const user_id = res.data._id;
      const access_token = cloud.getToken({
        uid: user_id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      });

      //返回userid和jwt
      return {
        action: _action,
        code: 200,
        msg: "登录成功",
        user_id: user_id,
        access_token: access_token,
      }
    case "register": //注册
      if (!CANREGISTER) {
        return { code: 400, error: "当前页面禁止注册！请去 zzadmin 云函数将开头的 CANREGISTER 的值改为 true 后再次尝试" };
      }
      // 获取密码，没有为空
      var username = body?.username || "";
      var password = body?.password || "";
      var confirm = body?.confirm || "";

      //判断两个密码是否相等
      if (password !== confirm) return { code: 400, error: "两次输入的密码不一样" };

      //判断是否符合标准空
      if (!/[a-zA-Z0-9]{3,16}/.test(username)) return { code: 400, error: "用户名不符合要求" };
      if (!/[a-zA-Z0-9]{3,16}/.test(password)) return { code: 400, error: "密码不符合要求" };

      // 数据库操作
      // 是否已有此用户
      var exists = await db
        .collection(USERS_DB)
        .where({ username: username })
        .count();
      if (exists.total > 0) return { code: 400, error: "数据库里已经有此用户了" };

      // 在数据库里保存
      // 添加用户
      var { id } = await db.collection(USERS_DB).add({
        username: username,
        password: createHash("sha256").update(password).digest("hex"),
        created_at: new Date(),
        is_admin: false
      });

      console.log("又有一个新的用户注册成功了, user_id: ", id);

      return { code: 200, msg: "注册成功", user_id: id }
  }

  return {
    action: _action,
    code: 404,
  }

}