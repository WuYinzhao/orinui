import type { EChartsOption } from 'echarts';
import type ReactEcharts from 'echarts-for-react';
import type { CSSProperties } from 'react';

export type EChartsReactRef = React.ComponentRef<typeof ReactEcharts>;

export interface ChartProps {
  optionDefault: EChartsOption;
  optionChange?: EChartsOption;
  style?: CSSProperties;
  onEvents?: Record<string, (e: unknown) => void>;
  registerEvents?: Record<string, (e: unknown) => void>;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  renderWithSVG?: boolean;
}

export interface CreateTooltipOptions {
  unit?: string;
  precision?: number;
}

/** echarts tooltip formatter 数组项（与运行时解构字段对齐） */
export interface EChartsTooltipRow {
  marker?: string;
  seriesName?: string;
  axisValue?: string;
  seriesType?: string;
  data?: unknown;
  seriesIndex?: number;
  unit?: string;
}
