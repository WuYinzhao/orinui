import { Modal } from 'antd';
import './index.less';
import type { RuiModalProps } from './type';

export default (props: RuiModalProps) => {
  const { children, ...otherProps } = props;
  return (
    <Modal {...otherProps} wrapClassName={'dialog-item'}>
      {children}
    </Modal>
  );
};
