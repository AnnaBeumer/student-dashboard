import React from 'react';
import {sortAndCollectRatings, topNumber} from '../../../utils';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import {PictorialBar} from '../../../Components/charts/pictorialBar/PictorialBar';
import {TopThreeItemsMicro} from './TopThreeItemsMicro';

export const TopThreeItems = ({averageData, headerText, type}) => {

	const valueResults = sortAndCollectRatings({averageData: averageData});
	const topThreeHighDifficulty = topNumber({
		direction: 'high', obj: valueResults, type: 'difficulty', topNumber: 3
	});
	const topThreeLowDifficulty = topNumber({
		direction: 'low', obj: valueResults, type: 'difficulty', topNumber: 3
	});
	const topThreeHighFunFactor = topNumber({
		direction: 'high', obj: valueResults, type: 'funFactor', topNumber: 3
	});
	const topThreeLowFunFactor = topNumber({
		direction: 'low', obj: valueResults, type: 'difficulty', topNumber: 3
	});

	return (<div>
		<div className={'widgetTitle'}>{headerText}</div>
		<div className={'widgetSubTitle'}><PsychologyOutlinedIcon className={'statistics-icon'}/>Difficulty</div>
		<div className={'statistics-grid-containerTwo'}>
			<div className={'statistics-grid-item statistics-boxTopLine'}>Most difficult
				<div style={{padding: '0px', height: '35px', width: '150px'}}>
					<PictorialBar data={Object.keys(topThreeHighDifficulty)[0] - 0} type={'difficulty'}/>
				</div>
			</div>
			<TopThreeItemsMicro listingObj={topThreeHighDifficulty} type={type} valueResults={valueResults}/>
			<div className={'statistics-grid-item statistics-boxTopLine'}>Least difficult
				<div style={{padding: '0px', height: '35px', width: '150px'}}>
					<PictorialBar data={Object.keys(topThreeLowDifficulty)[0] - 0} type={'difficulty'}/>
				</div>
			</div>
			<TopThreeItemsMicro listingObj={topThreeLowDifficulty} type={type} valueResults={valueResults}/>
		</div>
		<div className={'widgetSubTitle'}><SentimentSatisfiedOutlinedIcon className={'statistics-icon'}/>FunFactor</div>
		<div className={'statistics-grid-containerTwo'}>
			<div className={'statistics-grid-item statistics-boxTopLine'}>Most fun
				<div style={{padding: '0px', height: '35px', width: '150px'}}>
					<PictorialBar data={Object.keys(topThreeHighFunFactor)[0] - 0} type={'funFactor'}/>
				</div>
			</div>
			<TopThreeItemsMicro listingObj={topThreeLowDifficulty} type={type} valueResults={valueResults}/>
			<div className={'statistics-grid-item statistics-boxTopLine'}>Least fun
				<div style={{padding: '0px', height: '35px', width: '150px'}}>
					<PictorialBar data={Object.keys(topThreeLowFunFactor)[0] - 0} type={'funFactor'}/>
				</div>
			</div>
			<TopThreeItemsMicro listingObj={topThreeLowDifficulty} type={type} valueResults={valueResults}/>
		</div>
	</div>);
};