import StringRenderer from "./components/StringRenderer";
import WidgetRenderer from "./components/WidgetRenderer";
import { PageCrafterChildren } from "./shared/interfaces";

export interface IPageCrafterProps {
    data: Record<string, any>,
    events: Record<string, Function>,
    schema: PageCrafterChildren;
}

const PageCrafter = ({ data, events, schema }: IPageCrafterProps) => {
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
                    />
            ))}
        </>
    );
}

export default PageCrafter;