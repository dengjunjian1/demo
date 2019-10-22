<template>
  <div class="box">
    <el-button type="primary" class="add" @click="dialogFormVisible = true">添加</el-button>
    <template>
      <el-table :data="d" height="250" style="width: 1000px" class="table">
        <el-table-column prop="des" label="序号" width="200">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="200"></el-table-column>
        <el-table-column prop="des" label="属性" width="200"></el-table-column>
        <el-table-column prop="time" label="时间" width="200"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small">查看</el-button>
            <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="dialog">
        <el-dialog title="添加|修改管理员" :visible.sync="dialogFormVisible">
          <el-form :model="user">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="user.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="user.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth">
              <el-input v-model="comfirm" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input v-model="user.des" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="时间" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="success" @click="add">添 加</el-button>
          </div>
        </el-dialog>
      </div>
    </template>
  </div>
</template>
  
 <script>
import API from "../common/js/API";
export default {
  data() {
    return {
      user: {
        name: "",
        pass: "",
        time: "",
        des: ""
      },
      comfirm: "",
      value1: "",
      d: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    add() {
      var time = this.user.time;
      var data = this.user;
      var date = new Date(time);
      var time1 = date.getTime();
      //   console.log(time1);
      data.time = time1;
      this.$axios({
        url: API.addManage,
        method: "post",
        data: data
      }).then(res => {
        // console.log(res);
        if (res.data.isok) {
          alert(res.data.info);
          this.dialogFormVisible = false;
        } else {
          alert(res.data.info);
        }
      });
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delManage,
            method: "post",
            data: {
              id
            }
          })
            .then(res => {
              this.$axios({
                url: API.findMange,
                method: "post"
              }).then(res => {
                this.d = res.data.data;
                //   console.log(res);
              });
              this.$message({
                type: "info",
                message: res.data.info
              });
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: err.data.info
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },

  mounted() {
    this.$axios({
      url: API.findMange,
      method: "post"
    }).then(res => {
      this.d = res.data.data;
      //   console.log(res);
    });
  }
};
</script>


<style  lang="stylus"  scoped>
.box {
  margin-left: 60px;
}

.table {
  text-align: center !important;
}

.add {
  margin-left: -20px;
  margin-bottom: 20px;
}

.el-dialog__wrapper>>>.el-dialog__title {
  color: #ff8247;
}

.el-button--success {
  color: #fff;
  background-color: #c0ff3e;
  border-color: #c0ff3e;
}

.el-button--success:hover {
  color: #ff8247;
  border-color: #ffe7ba;
  background-color: #ffe7ba;
}

.el-input {
  width: 500px;
}
</style>