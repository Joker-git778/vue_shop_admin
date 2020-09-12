<template>
  <div class="Users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索 添加 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            clearable
            placeholder="请输入内容"
            v-model="searchInfo.query"
            @clear="getUserList(searchInfo)"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList(searchInfo)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>

          <!-- 添加用户对话框 -->
          <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%">
            <!-- 内容主体区域 -->
            <el-form
              :model="addForm"
              :rules="addFormRules"
              ref="addFormRef"
              label-width="70px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="addForm.password"></el-input>
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email"></el-input>
              </el-form-item>

              <el-form-item label="手机" prop="mobile">
                <el-input v-model="addForm.mobile"></el-input>
              </el-form-item>
            </el-form>

            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
              <el-button @click="resetForm">取 消</el-button>
              <el-button type="primary" @click="submitForm">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList.users" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="handleUserSate(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="175px">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.row.id)"
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserbyId(scope.row.id)"></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchInfo.pagenum"
        :page-sizes="[1, 10, 20, 30]"
        :page-size="searchInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userList.total"
      ></el-pagination>
    </el-card>

    <!-- 编辑用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="edutDialogClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { nextTick } from "vue/types/umd";
import { namespace } from "vuex-class";
import { validateEmail, validateMobile } from "../utils/validate";
import { reqAddUser, reqUserById, reqUserEdit } from "../api/user";

const userStore = namespace("user");

@Component
export default class Users extends Vue {
  @userStore.State((state) => state.userList) userList: any;
  @userStore.State((state) => state.userList.total) total: any;
  @userStore.Action("getUserList") getUserList: any;
  @userStore.Action("getUserState") getUserState: any;

  // 编辑用户对话框
  private editDialogVisible = false;

  // 搜索参数
  private searchInfo = {
    query: "",
    pagenum: 1, // 当前页数
    pagesize: 1, // 每页显示多少条
  };

  // 对话框显示隐藏
  private addDialogVisible = false;

  // 添加用户数据
  private addForm = {
    username: '',
    password: '',
    email: '',
    mobile: ''
  }

  // 修改信息校验规则
  private editFormRules = {
    email: [
      { validator: validateEmail, trigger: 'blur' }
    ],
    mobile: [
      { validator: validateMobile, trigger: 'blur' }
    ]
  }

  // 编辑用户数据
  private editForm = {};

  // 表单验证规则对象
  private addFormRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
    ],
    email: [
      { validator: validateEmail, trigger: 'blur' }
    ],
    mobile: [
      { validator: validateMobile, trigger: 'blur' }
    ]
  }

  private mounted() {
    this.getUserList(this.searchInfo);
  }

  // 监听每页显示数量
  private handleSizeChange(pageSize: number) {
    // console.log(`每页 ${pageSize} 条`);
    this.searchInfo.pagesize = pageSize;
    this.getUserList(this.searchInfo);
  }

  // 页码改变时触发
  private handleCurrentChange(pageNum: number) {
    // console.log(`当前页: ${pageName}`);
    this.searchInfo.pagenum = pageNum;
    console.log(this.searchInfo)
    this.getUserList(this.searchInfo);
  }

  // 监听开关状态
  private handleUserSate(userInfo: any) {
    this.getUserState({ uId: userInfo.id, type: userInfo.mg_state });
  }
  
  // 对话框关闭 重置表单
  private resetForm() {
    const ref: any = this.$refs.addFormRef;
    ref.resetFields();
    this.addDialogVisible = false;
  }

  private submitForm() {
    const ref: any = this.$refs.addFormRef;
    ref.validate(async (valid: boolean) => {
      if (valid) {
        const res: any = await reqAddUser(this.addForm);
        console.log(res);
        if (res.meta.status === 201) {
          // 提示成功
          this.$message.success(res.meta.msg);
          // 重新获取数据
          this.getUserList(this.searchInfo);
          ref.resetFields();
          this.addDialogVisible = false;
        } else {
          this.$message.error(res.meta.msg);
        }
        
      } else {
        return false;
      }
    });
  }
  // 编辑按钮
  async handleEdit(id: number) {
    const res: any = await reqUserById(id);
    console.log(res);
    if (res.meta.status !== 200) {
      return this.$message.error(res.meta.msg);
    }
    this.editForm = res.data;
    this.editDialogVisible = true;
  }

  // 关闭修改表单
  private edutDialogClose() {
    const ref: any = this.$refs.editForm;
    ref.resetFields();
  }

  // 修改用户信息并且提交
  private editUserInfo() {
    const ref: any = this.$refs.editForm;
    ref.validate(async (valid: any) => {
      if (valid) {
        const editUserForm: any = this.editForm;
        const res: any = await reqUserEdit({ id: editUserForm.id, email: editUserForm.email, mobile: editUserForm.mobile });
        console.log(res)
        if (res.meta.status === 200) {
          // 提示成功
          this.$message.success(res.meta.msg);
          // 重新获取数据
          this.getUserList(this.searchInfo);
          ref.resetFields();
          this.editDialogVisible = false;
        } else {
          this.$message.error(res.meta.msg);
        }
      } else {
        return false;
      }
    });
  }

  // 根据id删除用户
  async removeUserbyId(id: number) {
    const res = await this.$confirm('是否删除此用户?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).catch((err: any) => err);
    if (res !== 'confirm') {
      return this.$message.info('已取消删除');
    } 
    console.log('确认删除')
  }
}
</script>

<style lang="less" ref="stylesheet/less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}

.el-pagination {
  margin-top: 15px;
}
</style>