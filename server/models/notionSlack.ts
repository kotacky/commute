// node_modulesのrequest-promise
const request = require('request-promise');
const _ = require('lodash');
let usersList;

// 定期券の期限が切れるユーザのメールアドレスのリスト。実際はDBから取得したファイルを読みこんだものを使う。
const expiredEmailAddressList = [
    's-sato@wiss1.co.jp'
]

request({
    url: 'https://slack.com/api/users.list',
    method: 'post',
    form: {
        token:'xoxp-25758874455-28594682354-639914877072-284746e2010d361acdfbdc7a7da2a3ac'
    }
    }, (error, response, body) => {
        // 実際に使う内容はbody。JSON形式にparseする。
        let jsonbody = JSON.parse(body);
        // 'members'の中身を使う
        usersList = jsonbody['members']
     })
// requestの結果を受けて処理をする
.then(function() {
    // 期限が切れたメールアドレスそれぞれについて、「expired」という変数を使って中身をループする
    expiredEmailAddressList.forEach(function(expired) {
        // lodashのfindメソッドで、APIを使用して取得したユーザのリストについて、メールアドレスがexpiredとマッチするユーザデータを探す
        let user = _.find(usersList, (user) => {
            return _.includes(user['profile'].email, expired);
        });
        // 通知用に、ユーザ名に@をつける
        user = '@' + user['name'];
        request({
            url: 'https://slack.com/api/chat.postMessage',
            method: 'POST',
            form: {
                token: 'xoxp-25758874455-28594682354-639914877072-284746e2010d361acdfbdc7a7da2a3ac',
                channel: user,
                text: 'テスト'
            }
            }, (error, response, body) => {
                console.log(response)
            }
        )        
    });
})

