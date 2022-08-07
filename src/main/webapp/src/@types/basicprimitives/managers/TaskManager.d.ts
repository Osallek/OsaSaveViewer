export default function TaskManager(): {
    addTask: (taskName: any, taskDependencies: any, factory: any, color: any) => void;
    addDependency: (name: any, dependency: any) => void;
    getTask: (taskName: any) => any;
    process: (startTask: any, stopTask: any, debug: any) => void;
    getProcessDiagramConfig: () => {
        id: any;
        title: string;
        description: any;
        itemTitleColor: any;
        parents: any[];
    }[];
};
