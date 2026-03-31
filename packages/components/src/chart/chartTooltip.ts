import type { CreateTooltipOptions, EChartsTooltipRow } from './type';

export const tooltipFormate = (
  params: EChartsTooltipRow | EChartsTooltipRow[],
  options?: CreateTooltipOptions,
) => {
  let result = '';
  if (Array.isArray(params)) {
    result = createArrayTooltipFormatter(params, options);
  }
  return result;
};

export const createArrayTooltipFormatter = (
  params: EChartsTooltipRow[],
  options: CreateTooltipOptions = {},
  tittle = true,
): string => {
  let result = '';
  params.forEach(function (item: EChartsTooltipRow, index) {
    const {
      marker,
      seriesName,
      axisValue,
      seriesType,
      data: itemData,
      seriesIndex,
      unit: itemUnit,
    } = item || {};
    if (index === 0 && tittle) {
      result += axisValue + '<br/>';
    }
    let unit = '';
    switch (seriesType) {
      case 'bar':
        unit = '(亿元)';
        break;
      case 'line':
        unit = '(%)';
        break;
      default:
        break;
    }
    const { unit: customUnit = '' } = options;
    if (customUnit) {
      unit = customUnit;
    }

    if (itemUnit) {
      unit = itemUnit;
    }
    const idx = seriesIndex ?? 0;
    const data = Array.isArray(itemData) ? itemData[idx + 1] : itemData;
    result += createToolTipInner(
      {
        marker: String(marker ?? ''),
        name: String(seriesName ?? ''),
        value: data as string | number,
      },
      { ...options, unit },
    );
  });

  return result;
};
export const createToolTipInner = (
  params: { marker: string; name: string; value: string | number },
  options?: CreateTooltipOptions,
) => {
  const { marker, name, value } = params;
  if (
    value === '' ||
    value === null ||
    value === undefined ||
    isNaN(Number(value))
  ) {
    return '';
  }
  const { unit = '' } = options || {};
  return (
    '<div style="display:flex;align-items:center;justify-content:space-between;">' +
    `<span style='margin-right:12px'>${marker + name + unit}</span>` +
    value +
    '</div>'
  );
};

export const createTooltipValueTmpl = (value: string | number): string => {
  return `<span style="margin-left:0.2rem;">${value}</span>`;
};

export default {
  tooltipFormate,
};
