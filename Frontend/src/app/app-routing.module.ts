import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongComponent } from './components/song/song.component';

const routes: Routes = [
  {path: '',component: SongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
