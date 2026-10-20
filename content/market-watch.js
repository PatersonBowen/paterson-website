// MARKET WATCH — the one file to edit to add an update.
//
// Adding an entry here and deploying publishes it: the page, its list card, the sitemap entry and
// the image (put the file in content/market-watch/images/). Titles must be "Series: Project or topic".
// With this list empty, Market Watch is not published at all.
//
// One object per update (any order; the site sorts newest first):
//
//   {
//     slug: "miami-brickell-towers-break-ground",   // web address; lowercase letters, numbers, hyphens
//     title: "Miami: Three Brickell Towers Break Ground",
//     date: "2026-10-19",                            // YYYY-MM-DD
//     updated: "2026-10-21",                         // optional, if edited later
//     market: "Miami",                               // New York, Miami, US-wide, or another US market
//     type: "Notable Projects",                      // Notable Projects | Market Update | Hiring Insight
//     summary: "One or two sentences. Shown on the list page and in Google.",
//     intro: ["Optional opening paragraph.", "Optional second paragraph."],
//     projects: [                                    // 3–5 per update; public facts only
//       {
//         name: "Project name",
//         location: "Neighborhood, City, State",
//         detail: "Size, status, and developer or contractor if publicly reported.",
//         sourceName: "Publication or press release name",
//         sourceUrl: "https://link-to-the-public-source",
//       },
//     ],
//     hiringView: ["Your view on which roles, firms and hiring this points to.", "Second paragraph if needed."],
//     linkedinUrl: "https://www.linkedin.com/...",   // optional: the original post
//   }
//
// Rules: link every project to a public source; no images unless owned or permitted;
// never imply Paterson worked on a project unless that is true.

