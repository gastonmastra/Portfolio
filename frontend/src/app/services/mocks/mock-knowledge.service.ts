import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Technology } from '../../models/technology';
import { Tool } from '../../models/tool';

const TECH_ASSET_PATH = "assets/technologies";
const TOOL_ASSET_PATH = "assets/tools";

export const ANGULAR = Technology.CreateTechnology({
  name: 'Angular',
  logoUrl: `${TECH_ASSET_PATH}/angular.png`,
  usageDescription: `
  2 years of experience developing web applications with Angular. I've used many versions in different projects.
  `
});

export const DOT_NET = Technology.CreateTechnology({
  name: '.NET',
  logoUrl: `${TECH_ASSET_PATH}/netcore.png`,
  usageDescription: `
  2 Years using .NET in web applications. Knowledge in older versions like 2.1 and 3.1 and also the newest ones. I enjoy working with .NET and I think it is a great framework for web applications.
  `
});

export const DOCKER = Technology.CreateTechnology({
  name: 'Docker',
  logoUrl: `${TECH_ASSET_PATH}/docker.png`,
  usageDescription: `
  I did the configuration and deploy of the final project of my career using docker containers in a microservice architecture.
  I also worked in many small projects running over docker in order to make easy the deployments.
  `
});

export const REACT = Technology.CreateTechnology({
  name: 'React',
  logoUrl: `${TECH_ASSET_PATH}/react.png`,
});

export const FLASK = Technology.CreateTechnology({
  name: 'Flask',
  logoUrl: `${TECH_ASSET_PATH}/flask.png`,
  usageDescription: `
  I have used Flask in a couple of projects and I think it is a great tool for web applications. I like the way it works and the way it integrates with other tools.`
});

export const GIT = Tool.CreateTool({
  name: "Git",
  logoUrl: `${TOOL_ASSET_PATH}/git.png`,
  usageDescription: `
  In every project that I participated I have used git as the versioning tool. I've used mainly GitHub and GitLab. I understand the branching and the good practices that git promove.
  `
});

export const GRAPHQL = Tool.CreateTool({
  name: "GraphQL",
  logoUrl: `${TOOL_ASSET_PATH}/graphql.png`,
  usageDescription: `
  I have used GraphQL in a project and I think it is a great tool if it is needed. Otherwise I think that it may be an overkill.
  `
});

export const JIRA = Tool.CreateTool({
  name: "Jira",
  logoUrl: `${TOOL_ASSET_PATH}/jira.png`,
  usageDescription: `
  I have worked with Jira in a couple of projects and I think it is one of the best tools for project management. I like the way it works and the way it integrates with other tools.`
});

export const LINUX = Tool.CreateTool({
  name: "Linux",
  logoUrl: `${TOOL_ASSET_PATH}/linux.png`,
  usageDescription: `
  I know the most important things and I use it very often. My main OS is MacOS currently, but I have used Linux in the past. I know how to use the terminal and I can do some configurations.
  `
});

export const AWS = Tool.CreateTool({
  name: 'AWS',
  logoUrl: `${TOOL_ASSET_PATH}/aws.png`,
  usageDescription: `
  I have used AWS in different situations and I know many of the most important services it offers. I have used S3, EC2, ECS, IAM, CloudFront, Route53 and others. I have also used AWS CLI and some of the SDKs.`
});


@Injectable({
  providedIn: 'root'})
export class MockKnowledgeService {
  public getTechStack(): Observable<Technology[]> {
    const technologies = [
      ANGULAR,
      DOT_NET,
      DOCKER,
      REACT,
      FLASK,
    ];
    return of(technologies);
  }

  public getTools(): Observable<Tool[]> {
    const tools = [
      GIT,
      GRAPHQL,
      JIRA,
      LINUX,
      AWS,
    ];
    return of(tools);
  }
}
