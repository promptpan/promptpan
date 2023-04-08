export class MiddlewareNode {
  private id: string;
  private children: MiddlewareNode[] = [];
  private isParallelNode = false;

  constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public addChild(child: MiddlewareNode): void {
    this.children.push(child);
  }

  public getChildren(): MiddlewareNode[] {
    return this.children;
  }

  public isLeaf(): boolean {
    return this.children.length === 0;
  }

  public isParallel(): boolean {
    return this.isParallelNode;
  }

  public setParallel(isParallel: boolean): void {
    this.isParallelNode = isParallel;
  }
}

export class MiddlewareConfig {
  private root: MiddlewareNode;

  constructor(config: Record<string, any>) {
    this.root = this.buildTree(config);
  }

  private buildTree(config: Record<string, any>): MiddlewareNode {
    const root = new MiddlewareNode(config.id);

    if (config.children) {
      const children = config.children.map((childConfig: Record<string, any>) =>
        this.buildTree(childConfig),
      );

      for (const child of children) root.addChild(child);

      if (config.parallel) root.setParallel(true);
    }

    return root;
  }

  public getRoot(): MiddlewareNode {
    return this.root;
  }
}
