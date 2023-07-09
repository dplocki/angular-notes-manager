import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteTitlePipe } from './note-title.pipe';
import { FormsModule } from '@angular/forms';
import { SilenceLoggerService } from './services/silence-logger.service';
import { LoggerService } from './services/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    NoteDetailComponent,
    NoteListComponent,
    NoteTitlePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    { provide: LoggerService, useClass: SilenceLoggerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
