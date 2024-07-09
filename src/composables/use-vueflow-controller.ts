import { Node as NodeOriginal, Edge as EdgeOriginal, useVueFlow } from "@vue-flow/core"
import { ComputedRef, ref, watch, computed } from "vue";
import { useId } from "@/composables/use-id";
import invariant from "tiny-invariant";
import { useManualRefHistory } from "@vueuse/core";

export type { NodeChange, EdgeChange } from "@vue-flow/core";

export type Elements = (Node | Edge)[];

export type Node = NodeWrap & NodeProps;
export type Edge = EdgeOriginal & EdgeProps;

export type NodeWrap = SqlNode | SelectNode | GroupByNode | JoinNode | FilterNode | DataSourceNode | DatasetNode | StartNode;

export type NodeProps = {
    position: XYPosition;
    type: NodeType;
    deletable?: boolean;
    children: Array<string>;
    parent: Array<string>;
}

export type NodeType =
    | "sql"
    | "select"
    | "group_by"
    | "join"
    | "filter"
    | "data_source"
    | "dataset"
    | "start";
export type SqlNode = NodeOriginal<SqlNodeData, any, "sql">
export type SelectNode = NodeOriginal<SelectNodeData, any, "select">
export type GroupByNode = NodeOriginal<GroupByNodeData, any, "group_by">
export type JoinNode = NodeOriginal<JoinNodeData, any, "join">
export type FilterNode = NodeOriginal<FilterNodeData, any, "filter">
export type DataSourceNode = NodeOriginal<DataSourceNodeData, any, "data_source">
export type DatasetNode = NodeOriginal<DatasetNodeData, any, "dataset">
export type StartNode = NodeOriginal<StartNodeData, any, "start">

export type NodeData =
    | SqlNodeData
    | SelectNodeData
    | GroupByNodeData
    | JoinNodeData
    | FilterNodeData
    | DataSourceNodeData
    | DatasetNodeData
    | StartNodeData;

/** Start */
export type StartNodeData = {
    formData: StartNodeFormData;
};

export type StartNodeFormData = {
    name: string;
};

/** Sql */
export type SqlNodeData = {
    formData: SqlNodeFormData;
};

export type SqlNodeFormData = {
    name: string;
};

export type Option = {
    value: string;
    label: string;
}

/** Select */
export type SelectNodeData = {
    formData: SelectNodeFormData;
};

export type SelectNodeFormData = {
    name: string;
};

/** GroupBy */
export type GroupByNodeData = {
    formData: GroupByNodeFormData;
};

export type GroupByNodeFormData = {
    name: string;
};

/** Join */
export type JoinNodeData = {
    formData: JoinNodeFormData;
};

export type JoinNodeFormData = {
    name: string;
};

/** Filter */
export type FilterNodeData = {
    formData: FilterNodeFormData;
};

export type FilterNodeFormData = {
    name: string;
};

/** DataSource */
export type DataSourceNodeData = {
    formData: DataSourceNodeFormData;
};

export type DataSourceNodeFormData = {
    name: string;
};

/** Dataset */
export type DatasetNodeData = {
    formData: DatasetNodeFormData;
    detail: DatasetDetail;
}

export type DatasetNodeFormData = {
    name: string;
    updateMode: UpdateMode;
    fields: Array<DatasetField>;
};

export type UpdateMode = "replace" | "update";

export type DatasetField = {
    datasetId: string;
    sourceFieldId: string;
};

export type EdgeProps = {
}

export type XYPosition = {
    x: number
    y: number
}

export enum SIZE {
    WIDTH = 150,
    HEIGHT = 50,
    GAP = 80
}

export type Dimensions = {
    width: number;
    height: number;
};

export type Connection = {
    source: string;
    target: string;
}

export type MenuType = "detail" | "delete";

export type InnerNode = Omit<Node, "position" | "width" | "height">;

export type DatasetDetailField = {
    id: string;
    name: string;
}
export type DatasetDetail = {
    id: string,
    name: string,
    fields: Array<DatasetDetailField>
}

const getInitNodes = async (panelDimensions: Dimensions): Promise<Array<Node>> => {
    return [
        {
            // id: generate(),
            id: "start",
            type: 'start',
            data: {
                formData: {
                    name: "START",
                },
            },
            children: [],
            parent: [],
            position: { x: Math.floor(panelDimensions.width / 2 - SIZE.WIDTH / 2), y: 100 },
            deletable: false,
            width: SIZE.WIDTH,
            height: SIZE.HEIGHT,
        },
    ];
}

