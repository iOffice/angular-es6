declare class Injectable {
    constructor(...args: any[]);
    static inject(clazz: any, injectables: any[]): void;
}
declare function Inject(args: string[]): Function;
export { Injectable, Inject };
