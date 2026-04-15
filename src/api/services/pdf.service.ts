import puppeteer from "puppeteer";

export async function generatePdfFromUrl(url: string, token?: string) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  if (token) {
    await page.setExtraHTTPHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  });

  await browser.close();

  return pdf;
}
