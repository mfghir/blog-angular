import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '../auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SearchComponent } from './search/search.component';
import { IndexComponent } from './index/index.component';
import { PostsComponent } from './posts/posts.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PostModule } from '../post/post.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreateComponent,
    SearchComponent,
    IndexComponent,
    PostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    CKEditorModule,
    PostModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
