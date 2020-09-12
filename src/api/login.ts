import ajax from './ajax';
export const reqLogin = (loginForm: object) => ajax('/login', loginForm, 'POST');

