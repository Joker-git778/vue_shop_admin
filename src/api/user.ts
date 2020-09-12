import ajax from './ajax';
// 获取用户列表
export const reqUserList = ({ query = '', pagenum = 1, pagesize = 1 }) => ajax('/users', { query, pagenum, pagesize });

export const reqUserState = ({ uId, type }: { uId: number, type: boolean }) => ajax(`/users/${uId}/state/${type}`, {}, 'PUT');

// 添加用户
export const reqAddUser = ({ username, password, email, mobile }: { username: string, password: string, email?: string, mobile?: string }) => ajax('/users', { username, password, email, mobile }, 'POST'); 

// 根据 ID 查询用户信息
export const reqUserById = (id: number) => ajax(`users/${id}`);

// 编辑用户提交
export const reqUserEdit = ({ id, email, mobile }: { id: number, email?: string, mobile?: string }) => ajax(`/users/${id}`, { email, mobile }, 'PUT');