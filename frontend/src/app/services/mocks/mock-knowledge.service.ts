import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TechnologyKnowledge } from '../../models/technology-knowledge';
import { ToolKnowledge } from '../../models/tool-knowledge';

const TECH_ASSET_PATH = "assets/technologies";
const TOOL_ASSET_PATH = "assets/tools";

@Injectable()
export class MockKnowledgeService {
  public getTechStack(): Observable<TechnologyKnowledge[]> {
    const technologies = [
      new TechnologyKnowledge({
        name: 'Angular',
        logoUrl: `${TECH_ASSET_PATH}/angular.png`,
        usageDescription: `
        2 years of experience developing web applications with Angular. I've used Angular 7, 13-17.
        `
      }),
      new TechnologyKnowledge({
        name: '.NET',
        logoUrl: `${TECH_ASSET_PATH}/netcore.png`,
        usageDescription: `
        2 Years using .NET in web applications. Knowledge in older versions like 2.1 and 3.1 and knowledge in .NET 6 
        `
      }),
      // new TechnologyKnowledge({
      //   name: "NodeJs",
      //   logoUrl: "assets/technologies/nodejs.png"
      // }),
      // new TechnologyKnowledge({
      //   name: "MySQL",
      //   logoUrl: "assets/technologies/mysql.png"
      // }),
      new TechnologyKnowledge({
        name: 'Docker',
        logoUrl: `${TECH_ASSET_PATH}/docker.png`,
        usageDescription: `
        I did the configuration and deploy of the final project of my career using docker containers in a microservice architecture.
        Currently working within a microservice infrastructure deployed with docker compose on a linux server.
        `
      }),
    ];
    return of(technologies);
  }

  public getTools(): Observable<ToolKnowledge[]> {
    const tools = [
      new ToolKnowledge({
        name: "Git",
        logoUrl: `${TOOL_ASSET_PATH}/git.png`,
        usageDescription: `
        In every project that I've participated I used git. I know the providers GitLab and GitHub.
        I know all the commands and the git workflow. Also I understand the branching and the good practices that git promove.
        `
      }),
      new ToolKnowledge({
        name: "GraphQL",
        logoUrl: `${TOOL_ASSET_PATH}/graphql.png`,
        usageDescription: `
        Currently working with GraphQL using graphene in Flask.
        `
      }),
      new ToolKnowledge({
        name: "jira",
        logoUrl: `${TOOL_ASSET_PATH}/jira.png`
      }),
      new ToolKnowledge({
        name: "linux",
        logoUrl: `${TOOL_ASSET_PATH}/linux.png`,
        usageDescription: `
        I use frequently Ubuntu as my second computer. I do the most I can with the terminal.
        Knowledge of the most important commands.
        `
      }),
      // new ToolKnowledge({
      //   name: "postman",
      //   logoUrl: `${TOOL_ASSET_PATH}/postman.png`
      // }),
    ];
    return of(tools);
  }
}
