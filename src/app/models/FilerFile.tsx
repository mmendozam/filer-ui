export class FilerFile {
  public directory: string;
  public extension: string;
  public name: string;
  public size: number;

  constructor(directory: string, extension: string, name: string, size: number) {
    this.directory = directory;
    this.extension = extension;
    this.name = name;
    this.size = size;
  }
}
