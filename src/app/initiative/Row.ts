export class Row {
  constructor(
    public score: number,
    public character: string,
    public player: string,
    public modifier: number,
    public advantage: boolean,
    public id: number,
  ) {}
}
