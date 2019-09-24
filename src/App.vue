<template>
  <div id="app">
    <app-header class="app-header" :width="width" @ready="mainAnimStart = true">
      [ PanoFrame ]
    </app-header>

    <el-tabs ref="main" v-model="mode" class="app-main" :style="{ width }">
      <el-tab-pane label="Preview" name="preview" :style="styleObj">
        <app-preview/>
      </el-tab-pane>
      <el-tab-pane label="Edit" name="edit" :style="styleObj">
        <app-edit/>
      </el-tab-pane>
    </el-tabs>

    <app-footer class="app-footer" :width="width" @ready="mainAnimStart = true">
      <p>PanoFrame is designed and developed by ChangLIU.</p>
      <a href="">View source</a>
    </app-footer>
  </div>
</template>

<script>
import { TweenLite, Power2 } from 'gsap';

import {
  AppHeader,
  AppFooter,
  AppPreview,
  AppEdit,
} from './components';

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    AppPreview,
    AppEdit,
  },

  data() {
    return {
      tabContentHeight: `${window.innerHeight - 215}px`, // header + footer + tab navbar's total height is 215
      mainAnimStart: true,
      navElem: null, // Element UI's component
      navParent: null, // Element UI's component
    };
  },

  computed: {
    mode: {
      get() {
        return this.$store.state.mode;
      },
      set(mode) {
        this.$store.commit('setMode', mode);
      },
    },

    width() {
      return this.mode === 'preview' ? '60%' : '100%';
    },

    styleObj() {
      return {
        height: this.tabContentHeight,
        minHeight: '550px',
        transition: 'opacity 1s',
        opacity: this.mainAnimStart ? 1 : 0,
      };
    },
  },

  watch: {
    // Make an animated navbar
    mode() {
      const data = { width: this.navElem.offsetWidth };
      this.$nextTick(() => {
        TweenLite.to(data, 1, {
          width: this.navParent.offsetWidth,
          ease: Power2.easeInOut,
          onUpdate: () => {
            this.navElem.style.width = `${data.width}px`;
          },
        });
      });
      this.mainAnimStart = false;
    },
  },

  mounted() {
    // Customize Element UI's navbar component
    this.$nextTick(() => {
      this.navParent = this.$refs.main.$el.children[0];
      this.navParent.style.height = '40px';
      this.navElem = this.$refs.main.$refs.nav.$el;
      this.navElem.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${this.navParent.offsetWidth}px;`;
    });

    // Resize handler
    window.addEventListener('resize', () => {
      this.tabContentHeight = `${window.innerHeight - 215}px`;
      this.navElem.style.width = `${this.navParent.offsetWidth}px`;
    });

    window.addEventListener('orientationchange', () => {
      this.tabContentHeight = `${window.innerHeight - 215}px`;
      this.navElem.style.width = `${this.navParent.offsetWidth}px`;
    });

    // Prevent zooming on iOS
    window.οnlοad = () => {
      document.addEventListener('touchmove', (event) => {
        if (event.scale !== 1) { event.preventDefault(); }
      }, false);

      let lastTouchEnd = 0;
      document.addEventListener('touchend', (event) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    };
  },
};
</script>

<style lang="scss">
@import "@/plugins/element-variables.scss";

* {
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  width: 100%;
  background-color: $--background-color-base;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 30px;

  height: 100%;
  width: 100%;
  min-width: 665px;
  min-height: 765px;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $--color-text-primary;
  font-size: $text-regular;

  a {
    color: $--color-primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .app-main {
    min-width: 605px;
    flex: 1 0 auto;
  }

  .app-header, .app-footer {
    height: 80px;
    min-width: 605px;
    flex: 0 0 auto;
  }
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: $--color-text-secondary;
}
</style>
