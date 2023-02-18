import {styled} from '@mui/material/styles';
import {DataGrid} from '@mui/x-data-grid';

function customGrid() {
	return {
		'& .MuiCheckbox-root.Mui-checked svg': {
			color: 'var(--primary)'
		},
		'& .MuiCheckbox-root svg': {
			color: 'var(--text-color)',
			borderColor: 'var(--secondary)'
		},
		'& .MuiDataGrid-columnHeaderTitle': {
			overflow: 'hidden',
			lineHeight: '1.43rem',
			whiteSpace: 'normal'
		},
		'& .MuiDataGrid-main': {
			color: 'var(--text-color)'
		},
		'& .MuiTablePagination-root': {
			color: 'var(--text-color)'
		},
		'& .MuiSvgIcon-root': {
			color: 'var(--text-color)'
		},
		'& .MuiDataGrid-selectedRowCount': {
			color: 'var(--text-color)'
		},
		'& .MuiDataGrid-cell--editable': {
			cursor: 'pointer',
			background: 'var(--editCell)'
		}
	};
}

export const StyledDataGrid = styled(DataGrid)(({theme}) => ({
	...customGrid(theme)
}));