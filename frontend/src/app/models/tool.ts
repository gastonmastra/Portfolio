import { Knowledge, KnowledgeArguments } from "./knowledge";

export class Tool extends Knowledge {

  private constructor(knowledge: KnowledgeArguments) {
    super(knowledge);
  }

  public static CreateTool(args: KnowledgeArguments): Tool {
    return new Tool({
      name: args.name,
      logoUrl: args.logoUrl,
      usageDescription: args.usageDescription
    });
  }
}