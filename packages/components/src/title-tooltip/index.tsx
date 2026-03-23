import { Tooltip } from "antd";
import HeartSvg from '../assets/images/question-circle-fill.svg';
export const tooltip = (props: any) => {
  const { text, placement = 'top', title } = props;
  return (
    <Tooltip
      placement={placement}
      title={
        <>
          指标口径说明 <br></br>{title}
        </>
      }
    >
      <p style={{ margin: '0px' }}>{text}<img src={HeartSvg} style={{ position: 'relative', left: '3px' }} /></p>
    </Tooltip>
  );
};

export default tooltip;
