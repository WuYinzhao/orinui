export const getCellColor = (level: string) => {
  switch (level) {
    case '1':
      return { style: { backgroundColor: '#FFE8D5' } };
    case '2':
      return { style: { backgroundColor: '#DEE7FF' } };
    default:
      return {};
  }
};

export const getCellText = (text: string, level: string) => {
  switch (level) {
    case '1':
    case '2':
      return (
        <div
          className="ant-table-cell-ellipsis"
          style={{ fontWeight: 'bold', fontSize: 16 }}
        >
          {text}
        </div>
      );
    default:
      return text;
  }
};

export default {
  getCellColor,
  getCellText,
};
