import { Injectable } from '@nestjs/common';
import { chromium, firefox, webkit } from '@playwright/test';
import * as fs from 'fs';
@Injectable()
export class AppService {
  async getHello(scale: number) {
    try {
      // const browser = await chromium.launch({ headless: false });
      const browser = await chromium.launch();
      const context = await browser.newContext({
        offline: false,
      });
      const page = await context.newPage();

      await page.setViewportSize({ width: Math.round(650*scale), height: Math.round(455*scale) });
      
      const generatedHTML = fs.readFileSync('./src/poster/poster.html', 'utf-8');

      await page.setContent(generatedHTML, {waitUntil: 'load'});
      await page.addStyleTag({ path: './src/poster/poster.css', });

      await page.screenshot({ path: 'example.png' });
      console.log('Poster generated');
      await browser.close();

    } catch (error) {
      console.log(error)
    }
  }
}
