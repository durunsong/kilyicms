<template>
  <div class="content">
    <template v-if="!mobile">
      <div class="content-cards" v-for="(info, index) in items" :key="index">
        <el-avatar :src="info.avatar" class="avatar"></el-avatar>
        <span class="desc">{{ info.desc }}</span>
      </div>
    </template>
    <template v-else>
      <div class="content-cards">
        <el-avatar :src="getAvatar()" class="avatar"></el-avatar>
        <span class="desc">{{ getDescription() }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Item {
  avatar: string;
  desc: string;
}

const props = defineProps<{
  item: Item | Item[];
  mobile?: boolean;
}>();

const items = Array.isArray(props.item) ? props.item : [props.item];

const getAvatar = () => {
  return items[0].avatar;
};

const getDescription = () => {
  return items[0].desc;
};
</script>

<style lang="scss" scoped>
.content {
  width: 1200px;
  padding: 60px 60px 0;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;

  .content-cards {
    position: relative;
    height: 230px;
    width: 500px;
    padding: 98px 40px 0;
    box-sizing: border-box;
    border-radius: 16px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.12);

    .avatar {
      position: absolute;
      width: 100px;
      height: 100px;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .desc {
      color: #333;
      white-space: pre-wrap;
    }
  }

  @media screen and (max-width: 880px) {
    width: 100%;
    padding: 50px 30px 0;
    box-sizing: border-box;

    margin: 0 auto;
    margin-bottom: 20px;
    display: block;

    .content-cards {
      height: 180px;
      width: auto;
      font-size: 10px;
      padding: 54px 30px 26px;
      box-sizing: border-box;

      .avatar {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
