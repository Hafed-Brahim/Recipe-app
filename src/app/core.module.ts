import { NgModule } from "@angular/core";
// import { RecipeService } from './recipes/recipe.service';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { AuthService } from './auth/auth.service';

@NgModule({
    providers: [
        // shoppingListService,
        // RecipeService,
        RecipesResolverService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptorService,
          multi: true }
    ]
})
export class CoreModule {

}