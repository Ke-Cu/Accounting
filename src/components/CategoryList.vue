<template>
  <div class="category-list">
    <v-btn color="primary" dark @click="dialog = true" class="ml-4 mb-4">
      新增分类
    </v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline grey darken-3 white--text mb-4">
          新增分类
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newCategory"
            label="分类名称"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">取消</v-btn>
          <v-btn color="primary" text @click="addCategory">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-list class="pa-2">
      <template v-for="(category, index) in categorys">
        <v-list-item :key="category.typeId" v-if="category.typeId">
          <v-list-item-content>
            <v-list-item-title>{{ category.typeName }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="onClickDelete(category)">
              <v-icon color="red lighten-2">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index < categorys.length - 1"
          :key="`${category.typeId}-${index}`"
        >
        </v-divider>
      </template>
    </v-list>
    <v-dialog v-model="dialogDelete" width="300">
      <v-card>
        <v-card-title class="grey darken-3 white--text">
          确认删除
        </v-card-title>
        <v-card-text class="pl-8 pt-4">
          <div>分类：{{ category.typeName }}</div>
          <!-- <div>分类：</div> -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogDelete = false"> 取消 </v-btn>
          <v-btn color="primary" text @click="dialogDelete = false">
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { accounting } from "../api/index"

export default {
  name: "CategoryList",
  props: {
    dark: {
      type: Boolean,
    },
  },
  data() {
    return {
      categorys: [],
      dialog: false,
      newCategory: "",
      dialogDelete: false,
      category: "",
    }
  },
  mounted() {
    this.getCategorys()
  },
  methods: {
    async getCategorys() {
      this.categorys = await accounting.getTypes()
    },
    onClickDelete(category) {
      console.log(category)
      this.category = category
      this.dialogDelete = true
    },
    async addCategory() {
      localStorage.setItem("token", "ZWtzYnlnazprZWppYXpoYW5nZGFuIQ==")
      if (this.newCategory) {
        await accounting.addType({ typeName: this.newCategory })
        this.getCategorys()
        this.dialog = false
      }
    },
  },
}
</script>

<style></style>
