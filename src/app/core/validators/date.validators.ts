import { FormGroup } from "@angular/forms";

export function createDateRangeValidator() {
    return (control: FormGroup) => {
        const startDate = new Date(control.get('startDate')!.value);
        const endDate = new Date(control.get('endDate')!.value);

        if (startDate >= endDate) {
            return { 'invalidDateRange': true };
        }
        return null;
    };
}
