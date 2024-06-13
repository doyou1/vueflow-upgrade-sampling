import { Node as NodeOriginal, Edge as EdgeOriginal } from "@vue-flow/core"
import { ref } from "vue";

export type Elements = (Node | Edge)[];

export type Node = NodeWrap & NodeProps;
export type Edge = EdgeOriginal & EdgeProps;

export type NodeWrap = SqlNode | SelectNode | GroupByNode | JoinNode | FilterNode | DataSourceNode | DatasetNode;

export type NodeProps = {
    position: XYPosition;
    type: NodeType;
}

export type NodeType = 
| "sql"
| "select"
| "group_by"
| "join"
| "filter"
| "data_source"
| "dataset";
export type SqlNode = NodeOriginal<SqlNodeData, any, "sql">
export type SelectNode = NodeOriginal<SelectNodeData, any, "select">
export type GroupByNode = NodeOriginal<GroupByNodeData, any, "group_by">
export type JoinNode = NodeOriginal<JoinNodeData, any, "join">
export type FilterNode = NodeOriginal<FilterNodeData, any, "filter">
export type DataSourceNode = NodeOriginal<DataSourceNodeData, any, "data_source">
export type DatasetNode = NodeOriginal<DatasetNodeData, any, "dataset">
export type SqlNodeData = {
    name: string;
    value: string;
};

export type Option = {
    value: string;
    label: string;
}
export type SelectNodeData = {
    name: string;
    value: string;
    options: Option[];
}

export type GroupByNodeData = {
    name: string;
}

export type JoinNodeData = {
    name: string;
}

export type FilterNodeData = {
    name: string;
}

export type DataSourceNodeData = {
    name: string;
}

export type DatasetNodeData = {
    name: string;
}

export type EdgeProps = {
}

export type XYPosition = {
    x: number
    y: number
}

export enum SIZE {
    WIDTH = 150,
    HEIGHT = 50
}

export type InnerNode = Omit<Node, "position" | "width" | "height">;


const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}


const getInitNodes = (): Array<Node> => {
    return [
        {
            id: '1',
            type: 'sql',
            data: {
                name: "SQL",
                value: "",
            },
            position: { x: getRandomNumber(0, 300), y: getRandomNumber(0, 300) },
            width: SIZE.WIDTH,
            height: SIZE.HEIGHT,
        },
        {
            id: '2',
            type: 'select',
            data: {
                name: "SELECT",
                value: "",
                options: [
                    {
                        value: "1",
                        label: "label1",
                    },
                    {
                        value: "2",
                        label: "label2",
                    },
                    {
                        value: "3",
                        label: "label3",
                    },
                ],
            },
            position: { x: getRandomNumber(0, 300), y: getRandomNumber(0, 300) },
            width: SIZE.WIDTH,
            height: SIZE.HEIGHT,
        },
        {
            id: '3',
            type: 'group_by',
            data: {
                name: "GROUPBY",
            },
            position: { x: getRandomNumber(0, 300), y: getRandomNumber(0, 300) },
            width: SIZE.WIDTH,
            height: SIZE.HEIGHT,
        },
        {
            id: '4',
            type: 'join',
            data: {
                name: "JOIN",
            },
            position: { x: getRandomNumber(0, 300), y: getRandomNumber(0, 300) },
            width: SIZE.WIDTH,
            height: SIZE.HEIGHT,
        },
        {
            id: '5',
            type: 'filter',
            data: {
                name: "FILTER",
            },
            position: { x: getRandomNumber(0, 300), y: getRandomNumber(0, 300) },
            width: SIZE.WIDTH,
            height: SIZE.HEIGHT,
        },
        {
            id: '6',
            type: 'data_source',
            data: {
                name: "DATASOURCE",
            },
            position: { x: getRandomNumber(0, 300), y: getRandomNumber(0, 300) },
            width: SIZE.WIDTH,
            height: SIZE.HEIGHT,
        },
        {
            id: '7',
            type: 'dataset',
            data: {
                name: "DATASET",
            },
            position: { x: getRandomNumber(0, 300), y: 114 },
            width: SIZE.WIDTH,
            height: SIZE.HEIGHT,
        },
    ];
}

export const useVueflowController = () => {

    const nodes = ref<Array<Node>>(getInitNodes());

    /** update position value */
    const handleNodeDragStop = (nodeId: string, newPosition: XYPosition) => {
        const tIdx = nodes.value.findIndex((node) => node.id === nodeId);
        if (tIdx !== -1) {
            nodes.value[tIdx].position = newPosition;
        }
    }

    return {
        nodes,
        handleNodeDragStop
    };

}