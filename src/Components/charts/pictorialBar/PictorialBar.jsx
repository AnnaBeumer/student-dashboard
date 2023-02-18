import React from 'react';
import ReactECharts from 'echarts-for-react';

export const PictorialBar = ({data, type}) => {
	const symbolColorVar = getComputedStyle(document.documentElement).getPropertyValue('--primary');
	const textColorVar = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
	const symbol = type === 'difficulty' ? 'M12 44v-8.6q-2.85-2.6-4.425-6.075Q6 25.85 6 22q0-7.5 5.25-12.75T24 4q6.25 0 11.075 3.675Q39.9 11.35 41.35 17.25l2.75 10.9q.2.7-.25 1.275t-1.2.575H38v7q0 1.25-.875 2.125T35 40h-5v4h-3v-7h8V27h5.7l-2.25-9q-1.2-4.85-5.25-7.925T24 7q-6.25 0-10.625 4.325T9 21.9q0 3.2 1.325 6.1 1.325 2.9 3.725 5.15l.95.9V44Zm12.85-18.5Zm-2.4 3.8h3l.15-2.2q.6-.1 1.125-.425.525-.325.925-.725l2.1.7 1.4-2.4-1.5-1.2q.25-.7.25-1.45t-.25-1.45l1.5-1.2-1.4-2.4-2.1.7q-.4-.4-.95-.7-.55-.3-1.1-.45l-.15-2.2h-3l-.15 2.2q-.55.15-1.1.45-.55.3-.95.7l-2.1-.7-1.4 2.4 1.5 1.2q-.25.7-.25 1.45t.25 1.45l-1.5 1.2 1.4 2.4 2.1-.7q.4.4.925.725.525.325 1.125.425Zm1.5-4.2q-1.45 0-2.475-1.025Q20.45 23.05 20.45 21.6q0-1.45 1.025-2.475Q22.5 18.1 23.95 18.1q1.45 0 2.475 1.025Q27.45 20.15 27.45 21.6q0 1.45-1.025 2.475Q25.4 25.1 23.95 25.1Z' : 'M31.3 21.35q1.15 0 1.925-.8.775-.8.775-1.9 0-1.15-.775-1.925-.775-.775-1.925-.775-1.1 0-1.9.775-.8.775-.8 1.925 0 1.1.8 1.9.8.8 1.9.8Zm-14.6 0q1.15 0 1.925-.8.775-.8.775-1.9 0-1.15-.775-1.925-.775-.775-1.925-.775-1.1 0-1.9.775-.8.775-.8 1.925 0 1.1.8 1.9.8.8 1.9.8Zm7.3 13.6q3.3 0 6.075-1.775Q32.85 31.4 34.1 28.35h-2.6q-1.15 2-3.15 3.075-2 1.075-4.3 1.075-2.35 0-4.375-1.05t-3.125-3.1H13.9q1.3 3.05 4.05 4.825Q20.7 34.95 24 34.95ZM24 44q-4.15 0-7.8-1.575-3.65-1.575-6.35-4.275-2.7-2.7-4.275-6.35Q4 28.15 4 24t1.575-7.8Q7.15 12.55 9.85 9.85q2.7-2.7 6.35-4.275Q19.85 4 24 4t7.8 1.575q3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24t-1.575 7.8q-1.575 3.65-4.275 6.35-2.7 2.7-6.35 4.275Q28.15 44 24 44Zm0-20Zm0 17q7.1 0 12.05-4.95Q41 31.1 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.1 0-12.05 4.95Q7 16.9 7 24q0 7.1 4.95 12.05Q16.9 41 24 41Z';
	const maxData = 5;
	const getOption = () => ({
		tooltip: {}, xAxis: {
			max: maxData, splitLine: {show: false}, axisLine: {
				lineStyle: {
					color: textColorVar
				}
			}, axisLabel: {show: false}
		}, yAxis: {
			show: false, data: [], inverse: true, axisTick: {show: false}, axisLine: {show: false}
		}, grid: {
			top: '0', left: 0, containLabel: false, height: 'inherit', width: 'inherit'
		}, series: [{
			type: 'pictorialBar', symbol: `path://${symbol}`, itemStyle: {
				color: symbolColorVar
			}, symbolRepeat: maxData, symbolClip: true, data: [data]
		}, {
			type: 'pictorialBar', symbol: `path://${symbol}`, itemStyle: {
				opacity: 0.2, color: symbolColorVar
			}, symbolRepeat: maxData, animationDuration: 10, data: [data]
		}]
	});
	return (<ReactECharts
			style={{height: 'inherit', width: 'inherit'}}
			option={getOption()}
			notMerge={true}
			lazyUpdate={true}
		/>);
};