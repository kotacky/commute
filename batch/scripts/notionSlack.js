const request = require('request-promise');
const _ = require('lodash');
process.chdir(__dirname);
const fs =  require('fs');

// 定期券の期限が切れるユーザのメールアドレスのリスト。実際はDBから取得したファイルを読みこんだものを使う
const emailAddressJson = require('../output/employee.json');
const userToken = fs.readFileSync('../token.txt', 'utf-8');
const expiredEmailAddressList = emailAddressJson;

// ユーザーリストを取得するための設定
const users_list = function(userToken) {
  let ret = {
    uri: 'https://slack.com/api/users.list',
    method: 'GET',
    timeout: 30 * 1000,
    qs: {
      // なぜか改行コードが入るため削除する
      token: userToken.replace(/\r?\n/g, '')
    }
  }
  return ret;
};
// 対象ユーザーに通知するための設定
const chat_postMessage = function(userToken, user) {
  let ret = {
    url: 'https://slack.com/api/chat.postMessage',
    timeout: 30 * 1000,
    method: 'POST',
    form: {
      // なぜか改行コードが入るため削除する
      token: userToken.replace(/\r?\n/g, ''),
      channel: user,
      text: 'プロジェクトの終焉が近づいています。\n 総務部への定期券代の申請は済んでいますか。\n \n 以下のURLから定期券代の申請を行うか\nプロジェクト退出予定日を更新してください。\nhttps://xxxxx.xxxx.xxx/xxxxx'
    }
  };
  return ret;
};

request(users_list(userToken)).then(function(body) {
  console.log('【success】users.list');

  let jsonbody = JSON.parse(body);
  let usersList = jsonbody['members'];

  expiredEmailAddressList.forEach(function (expired) {
    // メールアドレスが空の場合、usersListの先頭に通知してしまうので、処理しないようにする
    if (!expired['mailAddress']) return;
    // 期限切れのユーザを探す
    let user = _.find(usersList, function (user) {
      return _.includes(user['profile'].email, expired['mailAddress']);
    });
    // ユーザーが存在しない場合、処理しないようにする
    if (!user) return;
    // 通知用に、ユーザ名に@をつける
    user = '@' + user['name'];

    request(chat_postMessage(userToken, user)).then(function(body) {
      console.log('【success】chat.postMessage');
      console.log(body);
    }).catch(function (err) {
      console.log('【fail】chat.postMessage');
      console.error(err);
    });

  });

}).catch(function (err) {
  console.log('【fail】users.list');
  console.error(err);
});

