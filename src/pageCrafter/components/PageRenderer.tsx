import { PageCrafterChildren } from "../shared/interfaces";
import StringRenderer from "./StringRenderer";
import WidgetRenderer from "./WidgetRenderer";

interface IPageRendererProps {
    data: Record<string, any>;
    events: Record<string, Function>;
    schema: PageCrafterChildren;
    components: Record<string, any>;
}

const PageRenderer = ({ data, schema, events, components }: IPageRendererProps) => {
    return (
        <>
            {schema.map((item, index) => (
                typeof item === 'string'
                    ? <StringRenderer
                        key={'string' + item.substring(0, 3) + index}
                        data={data}
                        schema={item}
                    />
                    : <WidgetRenderer
                        key={item.id + item.type + index}
                        data={data}
                        events={events}
                        schemaItem={item}
                        components={components}
                    />
            ))}
        </>
    );
}

export default PageRenderer