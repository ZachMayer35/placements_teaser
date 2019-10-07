#!/bin/bash
set -ev
cd ./InvoiceUI
npm run build
npm run test:ci
cd ../
cp -r ./InvoiceUI/build ./ui
