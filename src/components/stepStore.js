import { writable } from 'svelte/store';

function createStepStore() {
    let step = 0;
    let prevStep = 0;

    const { subscribe, set } = writable(0);

    const updateStep = (currentStep) => {
        if (currentStep > prevStep) {
          step++;
        } else if (currentStep < prevStep) {
          step--;
        }
        prevStep = currentStep; // Update prevStep after conditional logic
        set(step);
    };

    return { subscribe, updateStep };
}

export const stepStore = createStepStore();