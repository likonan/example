<script>
  export default {
    data(){
      return {
        userList: [],
        pageNumber: 1,
        pageSize: 5,
        total: 0,
        username:''
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
        }
    },
    mounted() {
      this.getUserList()
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
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        >
        <template slot-scope="scope">
          <el-button type="primary" size="small">修改</el-button>
          <el-button type="primary" size="small">删除</el-button>
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
  </div>
</template>

<style scoped>

</style>
