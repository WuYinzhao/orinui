import XLSX from 'xlsx';

export const Excel = (props: { exportData: (data: any[]) => void }) => {
  const { exportData } = props;
  const readData = (event: any) => {
    if (!event.currentTarget.files.length) {
      return;
    }
    // 拿取文件对象
    let f = event.currentTarget.files[0];
    // 用FileReader来读取
    let reader = new FileReader();
    // 重写FileReader上的readAsBinaryString方法
    FileReader.prototype.readAsBinaryString = function (f) {
      let binary = '';
      let wb; // 读取完成的数据
      let outdata; // 你需要的数据
      let reader: any = new FileReader();
      reader.onload = function (e: any) {
        // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
        let bytes = new Uint8Array(reader.result);
        let length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        // 接下来就是xlsx了，具体可看api
        wb = XLSX.read(binary, {
          type: 'binary',
        });
        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        // 自定义方法向父组件传递数据
        exportData(outdata);
      };
      reader.readAsArrayBuffer(f);
    };
    reader.readAsBinaryString(f);
  };

  return (
    <div>
      <input
        style={{ display: 'none' }}
        className="input-file"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={readData}
      />
    </div>
  );
};

export const uploadClick = () => {
  const input = document.querySelector('.input-file') as HTMLInputElement;
  if (input) input.value = '';
  (document.querySelector('.input-file') as HTMLInputElement)?.click();
};

export default {
  Excel: Excel,
  uploadClick: uploadClick,
};
