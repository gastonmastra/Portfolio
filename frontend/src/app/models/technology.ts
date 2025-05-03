import { Knowledge, KnowledgeArguments } from "./knowledge";

export class Technology extends Knowledge {

  private constructor(knowledge: KnowledgeArguments) {
    super(knowledge);
  }

  public static CreateTechnology(args: KnowledgeArguments): Technology {
    return new Technology({
      name: args.name,
      logoUrl: args.logoUrl,
      usageDescription: args.usageDescription
    });
  }
    
}