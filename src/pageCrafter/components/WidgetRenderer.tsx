import React from "react";
import { ISchema } from "../shared/interfaces";
import { processTemplate } from "../shared/utils";
import PageRenderer from "./PageRenderer";

export interface IWidgetRendererProps {
	data: Record<string, any>,
	events: Record<string, Function>;
	schemaItem: ISchema;
    components: Record<string, any>;
}

const WidgetRenderer = ({ data, events, schemaItem, components }: IWidgetRendererProps) => {
	const prepState = () => {
		// props
		const props = Object.assign({}, schemaItem.props);
		Object.keys(props).forEach(key => {
			let dataName = props![key];
			if (typeof dataName !== 'string') {
				return;
			}

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
			
			localEvents[key] = processTemplate(fnName, events);
		});

		// final object
		return {
			...props,
			...localEvents
		};
	};

	const component = components[schemaItem.type] ?? schemaItem.type;
	
	return React.createElement(
		component,
		prepState(),
		schemaItem.children ? <PageRenderer data={data} events={events} schema={schemaItem.children} components={components} /> : null
	);
};

export default WidgetRenderer;