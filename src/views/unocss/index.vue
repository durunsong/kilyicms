<template>
  <div h-full uno-padding-20>
    <div h-full text-center flex select-none all:transition-400>
      <span class="i-whh-mymusic" role="img" aria-hidden="true" />
      <div ma>
        <div
          text-5xl
          fw100
          animate-bounce-alt
          animate-count-infinite
          animate-1s
        >
          UnoCSS
        </div>
        <div op30 dark:op60 text-lg fw300 m1>
          {{ t("UnoCSS_use_case", { UnoCSS: "UnoCSS", Scss: "Scss" }) }}
        </div>
        <div
          m2
          flex
          justify-center
          text-lg
          op30
          dark:op60
          hover="op80"
          dark:hover="op80"
        >
          <a
            href="https://antfu.me/posts/reimagine-atomic-css-zh"
            target="_blank"
            >{{ t("Reimagining_atomized_CSS", { CSS: "CSS" }) }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
