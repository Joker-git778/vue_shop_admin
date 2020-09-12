export const validatePass = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('密码不能为空'));
  } else {
    callback(); // 一定要加 不加没发提交
  }
};

// 验证邮箱规则
export const validateEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('邮箱不能为空'));
  } else {
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !regEmail.test(value) ? callback(new Error('邮箱格式不正确')) : callback();
  }
  
}

// 验证手机号
export const validateMobile = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('手机号不能为空'));
  }
  const regMobile = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
  return !regMobile.test(value) ? callback(new Error('手机格式不正确')) : callback();
}