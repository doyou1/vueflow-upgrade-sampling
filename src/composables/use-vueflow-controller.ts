import { Node as NodeOriginal, Edge as EdgeOriginal } from "@vue-flow/core"
import { ComputedRef, ref, computed } from "vue";
import { useId } from "@/composables/use-id";
import invariant from "tiny-invariant";
import { useManualRefHistory } from "@vueuse/core";

export type { NodeChange, EdgeChange } from "@vue-flow/core";

export type Elements = (Node | Edge)[];

export type Node = NodeWrap;
export type Edge = EdgeOriginal & EdgeProps;

export type NodeWrap = SqlNode | SelectNode | GroupByNode | JoinNode | FilterNode | DataSourceNode | DatasetNode | StartNode;

export type NodeProps = {
    position: XYPosition;
    // type: NodeType;
    deletable?: boolean;
    childNodes: Array<string>;
    parentNodes: Array<string>;
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
export type SqlNode = NodeOriginal<SqlNodeData, any, "sql"> & NodeProps;
export type SelectNode = NodeOriginal<SelectNodeData, any, "select"> & NodeProps;
export type GroupByNode = NodeOriginal<GroupByNodeData, any, "group_by"> & NodeProps;
export type JoinNode = NodeOriginal<JoinNodeData, any, "join"> & NodeProps;
export type FilterNode = NodeOriginal<FilterNodeData, any, "filter"> & NodeProps;
export type DataSourceNode = NodeOriginal<DataSourceNodeData, any, "data_source"> & NodeProps;
export type DatasetNode = NodeOriginal<DatasetNodeData, any, "dataset"> & NodeProps;
export type StartNode = NodeOriginal<StartNodeData, any, "start"> & NodeProps;

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
    X_GAP = 80,
    Y_GAP = 80
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
};

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
            position: { x: Math.floor(panelDimensions.width / 2 - SIZE.WIDTH / 2), y: 100 },
            childNodes: [],
            parentNodes: [],
            deletable: false,
            width: SIZE.WIDTH,
            height: SIZE.HEIGHT,
        },
    ];
};

const getNewNode = (newNodeId: string, type: string, position: XYPosition, childNodes: Array<string>, parentNodes: Array<string>) => {

    switch (type) {
        case "sql": {
            const newNode: SqlNode = {
                id: newNodeId,
                type: type,
                position,
                data: {
                    formData: {
                        name: type.toUpperCase(),
                    }
                },
                childNodes,
                parentNodes,
            };
            return newNode;
        }
        case "select": {
            const newNode: SelectNode = {
                id: newNodeId,
                type: type,
                position,
                data: {
                    formData: {
                        name: type.toUpperCase(),
                    }
                },
                childNodes,
                parentNodes,
            };
            return newNode;
        }
        case "group_by": {
            const newNode: GroupByNode = {
                id: newNodeId,
                type: type,
                position,
                data: {
                    formData: {
                        name: type.toUpperCase(),
                    }
                },
                childNodes,
                parentNodes,
            };
            return newNode;
        }
        case "join": {
            const newNode: JoinNode = {
                id: newNodeId,
                type: type,
                position,
                data: {
                    formData: {
                        name: type.toUpperCase(),
                    }
                },
                childNodes,
                parentNodes,
            };
            return newNode;
        }
        case "filter": {
            const newNode: FilterNode = {
                id: newNodeId,
                type: type,
                position,
                data: {
                    formData: {
                        name: type.toUpperCase(),
                    }
                },
                childNodes,
                parentNodes,
            };
            return newNode;
        }
        case "data_source": {
            const newNode: DataSourceNode = {
                id: newNodeId,
                type: type,
                position,
                data: {
                    formData: {
                        name: type.toUpperCase(),
                    }
                },
                childNodes,
                parentNodes,
            };
            return newNode;
        }
    }

}

