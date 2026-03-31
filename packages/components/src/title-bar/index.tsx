import { SingleHeader } from './styled';
import type { TitleBarProps } from './type';
/*
tableTitle 表格TITLE
operateContent 操作功能
*/
const SecondHeader = (props: TitleBarProps) => {
  const {
    leftContent,
    rightContent,
    leftStyle,
    rightStyle,
    leftType = 'text',
    rightType = 'opreate',
  } = props;

  const getDefaultStyle = (type: string) => {
    if (type === 'text') {
      return { color: '#04042c' };
    }
    if (type === 'opreate') {
      return { fontSize: '14px', color: '#1686eb', cursor: 'pointer' };
    }
    //扩展其他类型
    return {};
  };

  return (
    <SingleHeader>
      <div
        style={{ fontSize: '16px', ...getDefaultStyle(leftType), ...leftStyle }}
      >
        {leftContent}
      </div>
      <div
        style={{
          fontSize: '16px',
          ...getDefaultStyle(rightType),
          ...rightStyle,
        }}
      >
        {rightContent}
      </div>
    </SingleHeader>
  );
};
export default SecondHeader;
