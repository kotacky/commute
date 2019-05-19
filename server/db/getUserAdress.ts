var { Client } = require('pg');
var fs = require('fs');

var client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432
})


client.connect()

const query = {
    name: 'fetch-sample',
    text: 'select mail_address1 from t_employee_datas where user_id = $1',
    values: ['0034']
}

client.query(query)
    .then(res => {
      console.log("DB_ACSESS_SUCSESS!!!")
      client.end()
      // 取得データ抽出
      var employeeDatas = []
      for (var i = 0 ; i < res.rowCount; i++) {
        var data = {
          "mailAdress": res.rows[i].mail_address1
        };
        employeeDatas.push(data);
      };
      console.log(employeeDatas);
      // JSONファイル作成
      fs.writeFile('./server/json/employee.json', JSON.stringify(employeeDatas, null), function(err, res) {
        if (err) {
          console.log(err)
        } else {
          console.log("CREATE_JSONFILE!!!")
        };
      });
    })
    .catch(e => console.error(e.stack))