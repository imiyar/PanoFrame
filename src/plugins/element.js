import Vue from 'vue';
import {
  Button,
  Tabs,
  TabPane,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  Input,
  InputNumber,
  Radio,
  TimePicker,
  Loading,
} from 'element-ui';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/display.css';

locale.use(lang);

Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(TimePicker);
Vue.use(Loading);
