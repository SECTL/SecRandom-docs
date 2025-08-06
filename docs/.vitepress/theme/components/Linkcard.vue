<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

interface Props {
    url: string
    title: string
    description: string
    logo: string
}

const props = withDefaults(defineProps<Props>(), {
    url: '',
    title: '',
    description: '',
    logo: '',
})

const { theme } = useData()
const isDark = computed(() => theme.value.isDark)
</script>

<template>
    <div class="linkcard">
        <a :href="props.url" target="_blank">
            <div class="logo-container">
                <div v-if="props.logo" class="logo">
                    <img alt="logo" :src="props.logo" />
                </div>
                <div v-else class="fallback-icon">
                    <i class="fas fa-link"></i>
                </div>
            </div>
            <p class="description">{{ props.title }}<br><span>{{ props.description }}</span></p>
            <div class="visit-link">
                <span>访问 {{ props.title }}</span>
                <i class="fas fa-external-link-alt"></i>
            </div>
        </a>
    </div>
</template>

<style scoped>
/* 卡片基础样式 */
.linkcard {
    background-color: var(--vp-c-bg);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.3s ease;
    margin-top: 15px;
    border: 1px solid var(--vp-c-divider);
    height: 120px;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 卡片鼠标悬停效果 */
.linkcard:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 链接样式 */
.linkcard a {
    display: flex;
    align-items: center;
    height: 100%;
    text-decoration: none;
}

/* logo容器样式 */
.logo-container {
    width: 80px;
    height: 80px;
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--vp-c-bg-alt);
    border-radius: 8px;
    margin-right: 16px;
}

/* logo图片样式 */
.logo img {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

/* 备用图标样式 */
.fallback-icon {
    color: var(--vp-c-text-2);
    font-size: 28px;
}

/* 描述文字样式 */
.linkcard .description {
    flex: 1;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    color: var(--vp-c-text-1);
    margin: 0;
    transition: color 0.3s;
}

/* 描述文字副标题样式 */
.linkcard .description span {
    font-size: 14px;
    color: var(--vp-c-text-2);
}

/* 访问链接样式 */
.visit-link {
    position: absolute;
    bottom: 16px;
    right: 16px;
    font-size: 12px;
    color: var(--vp-c-brand);
    display: flex;
    align-items: center;
}

.visit-link i {
    margin-left: 4px;
    font-size: 12px;
}

/* 响应式调整 */
@media (max-width: 600px) {
    .linkcard {
        height: auto;
        padding: 12px;
    }
    
    .logo-container {
        width: 60px;
        height: 60px;
        min-width: 60px;
    }
    
    .logo img {
        width: 40px;
        height: 40px;
    }
    
    .fallback-icon {
        font-size: 24px;
    }
    
    .linkcard .description {
        font-size: 14px;
        line-height: 20px;
    }
    
    .linkcard .description span {
        font-size: 12px;
    }
}
</style>
