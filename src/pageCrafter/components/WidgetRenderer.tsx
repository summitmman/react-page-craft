import React from "react";
import { ISchema } from "../shared/interfaces";
import PageCrafter from "..";
import { processTemplate } from "../shared/utils";

export interface IWidgetRendererProps {
	data: Record<string, any>,
	events: Record<string, Function>,
	schemaItem: ISchema;
}

const WidgetRenderer = ({ data, events, schemaItem }: IWidgetRendererProps) => {
	const prepState = () => {
		// props
		const props = Object.assign({}, schemaItem.props);
		Object.keys(props).forEach(key => {
			let dataName = props![key];
			if (typeof dataName !== 'string') {
				return;
			}

			// props[key] = processStringTemplate(dataName, data, false);
			props[key] = processTemplate(dataName, data);
		});
		if (schemaItem.id) {
			props.id = schemaItem.id;
		}
		// events
		const localEvents: Record<string, any> = Object.assign({}, schemaItem.events);
		Object.keys(localEvents).forEach(key => {
			let fnName = localEvents[key];
			if (typeof fnName !== 'string') {
				return;
			}
			
			// localEvents[key] = processStringTemplate(fnName, events, true);
			localEvents[key] = processTemplate(fnName, events, 'events');
		});

		// final object
		return {
			...props,
			...localEvents
		};
	};
	
	return React.createElement(
		schemaItem.type,
		prepState(),
		schemaItem.children ? <PageCrafter data={data} events={events} schema={schemaItem.children} /> : null
	);
};

export default WidgetRenderer;