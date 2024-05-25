import { Component, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { TechnologyKnowledge } from '../../models/technology-knowledge';
import { TechnologyComponent } from './technology/technology.component';
import { ToolKnowledge } from '../../models/tool-knowledge';
import { Knowledge } from '../../models/knowledge';
import { MockKnowledgeService } from '../../services/mocks/mock-knowledge.service';

@Component({
  selector: 'app-knowledge',
  standalone: true,
  imports: [TechnologyComponent],
  providers: [ MockKnowledgeService ],
  templateUrl: './knowledge.component.html',
  styleUrl: './knowledge.component.css'
})
export class KnowledgeComponent implements OnInit {
  private technologies: TechnologyKnowledge[];
  private tools: ToolKnowledge[];
  
  technologiesShowed: WritableSignal<TechnologyKnowledge[]>;
  toolsShowed: WritableSignal<ToolKnowledge[]>;

  knowledgeSelected: Knowledge | null;

  constructor(private _knowledegeService: MockKnowledgeService) {}

  ngOnInit(): void {
    this._knowledegeService.getTechStack().subscribe({
      next: (tech) => {
        this.technologies = tech;
        this.technologiesShowed = signal(tech);
      },
      error: (error) => console.error(error)
    });

    this._knowledegeService.getTools().subscribe({
      next: (tools) => {
        this.tools = tools;
        this.toolsShowed = signal(tools);
      },
      error: (error) => console.error(error)
    })
  }

  public select(knowledge: Knowledge): void {
    this.toolsShowed.set([...this.tools]);
    this.technologiesShowed.set([...this.technologies]);
    if (knowledge instanceof TechnologyKnowledge) 
      this.removeKnowledgeFromShowedList(knowledge, this.technologiesShowed);
    else 
      this.removeKnowledgeFromShowedList(knowledge, this.toolsShowed);
    this.knowledgeSelected = knowledge;
  }

  private removeKnowledgeFromShowedList(knowledge: Knowledge, showedList: WritableSignal<Knowledge[]>): void {
    const removeIndex = showedList().findIndex(t => t.name == knowledge.name);
    showedList.update(
      t => {
        t.splice(removeIndex, 1 );
        return t;
      }
    );
  }

  public unselect(): void {
    this.knowledgeSelected = null;
    this.toolsShowed.set([...this.tools]);
    this.technologiesShowed.set([...this.technologies]);
  }

}
