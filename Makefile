help:
	@echo "# Makefile Help #"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

ecr-login: ## Login to ECR
	aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 391903476448.dkr.ecr.eu-central-1.amazonaws.com/mybookr

secrets-get: ## get secrets from ecs
	aws s3 cp s3://mybookr-internal/prd/backoffice/.env .env

secrets-get-staging: ## get secrets from ecs
	aws s3 cp s3://mybookr-internal/stg/backoffice/.env .env_staging

secrets-update: ## Update the secrets in remote for ECS
	aws s3 cp .env s3://mybookr-internal/prd/backoffice/.env

secrets-update-staging: ## Update the secrets in remote for ECS
	aws s3 cp .env_staging s3://mybookr-internal/stg/backoffice/.env

ecs-deploy: ## Deploy the app to ECS
	./bin/deploy.sh

# .PHONY: deploy
# deploy: update-remote update-secrets ecs-deploy ## Do the full path to deploy to ECS

# deploy-staging: update-remote-staging update-secrets-staging

# remote: ## Go in the remote container
# 	./bin/remote.sh

# remote-staging: ## Go in the remote container
# 	./bin/remoteStaging.sh