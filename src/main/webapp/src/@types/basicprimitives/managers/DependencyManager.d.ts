export default function DependencyManager(): {
    register: (key: any, value: any) => any;
    resolve: (...args: any[]) => (...args: any[]) => any;
};
