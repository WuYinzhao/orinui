import ReactEcharts from 'echarts-for-react';
import React, { forwardRef, useEffect, useRef } from 'react';
const Chart: React.FC<any> = (props: any, chartRef: any) => {
  const {
    optionDefault,
    optionChange,
    resize,
    showLoading = false,
    style = { width: '100%', height: '100%' },
    onEvents = [],
    interval = false,
    registerEvents = {},
    notMerge = false,
    intervalLength = 0,
    lazyUpdate = false,
    dispatchAction,
    renderWithSVG = false,
    // onChartReady,
  } = props;

  const chart = chartRef || useRef();

  useEffect(() => {
    if (optionChange && Object.keys(optionChange).length > 0) {
      chart.current?.getEchartsInstance().setOption(optionChange);
    }
  }, [optionChange]);

  useEffect(() => {
    const registerEventsKey = Object.keys(registerEvents);
    if (registerEventsKey.length) {
      const zRender = chart.current?.getEchartsInstance()?.getZr();
      if (zRender) {
        registerEventsKey.forEach((key) => {
          zRender.on(key, registerEvents[key]);
        });
      }
    }
  }, []);
  return (
    <ReactEcharts
      option={optionDefault}
      notMerge={notMerge}
      ref={chart}
      style={{ ...style }}
      onEvents={onEvents}
      opts={
        renderWithSVG
          ? {
              renderer: 'svg',
            }
          : {}
      }
      lazyUpdate={lazyUpdate}
    />
  );
};

export default forwardRef(Chart as any);