export const useVueflowController = () => {

    // const original = useVueFlow();
    const { generate } = useId();

    const nodes = ref<Array<Node>>([]);
    const edges = ref<Array<Edge>>([]);

    const panelDimensions = ref<Dimensions>({
        width: 0,
        height: 0,
    });

    const detailEditorTargetNode = ref<Node | undefined>(undefined);
    const clearDetailEditorTargetNode = () => {
        detailEditorTargetNode.value = undefined;
    }

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

    const findEdge = (edgeId: string) => {
        return {
            edge: edges.value.find((v) => v.id === edgeId),
            index: edges.value.findIndex((v) => v.id === edgeId),
        }
    };

    const findEdgesByNodeId = (nodeId: string) => {
        return edges.value.filter((v) => v.source === nodeId || v.target === nodeId);
    };

    /** update position value */
    const handleNodeDragStop = (nodeId: string, newPosition: XYPosition) => {
        onUpdateNode(nodeId, (node) => ({ ...node, position: newPosition }));
    }

    const onAddChildNode = (type: string, parentNodeId: string) => {
        switch (type) {
            case "group_by":
            case "join":
            case "filter":
            case "dataset":
            case "data_source":
            case "sql":
            case "select": {
                const { node: parent } = findNode(parentNodeId);
                invariant(parent !== undefined);

                const position = {
                    x: parent.position.x + (parent.childNodes.length * (SIZE.WIDTH + SIZE.X_GAP)),
                    y: parent.position.y + SIZE.HEIGHT + SIZE.Y_GAP
                };
                const newNode = getNewNode(generate(), type, position, [], [parentNodeId]);
                invariant(newNode !== undefined);
                /** add new node */
                nodes.value.push(newNode);
                /** add as a child of the parent node */
                onUpdateNode(parentNodeId, (node) => ({ ...node, childNodes: [...node.childNodes, newNode.id] }));
                /** add new Edge new node to parent */
                edges.value.push({
                    id: generate(),
                    source: newNode.id, // child
                    target: parentNodeId,   // parent
                });
                break;
            }
        }
        clearDetailEditorTargetNode();
    }

    const onAddParentNode = (type: string, childNodeId: string) => {
        switch (type) {
            case "group_by":
            case "join":
            case "filter":
            case "dataset":
            case "data_source":
            case "sql":
            case "select": {
                const { node: child } = findNode(childNodeId);
                invariant(child !== undefined);
                const position = {
                    x: child.position.x + (child.parentNodes.length * (SIZE.WIDTH + SIZE.X_GAP)),
                    y: child.position.y - SIZE.HEIGHT - SIZE.Y_GAP
                };
                const newNode = getNewNode(generate(), type, position, [childNodeId], []);
                invariant(newNode !== undefined);
                /** add new node */
                nodes.value.push(newNode);
                /** add as a child of the parent node */
                onUpdateNode(childNodeId, (node) => ({ ...node, parentNodes: [...node.parentNodes, newNode.id] }));
                /** add new Edge new node to parent */
                edges.value.push({
                    id: generate(),
                    source: childNodeId,
                    target: newNode.id,
                });
                break;
            }
        }
        clearDetailEditorTargetNode();
    }

    const onAddEdge = (value: Connection) => {
        edges.value.push({
            id: generate(),
            source: value.source,
            target: value.target,
        });
        clearDetailEditorTargetNode();
    }
    const onRemoveNodes = (removeNodeIds: Array<string>) => {
        /** remove related edge */
        const removeEdgeIds = removeNodeIds.map((nodeId) => findEdgesByNodeId(nodeId)).map((edges) => edges.map((edge) => edge.id).flat()).flat();
        edges.value = JSON.parse(JSON.stringify(edges.value.filter((edge) => !removeEdgeIds.includes(edge.id))));

        /** remove node */
        nodes.value = JSON.parse(JSON.stringify(nodes.value.filter((node) => !removeNodeIds.includes(node.id))));

        /** remove parent, child relation */
        nodes.value.forEach((node) => {
            onUpdateNode(node.id, (node) => (
                {
                    ...node,
                    childNodes: node.childNodes.filter((childNodeId) => !removeNodeIds.includes(childNodeId)),
                    parentNodes: node.parentNodes.filter((parentNodeId) => !removeNodeIds.includes(parentNodeId))
                }));
        });
        clearDetailEditorTargetNode();
    }

    /** edge.source: child */
    /** edge.target: parent */
    const onRemoveEdges = (removeEdgeIds: Array<string>) => {
        const sourceTargetList = removeEdgeIds.map((edgeId) => findEdge(edgeId));
        /** remove edge */
        edges.value = edges.value.filter((edge) => !removeEdgeIds.includes(edge.id));
        /** remove parent, child relation */
        sourceTargetList.forEach(({ edge }) => {
            invariant(edge);

            /** update child node's parentNodes */
            onUpdateNode(edge.source, (node) => (
                {
                    ...node,
                    parentNodes: node.parentNodes.filter((parentNodeId) => edge.target !== parentNodeId),
                }));
            /** update parent node's childNodes */
            onUpdateNode(edge.target, (node) => (
                {
                    ...node,
                    childNodes: node.childNodes.filter((childNodeId) => edge.source !== childNodeId),
                }));
        });
        clearDetailEditorTargetNode();
    }

    const onClickNodeMenu = (nodeId: string, menuType: string) => {
        switch (menuType) {
            case "delete": {
                onRemoveNodes([nodeId]);
            }
        }
    }

    const onUpdateNode = (nodeId: string, nodeUpdate: (node: Node) => Node) => {
        const { node, index } = findNode(nodeId);
        invariant((node && index !== -1));
        nodes.value[index] = JSON.parse(JSON.stringify(nodeUpdate(node)));
    }



    return {
        panelDimensions,
        detailEditorTargetNode,
        nodes,
        edges,
        handleNodeDragStop,
        onInitialized,
        onAddChildNode,
        onAddParentNode,
        onClickNodeMenu,
        onUpdateNode,
        onAddEdge,
        onRemoveNodes,
        onRemoveEdges,
        isRealInit,
    };

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