<script setup>
import { ref, shallowRef, watch, onMounted, onBeforeUnmount } from 'vue';
import sidebarItems from './vertical-sidebar/sidebarItem';
import NavGroup from '@/layouts/full/vertical-sidebar/NavGroup/index.vue'
import NavItem from '@/layouts/full/vertical-sidebar/NavItem/index.vue'
import Logo from './logo/Logo.vue';
// Icon Imports
import { Menu2Icon, BellRingingIcon } from 'vue-tabler-icons';
import NotificationDD from './vertical-header/NotificationDD.vue';
import ProfileDD from './vertical-header/ProfileDD.vue';
const sidebarMenu = shallowRef(sidebarItems);
const drawerWidth = ref(270);
const sDrawer = ref(false);

watch([sDrawer, drawerWidth], ([open, width]) => {
  document.documentElement.style.setProperty('--drawer-width', !open ? `${width}px` : '56px')
})

const isSticky = ref(false);
const appBarTop = ref(20);
const initialTop = ref(20);

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition <= initialTop.value) {
        isSticky.value = false;
        appBarTop.value = initialTop.value;
    } else {
        isSticky.value = true;
        appBarTop.value = 0;
    }
}
</script>

<template>
    <v-navigation-drawer left :rail="sDrawer" app class="leftSidebar ml-sm-5 mt-sm-5 bg-containerBg" elevation="10"
        :width="drawerWidth">
        <div class="pa-5 pl-4 ">
            <Logo />
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar bg-containerBg overflow-y-hidden">
            <v-list class="py-4 px-4 bg-containerBg">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
                <!-- <Moreoption/> -->
            </v-list>
            <!-- <div class="py-0 px-6">
                <v-btn class="mr-2 bg-primary rounded-pill" size="large"
                    href="https://www.wrappixel.com/templates/spike-vuejs-admin-dashboard/?ref=33" block target="_blank">Upgrade to
                    Pro</v-btn>
            </div> -->
        </perfect-scrollbar>
    </v-navigation-drawer>
    <div class="container verticalLayout">
        <div class="maxWidth">
            <v-app-bar elevation="0" height="75" :class="{ 'sticky-top': isSticky }" :style="{ top: appBarTop + 'px' }">
                <div class="d-flex align-center justify-space-between w-100">
                    <div>
                        <v-btn class="text-muted" @click="sDrawer = !sDrawer" icon
                            variant="flat" size="small">
                            <Menu2Icon size="20" stroke-width="1.5" />
                        </v-btn>
                        <!-- Notification -->
                        <NotificationDD />
                    </div>
                    <div>
                        <!-- Upgrade button -->
                        <!-- <v-btn class="mr-2 bg-primary rounded-pill"
                            href="https://www.wrappixel.com/templates/spike-vuejs-admin-dashboard/?ref=33"
                            target="_blank">Upgrade to Pro</v-btn> -->
                        <!-- User Profile -->
                        <ProfileDD />
                    </div>
                </div>
            </v-app-bar>
        </div>
    </div>
</template>
<style scoped>
.v-app-bar {
  transition: top 0.3s ease;
}
.sticky-top {
  position: fixed;
  left: calc(var(--drawer-width) + 40px) !important;
  width: calc(100% - var(--drawer-width) - 96px) !important;
  right: 56px !important;
}
</style>