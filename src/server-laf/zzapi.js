import cloud from '@lafjs/cloud'

const TIKU_DB = "zz_tiku";

export async function main(ctx) {
  // body, query 为请求参数, auth 是授权对象
  const { auth, body, query } = ctx;
  const db = cloud.database()

  const _action = query?.action || "";

  const access_token = body?.access_token || "";
  const user_info = cloud.parseToken(access_token);
  if (_action!="generate" && !user_info) {
    return { code: 401, msg: "请先登录！" };
  }

  switch (_action) {
    case "generate":
      const ti_num = query?.num || "1";
      var num = Number(ti_num);

      const generate_tiDataQuery = await db
        .collection(TIKU_DB)
        .orderBy("_id", "desc")
        .get();
      console.log(generate_tiDataQuery)
      const generate_tiData = generate_tiDataQuery?.data || [];
      
      var tiku = []
      for (var i = 0; i < generate_tiData.length; i++) {
        const tiDataFromDb = generate_tiData[i];
        tiku.push(tiDataFromDb.ti);
      }
      if(ti_num=="all" || num>=tiku.length){
        num = tiku.length;
      }
      var tidata = [];
      for (var i=0;i<num;i++){
        var random_index = Math.floor(Math.random()*tiku.length);
        var random_ti = tiku[random_index];
        tiku.splice(random_index,1)
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
      const tiDataQuery = await db
        .collection(TIKU_DB)
        .orderBy("_id", "asc")
        .get();
      const tiDataFromDbList = tiDataQuery?.data || [];
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
      const ti = body?.ti || "";
      if (!ti){
        return {
          action: _action,
          code: 400,
          msg: "请传入正确的参数！"
        }
      }
      const { id } = await db
      .collection(TIKU_DB)
      .add({
        ti: ti
      });
      return {
        action: _action,
        code: 200,
        msg: "添加成功！"
      }
    
    case "admin.addlist":
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
      const remove_id = body?.id || "";
      await db
        .collection(TIKU_DB)
        .where({ _id: remove_id })
        .remove()

      return {
        action: _action,
        code: 200,
        msg: "删除成功！"
      }
    case "admin.removelist":
      var remove_idlist = body?.id || [];
      if (typeof (remove_idlist)=="string"){
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