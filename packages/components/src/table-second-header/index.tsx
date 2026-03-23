import { SingleHeader } from './styled';
/*
tableTitle 表格TITLE
operateContent 操作功能
*/
const SecondHeader = (props: any) => {
  const { tableTitle, operateContent, titleStyle, operateStyle } = props;
  return (
    <SingleHeader>
      <div style={{ fontSize: '14px', ...titleStyle }}>{tableTitle}</div>
      <div style={{ fontSize: '14px', ...operateStyle }}>{operateContent}</div>
    </SingleHeader>
  );
};
export default SecondHeader;
