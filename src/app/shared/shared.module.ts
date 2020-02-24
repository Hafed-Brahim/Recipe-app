import { NgModule } from "@angular/core";
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
    declarations: [AlertComponent,
                   LoadingSpinner,
                   PlaceholderDirective,
                   DropdownDirective],
    imports: [CommonModule],
    exports: [AlertComponent,
                LoadingSpinner,
                PlaceholderDirective,
                DropdownDirective,
                CommonModule]
})
export class SharedModule {

}