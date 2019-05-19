var postgres = require('../db/postgresConnection');
var fs = require('fs');
postgres.connect();
var getMailAddressQuery = {
    name: 'fetch-sample',
    text: 'select mail_address1 from t_employee_datas where project_end_date - 14 <= current_date',
};
postgres.query(getMailAddressQuery)
    .then(function (res) {
    console.log("DB_ACSESS_SUCSESS!!!");
    postgres.end();
    // 取得データ抽出
    var employeeDatas = [];
    for (var i = 0; i < res.rowCount; i++) {
        var data = {
            "mailAddress": res.rows[i].mail_address1
        };
        employeeDatas.push(data);
    }
    ;
    console.log(employeeDatas);
    // JSONファイル作成
    fs.writeFile('../output/employee.json', JSON.stringify(employeeDatas, null), function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("CREATE_JSONFILE!!!");
        }
        ;
    });
})
    .catch(function (e) { return console.error(e.stack); });
//# sourceMappingURL=getEmailAddress.js.map