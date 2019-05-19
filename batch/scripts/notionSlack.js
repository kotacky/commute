// node_modulesのrequest-promise
var request = require('request-promise');
var _ = require('lodash');
var usersList;
// 定期券の期限が切れるユーザのメールアドレスのリスト。実際はDBから取得したファイルを読みこんだものを使う。
var expiredEmailAddressList = [
    's-sato@wiss1.co.jp'
];
request({
    url: 'https://slack.com/api/users.list',
    method: 'post',
    form: {
        token: ''
    }
}, function (error, response, body) {
    // 実際に使う内容はbody。JSON形式にparseする。
    var jsonbody = JSON.parse(body);
    // 'members'の中身を使う
    usersList = jsonbody['members'];
})
    // requestの結果を受けて処理をする
    .then(function () {
    // 期限が切れたメールアドレスそれぞれについて、「expired」という変数を使って中身をループする
    expiredEmailAddressList.forEach(function (expired) {
        // lodashのfindメソッドで、APIを使用して取得したユーザのリストについて、メールアドレスがexpiredとマッチするユーザデータを探す
        var user = _.find(usersList, function (user) {
            return _.includes(user['profile'].email, expired);
        });
        // 通知用に、ユーザ名に@をつける
        user = '@' + user['name'];
        request({
            url: 'https://slack.com/api/chat.postMessage',
            method: 'POST',
            form: {
                token: '',
                channel: user,
                text: 'テスト'
            }
        }, function (error, response, body) {
            console.log(response);
        });
    });
});
//# sourceMappingURL=notionSlack.js.map