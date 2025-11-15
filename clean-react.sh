#!/bin/bash
rm -rf node_modules .next build dist .cache
rm -rf .eslintcache .parcel-cache
npm cache clean --force
npm install
