#!/bin/bash
set -e

sudo docker-compose -f db/development_db.yml up -d

