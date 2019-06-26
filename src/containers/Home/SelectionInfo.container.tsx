import React from 'react'
import { Grid } from 'semantic-ui-react';

import { SelectedSlots } from '../../components/SelectedSlots.component';
import AllotedSlots from '../../components/AllotedSlots.components';

export function SelectionInfo() {
	return (
		<Grid>
			<Grid.Row>
				<SelectedSlots />
			</Grid.Row>
			<Grid.Row>
				<AllotedSlots />
			</Grid.Row>
		</Grid>
	)
}