export const ENTRIES = [
  /* ---------------------------------------------------------- 2026-10-19 */
  {
    slug: "behind-the-build-jpmorganchase-global-headquarters",
    title: "Behind the Build: JPMorganChase Global HQ, 270 Park Avenue",
    date: "2026-10-19",
    market: "New York",
    type: "Behind The Build",
    image: "behind-the-build-jpmorganchase-global-headquarters.jpg",
    imageAlt: "Behind the Build graphic: JPMorgan Chase headquarters, 270 Park Avenue, showing a sweeping interior staircase and atrium",
    imageCredit: "Image: © Nigel Young, courtesy of Foster + Partners",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7517914889550602241",
    summary:
      "JRM Construction Management delivered the interior build-out of 28 floors, more than 1.3 million square feet, inside JPMorgan Chase's 1,388-foot tower at 270 Park Avenue.",
    facts: [
      ["Project", "JPMorgan Chase Global Headquarters, Interior Build-Out"],
      ["Size", "1.3 Million Square Feet across 28 Floors"],
      ["Location", "270 Park Avenue, Midtown Manhattan"],
    ],
    intro: [
      "Inside the 1,388-foot tower Tishman Speyer developed for JPMorgan Chase, JRM Construction Management delivered the interior build-out of 28 floors, more than 1.3 million square feet of workspace for about 10,000 employees.",
      "The scope covered premium office floors, corporate dining, technology-driven conference centers, health and wellness facilities and security centers, with the project pursuing LEED Platinum, WELL and Fitwel certification. The project was named ENR New York's 2026 Best Project in the Interior category.",
      "An interior program of this size runs like a building project in its own right. Floors are sequenced in parallel, trades are stacked through a live tower, and every finish has to meet the same standard, across every floor.",
    ],
    team: [
      ["Client", "JPMorganChase"],
      ["Development Manager", "Tishman Speyer"],
      ["Base Building Architect", "Foster + Partners"],
      ["Interior Architect", "Gensler"], // CONFIRM: published coverage credits Gensler for only part of the interiors
      ["Base Building Construction Manager", "AECOM Tishman"],
      ["Interior Fit-Out", "JRM Construction Management"],
    ],
    hiringView: [
      "Few project executives, superintendents and MEP coordinators have held that standard across a project of this magnitude for a single occupier. Those who have tend to be known by name.",
      "If you have delivered at this scale and are curious about what else is out there, we would welcome a confidential conversation.",
    ],
    sources: [
      { name: "JRM Construction Management: build-out of JPMorgan Chase Global HQ named ENR New York's Best Project, Interior category", url: "https://www.bisnow.com/biswire/jrm-construction-managements-build-out-of-jpmorgan-chase-global-hq-named-enr-new-yorks-best-project-in-the-interior-category-753" },
      { name: "JRM Construction Management: JPMorgan Global Headquarters interior highlights", url: "https://www.jrmcm.com/jrm-news/jpmorgan-global-headquarters-interior-highlights/" },
      { name: "Hoodline: JRM's JPMorgan Chase HQ build-out wins ENR's top NY interior prize", url: "https://hoodline.com/2026/08/jrm-s-jpmorgan-chase-hq-build-out-wins-enr-s-top-ny-interior-prize/" },
    ],
  },

  /* ---------------------------------------------------------- 2026-10-16 */
  {
    slug: "behind-the-build-bonhams-us-headquarters-steinway-hall",
    title: "Behind the Build: Bonhams U.S. HQ, Steinway Hall",
    date: "2026-10-16",
    market: "New York",
    type: "Behind The Build",
    image: "behind-the-build-bonhams-us-headquarters-steinway-hall.jpg",
    imageAlt: "Behind the Build graphic: Bonhams U.S. headquarters at Steinway Hall, showing the gallery, the historic rotunda with a grand piano, and the atrium",
    imageCredit: "Images: © Bonhams / Colin Miller",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7516837434639441920",
    summary:
      "Bonhams' new 42,000-square-foot U.S. flagship spans four floors of Steinway Hall on West 57th Street and is about 30% larger than its former Madison Avenue home.",
    facts: [
      ["Project", "Bonhams U.S. Headquarters"],
      ["Size", "42,000 Square Feet"],
      ["Location", "Steinway Hall, 111 West 57th Street, Manhattan"],
    ],
    intro: [
      "Bonhams opened its new U.S. flagship inside Steinway Hall, the 1925 Warren & Wetmore landmark at the base of 111 West 57th Street on Billionaires' Row. Spanning four floors, the new headquarters is approximately 30% larger than the auction house's former Madison Avenue location.",
      "Designed by Gensler, with interior design by Design X Nada, and delivered by JT Magen, the project brings together the restored Steinway Rotunda and an 80-foot glass atrium, with a grand staircase, triple-height gallery and two auction rooms. The space connects the historic hall with the SHoP-designed residential tower that rises above it.",
      "Behind the public galleries sit workspaces for Bonhams' U.S. team, multiple meeting rooms, professional photography studios and centralized warehousing, all delivered within the same footprint.",
      "Projects of this caliber demand careful coordination between contemporary fit-out requirements and historic preservation. Working within a landmarked building requires close attention to existing finishes, specialist trades, lighting and the sequencing of complex interior works.",
    ],
    team: [
      ["Client", "Bonhams"],
      ["Architect", "Gensler"],
      ["Interior Design", "Design X Nada"],
      ["Construction Manager", "J.T. Magen & Company Inc."],
    ],
    hiringView: [
      "The project managers, superintendents and preconstruction leads who deliver work at this level are a small and sought-after group.",
      "If that describes your experience and you are open to a conversation, our door is open.",
    ],
    sources: [
      { name: "Bonhams: announcement of the new New York headquarters", url: "https://bonhams.shorthandstories.com/bonhams-nyc-headquarters" },
      { name: "ArtDependence: Bonhams officially opens its new U.S. flagship", url: "https://artdependence.com/articles/bonhams-officially-opens-its-new-us-flagship/" },
      { name: "Galerie: Bonhams relocates to New York's historic Steinway Hall", url: "https://galeriemagazine.com/bonhams-new-york-steinway-hall/" },
    ],
  },

  /* ---------------------------------------------------------- 2026-10-15 */
  {
    slug: "behind-the-build-350-park-avenue",
    title: "Behind the Build: 350 Park Avenue, Midtown East",
    date: "2026-10-15",
    market: "New York",
    type: "Behind The Build",
    image: "behind-the-build-350-park-avenue.jpg",
    imageAlt: "Behind the Build graphic: 350 Park Avenue, Midtown East, showing a rendering of the Foster + Partners supertall",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7516468702528167937",
    summary:
      "Demolition is under way at 350 Park Avenue, where a $6.2 billion Foster + Partners supertall is moving forward with a $3.3 billion construction loan and Citadel as anchor tenant.",
    facts: [
      ["Development", "350 Park Avenue"],
      ["Value", "$6.2 Billion"],
      ["Location", "Park Avenue, Midtown East, Manhattan"],
    ],
    intro: [
      "Demolition is underway at 350 Park Avenue, where Citadel, Vornado Realty Trust and Rudin are advancing one of Manhattan's most significant office developments: a new Foster + Partners supertall.", // CONFIRM: published reports name Ken Griffin's KG, not Citadel, as the partner
      "Vornado confirmed in August that the $6.2 billion redevelopment is moving forward, with a $3.3 billion construction loan ready to go.",
      "The 62-story tower will deliver approximately 1.8 million square feet of Class A office space, with Citadel and Citadel Securities committing to roughly 1.05 million square feet as anchor tenants. The completed building is expected to accommodate more than 6,000 people.", // CONFIRM: some reports give 1.8 to 2.0 million sq ft
    ],
    team: [
      ["Development Partners", "Citadel, Vornado Realty Trust and Rudin"],
      ["Architect", "Foster + Partners"],
    ],
    hiringView: [
      "A development of this scale takes years of planning, coordination and execution before the final structure takes shape. Behind every milestone is a team of development managers, preconstruction leads, project directors and engineers helping bring the vision to life.",
      "For those involved in projects like this, the next opportunity often starts long before the current project finishes.",
    ],
    sources: [
      { name: "Mann Report: Vornado and Rudin join Griffin in 350 Park Avenue development (Vornado announcement)", url: "https://www.mannpublications.com/mannreport/2026/08/11/vornado-realty-trust-rudin-join-griffin-in-350-park-ave-development/" },
      { name: "CRE Daily: 350 Park Avenue lands $3.3B loan for NYC office tower", url: "https://www.credaily.com/briefs/350-park-avenue-lands-3-3b-loan-for-nyc-office-tower/" },
      { name: "Commercial Search: Vornado, Rudin join partnership for $6.2B Manhattan project", url: "https://www.commercialsearch.com/news/vornado-rudin-join-partnership-for-6-2b-manhattan-project/" },
    ],
  },

  /* ---------------------------------------------------------- 2026-10-14 */
  {
    slug: "behind-the-build-the-torch-740-eighth-avenue",
    title: "Behind the Build: The Torch, 740 Eighth Avenue, New York",
    date: "2026-10-14",
    market: "New York",
    type: "Behind The Build",
    image: "the-torch-740-eighth-avenue.jpg",
    imageAlt: "Behind the Build graphic: The Torch, 740 Eighth Avenue, showing the tower rising above the clouds in Midtown Manhattan",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7516115006917275648",
    summary:
      "Extell has closed $1.25 billion in construction financing for The Torch, the tallest building under construction in New York, with roughly 40 of its 60 levels complete.",
    facts: [
      ["Development", "The Torch"],
      ["Value", "$1.3 Billion"],
      ["Location", "740 Eighth Avenue, Times Square, Manhattan"],
    ],
    intro: [
      "Extell closed $1.25 billion in construction financing for The Torch in September. A $1.1 billion senior loan led by JPMorgan and a $150 million mezzanine loan. Roughly 40 of the tower's 60 levels are now complete, with topping out expected in 2027 and completion in the second half of 2028.", // CONFIRM: no published source found for the 2H 2028 completion date
      "Currently the tallest building under construction in New York, the supertall has grown in scope as it climbs. The hotel will now total around 1,800 rooms, up from the 825 originally planned, making it one of the largest hotels in the city, topped by a public observation deck and a 250-foot drop ride. An international hotel brand has signed a 40-year franchise agreement, with the name yet to be announced.", // CONFIRM: published reports give the drop ride as 260 to 300 feet
    ],
    team: [
      ["Developer", "Extell"],
      ["Design Architect", "ODA"],
      ["Architect of Record", "SLCE Architects"],
      ["General Contractor", "Suffolk Construction"],
      ["Senior Lender", "JPMorganChase"],
    ],
    hiringView: [
      "As The Torch rises over Times Square, it is easy to forget the people behind the build. The numerous individuals who spend months and years of their lives developing, designing, managing, and building our skylines often find themselves wondering what's next.",
      "If this is you, feel free to get in touch.",
    ],
    sources: [
      { name: "CRE Daily: Extell Lands $1.25B for Massive Times Square Hotel Tower", url: "https://www.credaily.com/?p=222785" },
      { name: "Bisnow: Extell Arranges Nearly $1.3B for Hotel Supertall", url: "https://bisnow.com/new-york/news/hotel/extell-arranges-nearly-13b-for-hotel-supertall-128460" },
      { name: "New York YIMBY: The Torch Reaches Halfway Point at 740 Eighth Avenue", url: "https://newyorkyimby.com/2026/08/the-torch-reaches-halfway-point-at-740-eighth-avenue-in-times-square-manhattan.html" },
      { name: "Dezeen: The Torch supertall skyscraper in New York", url: "https://www.dezeen.com/2025/06/05/the-torch-supertall-skyscraper-thrill-ride/" },
    ],
  },

  /* ---------------------------------------------------------- 2026-10-13 */
  {
    slug: "the-market-construction-leadership-shortage",
    title: "The Market: Construction Leadership Shortage",
    date: "2026-10-13",
    market: "US-wide",
    type: "The Market",
    image: "the-market-construction-leadership-shortage.jpg",
    imageAlt: "The Market graphic: 349,000 workers needed in 2026, rising to an estimated 456,000 in 2027",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7515769715449823232",
    summary:
      "The construction labor shortage isn't only in the trades. Experienced leadership is getting harder to replace, with 80% of contractors reporting difficulty filling management positions.",
    intro: [
      "The conversation around construction labor shortages often focuses on the trades. But there is another shortage developing further up the organization: experienced leadership.",
      "The construction industry has reported a deficit of roughly 350,000 people in 2026 alone, rising to an estimated 460,000 in 2027.",
      "80% of contractors report difficulty filling management positions, the highest share in three years.", // CONFIRM: AGC/Sage's wording is "salaried positions"; the three-year comparison was not found in the report
    ],
    stats: [
      { value: "349,000", label: "workers needed in 2026.", source: "Associated Builders and Contractors (ABC), 2026 workforce projection" },
      { value: "456,000", label: "estimated workers needed in 2027.", source: "Associated Builders and Contractors (ABC), 2026 workforce projection" },
      { value: "80%", label: "of contractors report difficulty filling salaried positions.", source: "AGC and Sage, 2026 Construction Hiring & Business Outlook" },
    ],
    hiringView: [
      "The professionals who have already delivered complex projects, managed large teams and built lasting relationships are much harder to replace than an open position on a job board might suggest. This is especially true because young talent hasn't been coming up through the ranks.",
      "As construction pipelines expand, this becomes increasingly relevant to contractors and developers. The issue is not finding people. It is finding the right people, with the right experience.",
    ],
    sources: [
      { name: "Associated Builders and Contractors: 2026 construction workforce shortage", url: "https://www.abc.org/wfshortage" },
      { name: "AGC and Sage: 2026 Construction Hiring and Business Outlook", url: "https://www.agc.org/sites/default/files/users/user21902/2026%20Construction%20Hiring%20and%20Business%20Outlook%20Report_Final2.pdf" },
    ],
  },

  /* ---------------------------------------------------------- 2026-08-27 */
  {
    slug: "behind-the-build-80-clarkson-west-village",
    title: "Behind the Build: 80 Clarkson, West Village, New York",
    date: "2026-08-27",
    market: "New York",
    type: "Behind The Build",
    image: "behind-the-build-80-clarkson-west-village.jpg",
    imageAlt: "Behind the Build graphic: 80 Clarkson, West Village, showing a rendering of the two limestone towers beside the Hudson River",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7498669196596359171",
    summary:
      "Both cranes are down and limestone façade installation is close to complete at 80 Clarkson, moving the two-tower West Village project into fit-out ahead of completion this year.",
    facts: [
      ["Development", "80 Clarkson"],
      ["Value", "$1.25 Billion"],
      ["Location", "West Village, Manhattan"],
    ],
    intro: [
      "Both cranes at 80 Clarkson have now come down and limestone façade installation is close to complete, moving the project into fit-out ahead of completion this year.",
      "The two towers, which stand at 490 and 420 feet, were financed with a $985 million construction loan from Cale Street Partners and Farallon Capital Management, the largest residential construction loan issued in New York City since the pandemic.",
    ],
    team: [
      ["Developers", "Zeckendorf Development, Atlas Capital Group and The Baupost Group"],
      ["Design Architect", "COOKFOX Architects"],
      ["Architect of Record", "SLCE Architects"],
      ["General Contractor", "Suffolk Construction"],
    ],
    hiringView: [
      "As 80 Clarkson draws to a close, it is easy to forget the people behind the build. The numerous individuals who have spent months and years of their lives developing, designing, managing, and building our skylines often find themselves wondering what's next.",
      "If this is you, feel free to get in touch.",
    ],
    sources: [
      { name: "Commercial Observer: Manhattan Residential Towers Project Nabs $985M Loan", url: "https://commercialobserver.com/2024/07/manhattan-residential-towers-project-nabs-985m-loan/" },
      { name: "Field Condition: 80 Clarkson construction update, January 2026", url: "https://www.fieldcondition.com/blog/2026/1/29/construction-update-80-clarkson-cookfox" },
    ],
  },

  /* ---------------------------------------------------------- 2026-08-26 */
  {
    slug: "the-market-where-is-the-market-moving",
    title: "The Market: Where Is the Market Moving?",
    date: "2026-08-26",
    market: "US-wide",
    type: "The Market",
    image: "the-market-construction-activity-across-us-markets.jpg",
    imageAlt: "The Market graphic: US map highlighting Arizona, Texas and Florida under the heading Where is the market moving?",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7498308332420665345",
    summary:
      "Construction activity across the US is increasingly differentiated by market and sector. The markets attracting the greatest investment are not necessarily the ones best positioned to deliver it.",
    intro: [
      "Construction activity across the United States is increasingly differentiated by market and sector.",
      "Texas commands nearly $90 billion a year in commercial construction, more than any other state. Dallas–Fort Worth delivered more than 40,000 new apartments in 2024, putting it among the most active multifamily markets in the country. Dallas–Fort Worth is also the second-largest data center market in the U.S., with significant additional capacity under construction.", // CONFIRM: DFW apartments and data center ranking (no published source found)
      "Florida continues to attract large-scale investment on the back of sustained population growth, issuing the second-highest number of residential building permits of any state in 2024, just behind Texas.", // CONFIRM: no published source found
      "Arizona has become the nation's highest per-capita market for commercial construction spending, driven in part by advanced manufacturing and the rapidly expanding data center ecosystem around Phoenix and Mesa.",
    ],
    stats: [
      { value: "$89.7B", label: "annual commercial construction spending in Texas, more than any other state.", source: "Twisted Nail report, via Construction Dive" },
      { value: "No. 1", label: "Arizona's rank for commercial construction spending per capita.", source: "Twisted Nail report, via Construction Dive" },
    ],
    hiringView: [
      "What is interesting is that the markets attracting the greatest investment are not necessarily the ones best positioned to deliver it.",
      "For contractors and developers, understanding where opportunity is moving is just one part of the question. The other is whether the market genuinely has the people capable of delivering the projects.",
    ],
    sources: [
      { name: "Construction Dive: Texas and Arizona top states for commercial construction spending", url: "https://www.constructiondive.com/news/texas-arizona-top-states-commercial-construction-spending/749408/" },
    ],
  },

  /* ---------------------------------------------------------- 2026-08-25 */
  {
    slug: "paterson-perspective-we-build-the-teams-that-build-your-skyline",
    title: "Paterson Perspective: We Build the Teams That Build Your Skyline",
    date: "2026-08-25",
    market: "US-wide",
    type: "Paterson Perspective",
    image: "paterson-perspective-construction-is-delivered-by-people.jpg",
    imageAlt: "Paterson Perspective graphic: We build the teams that build your skyline",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7498041692957274112",
    summary:
      "Paterson works at the intersection of people, construction and real estate, helping contractors, developers and owner's representatives identify the people capable of delivering complex projects.",
    intro: [
      "Paterson works at the intersection of people, construction and real estate.",
      "We work with General Contractors, Construction Managers, Developers and Owners' Representatives across the United States, helping them identify the people capable of delivering complex projects and building the businesses behind them.",
      "Our focus is the people who have the greatest influence on project delivery and growth: from Estimators and Preconstruction Managers through Project Managers, Project Executives and senior operational leadership.",
      "We take a deliberate approach to understanding the market, the business and the people within it.",
    ],
    hiringHeading: "Our Approach",
    hiringView: [
      "Construction is ultimately delivered by people. We are focused on finding the ones who make a difference.",
    ],
    sources: [],
  },
];