export const useVueflowController = () => {

    const original = useVueFlow();
    const { generate } = useId();

    const nodes = ref<Array<Node>>([]);
    const edges = ref<Array<Edge>>([]);

    const panelDimensions = ref<Dimensions>({
        width: 0,
        height: 0,
    });

    const isRealInit = ref<boolean>(false);
    const onInitialized = async () => {
        nodes.value = await getInitNodes(panelDimensions.value)
        isRealInit.value = true;
    }

    const findNode = (nodeId: string) => {
        return {
            node: nodes.value.find((v) => v.id === nodeId),
            index: nodes.value.findIndex((v) => v.id === nodeId),
        }
    };

    /** update position value */
    const handleNodeDragStop = (nodeId: string, newPosition: XYPosition) => {
        onUpdateNode(nodeId, (node) => ({...node, position: newPosition}));
    }

    const onAddChildNode = (type: string, source: string) => {
        switch (type) {
            case "group_by":
            case "join":
            case "filter":
            case "dataset":
            case "data_source":
            case "sql":
            case "select": {

                const { node: parent } = findNode(source);
                invariant(parent !== undefined);
                
                const position = {
                    x: parent.position.x,
                    y: parent.position.y + SIZE.HEIGHT + SIZE.GAP
                }
                const newNode: Node = {
                    id: generate(),
                    type: type,
                    position,
                    children: [],
                    parent: [source],
                }

                /** add new node */
                nodes.value.push(newNode);
                /** add as a child of the parent node */
                onUpdateNode(source, (node) => ({...node, children: [...node.children, newNode.id]}));
                /** add new Edge new node to parent */
                edges.value.push({
                    id: generate(),
                    source: source,
                    target: newNode.id,
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

    const onAddEdge = (value: Connection) => {
        const { generate } = useId();
        edges.value.push({
            id: generate(),
            source: value.source,
            target: value.target,
        });
    }
    const onRemoveNodes = (removeNodeIds: Array<string>) => {
        nodes.value = nodes.value.filter((node) => !removeNodeIds.includes(node.id));
    }

    const onRemoveEdges = (removeEdgeIds: Array<string>) => {
        edges.value = edges.value.filter((edge) => !removeEdgeIds.includes(edge.id));
    }

    const onClickMenu = (menu: MenuType, nodeId: string) => {
        switch (menu) {
            case "detail": {
                openDetailEditor(nodeId);
                break;
            }
            case "delete": {
                onRemoveNodes([nodeId]);
                break;
            }
        }
    }

    const targetNode = ref<Node | undefined>(undefined);

    const openDetailEditor = (nodeId: string) => {
        const { node } = findNode(nodeId);
        if (node) {
            targetNode.value = node;
        }
    }

    const closeDetailEditor = () => {
        targetNode.value = undefined;
    }

    const saveNode = (newNode: Node) => {
        invariant(targetNode.value && targetNode.value.id === newNode.id && targetNode.value.type === newNode.type);
        const { index } = findNode(newNode.id);
        invariant(index !== -1);
        nodes.value[index] = newNode;
        original.updateNode(newNode.id, { data: { ...newNode.data } });
    }

    return {
        panelDimensions,
        nodes,
        edges,
        handleNodeDragStop,
        onInitialized,
        onAddChildNode,
        onUpdateNode,
        onAddEdge,
        onRemoveNodes,
        onRemoveEdges,
        onClickMenu,
        targetNode,
        closeDetailEditor,
        saveNode,
        isRealInit,
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

    const original = useVueFlow();

    const onDrop = (event: DragEvent) => {
        invariant(draggedType.value !== undefined);

        const position = original.screenToFlowCoordinate({
            x: event.clientX,
            y: event.clientY,
        })
        const newNode: Node = {
            id: generate(),
            type: draggedType.value,
            position,
            children: [],
            parent: [],
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


type HistoryTarget = {
    nodes: Array<Node>;
    edges: Array<Edge>;
};

export const useVueflowHistoryController = (target: ComputedRef<HistoryTarget>, options?: {
    updateObject: (currentObject: HistoryTarget) => void;
}) => {
    const original = useManualRefHistory(target, { clone: true });
    const history = computed(() => original.history.value.length > 1 ? original.history.value.splice(1) : []);
    const canUndo = computed(() => original.undoStack.value.length > 1)

    const onUndo = () => {
        original.undo();
        options?.updateObject(JSON.parse(JSON.stringify(original.last.value.snapshot)));
    }

    const onRedo = () => {
        original.redo();
        options?.updateObject(JSON.parse(JSON.stringify(original.last.value.snapshot)));
    }

    return {
        history,
        commit: original.commit,
        onUndo,
        onRedo,
        canUndo,
        canRedo: original.canRedo,
    }
}