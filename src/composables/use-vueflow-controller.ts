import { Node as NodeOriginal, Edge as EdgeOriginal, useVueFlow } from "@vue-flow/core"
import { ref, watch } from "vue";
import { useId } from "@/composables/use-id";
import invariant from "tiny-invariant";

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

export type Dimensions = {
    width: number;
    height: number;
};

export type InnerNode = Omit<Node, "position" | "width" | "height">;

const getInitNodes = (panelDimensions: Dimensions): Array<Node> => {
    const { generate } = useId();
    return [
        {
            id: generate(),
            type: 'dataset',
            data: {
                name: "DATASET",
            },
            position: { x: Math.floor(panelDimensions.width / 2 - SIZE.WIDTH / 2), y: Math.floor(panelDimensions.height * (2/3) - SIZE.HEIGHT / 2) },
            width: SIZE.WIDTH,
            height: SIZE.HEIGHT,
        },
    ];
}

export const useVueflowController = () => {

    const panelDimensions = ref<Dimensions>({
        width: 0,
        height: 0,
    });
    const nodes = ref<Array<Node>>([]);

    const onInitialized = () => {
        nodes.value = getInitNodes(panelDimensions.value)
    }

    const findNode = (nodeId: string) => {
        return {
            node: nodes.value.find((v) => v.id === nodeId),
            index: nodes.value.findIndex((v) => v.id === nodeId),
        }
    };

    /** update position value */
    const handleNodeDragStop = (nodeId: string, newPosition: XYPosition) => {
        const tIdx = nodes.value.findIndex((node) => node.id === nodeId);
        if (tIdx !== -1) {
            nodes.value[tIdx].position = newPosition;
        }
    }

    const onAddNode = (newNode: Node) => {
        switch (newNode.type) {

            case "group_by":
            case "join":
            case "filter":
            case "data_source":
            case "dataset": {
                nodes.value.push({
                    ...newNode,
                    data: {
                        name: newNode.type.toUpperCase(),
                    }
                });
                break;
            }
            case "sql": {
                nodes.value.push({
                    ...newNode,
                    data: {
                        name: newNode.type.toUpperCase(),
                        value: "",
                    }
                });
                break;
            }

            case "select": {
                nodes.value.push({
                    ...newNode,
                    data: {
                        name: newNode.type.toUpperCase(),
                        value: "",
                        options: [],
                    }
                });
                break;
            }
        }
    }

    const onUpdateNode = (nodeId: string, nodeUpdate: (node: Node) => Node) => {
        const { node, index } = findNode(nodeId);
        invariant((node && index !== -1));
        nodes.value[index] = nodeUpdate(node);
    }

    return {
        panelDimensions,
        nodes,
        handleNodeDragStop,
        onInitialized,
        onAddNode,
        onUpdateNode
    };

}

export const useDragAndDrop = (
    options?: {
        addNode: (newNode: Node) => void;
        updateNode: (nodeId: string, nodeUpdate: (node: Node) => Node) => void;
    }) => {

    const draggedType = ref<NodeType | undefined>(undefined);
    const isDragOver = ref(false);
    const isDragging = ref(false);


    watch(isDragging, (dragging) => {
        document.body.style.userSelect = dragging ? 'none' : ''
    });

    const { generate } = useId();

    const onDragStart = (event: DragEvent, type: NodeType) => {
        if (event.dataTransfer) {
            event.dataTransfer.setData('application/vueflow', type)
            event.dataTransfer.effectAllowed = 'move'
        }
        draggedType.value = type;
        isDragging.value = true
        document.addEventListener('drop', onDragEnd)
    }

    const onDragOver = (event: DragEvent) => {
        event.preventDefault()

        if (draggedType.value) {
            isDragOver.value = true

            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move'
            }
        }
    }

    const onDragLeave = () => {
        isDragOver.value = false;
    }

    const onDragEnd = () => {
        isDragging.value = false
        isDragOver.value = false
        draggedType.value = undefined;
        document.removeEventListener('drop', onDragEnd)
    }

    const { screenToFlowCoordinate } = useVueFlow();

    const onDrop = (event: DragEvent) => {
        invariant(draggedType.value !== undefined);

        const position = screenToFlowCoordinate({
            x: event.clientX,
            y: event.clientY,
        })
        const newNode: Node = {
            id: generate(),
            type: draggedType.value,
            position,
        }
        options?.addNode(newNode);
    }

    return {
        draggedType,
        isDragOver,
        isDragging,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
    }


}