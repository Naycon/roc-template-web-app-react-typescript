import { Action, combineReducers } from 'redux';

interface iMatchingFunction {
    (toMatch : string) : boolean;
}
interface iReducerFunction {
    (state: any, action: Action) : any
}
interface iReducerHandler {
    isMatching: iMatchingFunction;
    reduceFunction: iReducerFunction;
}
interface iHandlerRegistry {
    [key : string]: Array<iReducerHandler>;
}

interface iReducer {
    (state: any, action: Action) : any
}
interface iReducers {
    [key : string]: Array<iReducer>;
}



function isString(x: any) : x is string {
    return typeof x === "string";
}

function isArray(x: any) : x is Array<any> {
    return Array.isArray(x);
}

function isStringArray(x: any) : x is Array<string> {
    if (isArray(x)) {
        const someElementIsNotString = x.some((y : any) => !isString(y));
        return !someElementIsNotString;
    }

    return false;
}

/**
 * Small replacement for Array.prototype.find, which doesn't seem to be polyfilled
 * for the tests in the decorator context for some reason.
 */
function findInArray<T>(array : Array<T>, testFunc : (el : T) => boolean) : T {
    if (!array || !array.length) {
        return;
    }

    for (let i = 0; i < array.length; i++) {
        if (testFunc(array[i])) {
            return array[i];
        }
    }
}



/**
 * Generates a matching function that will check if an incoming parameter is of the
 * matches with a previously set string or array. Used to check if a certain reducer
 * function should be run for a certain action type.
 */
function getMatchFunc(actionType : string | Array<string>) : iMatchingFunction {
    if (isString(actionType)) {
        return (toMatch) => toMatch === actionType;
    } else if (isStringArray(actionType)) {
        return (toMatch) => actionType.indexOf(toMatch) > -1;
    } else {
        throw new Error(`target has to be either a string or an array of strings. Got ${typeof actionType}.`);
    }
}

/**
 * Creates a reducer that matches an action against all available reduce functions
 * for the given stateName. If any reduce function is set to handle the type
 * of the action, the result of running that function is returned. Otherwise, either
 * the current state (if available) or the default state for the stateName
 * is returned.
 *
 * In other words, this is basically generating the traditional reducer function
 * that contains a gigantic switch statement to switch between action types and run
 * functions based on the type.
 */
function createReducer(constructor : any, stateName : string) : iReducer {
    return (state = constructor.__defaultStates__[stateName], action) => {
        const reduceHandlers = constructor.__handlerRegistry__[stateName];

        // Potential optimization: we could keep track of which targets a composed
        // reducer is interested in and only run this loop if know there is one
        // or more reducers that apply.
        const matchingReducer = findInArray(reduceHandlers, (handler : iReducerHandler) => handler.isMatching(action.type));
        if (matchingReducer) {
            return matchingReducer.reduceFunction(state, action);
        }

        return state;
    }
}

/**
 * Decorator for static reduce functions. Indicates that the decorated function should be
 * used to reduce actions with type `actionType` into the part of the state named
 * `stateName`.
 *
 * @param {string} stateName The name of the property in the resulting state
 * that should be used to store the resulting reduced state. Has to match one of the
 * properties in the object given to the `@reducer` class decorator (see below).
 * @param {string|string[]} actionType The action type this reducer should be run for.
 * Can either be a string or an array of strings. If the latter, the reducer will run
 * if the action type matches any of the strings in the array.
 * @returns A decorator function used to decorate the function following the decorator.
 */
export function reduce(stateName: string, actionType : string | Array<string>) {
    // Generate a matching function for the action types specified in the decorator
    const isMatching = getMatchFunc(actionType);

    return function (constructor : any, name : string, descriptor : PropertyDescriptor) {
        // Create missing internal variables if necessary
        if (!constructor.__handlerRegistry__) {
            constructor.__handlerRegistry__ = {} as iHandlerRegistry;
        }
        if (!constructor.__reducers__) {
            constructor.__reducers__ = {} as iReducers;
        }

        // Create an array to store handlers for stateName
        if (!constructor.__handlerRegistry__[stateName]) {
            constructor.__handlerRegistry__[stateName] = [];
        }

        // Get the reducer function from the property descriptor
        const reduceFunction = descriptor.value;

        // Save the isMatching and reduceFunction for later reference in the actual reducer.
        constructor.__handlerRegistry__[stateName].push({
            isMatching,
            reduceFunction,
        });

        // Finally, if no reducer for the stateName exist, create one
        if (!constructor.__reducers__[stateName]) {
            constructor.__reducers__[stateName] = createReducer(constructor, stateName);
        }
    };
}

/**
 * An abstract class to extend when declaring a reducer class. This gives you the
 * type declaration for the getReducers function that is injected by the `@reducer`
 * decorator. The implementation in this class is just a dummy and will never be
 * called when you use the decorator (thanks to overshadowing). Without extending
 * this class though, Typescript will not be happy with the types in certain situations
 * and you would have to declare the return type of this function yourself.
 */
export abstract class ReducerClass {
    static getReducers() : (state : any, action : Action) => any {
        return (state, action) => {};
    }
}

/**
 * Class decorator for indicating this is a reducer class. The `defaultStates` argument
 * is used to establish what the shape of the reduced state should look like and what
 * the default states should be. Note that nested object structures are not supported,
 * you cannot specify `{ foo: {bar: 1, baz: 2} }`. You can use combineReducers
 * from redux yourself instead to accomplish the desired structure. Of course the
 * state can still contain properties with the type object, which your reducer function
 * populate.
 *
 * @param {Object} defaultStates The shape of the state which will be the result of
 * running the reducers for this reducer class. Each key can be used as `stateName`
 * in the `@reduce` method decorator to register a reduce funtion that will produce
 * a new state for that particular part of the final reduced state. The value corresponding
 * to each key represents the defaultState, that is, the state that will be returned
 * if no previous state exists.
 *
 * Dev note: Because class decorators are run after method decorators, all `@reduce`
 * decorators will have run already and will have registered all the reducers in
 * the `__reducers__` variable already. Therefore we can just wrapp things up here
 * and we're ready to rumble.
 */
export function reducer(defaultStates : {[key: string]: any}) {
    return function (constructor : any) {
        // Check that all the registered reducers have a defaultState available in `defaultState`
        const reducerNames = Object.keys(constructor.__reducers__);

        const missingDefaultState = findInArray(reducerNames, (stateName) => defaultStates[stateName] === undefined);
        if (missingDefaultState) {
            throw new Error(`Missing default state for property ${ missingDefaultState }!`);
        }

        // Store the default states for later reference when reducing
        constructor.__defaultStates__ = defaultStates;

        // Combine the reducers and make them available on __combinedReducers__ in the reducer class
        constructor.__combinedReducers__ = combineReducers(constructor.__reducers__);

        constructor.getReducers = () => constructor.__combinedReducers__;
    }
}
