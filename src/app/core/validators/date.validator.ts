import { AbstractControl } from "@angular/forms";

export function dateRangeValidator(formGroup: AbstractControl): { [key: string]: boolean; } | null {

    const startDate = new Date(formGroup.get('startDate')?.value);
    const endDate = new Date(formGroup.get('endDate')?.value);

    if (startDate >= endDate) {
        return { 'invalidDateRange': true };
    }
    return null;
}
