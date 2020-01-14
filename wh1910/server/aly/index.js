const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: 'LTAI4FfnrTMaZeTUCmpcPaVf',
  accessKeySecret: '5TxxShFcSlLcf3loxJuq01axQHRri3',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

exports.sendCode=function(tel,code){
var params = {
  "RegionId": "cn-hangzhou",
  "PhoneNumbers": tel,
  "SignName": "小恒之家",
  "TemplateCode": "SMS_181660065",
  "TemplateParam":'{code:'+code+'}'
};
var requestOption = {
  method: 'POST'
};
return client.request('SendSms', params, requestOption)
}




