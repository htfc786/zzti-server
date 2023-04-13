import cloud from '@lafjs/cloud'

const TIKU_DB = "zz_tiku";

export async function main(ctx: FunctionContext) {
  // body, query 为请求参数, auth 是授权对象
  const { auth, body, query } = ctx;
  const db = cloud.database()

  const _action = query?.action || "";
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
        .orderBy("_id", "desc")
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
      const ti = query?.ti || "";
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
      return {
        action: _action,
        code: 200,
      }
    case "admin.remove":
      return {
        action: _action,
        code: 200,
      }
    case "admin.change":
      return {
        action: _action,
        code: 200,
      }
  }

  return {
    action: _action,
    code: 404,
  }

}
