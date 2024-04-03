#!/bin/bash

gcloud builds submit --tag gcr.io/gke-dev-307616/ipservice
gcloud run deploy \
	--set-env-vars API_KEY="" \
	--set-env-vars SLACK_TOKEN="" \
	--set-env-vars accessKeyId="" \
	--set-env-vars secretAccessKey="" \
	--set-env-vars hostedzoneId="" \
	--image gcr.io/gke-dev-307616/ipservice --platform managed
