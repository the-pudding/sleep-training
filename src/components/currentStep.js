import { writable } from 'svelte/store';

function createCurrentStepStore() {
    let step = 0;
    let prevStep = 0;

    const { subscribe, set } = writable(0);

    const updateStep = (currentStep) => {
        console.log("prevStep:", prevStep, "currentStep:", currentStep);
        if (currentStep > prevStep) {
          step++;
        } else if (currentStep < prevStep) {
          step--;
        }
        prevStep = currentStep; // Update prevStep after conditional logic
        set(step);
        console.log('step', step);
    };

    return { subscribe, updateStep };
}

export const currentStepStore = createCurrentStepStore();