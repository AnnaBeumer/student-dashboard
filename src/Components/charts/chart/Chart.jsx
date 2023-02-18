import React from 'react';
import './css/chart.css';

import {
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	Legend,
	Line,
	LineChart,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
import store from '../../../redux/store';
import {selectSticky} from '../../../redux/Selector/selector.actions';
import {useSelector} from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import * as material from '@mui/material';
import {useNavigate} from 'react-router-dom';

export const Chart = ({title, data, dataKeyY, type, general}) => {
	data = Object.values(data);
	const stickyValue = useSelector((state) => {
		return state.stickySelect;
	});
	const handleFunSelector = (val) => {
		if (!val && !difficulty) {
			setDifficulty(!val);
		}
		setFun(val);
	};
	const [fun, setFun] = React.useState(true);
	const handleDifficultySelector = (val) => {
		if (!val && !fun) {
			setFun(!val);
		}
		setDifficulty(val);
	};
	const [difficulty, setDifficulty] = React.useState(true);

	const [chartType, setChartType] = React.useState('bar');
	const handleStickyChangeBut = (val) => {
		store.dispatch(selectSticky(val));
	};
	const handleChartTypeChangeToggle = (val) => {
		setChartType(val);
	};
	const navigate = useNavigate();
	const handleBarClick = (e) => {
		const id = e.activePayload[0].payload.id;
		navigate(`/${type}/${id}`);
	};
	const pluralDataKeys = data.length > 1;

	return (<div className={stickyValue ? 'widgetContainer lock' : 'widgetContainer'}>
		<div className={'chartMenu'}>
			<material.Tooltip title={chartType === 'line' ? 'Line Chart' : 'Show Line Chart'}>
				<button onClick={() => handleChartTypeChangeToggle('line')}
				        className={chartType === 'line' ? 'chartButtonLeft chartActiveButton' : 'chartButtonLeft chartInactiveButton'}>
					<TimelineOutlinedIcon/>
				</button>
			</material.Tooltip>
			<material.Tooltip title={chartType === 'bar' ? 'Bar Chart' : 'Show Bar Chart'}>
				<button onClick={() => handleChartTypeChangeToggle('bar')}
				        className={chartType === 'bar' ? 'chartButtonMid chartActiveButton' : 'chartButtonMid chartInactiveButton'}>
					<BarChartIcon/>
				</button>
			</material.Tooltip>
			<material.Tooltip title={fun ? 'Hide Fun Factor Data' : 'Show Fun Factor Data'}>
				<button onClick={() => handleFunSelector(!fun)}
				        className={fun ? 'chartButtonMid chartActiveButton' : 'chartButtonMid chartInactiveButton'}>
					<SentimentSatisfiedOutlinedIcon/>
				</button>
			</material.Tooltip>
			<material.Tooltip title={difficulty ? 'Hide Difficulty Data' : 'Show Difficulty Data'}>
				<button onClick={() => handleDifficultySelector(!difficulty)}
				        className={difficulty ? 'chartButtonMid chartActiveButton' : 'chartButtonMid chartInactiveButton'}>
					<PsychologyOutlinedIcon/>
				</button>
			</material.Tooltip>
			<material.Tooltip title={stickyValue ? 'UnPin chart on place' : 'Pin chart on place'}>
				<button onClick={() => handleStickyChangeBut(!stickyValue)}
				        className={stickyValue ? 'chartButtonRight chartActiveButton' : 'chartButtonRight chartInactiveButton'}>
					{stickyValue ? <LockOutlinedIcon/> : <LockOpenOutlinedIcon/>}
				</button>
			</material.Tooltip>
			<span className={'chartTitle'}>{title}</span>
		</div>

		<ResponsiveContainer with="100%" aspect={8 / 2}>
			{chartType === 'bar' ?
				<BarChart data={data} onClick={(e) => {
					if (e != null) {
						handleBarClick(e);
					}
				}} cursor={'pointer'}>

					<XAxis
						dataKey={'name'}
						type="category"
						angle={-30}
						textAnchor="end"
						interval={0}
						height={100}
						fontSize={11}
						stroke={'var(--text-color)'}
						tick={{fill: 'var(--text-color)'}}
						tickLine={{stroke: 'var(--text-color)'}}
					>
						<Label value={pluralDataKeys ? type + 's' : type} offset={0} position="insideBottom"
						       fill={'var(--text-color)'}/>
					</XAxis>
					<YAxis
						type="number"
						domain={[0, 5]}
						tickCount={10}
						allowDecimals={false}
						fontSize={11}
						tick={{fill: 'var(--text-color)'}}
						tickLine={{stroke: 'var(--text-color)'}}
						stroke={'var(--text-color)'}
					/>
					{fun ? <Bar
						type="monotone"
						dataKey={dataKeyY.funFactor}
						stroke="var(--primary)"
						fill="var(--primary)"
						animationEasing={'ease'}
					/>: null}
					{difficulty ? <Bar
						id={'diffBar'}
						type="monotone"
						dataKey={dataKeyY.difficulty}
						stroke="var(--secondary)"
						fill="var(--secondary)"
						animationEasing={'ease'}
					/>: null}
					{fun ?
						<ReferenceLine y={general?.funFactor} stroke={'var(--avarage-fun)'} strokeWidth={2}/>
						:null}
					{difficulty ?
						<ReferenceLine y={general?.difficulty}  stroke={'var(--avarage-diff)'} strokeWidth={2}/>
						:null}
					<CartesianGrid strokeDasharray="1 1" stroke={'var(--text-color)'} opacity={'50%'}/>
					<Tooltip contentStyle={{backgroundColor: 'var(--bg-color)'}} wrapperStyle={{outline: 'none'}}
					         cursor={{fill: 'rgba(206, 206, 206, 0.5)'}}/>
					<Legend align="center" verticalAlign="top" payload={[
						{ value: `Average funFactor ${general?.funFactor}`, color: 'var(--avarage-fun)', type: "line" },
						{ value: `Average difficulty ${general?.difficulty}`, color: 'var(--avarage-diff)', type: "line" },
						{value: "funFactor", color: "var(--primary)", type: "square"},
						{value: "difficulty", color: "var(--secondary)", type: "square"}
					]} />

				</BarChart>
				: (
					<LineChart data={data} onClick={(e) => {
						if (e != null) {
							handleBarClick(e);
						}
					}} cursor={'pointer'}>
						<XAxis
							// dataKey={type}
							dataKey={'name'}
							type="category"
							angle={-30}
							textAnchor="end"
							interval={0}
							height={100}
							fontSize={11}
							tick={{fill: 'var(--text-color)'}}
							tickLine={{stroke: 'var(--text-color)'}}
						>
							<Label value={pluralDataKeys ? type + 's' : type} offset={0} position="insideBottom"/>
						</XAxis>
						<YAxis
							type="number"
							domain={[0, 5]}
							tickCount={10}
							allowDecimals={false}
							fontSize={11}
							tick={{fill: 'var(--text-color)'}}
							tickLine={{stroke: 'var(--text-color)'}}
						/>{fun ? <Line
						type="monotone"
						dataKey={dataKeyY.funFactor}
						stroke="var(--primary)"
						fill="var(--primary)"
						animationEasing={'ease'}
					/> : null}
						{difficulty ? <Line
								type="monotone"
								dataKey={dataKeyY.difficulty}
								stroke="var(--secondary)"
								fill="var(--secondary)"
								animationEasing={'ease'}
							/>
							: null}
						{fun ?
							<ReferenceLine y={general?.funFactor} isFront={true}  stroke={'var(--avarage-fun)'} strokeWidth={2}/>
							:null}
						{difficulty ?
							<ReferenceLine y={general?.difficulty} isFront={true}  stroke={'var(--avarage-diff)'} strokeWidth={2}/>
							:null}
						<CartesianGrid strokeDasharray="1 1" stroke={'var(--text-color)'} opacity={'50%'}/>
						<Tooltip contentStyle={{backgroundColor: 'var(--bg-color)'}} wrapperStyle={{outline: 'none'}}
						         style={{cursor: 'pointer'}} cursor={{fill: 'rgba(206, 206, 206, 0.5)'}}/>
						<Legend align="center" verticalAlign="top" payload={[
							{ value: `Average funFactor ${general?.funFactor}`, color: 'var(--avarage-fun)', type: "line" },
							{ value: `Average difficulty ${general?.difficulty}`, color: 'var(--avarage-fun)', type: "line" },
							{value: "funFactor", color: "var(--primary)", type: "line"},
							{value: "difficulty", color: "var(--secondary)", type: "line"}
						]} />
					</LineChart>
				)}
		</ResponsiveContainer>
	</div>);
};
