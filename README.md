# GASTÓN MASTRAPASQUA'S PORTFOLIO
Hello everybody who's watching this portfolio. 

The idea of behind the portfolio was practice some technologies, like CI/CD, unit testing, microservices with different backends, databases, etc.

# Deployment
## Frontend
The frontend is deployed right into github pages, using github actions to make the builds whenever a commit is placed into main. 
In order to run the deployment, I used the JamesIves/github-pages-deploy-action@v4 action, which helps in the deployment workflow.
The .github/workflio/ folder contains the main.yaml file. This is the entrypoint where github takes the configuration for the actions.
