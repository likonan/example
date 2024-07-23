<script>
  export default {
    data(){
      return {
        userList: [],
        pageNumber: 1,
        pageSize: 10,
        total: 0,
        username:'',
        addUserFormVisible:false,
        addUser:{imgUrl:''},
        updateUserFormVisible:false,
        updateUser:{imgUrl:''},
        permList:[]
      }
    },
    methods:{
        getUserList(){
          var params = {};
          params.pageNumber = this.pageNumber;
          params.pageSize = this.pageSize;
          params.username = this.username;

          this.$axios.get('/user/page',{params:params})
          .then(result=>{
            var data = result.data;
            if (data.code == 200){
              this.total = data.data.total;
              this.userList = data.data.rows;
            }
          })
            .catch(e=>{
              console.log(e);
            })
        },
        handleSizeChange(val){
          // 将修改的pageSize赋给this.pageSize
            this.pageSize = val;
            this.getUserList();
        },
      handleCurrentChange(val){
          this.pageNumber = val;
          this.getUserList();
      },
      // ODO 添加用户对话框确定按钮
      saveAddUser(){
          this.$axios.post('/user/add',this.addUser)
            .then(result=>{
              var data = result.data;
              if (data.code == 200){
                //提示
                this.$message.success(data.msg);
                //关闭对话框
                this.addUserFormVisible = false;
                this.addUser={imgUrl:''};
                this.getUserList();
              }else {
                //提示，不关对话框
                this.$message.error(data.msg);
              }
            })
            .catch(e=>{
              console.log(e);
            })
      },
      // ODO 添加用户对话框取消按钮
      cancelAddUser(){
        this.addUserFormVisible=false;
          //将addUser清空
        this.addUser={imgUrl:''};
          //将对话框标记设置为false
      },
      //设置addUserFormVisible为true
      showAddUserDialog(){
          this.addUserFormVisible = true;
      },
      handleAvatarSuccess(result,file){
        this.addUser.imgUrl = result.data;
      },
      showUpdateUserDialog(row){
          //设置updateUserFormVisible为true
        this.updateUserFormVisible=true;
        //将当前行数据回显至对话框
        this.updateUser=row;
        //给imgUrl赋值

      },
      cancelUpdateUser(){
          this.updateUser={imgUrl: ''}
          this.updateUserFormVisible=false;
          this.getUserList()
      },
      saveUpdateUser(){
          this.$axios.put('/user/update',this.updateUser)
            .then(result=>{
              var data = result.data;
              if (data.code == 200){
                this.$message.success(data.msg);
                this.updateUserFormVisible = false;
                this.updateUser={imgUrl:''};
                this.getUserList();
              }else {
                this.$message.error(data.msg);
              }
            })
            .catch((e)=>{
              console.log(e);
            })
      },
      handleUpdateAvatarSuccess(result,file){
        this.updateUser.imgUrl = result.data;
      },
      deleteUser(id){
        this.$confirm("确定删除？","提示",{
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning"
        })
          .then(()=>{
            this.$axios.delete('/user/delete',{params:{"id":id}})
              .then((res)=>{
                var data = res.data;
                if(data.code == 200){
                  this.getUserList();
                  this.$message.success(data.msg);
                }else{
                  this.$message.error(data.msg);
                }
              })
              .catch(e=>{
                console.log(e);
              })
          })
      },
      getPermList(){
        this.$axios.get('/user/permList',{params:{"userId":sessionStorage.getItem('userId')}})
          .then(res=>{
            var data = res.data;
            this.permList=data.data;
          })
          .catch(e=>{
            console.log(e);
          })
      }
    },
    mounted() {
      this.getUserList();
      this.getPermList();
    }
  }
</script>

<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="getUserList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showAddUserDialog" v-if="permList.indexOf('user:add')!=-1">添加用户</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="userList"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="序号"
        >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        >
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        >
      </el-table-column>
      <el-table-column
        prop="imgUrl"
        label="头像"
        >
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" width="60px" height="60px" />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showUpdateUserDialog(scope.row)" v-if="permList.indexOf('user:update')!=-1">修改</el-button>
          <el-button type="primary" size="small" @click="deleteUser(scope.row.id)" v-if="permList.indexOf('user:delete')!=-1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--分页组件-->
<!--
  @size-change：	pageSize（每页显示条数） 改变时会触发
  @current-change：currentPage（页码） 改变时会触发
-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNumber"
      :page-sizes="[5, 10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

<!--添加用户对话框
    visible.sync:控制对话框是否显示的标记，true显示
    -->
    <el-dialog title="添加用户" :visible.sync="addUserFormVisible">
      <el-form :model="addUser">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="addUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="初始密码" label-width="120px">
          <el-input v-model="addUser.password" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item label="性别" label-width="120px">
          <el-select v-model="addUser.sex" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" label-width="120px">
          <el-input v-model="addUser.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" label-width="120px">
          <el-input v-model="addUser.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" label-width="120px">
<!--头像上传组件
    action:向后台服务发送请求，注意：请求路劲要加上带后台服务的域名
    on-success:当头像上传成功后触发的事件-->
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8088/user/img"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="addUser.imgUrl" :src="addUser.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddUser">取 消</el-button>
        <el-button type="primary" @click="saveAddUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="updateUserFormVisible">
      <el-form :model="updateUser">
        <el-form-item label="ID" label-width="120px">
          <el-input v-model="updateUser.id" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="updateUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="初始密码" label-width="120px">
          <el-input v-model="updateUser.password" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item label="性别" label-width="120px">
          <el-select v-model="updateUser.sex" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" label-width="120px">
          <el-input v-model="updateUser.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" label-width="120px">
          <el-input v-model="updateUser.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" label-width="120px">
          <!--头像上传组件
              action:向后台服务发送请求，注意：请求路劲要加上带后台服务的域名
              on-success:当头像上传成功后触发的事件-->
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8088/user/img"
            :show-file-list="false"
            :on-success="handleUpdateAvatarSuccess">
            <img v-if="updateUser.imgUrl" :src="updateUser.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateUser">取 消</el-button>
        <el-button type="primary" @click="saveUpdateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
