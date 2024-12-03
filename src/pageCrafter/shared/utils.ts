import { HANDLE_REGEX_GLOBAL } from './constants';
import Jexl from 'jexl';

Jexl.addFunction('toFixed', (src: number, limit = 2) => src.toFixed(limit));

const memoize = (cb: Function) => {
    const cache: Record<string, any> = {};
    return (...args: any[]) => {
        const key = args.join(); // ideally we should hash this to get key
        if (cache[key] != null) {
            return cache[key];
        } else {
            const result = cb(...args);
            cache[key] = result;
            return result;
        }
    };
};

// ======= template processing without library but does not execute expressions ======= //
// const cleanVariable = (str: string) => str.replace('{', '').replace('}', '').trim();
// const getReactiveVar = (str: string) => {
//     const result = str.match(HANDLE_REGEX);
//     return (result ? {
//         variable: cleanVariable(result[0]),
//         originalMatch: result[0],
//         index: result.index ?? -1
//     } : null);
// };
// export const processStringTemplate = (str: string, data: Record<string, any>, defaultTypeVariable = false) => {
//     let source = str;
//     let destination = '';
//     let result = getReactiveVar(source);
    
//     // if there are no handle bars
//     if (result === null) {
//         // but we want to treat the string as variable anyway
//         if (str && defaultTypeVariable) {
//             return data[cleanVariable(str)];
//         } else {
//             return str;
//         }
//     }
    
//     // if the string is the variable with handle bars
//     if (result.index === 0 && result.originalMatch.length === str.trim().length) {
//         return data[result.variable];
//     }

//     // if the string contains static string and variable or multiple variables
//     while(result) {
//         const { variable, originalMatch, index } = result;
//         // if data against the variable name exists
//         let toReplace = originalMatch;
//         if (data[variable] != null) {
//             toReplace = data[variable];
//         }

//         destination = destination + source.substring(0, index) + toReplace;
//         source = source.substring((index ?? 0) + originalMatch.length);
//         result = getReactiveVar(source);
//     }
//     destination = destination + source;
//     return destination;
// };
// ======= template processing without library but does not execute expressions ======= //


// ======= template processing without library but does not work with unsafe-eval ======= //
// NOTE: This should be used if page-craft is used on the backend for frontend service
// const generateFn = (str: string, keyName = 'data') => {
//     let ogStr = str;
//     // identify all handlebar variables
//     const matches = ogStr.matchAll(HANDLE_REGEX_GLOBAL);
//     let isString = false;
//     for (const match of matches) {
//         const og = match[0];
//         // const index = match.index;
//         // if there are multiple variables or static string
//         // this flag will be true
//         isString = og.length !== ogStr.trim().length;
//         if (isString) {
//             // if the output needs to be string then form the string
//             // replace {a} with " + (a) + "
//             const variableName = og.replace('{', '" + (').replace('}', ') + "');
//             ogStr = ogStr.replace(og, variableName);
//         } else {
//             // if not a string, then this else will be called just one and we can return from here
//             const cleanCode = og.replace('{', '').replace('}', '').trim();
//             const dynamicFn = new Function(keyName, `return (${cleanCode});`);
//             return dynamicFn;
//         }
//     }

//     // it str was a string then post the loop out string should be ready
//     // now we need to just return
//     if (isString) {
//         const dynamicFn = new Function(keyName, `return "${ogStr}";`);
//         return dynamicFn;
//     }

//     return str;
// };
// const memoizedGenerateFn = memoize(generateFn);
// export const processTemplate = (str: string, data: any, keyName = 'data') => {
//     const dynamicFn = memoizedGenerateFn(str, keyName);
//     if (typeof dynamicFn === 'function') {
//         return dynamicFn(data);
//     }
//     return str;
// };
// ======= template processing without library but does not work with unsafe-eval ======= //

// ======= template processing with library Jexl for safe expression parsing without eval
const generateFn = (str: string) => {
    let ogStr = str;
    // identify all handlebar variables
    const matches = ogStr.matchAll(HANDLE_REGEX_GLOBAL);
    let isString = false;
    for (const match of matches) {
        const og = match[0];
        // const index = match.index;
        // if there are multiple variables or static string
        // this flag will be true
        isString = og.length !== ogStr.trim().length;
        if (isString) {
            // if the output needs to be string then form the string
            // replace {a} with " + (a) + "
            const variableName = og.replace('{', '" + (').replace('}', ') + "');
            ogStr = ogStr.replace(og, variableName);
        } else {
            // if not a string, then this else will be called just one and we can return from here
            const cleanCode = og.replace('{', '').replace('}', '').trim();
            const dynamicFn = Jexl.compile(cleanCode);
            return dynamicFn;
        }
    }

    // it str was a string then post the loop out string should be ready
    // now we need to just return
    if (isString) {
        const dynamicFn = Jexl.compile(`"${ogStr}"`);
        return dynamicFn;
    }

    return str;
};
const memoizedGenerateFn = memoize(generateFn);

export const processTemplate = (str: string, data: any) => {
    const dynamicFn = memoizedGenerateFn(str);
    if (typeof dynamicFn === 'object' && dynamicFn.evalSync) {
        return dynamicFn.evalSync(data);
    }
    return str;
};

