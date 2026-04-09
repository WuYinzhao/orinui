import { Button, Form, Spin } from 'antd';
import { ButtonGroup, ButtonPlaceholder, FormContent } from './styled';
import type { FormPanelProps } from './type';

export default (props: FormPanelProps) => {
  const {
    form,
    children,
    onQuery,
    onReset,
    loading = false,
    useResetButton = true,
    ...otherProps
  } = props;
  return (
    <Spin spinning={loading}>
      <FormContent>
        <Form layout="inline" form={form} {...otherProps}>
          {children}
          <ButtonPlaceholder
            style={{ width: useResetButton ? '160px' : '80px' }}
          ></ButtonPlaceholder>
        </Form>
        <ButtonGroup>
          <Button
            type="primary"
            onClick={() => {
              form?.validateFields().then((values) => {
                onQuery?.(values);
              });
            }}
          >
            查询
          </Button>
          {useResetButton && (
            <Button
              onClick={() => {
                onReset?.();
              }}
            >
              重置
            </Button>
          )}
        </ButtonGroup>
      </FormContent>
    </Spin>
  );
};
