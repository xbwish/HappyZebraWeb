<template>  
    <div class="input-number">
        <div class="number-sub" @click="handleSubtract">
            <NIcon class="icon" color="#000" :size="15">
                <CoreshopIconSubtract20Regular />
            </NIcon>
        </div>
        <div class="number">
            <NInputNumber v-model:value="props.value" :bordered="false" :readonly="props.readonly" :show-button="false" />
        </div>
        <div class="number-add" @click="handleAdd">
            <NIcon class="icon" color="#000" :size="15">
                <CoreshopIconAdd20Regular />
            </NIcon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NIcon, NInputNumber } from "naive-ui";

const props = withDefaults(
	defineProps<{
		value: number;
		readonly?: boolean;
		size?: number;
		inputWidth?: number;
		minValue?: number;
		maxValue?: number;
	}>(),
	{
		value: 1,
		readonly: true,
		size: 40,
		inputWidth: 50,
		minValue: 1,
		maxValue:0,
	}
);

let emits = defineEmits(['add', 'subtract']);

const handleSubtract = () => {
	if (props.value === props.minValue) {
		return;
	}
	emits("subtract");
};
const handleAdd = () => {
	if (props.maxValue != 0 && props.value === props.maxValue) {
		return;
	}
	emits("add");
};
</script>
<style scoped lang="scss">
.input-number {
    display: flex;
    align-items: center;
    border: 1px solid #ced4da;
    border-radius: 3px;

    .icon {
        display: flex;
    }

    .number {
        :deep(.n-input-wrapper) {
            padding: 0;
        }

        :deep(input) {
            width: 1rem;
            height: 0.6rem;
            text-align: center;
            outline: none;
            border: 0;
            font-size: 0.3rem;
        }
    }

    .number-sub,
    .number-add {
        padding: 0.1rem;
    }
}
</style>
