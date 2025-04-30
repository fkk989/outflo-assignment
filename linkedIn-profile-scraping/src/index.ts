import dotenv from "dotenv";
import puppeteer from "puppeteer";
import { Profile } from "./model/profile";
import { connectDatabase } from "./config/db";
import mongoose from "mongoose";
dotenv.config();


interface ProfileData {
  name: string;
  jobTitle: string;
  company: string;
  location: string;
  profileUrl: string;
  profileImageUrl: string;
}
connectDatabase();
async function wait(milliseconds: number) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("wait over")
    }, milliseconds)
  })
}

const scrapeLinkedIn = async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  // 1. Login
  await page.goto("https://www.linkedin.com/login");

  // adding delay in typing 
  await wait(2000)
  await page.type("#username", process.env.LINKEDIN_EMAIL || "");

  // adding delay in typing
  await wait(2000)
  await page.type("#password", process.env.LINKEDIN_PASSWORD || "");
  await Promise.all([page.click("[type=submit]"), page.waitForNavigation()]);


  let profileLinks: string[] = [];
  let pageNumber = 1;
  const numberOfProfileWanted = 5;
  // Loop until you collect at least numberOfProfileWanted profiles Link
  while (profileLinks.length < numberOfProfileWanted) {
    const searchUrl = `https://www.linkedin.com/search/results/people/?geoUrn=%5B%22103644278%22%5D&industry=%5B%221594%22%2C%221862%22%2C%2280%22%5D&keywords=%22lead%20generation%20agency%22&origin=GLOBAL_SEARCH_HEADER&sid=z%40k&titleFreeText=Founder&page=${pageNumber}`;
    console.log("pageNumber", pageNumber)
    console.log("profile: ", profileLinks)
    await page.goto(searchUrl);

    // waiting for 5 seconds for everything to load correctly
    await wait(5000)

    const links = await page.evaluate(() => {
      console.log("running inside page")
      const result: string[] = [];

      const profiles = Array.from(
        document.querySelectorAll("[data-chameleon-result-urn]")
      ).filter(el => {
        const urn = el.getAttribute("data-chameleon-result-urn");
        return urn && urn.startsWith("urn:li:member:") && !urn.includes("headless");
      });

      profiles.forEach(profile => {
        const anchor = profile.querySelector("a");
        if (anchor && anchor.href) {
          result.push(anchor.href.split("?")[0]); // clean profile URL
        }
      });
      console.log(result)
      return result;
    });
    console.log("page Links: ", links)
    profileLinks = [...profileLinks, ...links];
    pageNumber++;

    await wait(3000 + Math.random() * 2000)
  }


  console.log("Scraped Profile Links:", profileLinks.slice(0, numberOfProfileWanted));

  let profileData: ProfileData[] = []

  // looping every profile link and visiting them one by one and collecting their data
  for (const link of profileLinks.slice(0, numberOfProfileWanted)) {
    await page.goto(link);
    console.log("link:", link)
    // waiting for 5 seconds for everything to load correctly
    await wait(5000);

    const userData = await page.evaluate((profileUrl) => {
      const data = {
        name: "",
        jobTitle: "",
        company: "",
        location: "",
        profileUrl: "",
        profileImageUrl: "",
      };

      // @ts-ignore
      data.name = document.querySelector(".inline.t-24.v-align-middle.break-words")?.innerText.trim() || "";
      data.jobTitle = document.querySelectorAll("[data-field=experience_company_logo]")[1]?.querySelectorAll("span")[0]?.innerText.trim() || "";
      data.company = document.querySelectorAll("[data-field=experience_company_logo]")[1]?.querySelectorAll("span")[3]?.innerText.trim() || "";
      // @ts-ignore
      data.location = document.querySelector('[data-member-id]')?.querySelector('span.text-body-small.inline.t-black--light.break-words')?.innerText.trim() || "";
      data.profileUrl = profileUrl || "";
      // @ts-ignore
      data.profileImageUrl = document.querySelector(".pv-top-card-profile-picture__image--show")?.src || "";

      return data;
    }, link);

    profileData.push(userData);

    await wait(3000 + Math.random() * 2000); // 👈 Important: delay after scraping before next link
  }



  await browser.close();
  console.log("Scraped Profile data: ", profileData)
  await Profile.create(profileData)
  mongoose.disconnect()
};

scrapeLinkedIn();

