import cloud from '@lafjs/cloud'
var fs = require("fs");

const TIKU_DB = "zz_tiku_test";

export async function main(ctx) {
  // body, query 为请求参数, auth 是授权对象
  const { auth, body, query } = ctx;
  const db = cloud.database()

  const _action = query?.action || "";

  switch (_action) {
    case "generate":
      const ti_num = query?.num || "1";
      var num = Number(ti_num);

      var tiDataFromDbList_generate = [];
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
        tiDataFromDbList_generate = tiDataFromDbList_generate.concat(tiDataFromDbList_some);
      }

      var tiku = []
      for (var i = 0; i < tiDataFromDbList_generate.length; i++) {
        const tiDataFromDb = tiDataFromDbList_generate[i];
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

  }

  return {
    action: _action,
    code: 404,
  }

}