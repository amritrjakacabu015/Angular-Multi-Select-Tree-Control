import { Component, OnInit } from "@angular/core";
import { ITreeNode } from "src/app/Interfaces/ITreeNode";
import { Stack } from "src/app/classes/stackForDepthFirstSearch";

@Component({
  selector: "ms-tree-container",
  templateUrl: "./ms-tree-container.component.html",
  styleUrls: ["./ms-tree-container.component.less"]
})
export class MSTreeContainerComponent implements OnInit {
  count: number;
  text: string;
  renderTreeDiv: boolean;

  constructor() {
    this.count = 0;
    this.text = "Select User Groups";
    this.renderTreeDiv = false;
  }

  updateSelectedCount(treeObject: ITreeNode): void {
    let stack = new Stack();
    stack.pushStack(treeObject);
    console.log(treeObject);
    while (stack.stack.length > 0) {
      let removedNode: ITreeNode = stack.popStack();

      if (removedNode.nodeSelected) this.count++;
      else this.count--;

      for (let child of removedNode.nodeChildren) stack.pushStack(child);
    }

    this.renderTree(true);
  }

  renderTree(firedFromUpdateSelectedCount?: boolean): boolean {
    if (!firedFromUpdateSelectedCount) {
      this.text = !this.renderTreeDiv
        ? `${this.count} Selected`
        : "Select User Groups";
      return (this.renderTreeDiv = !this.renderTreeDiv);
    }

    this.text = `${this.count} Selected`;
    return this.renderTreeDiv;
  }

  ngOnInit() {}
}
