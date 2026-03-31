/** `XLSX.utils.sheet_to_json` 单行结构 */
export type ExcelSheetRow = Record<string, unknown>;

export interface ExcelProps {
  exportData: (data: ExcelSheetRow[]) => void;
}
