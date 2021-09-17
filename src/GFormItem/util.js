import {
  Select,
  DatePicker,
  Input,
  Checkbox,
  Radio,
  Switch,
  TreeSelect,
  TimePicker,
} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
// import OssUpload from './OssUpload';
import NumRange from '../NumRange';
import RoleTree from './RoleTree';
import InputNum from './InputNum';

moment.locale('zh-cn');

const { RangePicker: TimePickerRange } = TimePicker;
const { Option } = Select;
const { TextArea, Password } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const { RangePicker, MonthPicker, YearPicker } = DatePicker;

// 输入项表情限制
function isEmojiCharacter(substring) {
  let flag = false;
  for (let i = 0; i < substring.length; i += 1) {
    const hs = substring.charCodeAt(i);
    if (hs >= 0xd800 && hs <= 0xdbff) {
      if (substring.length > 1) {
        const ls = substring.charCodeAt(i + 1);
        const uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
        if (uc >= 0x1d000 && uc <= 0x1f77f) {
          flag = true;
        }
      }
    } else if (substring.length > 1) {
      const ls = substring.charCodeAt(i + 1);
      if (ls === 0x20e3) {
        flag = true;
      }
    } else {
      if (hs >= 0x2100 && hs <= 0x27ff) {
        flag = true;
      }
      if (hs >= 0x2b05 && hs <= 0x2b07) {
        flag = true;
      }
      if (hs >= 0x2934 && hs <= 0x2935) {
        flag = true;
      }
      if (hs >= 0x3297 && hs <= 0x3299) {
        flag = true;
      }
      if (
        hs === 0xa9 ||
        hs === 0xae ||
        hs === 0x303d ||
        hs === 0x3030 ||
        hs === 0x2b55 ||
        hs === 0x2b1c ||
        hs === 0x2b1b ||
        hs === 0x2b50
      ) {
        flag = true;
      }
    }
  }
  return flag;
}

// 目前支持的form表单类型
const mapTypeToComponent = {
  input: {
    WrappedComponent: Input,
    defaultProps: {
      allowClear: true,
      placeholder: '请输入',
    },
  },
  inputnumber: {
    WrappedComponent: InputNum,
    defaultProps: {
      precision: 0,
      min: 0,
      style: {
        width: '100%',
      },
      placeholder: '请输入',
    },
  },
  password: {
    WrappedComponent: Password,
    defaultProps: {
      placeholder: '请输入',
      autoComplete: 'new-password',
    },
  },
  numrange: {
    WrappedComponent: NumRange,
  },
  // ossupload: {
  //   WrappedComponent: OssUpload,
  // },
  select: {
    WrappedComponent: Select,
    defaultProps: {
      placeholder: '请选择',
      allowClear: true,
    },
    SubComponent: Option,
  },
  selectgroup: {
    WrappedComponent: Select,
    defaultProps: {
      placeholder: '请选择',
      allowClear: true,
    },
    SubComponent: Option,
  },
  // addr: {
  //   WrappedComponent: Address,
  // },
  timepickerrange: {
    WrappedComponent: TimePickerRange,
    defaultProps: {
      locale,
      style: {
        width: '100%',
      },
      format: 'HH:mm',
    },
  },
  datepicker: {
    WrappedComponent: DatePicker,
    defaultProps: {
      placeholder: '请选择',
      locale,
      style: {
        width: '100%',
      },
    },
  },
  monthpicker: {
    WrappedComponent: MonthPicker,
    defaultProps: {
      placeholder: '请选择',
      locale,
      style: {
        width: '100%',
      },
    },
  },
  rangepicker: {
    WrappedComponent: RangePicker,
    defaultProps: {
      locale,
      ranges: {
        今天: [moment(), moment()],
        最近一周: [moment().subtract('days', 6), moment()],
        本月: [moment().startOf('month'), moment()],
        '3个月': [moment(), moment().add(0.25, 'year')],
        '6个月': [moment(), moment().add(0.5, 'year')],
        '1年': [moment(), moment().add(1, 'year')],
        无限期: [moment(), moment('20991231', 'YYYYMMDD')],
      },
      style: {
        width: '100%',
      },
    },
  },
  timepicker: {
    WrappedComponent: TimePicker,
    defaultProps: {
      locale,
      format: 'HH:mm',
      style: {
        width: '100%',
      },
    },
  },
  checkbox: {
    WrappedComponent: Checkbox,
    defaultProps: {
      placeholder: '请选择',
    },
  },
  checkboxgroup: {
    WrappedComponent: CheckboxGroup,
    SubComponent: Checkbox,
    childStyle: {
      marginLeft: '10px',
    },
    defaultProps: {
      placeholder: '请选择',
    },
  },
  textarea: {
    WrappedComponent: TextArea,
    defaultProps: {
      placeholder: '请输入',
      // maxLength: 128,
      autoSize: { minRows: 2, maxRows: 6 },
    },
  },
  radiogroup: {
    WrappedComponent: RadioGroup,
    SubComponent: Radio,
    childStyle: {
      marginLeft: '10px',
    },
    defaultProps: {
      placeholder: '请选择',
    },
  },
  radiogroupbutton: {
    WrappedComponent: RadioGroup,
    SubComponent: RadioButton,
    defaultProps: {
      placeholder: '请选择',
    },
  },
  switch: {
    WrappedComponent: Switch,
  },
  treeselect: {
    WrappedComponent: TreeSelect,
  },
  yearpicker: {
    WrappedComponent: YearPicker,
    defaultProps: {
      placeholder: '请选择',
      style: { width: '100%' },
    },
  },
  roletree: {
    WrappedComponent: RoleTree,
  },
};

const validEmoji = (rule, value) => {
  if (value && isEmojiCharacter(value)) return Promise.reject('禁止输入表情');
  return Promise.resolve();
};

export { validEmoji, mapTypeToComponent };
