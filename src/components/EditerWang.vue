<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, shallowRef, onBeforeUnmount } from "vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IEditorConfig } from "@wangeditor/editor";
interface Props {
  modelValue: string;
  height?: number | string; // 编辑器的高度
}
interface EmitEvent {
  (e: "update:modelValue", params: string): void;
}
const props = withDefaults(defineProps<Props>(), {
  height: 550,
});
const emit = defineEmits<EmitEvent>();
const valueHtml = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const mode = "simple";
const toolbarConfig = {};
//上传图片的地址
// const uploadFileUrl = import.meta.env.VITE_APP_BASE_API + "/common/upload";
const editorConfig: Partial<IEditorConfig> = {
  placeholder: "请输入内容...",
  MENU_CONF: {},
};
editorConfig.MENU_CONF!["uploadImage"] = {
  //   server: uploadFileUrl,
  maxFileSize: 5 * 1024 * 1024,
  fieldName: "file",
  meta: {
    source: "sys_user_guide",
  },
  // 自定义插入图片
  customInsert(res: any, insertFn: any) {
    insertFn(res.url, res.originalFilename, res.url);
  },
};
editorConfig.MENU_CONF!["uploadVideo"] = {
  //   server: uploadFileUrl,
  maxFileSize: 10 * 1024 * 1024,
  fieldName: "file",
  meta: {
    source: "sys_user_guide",
  },
  // 自定义插入图片
  customInsert(res: any, insertFn: any) {
    insertFn(res.url, res.originalFilename, res.url);
  },
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const { value } = editorRef;
  if (value === null) return;
  value.destroy();
});
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>
