export const validatePass = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('密码不能为空'));
  } else {
    callback(); // 一定要加 不加没发提交
  }
};