import { TNode } from "@/schemas/Node.schema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { nodeService } from "@/api/services/node/node.service";

interface NodeState {
  node: TNode[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NodeState = {
  node: [],
  isLoading: false,
  error: null,
};

export const fetchNodeData = createAsyncThunk("node/getAll", async (_, { rejectWithValue }) => {
  try {
    return await nodeService.getAllNodes();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch nodes");
  }
});

export const createNode = createAsyncThunk(
  "node/create",
  async (data: Omit<TNode, "id" | "userId">, { rejectWithValue }) => {
    try {
      return await nodeService.createNode(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create node");
    }
  }
);

const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    setNode: (state, action: PayloadAction<TNode[]>) => {
      action.payload.forEach((node) => {
        const nodeIndex = state.node.findIndex((n) => n.id === node.id);
        if (nodeIndex !== -1) {
          state.node[nodeIndex] = node;
        } else {
          state.node.push(node);
        }
      });
    },
    deleteAllNodes: (state) => {
      state.node = [];
    },
    deleteNodeById: (state, action: PayloadAction<TNode["id"]>) => {
      state.node = state.node.filter((n) => n.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNodeData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNodeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.node = action.payload;
      })
      .addCase(fetchNodeData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createNode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.node.push(action.payload);
      })
      .addCase(createNode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setNode, deleteAllNodes, deleteNodeById } = nodeSlice.actions;

export const selectNode = (state: RootState) => state.node.node;
export const selectLoading = (state: RootState) => state.node.isLoading;
export const selectError = (state: RootState) => state.node.error;

export default nodeSlice.reducer;
