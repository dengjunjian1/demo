<template>
  <div class="box">
    <template>
      <el-tabs v-model="activeName">
        <!-- 家教banner -->
        <el-tab-pane label="家教banner" name="first">
          <el-button type="primary" class="add" @click="dialogFormVisible = true">添加</el-button>
          <el-table :data="banner" border style="width: 800px">
            <el-table-column fixed label="序号" width="200">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="img" label="图片" width="200" class="img">
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
        </el-tab-pane>
        <!-- 弹窗 -->
        <div class="dialog">
          <el-dialog title="添加banner" :visible.sync="dialogFormVisible">
            <el-form>
              <el-form-item label="图片地址" :label-width="formLabelWidth">
                <el-input v-model="banner1.img" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input v-model="banner1.des" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="success" @click="add">添 加</el-button>
            </div>
          </el-dialog>
        </div>
        <!-- 家教类型 -->
        <el-tab-pane label="家教类型" name="second">
          <el-button type="primary" class="add" @click="dialogFormVisible = true">添加</el-button>
          <el-table :data="d" border style="width: 800px">
            <el-table-column fixed label="序号" width="200">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="img" label="图片" width="200" class="img">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt />
              </template>
            </el-table-column>
            <el-table-column prop="des" label="类型" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="del1(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 弹窗 -->
        <div class="dialog">
          <el-dialog title="添加banner" :visible.sync="dialogFormVisible">
            <el-form>
              <el-form-item label="图片地址" :label-width="formLabelWidth">
                <el-input v-model="banner2.img" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input v-model="banner2.type" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="success" @click="add1">添 加</el-button>
            </div>
          </el-dialog>
        </div>

        <!-- 家教排行 -->
        <el-tab-pane label="家教排行" name="third">
          <el-button type="primary" class="add" @click="show = true">添加</el-button>
          <el-table :data="dd" border style="width: 1000px">
            <el-table-column fixed label="序号" width="200">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="img" label="图片" width="200" class="img">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt />
              </template>
            </el-table-column>
            <el-table-column prop="num" label="报名人数" width="200"></el-table-column>
            <el-table-column prop="teacherImg" label="授课机构" width="200" class="img">
              <template slot-scope="scope">
                <img :src="scope.row.teacherImg" alt />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="del2(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 弹窗 -->
        <div class="dialog">
          <el-dialog title="添加banner" :visible.sync="show">
            <el-form>
              <el-form-item label="图片地址" :label-width="formLabelWidth">
                <el-input v-model="banner3.img" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="报名人数" :label-width="formLabelWidth">
                <el-input v-model="banner3.num" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="机构图片" :label-width="formLabelWidth">
                <el-input v-model="banner3.teacherImg" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="show = false">取 消</el-button>
              <el-button type="success" @click="add2">添 加</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tabs>
    </template>
  </div>
</template>

 <script>
import API from "../common/js/API";
export default {
  data() {
    return {
      activeName: "first",
      banner1: {
        img: "",
        des: ""
      },
      banner2: {
        img: "",
        type: ""
      },
      banner3: {
        img: "",
        num: "",
        teacherImg: ""
      },
      banner: [],
      d: [],
      dd: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      show: false,

      formLabelWidth: "120px"
    };
  },
  mounted() {
    // 查询家教banner
    this.$axios({
      url: API.findTeacherBanner,
      method: "get"
    }).then(res => {
      // console.log(res);
      this.banner = res.data.data;
    });
    // 查询家教类型
    this.$axios({
      url: API.teacherType,
      method: "get"
    }).then(res => {
      // console.log(res);
      this.d = res.data.data;
    });
    // 查询家教排行
    this.$axios({
      url: API.teacherTop,
      method: "get"
    }).then(res => {
      // console.log(res);
      this.dd = res.data.data;
    });
  },
  methods: {
    // 添加家教banner
    add() {
      this.$axios({
        url: API.addTeacherBanner,
        method: "get",
        params: this.banner1
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
    // 添加家教类型
    add1() {
      this.$axios({
        url: API.addTeacherType,
        method: "get",
        params: this.banner2
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
    // 添加家教排行
    add2() {
      this.$axios({
        url: API.addTeacherTop,
        method: "get",
        params: this.banner3
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
    // 删除家教banner
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delTeacherBanner,
            method: "get",
            params: {
              id: id
            }
          })
            .then(res => {
              this.$axios({
                url: API.findTeacherBanner,
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
    // 删除家教类型
    del1(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delTeacherType,
            method: "get",
            params: {
              id: id
            }
          })
            .then(res => {
              this.$axios({
                url: API.teacherType,
                method: "get"
              }).then(res => {
                this.d = res.data.data;
                // console.log(res);
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
    // 删除家教排行
    del2(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delTeacherTop,
            method: "get",
            params: {
              id: id
            }
          })
            .then(res => {
              this.$axios({
                url: API.teacherTop,
                method: "get"
              }).then(res => {
                this.dd = res.data.data;
                // console.log(res);
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
  }
};
</script>
<style scoped>
.add {
  margin-left: 50px;
  margin-bottom: 40px;
}
.box {
  margin-left: 40px;
}
img {
  width: 100%;
  height: 100px;
}
</style>