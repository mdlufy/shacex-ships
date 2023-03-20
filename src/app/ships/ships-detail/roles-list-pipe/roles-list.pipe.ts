import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "rolesList",
})
export class RolesListPipe implements PipeTransform {
    transform(roles: string[] | null): string | null {
        if (!roles || !roles.length) {
            return null;
        }

        const rolesList = roles.map((role, index) => {
            if (index !== roles.length - 1) {
                return role + ",";
            }

            return role;
        });

        return rolesList.join(" ");
    }
}
