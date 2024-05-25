interface KnowledgeArguments {
    name: string;
    logoUrl: string;
    usageDescription?: string;
}

export class Knowledge {
    name: string;
    logoUrl: string;
    usageDescription?: string;

    constructor(knowledge: KnowledgeArguments) {
        this.name = knowledge.name;
        this.logoUrl = knowledge.logoUrl;
        if (knowledge.usageDescription) 
            this.usageDescription = knowledge.usageDescription;
    }
}