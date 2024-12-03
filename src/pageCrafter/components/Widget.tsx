import { memo, createElement } from 'react';

const Widget = ({component, children, ...props}: {component: any, children: any, [key: string]: any}) => {
    return createElement(
		component,
		props,
		children
	);
}

export default memo(Widget, (oldProps: any, newProps: any) => {
    const keys = Object.keys(oldProps);
    // console.log(oldProps, newProps);
    for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === 'component') {
            continue;
        }
        if (typeof oldProps[key] === 'function') {
            continue;
        }
        if (oldProps[key] !== newProps[key]) {
            return false;
        }
    }
    return true;
});