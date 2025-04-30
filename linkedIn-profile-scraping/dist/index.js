"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const profile_1 = require("./model/profile");
const db_1 = require("./config/db");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
(0, db_1.connectDatabase)();
function wait(milliseconds) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("wait over");
            }, milliseconds);
        });
    });
}
const scrapeLinkedIn = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false, defaultViewport: null });
    const page = yield browser.newPage();
    // 1. Login
    yield page.goto("https://www.linkedin.com/login");
    // adding delay in typing 
    yield wait(2000);
    yield page.type("#username", process.env.LINKEDIN_EMAIL || "");
    // adding delay in typing
    yield wait(2000);
    yield page.type("#password", process.env.LINKEDIN_PASSWORD || "");
    yield Promise.all([page.click("[type=submit]"), page.waitForNavigation()]);
    let profileLinks = [];
    let pageNumber = 1;
    const numberOfProfileWanted = 5;
    // Loop until you collect at least numberOfProfileWanted profiles Link
    while (profileLinks.length < numberOfProfileWanted) {
        const searchUrl = `https://www.linkedin.com/search/results/people/?geoUrn=%5B%22103644278%22%5D&industry=%5B%221594%22%2C%221862%22%2C%2280%22%5D&keywords=%22lead%20generation%20agency%22&origin=GLOBAL_SEARCH_HEADER&sid=z%40k&titleFreeText=Founder&page=${pageNumber}`;
        console.log("pageNumber", pageNumber);
        console.log("profile: ", profileLinks);
        yield page.goto(searchUrl);
        // waiting for 5 seconds for everything to load correctly
        yield wait(5000);
        const links = yield page.evaluate(() => {
            console.log("running inside page");
            const result = [];
            const profiles = Array.from(document.querySelectorAll("[data-chameleon-result-urn]")).filter(el => {
                const urn = el.getAttribute("data-chameleon-result-urn");
                return urn && urn.startsWith("urn:li:member:") && !urn.includes("headless");
            });
            profiles.forEach(profile => {
                const anchor = profile.querySelector("a");
                if (anchor && anchor.href) {
                    result.push(anchor.href.split("?")[0]); // clean profile URL
                }
            });
            console.log(result);
            return result;
        });
        console.log("page Links: ", links);
        profileLinks = [...profileLinks, ...links];
        pageNumber++;
        yield wait(3000 + Math.random() * 2000);
    }
    console.log("Scraped Profile Links:", profileLinks.slice(0, numberOfProfileWanted));
    let profileData = [];
    // looping every profile link and visiting them one by one and collecting their data
    for (const link of profileLinks.slice(0, numberOfProfileWanted)) {
        yield page.goto(link);
        console.log("link:", link);
        // waiting for 5 seconds for everything to load correctly
        yield wait(5000);
        const userData = yield page.evaluate((profileUrl) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const data = {
                name: "",
                jobTitle: "",
                company: "",
                location: "",
                profileUrl: "",
                profileImageUrl: "",
            };
            // @ts-ignore
            data.name = ((_a = document.querySelector(".inline.t-24.v-align-middle.break-words")) === null || _a === void 0 ? void 0 : _a.innerText.trim()) || "";
            data.jobTitle = ((_c = (_b = document.querySelectorAll("[data-field=experience_company_logo]")[1]) === null || _b === void 0 ? void 0 : _b.querySelectorAll("span")[0]) === null || _c === void 0 ? void 0 : _c.innerText.trim()) || "";
            data.company = ((_e = (_d = document.querySelectorAll("[data-field=experience_company_logo]")[1]) === null || _d === void 0 ? void 0 : _d.querySelectorAll("span")[3]) === null || _e === void 0 ? void 0 : _e.innerText.trim()) || "";
            // @ts-ignore
            data.location = ((_g = (_f = document.querySelector('[data-member-id]')) === null || _f === void 0 ? void 0 : _f.querySelector('span.text-body-small.inline.t-black--light.break-words')) === null || _g === void 0 ? void 0 : _g.innerText.trim()) || "";
            data.profileUrl = profileUrl || "";
            // @ts-ignore
            data.profileImageUrl = ((_h = document.querySelector(".pv-top-card-profile-picture__image--show")) === null || _h === void 0 ? void 0 : _h.src) || "";
            return data;
        }, link);
        profileData.push(userData);
        yield wait(3000 + Math.random() * 2000); // 👈 Important: delay after scraping before next link
    }
    yield browser.close();
    console.log("Scraped Profile data: ", profileData);
    yield profile_1.Profile.create(profileData);
    mongoose_1.default.disconnect();
});
scrapeLinkedIn();
