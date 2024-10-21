import { AbstractControl } from "@angular/forms";

export function passwordValidator(formGroup: AbstractControl): { [key: string]: boolean; } | null {

    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
        formGroup.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
    }
    return null;
} 