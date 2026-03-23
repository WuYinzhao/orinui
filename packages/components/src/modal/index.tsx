import { Modal } from 'antd';
import './index.less';
export default (props: any) => {
  const { children, ...otherProps } = props;
  return (
    <Modal {...otherProps} wrapClassName={'dialog-item'}>
      {children}
    </Modal>
  );
};
