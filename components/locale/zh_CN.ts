import { Locale } from '../config-provider/locale';

const inputPlaceholder = '请输入...';
const selectPlaceholder = '请选择...';

const zh_CN: Locale = {
  locale: 'zh_CN',
  Input: {
    placeholder: inputPlaceholder,
  },
  Select: {
    placeholder: selectPlaceholder,
  },
  Modal: {
    cancelText: '取消',
    okText: '确定',
  },
};

export default zh_CN;
