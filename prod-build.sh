#!/bin/bash
set -ev
cd ./InvoiceUI
npm install
npm run build
npm run test:ci
cd ../
cp -r ./InvoiceUI/build ./InvoiceServer/ui
