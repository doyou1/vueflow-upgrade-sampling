<template>
  <div class="dataset-form">
    <el-form-item label="Update Mode">
      <el-select v-model="innerFormData.updateMode">
        <el-option
          v-for="item in updateModeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Fields">
      <el-table :data="innerFormData.fields">
        <el-table-column label="dataset id">
          <template #default="{ row, $index }">
            {{ getDatasetFieldName(row.datasetId) }} {{ $index }}
          </template>
        </el-table-column>
        <el-table-column label="source field id">
          <template #default="{ $index }">
            <!-- empty-values: (if you want to display empty value's label) -->
            <el-select
              v-model="innerFormData.fields[$index].sourceFieldId"
              :empty-values="[null, undefined]"
            >
              <el-option
                v-for="item in tempSourceFieldOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import {
  Option,
  type DatasetNodeData,
  type DatasetNodeFormData,
} from "@/composables/use-vueflow-controller";
import { computed, ref, watch } from "vue";
import {
  ElSelect,
  ElOption,
  ElFormItem,
  ElTable,
  ElTableColumn,
} from "element-plus";
const props = defineProps<{
  data: DatasetNodeData;
}>();

const emits = defineEmits<{
  (e: "update:data", value: DatasetNodeData): void;
}>();

const innerFormData = ref<DatasetNodeFormData>(props.data.formData);

watch(
  innerFormData,
  () => {
    emits("update:data", { ...props.data, formData: innerFormData.value });
  },
  { immediate: true }
);

const updateModeOptions = computed<Option[]>(() => [
  {
    value: "replace",
    label: "Replace",
  },
  {
    value: "update",
    label: "Update",
  },
]);

const tempSourceFieldOptions = computed<Option[]>(() => [
  {
    value: "",
    label: "noselect",
  },
  {
    value: "source_field_id_1",
    label: "SourceField1",
  },
  {
    value: "source_field_id_2",
    label: "SourceField2",
  },
]);

const getDatasetFieldName = (datasetId: string) =>
  props.data.detail.fields.find((field) => field.id === datasetId)?.name ?? "";
</script>

<style scoped lang="scss"></style>
