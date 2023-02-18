import {styled} from '@mui/material/styles';
import {FormControlLabel} from '@mui/material';

function customControlLabel() {
	return {
		'& .MuiButtonBase-root svg':{
			color: 'var(--text-color)',
			borderColor: 'var(--secondary)'
		},
		'& .MuiSvgIcon-root': {
			fontSize: 16,
		}

	};
}

export const StyledFormControlLabel = styled(FormControlLabel)(({theme}) => ({
	...customControlLabel(theme)
}));