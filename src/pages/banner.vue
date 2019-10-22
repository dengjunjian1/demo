<template>
  <div class="box">
    <el-button type="primary" class="add" @click="dialogFormVisible = true">添加</el-button>
    <template>
      <el-table :data="banner" border style="width: 800px">
        <el-table-column fixed label="序号" width="200">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="img" label="图片" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt />
          </template>
        </el-table-column>
        <el-table-column prop="des" label="描述" width="200"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="dialog">
        <el-dialog title="添加banner" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="图片地址" :label-width="formLabelWidth">
              <el-input v-model="banner.img" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input v-model="banner.des" autocomplete="off"></el-input>
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
import API from "../common/js/API.js";
export default {
  data() {
    return {
      banner: [
        {
          img: "",
          des: ""
        }
      ],
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
  mounted() {
    this.$axios({
      url: API.findBanner,
      method: "get"
    }).then(res => {
    //   console.log(res);
      this.banner = res.data.data;
    });
  },
  methods: {
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delBanner,
            method: "get",
            params: {
              id: id
            }
          })
            .then(res => {
              this.$axios({
                url: API.findBanner,
                method: "get"
              }).then(res => {
                this.banner = res.data.data;
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
    },
    add() {
      this.$axios({
        url: API.addBanner,
        method: "get",
        params: this.banner
      }).then(res => {
        // console.log(res);
        if (res.data.isok) {
          alert(res.data.info);
          this.dialogFormVisible = false;
        } else {
          alert(res.data.info);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.box {
  margin-left: 90px;
}

img {
  width: 100%;
  height: 100px;
}

.add {
  margin-bottom: 20px;
}
</style>