import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatMenuModule,
    MatButtonModule, MatInputModule,
    MatSidenavModule, MatGridListModule,
    MatSelectModule, MatDividerModule,
    MatIconModule, MatFormFieldModule,
     MatCardModule, MatListModule,
      MatProgressBarModule, MatExpansionModule,
  } from '@angular/material';

  @NgModule({
      imports: [MatToolbarModule, MatMenuModule,
        MatButtonModule, MatIconModule, MatInputModule,
        MatSidenavModule, MatGridListModule,
        MatSelectModule, MatDividerModule, MatExpansionModule,
         MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule, 
         
       ],
      exports: [ MatToolbarModule, MatMenuModule,
        MatButtonModule, MatInputModule, MatIconModule,
        MatSidenavModule, MatGridListModule,
        MatSelectModule, MatDividerModule, MatExpansionModule,
         MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule,
         
      ]
  })
export class AppMaterialModule {

}
