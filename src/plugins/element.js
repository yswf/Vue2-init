import Vue from "vue";
import {
  Button,
  Container,
  Header,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Row,
  Col,
  Message,
  Form,
  FormItem,
  Input,
} from "element-ui";

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.prototype.$message = Message;
