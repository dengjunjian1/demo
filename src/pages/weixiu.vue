<template>
  <div class="box">
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="维修" name="first">
          <el-button type="primary" class="add" @click="dialogFormVisible = true">添加</el-button>
          <el-table :data="d" border style="width: 1050px">
            <el-table-column label="序号" width="200">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="维修名称" width="200" class="img"></el-table-column>
            <el-table-column prop="tel" label="电话" width="200"></el-table-column>
            <el-table-column prop="price" label="类型" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="small" @click="look(scope.row.id)">查看</el-button>
                <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 弹窗 -->
        <div class="dialog">
          <el-dialog title="添加水站" :visible.sync="dialogFormVisible">
            <el-form>
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="repair.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="评分" :label-width="formLabelWidth">
                <el-input v-model="repair.score" autocomplete="off" type="number"></el-input>
              </el-form-item>
              <el-form-item label="类型" :label-width="formLabelWidth">
                <el-input v-model="repair.type" autocomplete="off" type="number"></el-input>
              </el-form-item>
              <el-form-item label="点赞数量" :label-width="formLabelWidth">
                <el-input v-model="repair.likeNum" autocomplete="off" type="number"></el-input>
              </el-form-item>
              <el-form-item label="关注人数" :label-width="formLabelWidth">
                <el-input v-model="repair.readNum" autocomplete="off" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商家地址" :label-width="formLabelWidth">
                <el-input v-model="repair.address" autocomplete="off" type="text"></el-input>
              </el-form-item>
              <el-form-item label="距离" :label-width="formLabelWidth">
                <el-input v-model="repair.len" autocomplete="off" type="text"></el-input>
              </el-form-item>
              <el-form-item label="商家信息" :label-width="formLabelWidth">
                <el-input v-model="repair.info" autocomplete="off" type="text"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="repair.tel" autocomplete="off" type="text"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="success" @click="add">添 加</el-button>
            </div>
          </el-dialog>
        </div>
        <!-- 水站评论 -->
        <el-tab-pane label="维修评论" name="second">
          <template>
            <el-select v-model="value" placeholder="全部" class="selcet">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-table :data="d1" border style="width: 1050px">
              <el-table-column label="序号" width="200">
                <template slot-scope="scope">
                  <span>{{scope.$index+1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="username" label="用户名称" width="200" class="img"></el-table-column>
              <el-table-column prop="content" label="评论内容" width="200"></el-table-column>
              <el-table-column prop="time" label="时间" width="200"></el-table-column>
              <el-table-column fixed="right" label="操作" width="180">
                <template>
                  <el-button type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
        

 <script>
import API from "../common/js/API";
export default {
  data() {
    return {
      repair: {
        name: "",
        score: "",
        type: "",
        address: "",
        tel: "",
        len: "",
        likeNum: "",
        readNum: "",
        info: ""
      },
      talk: {
        username: "",
        waterId: "",
        content: "",
        time: ""
      },
      activeName: "first",
      d: [],
      d1: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      options: [
        {
          value: "选项1",
          label: "全部"
        }
      ],
      value: ""
    };
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
            url: API.delRepair,
            method: "get",
            params: {
              id: id
            }
          })
            .then(res => {
              this.$axios({
                url: API.findRepair,
                method: "get"
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
    },
    update(id) {
      this.$axios({
        url: API.updateRepair,
        method: "get",
        params: this.water
      }).then(res => {
        look(id);
      });
    },
    add() {
      this.$axios({
        url: API.addRepair,
        method: "get",
        params: this.water
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
    look(id) {
      this.dialogFormVisible = true;
      this.$axios({
        url: API.findRepair,
        params: {
          id: id
        }
      }).then(res => {
        // console.log(res);
        if (res.data.isok) {
          this.repair = res.data.data[0];
          //   this.dialogFormVisible = false;
        } else {
          alert(res.data.info);
        }
      });
    }
  },
  mounted() {
    this.$axios({
      url: API.findRepair,
      method: "get"
    }).then(res => {
      //   console.log(res);
      this.d = res.data.data;
    });
    this.$axios({
      url: API.findRepairComment,
      method: "get"
    }).then(res => {
      //   console.log(res);
      this.d1 = res.data.data;
    });
  }
};
</script>
<style lang="stylus" scoped>
.add {
  margin-left: 25px;
}

.el-form-item__label {
  /* padding-left: -20px; */
  text-align: center !important;
}

.el-select>>>.el-input__inner {
  width: 1000px;
}

.el-tab-pane>>>.el-table {
  margin-top: 40px;
}

.box {
  margin-left: 90px;
}
</style>