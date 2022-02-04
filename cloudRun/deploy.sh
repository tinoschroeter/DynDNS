#!/bin/bash

gcloud builds submit --tag gcr.io/gke-dev-307616/ipservice
gcloud run deploy --image gcr.io/gke-dev-307616/ipservice --platform managed
