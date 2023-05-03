import cloud from '@lafjs/cloud'

const TIKU_DB = "zz_tiku";

export async function main(ctx) {
  // body, query 为请求参数, auth 是授权对象
  const { auth, body, query } = ctx;
  const db = cloud.database()

  const _action = query?.action || "";

  const access_token = body?.access_token || "";
  const user_info = cloud.parseToken(access_token);
  if (_action != "generate" && !user_info) {
    return { code: 401, msg: "请先登录！" };
  }

  switch (_action) {
    case "generate":
      const ti_num = query?.num || "1";
      var num = Number(ti_num);

      var tiDataFromDbList = [];
      //需要多少次
      var tiNumQuery = await db //解决数据库读取限制
        .collection(TIKU_DB)
        .count()
      var tinum = tiNumQuery?.total || 0;
      var alltipage = Math.ceil(tinum / 100);
      for (i = 0; i < alltipage; i++) {
        const tiDataQuery = await db
          .collection(TIKU_DB)
          .orderBy("_id", "asc")
          .skip(i * 100)
          .limit(100)
          .get()
        const tiDataFromDbList_some = tiDataQuery?.data || [];
        tiDataFromDbList = tiDataFromDbList.concat(tiDataFromDbList_some);
      }

      var tiku = []
      for (var i = 0; i < tiDataFromDbList.length; i++) {
        const tiDataFromDb = tiDataFromDbList[i];
        tiku.push(tiDataFromDb.ti);
      }
      if (ti_num == "all" || num >= tiku.length) {
        num = tiku.length;
      }
      var tidata = [];
      for (var i = 0; i < num; i++) {
        var random_index = Math.floor(Math.random() * tiku.length);
        var random_ti = tiku[random_index];
        tiku.splice(random_index, 1)
        tidata.push(random_ti)
      }
      return {
        action: _action,
        code: 200,
        data: {
          num: num,
          tidata: tidata,
        },
      }

    case "admin.get":
      var tiDataFromDbList = [];
      //需要多少次
      const tiDataNumQuery = await db //解决数据库读取限制
        .collection(TIKU_DB)
        .count()
      var tinum = tiDataNumQuery?.total || 0;
      var alltipage = Math.ceil(tinum / 100);
      for (i = 0; i < alltipage; i++) {
        const tiDataQuery = await db
          .collection(TIKU_DB)
          .orderBy("_id", "asc")
          .skip(i * 100)
          .limit(100)
          .get()
        const tiDataFromDbList_some = tiDataQuery?.data || [];
        tiDataFromDbList = tiDataFromDbList.concat(tiDataFromDbList_some);
      }
      var tiData = [];
      for (var i = 0; i < tiDataFromDbList.length; i++) {
        const tiDataFromDb = tiDataFromDbList[i];
        tiData.push({
          id: tiDataFromDb._id,
          ti: tiDataFromDb.ti,
        });
      }
      return {
        action: _action,
        code: 200,
        msg: "查询成功！",
        data: tiData,
      }
    case "admin.add":
      var add_tilist = body?.ti || [];
      if (typeof (add_tilist) == "string") {
        add_tilist = [add_tilist];
      }
      for (i = 0; i < add_tilist.length; i++) {
        var add_tilist_id = add_tilist[i];
        if (!add_tilist_id) { continue }
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
  }

  return {
    action: _action,
    code: 404,
  }

}