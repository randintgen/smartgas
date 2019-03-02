import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'app-tester',
  templateUrl: 'tester.component.html'
})
export class TesterComponent {

  public results = 'first';
  constructor(public dialog: MatDialog) {}

  openDialog() {
    var t = this.dialog.open(DialogDataExampleDialog, {
      data: {
        phrase: this.results
      }
    });

    t.afterClosed().subscribe(
      (returns) => {
        console.log(returns);
        this.results = returns;
      }
    );
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  private inputt;

  constructor(
    public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    newValue() {
      this.dialogRef.close();
    }
}