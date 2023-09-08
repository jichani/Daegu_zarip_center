function btn_sendMessage_counselor() {
  let name = document.getElementById('name').value;
  let tel = "01075400153";
  let templateId = "KA01TP230907043126398rad96zOaFkv";
  let pfid = "KA01PF22041206411o33TFWW9Sl71Ppp";

  let now = new Date();
  let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  let nowDate = now.toLocaleString(undefined, options);

  const text = document.getElementById("text").value;

  let link = "daegu-zarip-center.netlify.app";

  sendMessage_counselor(name, tel, pfid, templateId, nowDate, text, selectedValue, link);
}

function btn_sendMessage_customer() {
  let name = document.getElementById('name').value;
  let tel = document.getElementById('tel').value;
  let templateId = "KA01TP230907043423335DsEA22M5lVp";
  let pfid = "KA01PF22041206411o33TFWW9Sl71Ppp";

  sendMessage_customer(name, tel, pfid, templateId, selectedValue);
}

function getAuthorization() {
  let salt = getSalt();
  let date = getDate();
  let value = date + salt;
  let signature = getSignature(value, api_secret);
  let authoriztion = 'HMAC-SHA256 apiKey=' + api_key + ', date=' + date + ', salt=' + salt + ', signature=' + signature;
  return authoriztion;
}

function getSalt() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 30; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getDate() {
  let today = new Date();
  return today.toISOString();
}

function getSignature(value, key) {
  let signature = CryptoJS.HmacSHA256(value, key);
  return signature;
}

var request;

function getPlusfriend(pfid) {
  let url = 'https://api.solapi.com/kakao/v1/plus-friends/' + pfid;

  request = new XMLHttpRequest();

  if (!request) {
    alert('request create fail');
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open('GET', url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);
  request.send();
}

function getPlusfriends() {
  let url = 'https://api.solapi.com/kakao/v1/plus-friends';

  request = new XMLHttpRequest();

  if (!request) {
    alert('request create fail');
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open('GET', url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);
  request.send();
}

function getTemplate(templateId) {
  let url = 'https://api.solapi.com/kakao/v1/templates/' + templateId;

  request = new XMLHttpRequest();

  if (!request) {
    alert('request create fail');
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open('GET', url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);
  request.send();
}

function getTemplates() {
  let url = 'https://api.solapi.com/kakao/v1/templates';

  request = new XMLHttpRequest();

  if (!request) {
    alert('request create fail');
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open('GET', url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);
  request.send();
}

function sendMessage_counselor(name, tel, pfid, templateId, nowDate, text, selectedValue, link) {
  let url = 'https://api.solapi.com/messages/v4/send-many/detail';

  request = new XMLHttpRequest();

  if (!request) {
    alert('request create fail');
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open('POST', url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);

  var data = {
    "messages": [
      {
        "to": tel,
        "kakaoOptions": {
          "pfId": pfid,
          "templateId": templateId,
          "variables": {
            "#{시간}": nowDate + " ",
            "#{이름}": name,
            "#{신청버튼}": selectedValue,
            "#{문의사항}": text,
            "#{링크}": link,
          }
        }
      }
    ]
  };

  var message = JSON.stringify(data);

  request.send(message);
  return;
}

function sendMessage_customer(name, tel, pfid, templateId, selectedValue) {
  let url = 'https://api.solapi.com/messages/v4/send-many/detail';

  request = new XMLHttpRequest();

  if (!request) {
    alert('request create fail');
    return;
  }

  let authoriztion = getAuthorization();

  request.onreadystatechange = requestResult;
  request.open('POST', url);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", authoriztion);

  var data = {
    "messages": [
      {
        "to": tel,
        "kakaoOptions": {
          "pfId": pfid,
          "templateId": templateId,
          "variables": {
            "#{이름}": name,
            "#{신청버튼}": selectedValue,
          }
        }
      }
    ]
  };

  var message = JSON.stringify(data);

  request.send(message);
  return;
}

function requestResult() {
  if (request.readyState == XMLHttpRequest.DONE) {
    if (request.status === 200) {
      console.log("상담 신청이 완료되었습니다.");
    } else {
      console.log("상담 신청에 실패하였습니다. 다시 시도해주세요.");
    }
  }
};