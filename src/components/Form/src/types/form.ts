import type { NamePath, RuleObject } from 'ant-design-vue/lib/form/interface';
import type { VNode } from 'vue';
import type { ButtonProps as AntdButtonProps } from '/@/components/Button';
import type { FormItem } from './formItem';
import type { ColEx, ComponentType } from './index';
import type { TableActionType } from '/@/components/Table/src/types/table';
import type { CSSProperties } from 'vue';
import type { RowProps } from 'ant-design-vue/lib/grid/Row';

export type FieldMapToTime = [string, [string, string], string?][];

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  field: string;
}

export interface ButtonProps extends AntdButtonProps {
  text?: string;
}

export interface FormActionType {
  submit: () => Promise<void>;
  setFieldsValue: <T>(values: T) => Promise<void>;
  resetFields: () => Promise<void>;
  getFieldsValue: () => Recordable;
  clearValidate: (name?: string | string[]) => Promise<void>;
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  removeSchemaByFiled: (field: string | string[]) => Promise<void>;
  appendSchemaByField: (
    schema: FormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined,
  ) => Promise<void>;
  validateFields: (nameList?: NamePath[]) => Promise<any>;
  validate: (nameList?: NamePath[]) => Promise<any>;
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];

export interface FormProps {
  name?: string;
  layout?: 'vertical' | 'inline' | 'horizontal';
  // 表单值
  model?: Recordable;
  // 整个表单中所有项目的宽度
  labelWidth?: number | string;
  // 对齐
  labelAlign?: 'left' | 'right';
  // 整个表单的行配置
  rowProps?: RowProps;
  // 重置时提交表单
  submitOnReset?: boolean;
  // 表单更改时提交表单
  submitOnChange?: boolean;
  // 整个表单的列配置
  labelCol?: Partial<ColEx>;
  // 整个表单的列配置
  wrapperCol?: Partial<ColEx>;

  // 常规行样式
  baseRowStyle?: CSSProperties;

  // 常规列配置
  baseColProps?: Partial<ColEx>;

  // 表单配置规则
  schemas?: FormSchema[];
  // 用于合并到动态控件表单项的函数值
  mergeDynamicData?: Recordable;
  // 搜索表单的压缩模式
  compact?: boolean;
  // 空行跨度
  emptySpan?: number | Partial<ColEx>;
  // 表单的内部组件大小
  size?: 'default' | 'small' | 'large';
  // 是否禁用
  disabled?: boolean;
  // 时间间隔字段映射为多个
  fieldMapToTime?: FieldMapToTime;
  // 占位符自动设置
  autoSetPlaceHolder?: boolean;
  // 输入时按回车键自动提交
  autoSubmitOnEnter?: boolean;
  // 检查信息是否添加到标签中
  rulesMessageJoinLabel?: boolean;
  // 是否显示折叠和展开按钮
  showAdvancedButton?: boolean;
  // 是否关注第一个输入框，仅在输入第一个表单项时有效
  autoFocusFirstItem?: boolean;
  // 在指定的行数上自动折叠
  autoAdvancedLine?: number;
  // 始终显示线条
  alwaysShowLines?: number;
  // 是否显示操作按钮
  showActionButtonGroup?: boolean;

  // 重置按钮配置
  resetButtonOptions?: Partial<ButtonProps>;

  // 确认按钮配置
  submitButtonOptions?: Partial<ButtonProps>;

  // 操作柱配置
  actionColOptions?: Partial<ColEx>;

  // 显示重置按钮
  showResetButton?: boolean;
  // 显示确认按钮
  showSubmitButton?: boolean;

  resetFunc?: () => Promise<void>;
  submitFunc?: () => Promise<void>;
  transformDateFunc?: (date: any) => string;
  colon?: boolean;
}
export interface FormSchema {
  // 字段名称
  field: string;
  // 由内部值更改、默认更改触发的事件名称
  changeEvent?: string;
  // 绑定到v-model的变量名称默认值
  valueField?: string;
  // 标签名称
  label: string | VNode;
  // 辅助文本
  subLabel?: string;
  // 文本右侧的帮助文本
  helpMessage?:
    | string
    | string[]
    | ((renderCallbackParams: RenderCallbackParams) => string | string[]);
  // BaseHelp组件道具
  helpComponentProps?: Partial<HelpComponentProps>;
  // 标签宽度，如果通过，则itemProps配置的labelCol和WrapperCol将无效
  labelWidth?: string | number;
  // 使用formModel的全局设置禁用labelWidth的调整，并自行手动设置labelCol和wrapperCol
  disabledLabelWidth?: boolean;
  // 渲染组件
  component: ComponentType;
  // Component parameters
  componentProps?:
    | ((opt: {
        schema: FormSchema;
        tableAction: TableActionType;
        formActionType: FormActionType;
        formModel: Recordable;
      }) => Recordable)
    | object;
  // Required
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  suffix?: string | number | ((values: RenderCallbackParams) => string | number);

  // Validation rules
  rules?: Rule[];
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean;

  // Reference formModelItem
  itemProps?: Partial<FormItem>;

  // col configuration outside formModelItem
  colProps?: Partial<ColEx>;

  // 默认值
  defaultValue?: any;
  isAdvanced?: boolean;

  // Matching details components
  span?: number;

  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  // Render the content in the form-item tag
  render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;

  // Rendering col content requires outer wrapper form-item
  renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;

  renderComponentContent?:
    | ((renderCallbackParams: RenderCallbackParams) => any)
    | VNode
    | VNode[]
    | string;

  // Custom slot, in from-item
  slot?: string;

  // Custom slot, similar to renderColContent
  colSlot?: string;

  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[];
}
export interface HelpComponentProps {
  maxWidth: string;
  // Whether to display the serial number
  showIndex: boolean;
  // Text list
  text: any;
  // colour
  color: string;
  // font size
  fontSize: string;
  icon: string;
  absolute: boolean;
  // Positioning
  position: any;
}
