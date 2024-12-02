import { processTemplate } from "../shared/utils";

export interface IStringRendererProps {
	data: Record<string, any>;
	schema: string;
}

const StringRenderer = ({ schema, data }: IStringRendererProps) => {
	return processTemplate(schema, data);
}

export default StringRenderer;