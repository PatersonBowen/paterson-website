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
  /* ---------------------------------------------------------- 2026-10-26 */
  {
    slug: "behind-the-build-the-chrysler-building-405-lexington-avenue",
    title: "Behind the Build: The Chrysler Building, 405 Lexington Avenue",
    date: "2026-10-26",
    market: "New York",
    type: "Behind The Build",
    image: "behind-the-build-the-chrysler-building-405-lexington-avenue.jpg",
    imageAlt: "Behind the Build graphic: the Chrysler Building, 405 Lexington Avenue, its lit crown rising above the Midtown East skyline at dusk",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7520447922467971072",
    summary:
      "Tishman Speyer has signed a 150-year ground lease with The Cooper Union and, with lead investor PSP Investments, will put $235 million into restoring the 1930 Chrysler Building.",
    facts: [
      ["Development", "The Chrysler Building"],
      ["Value", "$235 Million"],
      ["Location", "405 Lexington Avenue, Midtown East, Manhattan"],
    ],
    intro: [
      "Tishman Speyer is back at the Chrysler Building. Chosen from a field of competitive proposals, it has signed a 150-year ground lease with The Cooper Union and, with lead investor PSP Investments, will put $235 million into restoring the 1930 tower, all equity.",
      // CONFIRM: sources support the ground rent rise ($7.8M in 2018 to a high of $32.5M, per Bisnow), the court removal of the last leaseholder
      // and the roughly $21M of unpaid rent, and the rodent complaints. The "2024" end date and "elevator outages" were not found.
      "The building has had a difficult decade. Ground rent quadrupled between 2018 and 2024, the last leaseholder was removed by the courts owing $21 million, and tenants complained of elevator outages and pests.",
      // CONFIRM: the announcement describes an indoor-outdoor amenity with a lounge and outdoor access on the 61st floor; it does not say "terraces".
      "The plan restores the façade and crown, replaces the building's core systems and prebuilds 75% of the vacant space as ready-to-occupy suites. The 61st floor, home to the eagle gargoyles, becomes a lounge with terraces.",
      // CONFIRM: "almost no new office space built around Grand Central in decades" is the post's own view; no source found.
      "With almost no new office space built around Grand Central in decades, the timing makes sense.",
    ],
    team: [
      ["Developer", "Tishman Speyer"],
      ["Lead Investor", "PSP Investments | Investissements PSP"],
      ["Landowner", "The Cooper Union for the Advancement of Science and Art"],
    ],
    hiringHeading: "What Comes Next",
    hiringView: [
      "The challenge is delivering it inside a landmark that cannot visibly change. No architect, contractor or construction timeline has been announced yet.",
      // CONFIRM: this closing line was added to match the other entries; it is not in the LinkedIn post.
      "If you have worked inside a protected tower and would like to hear when the team forms, we would welcome a confidential conversation.",
    ],
    sources: [
      { name: "PSP Investments: Tishman Speyer and The Cooper Union finalize ground lease agreement and revitalization plan for Chrysler Building", url: "https://www.investpsp.com/en/news/tishman-speyer-the-cooper-union-finalize-ground-lease-agreement-and-revitalization-plan-for-chrysler-building/" },
      { name: "Bisnow: Tishman Speyer retakes Chrysler Building, plans $235M renovation", url: "https://www.bisnow.com/news/new-york/office/tishman-speyer-chrysler-building-cooper-union-psp" },
      { name: "CRE Daily: Judge orders RFR to cede Chrysler Building to Cooper Union", url: "https://www.credaily.com/briefs/judge-orders-rfr-to-cede-chrysler-building-to-cooper-union" },
    ],
  },

  /* ---------------------------------------------------------- 2026-10-22 */
  {
    slug: "industry-insight-a-soft-market-a-tight-one-for-leaders",
    title: "Industry Insight: A Soft Market, a Tight One for Leaders",
    date: "2026-10-22",
    market: "US-wide",
    type: "Industry Insight",
    // CONFIRM: the graphic still reads "PHOTO: [CREDIT]" in the bottom-left. Replace the image file with a corrected graphic
    // (same file name) once the photo credit is filled in.
    image: "industry-insight-a-soft-market-a-tight-one-for-leaders.jpg",
    imageAlt: "Industry Insight graphic: a soft market, a tight one for leaders. Construction unemployment of 3.1% in August 2026, a record low, and 75% of firms seeking superintendents struggling to hire one, over the New York skyline",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7519019546540662784",
    summary:
      "More US contractors cut headcount than added it this year, yet 75% of firms seeking a superintendent struggle to hire one and construction unemployment is at a record low.",
    stats: [
      { value: "3.1%", label: "construction unemployment, August 2026, a record low.", source: "AGC analysis of Bureau of Labor Statistics data" },
      { value: "75%", label: "of firms seeking superintendents struggle to hire one.", source: "AGC and NCCER, 2026 Workforce Survey" },
      { value: "58%", label: "of firms reporting on data-center effects say competition for skilled workers has increased.", source: "AGC and NCCER, 2026 Workforce Survey" },
    ],
    intro: [
      // CONFIRM: "the first time since the pandemic" (in the original post) is not stated in AGC's survey, so it is left out here.
      "More US construction firms cut headcount than added it over the past year. In the 2026 Workforce Survey from the Associated General Contractors of America (AGC) and NCCER, 37% of respondents reduced headcount by at least 5%, against 34% that increased it by at least 5%.",
      "Yet the shortage of experienced people has not eased. 75% of firms looking for a superintendent say they are struggling to hire one, and for project managers and supervisors the figure is 74%. Construction unemployment fell to a record-low 3.1% in August, according to AGC's analysis of federal data.",
      "Skills: half of respondents say available candidates are not qualified, because they lack the skills, certificates or licenses the job needs.",
      // CONFIRM: the post said "in the markets where they cluster"; AGC's wording is "among firms reporting on those effects".
      "Data centers: among firms reporting on their effects, 58% say data-center projects have increased competition for skilled workers.",
      // CONFIRM: no published source for this one. It is stated as Paterson's view, as the graphic's "Our View" label suggests.
      "Retirement: in our view, senior leaders are leaving faster than they are being replaced.",
    ],
    hiringView: [
      "The market has softened. Demand for proven leaders has not.",
      "Are you finding senior hires harder than a year ago? What is driving it in your market? We would like to hear from you.",
    ],
    sources: [
      { name: "AGC: Construction workforce shortages remain acute despite soft market conditions as data centers strain labor supply (September 3, 2026)", url: "https://www.agc.org/news/2026/09/03/construction-workforce-shortages-remain-acute-despite-soft-market-conditions-data-centers-strain" },
      { name: "AGC and NCCER: 2026 Workforce Survey Analysis", url: "https://www.agc.org/sites/default/files/users/user21902/2026%20Workforce%20Survey%20Analysis%20(4).pdf" },
      { name: "AGC and NCCER: 2026 Workforce Survey, National Results", url: "https://www.agc.org/sites/default/files/users/user21902/2026%20AGC%20WFS%20NCCER%20(3).pdf" },
      { name: "AGC: Construction employment, earnings and unemployment, August 2026", url: "https://www.agc.org/sites/default/files/users/user21902/Employment-AHE%20table%20AUG%202026.pdf" },
    ],
  },

  /* ---------------------------------------------------------- 2026-10-21 */
  {
    slug: "behind-the-build-four-builds-at-the-top-of-the-market",
    title: "Behind the Build: Four Builds at the Top of the Market",
    date: "2026-10-21",
    market: "New York",
    type: "Behind The Build",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7518761446768418816",
    carousel: {
      label: "Slides from the LinkedIn post: four builds at the top of the market",
      images: [
        "behind-the-build-four-builds-at-the-top-of-the-market-1.jpg",
        "behind-the-build-four-builds-at-the-top-of-the-market-2.jpg",
        "behind-the-build-four-builds-at-the-top-of-the-market-3.jpg",
        "behind-the-build-four-builds-at-the-top-of-the-market-4.jpg",
        "behind-the-build-four-builds-at-the-top-of-the-market-5.jpg",
      ],
      alts: [
        "Slide 1 of 5, Four Builds at the Top of the Market: four New York homes, and the specialist builders behind them. A mirrored steel slide spirals through a penthouse living room. Photo: Shannon Dupre / DD-REPS.",
        "Slide 2 of 5, Sky House, 150 Nassau St, SilverLining: how do you fit an 80-foot slide inside an 1895 landmark? Slowly. The build of the 6,500 square foot, four-story penthouse took more than five years from planning to completion. Photo: Shannon Dupre / DD-REPS.",
        "Slide 3 of 5, Manhattan Townhouse, Taconic Builders: traditional joinery and modern steel glazing, in one room. Millwork, stone and steel-framed glass are separate trades with separate tolerances, sequenced together, with McBride Architects and Alecia Stevens Interiors. Photo: Bjorn Wallander / OTTO.",
        "Slide 4 of 5, Gramercy Park Townhouse, Sea-Dar Construction: on Gramercy Park, the street front is protected. It sits in a designated historic district, where exterior changes need Landmarks approval. Inside, original plaster and the carved mantel were kept alongside new work. Photo: Adrian Gaut / Architectural Digest.",
        "Slide 5 of 5, Park Avenue Penthouse, I-Grace: even brand-new penthouses get rebuilt. The two-story unit sat in a new Toll Brothers building, and I-Grace reworked it with Venetian plaster, smart HVAC and lacquer-and-leather joinery. Photo courtesy of I-Grace.",
      ],
    },
    summary:
      "Some of New York's most complex construction happens behind closed doors, inside private homes. Four examples, and the specialist builders who delivered them.",
    intro: [
      "Some of New York's most complex construction happens behind closed doors, inside private homes. Here are four examples, and the specialist builders who delivered them.",
      "Each presented a different kind of problem: a landmark shell, mixed trades in one room, a historic district and a new building rebuilt to a higher standard.",
    ],
    projects: [
      {
        name: "Sky House, 150 Nassau Street",
        location: "New York, NY",
        // CONFIRM: figures below are from the original post. 6sqft gives about 6,600 sq ft and a 1896 completion for the building
        // (post says 6,500 sq ft and 1895); the five-year timeline and the Interior Design ranking come from sources the post
        // cites (Compass listing, Robb Report) that could not be retrieved to link.
        detail:
          "Built by SilverLining, Inc. A 6,500 square foot, four-story penthouse crowning the 1895 American Tract Society Building, designed by David Hotson with interiors by Ghislaine Viñas. An 80-foot stainless-steel slide runs down through the levels. Planning and construction took more than five years, and Interior Design named it one of the best interiors of the last 20 years.",
        sourceName: "6sqft: An 80-foot slide winds through this whimsical FiDi penthouse",
        sourceUrl: "https://www.6sqft.com/an-80-foot-slide-winds-through-this-whimsical-fidi-penthouse/",
      },
      {
        name: "Manhattan Townhouse",
        location: "New York, NY",
        // CONFIRM: Taconic's project page confirms the team and the photographer, but not the oak paneling, bookcases or glass wall
        // (the post cites a Franklin Report review that could not be retrieved to link).
        detail:
          "Built by Taconic Builders, Inc. Delivered with McBride Architects and Alecia Stevens Interiors, the house pairs oak paneling, built-in bookcases and a marble fireplace with a steel-framed glass wall onto the garden.",
        sourceName: "Taconic Builders: Manhattan Townhouse",
        sourceUrl: "https://www.taconicbuilders.com/manhattan-townhouse",
      },
      {
        name: "Gramercy Park Townhouse",
        location: "Gramercy Park, New York, NY",
        // CONFIRM: Sea-Dar's page credits SPAN Architecture, AMP Interiors and Christiane Duncan Interiors, and lists the
        // Architectural Digest feature (Feb 9, 2024). It does not mention the plasterwork, the carved mantel or the historic district,
        // and does not name Anne-Marie Winter (the post does).
        detail:
          "Built by Sea-Dar Construction. Working with SPAN Architecture and designers Anne-Marie Winter and Christiane Duncan, the renovation keeps the original plasterwork and carved mantel alongside new work. It was featured in Architectural Digest.",
        sourceName: "Sea-Dar: Gramercy Park Townhouse",
        sourceUrl: "https://seadar.com/projects/gramercy-park-townhouse/",
      },
      {
        name: "Park Avenue Penthouse",
        location: "Park Avenue, New York, NY",
        // CONFIRM: I-Grace's page confirms every detail below, but it appears to be several years old, so "recent" may not fit.
        detail:
          "Built by I-Grace. A two-story renovation in a new Toll Brothers building with designer Arthur Dunnam: Venetian plaster, refinished walnut floors, smart HVAC and a custom dressing room in high-gloss lacquer and embossed leather.",
        sourceName: "I-Grace: NYC Penthouse Renovation",
        sourceUrl: "https://igrace.com/portfolio/featured-projects/nyc-penthouse-renovation/",
      },
    ],
    hiringView: [
      "Work at this level depends on project managers, superintendents and trades who are comfortable with small sites, high expectations and very little margin for error.",
      "If that describes you and you are open to a confidential conversation, we would be glad to talk.",
    ],
    sources: [
      { name: "6sqft: An 80-foot slide winds through this whimsical FiDi penthouse", url: "https://www.6sqft.com/an-80-foot-slide-winds-through-this-whimsical-fidi-penthouse/" },
      { name: "Taconic Builders: Manhattan Townhouse", url: "https://www.taconicbuilders.com/manhattan-townhouse" },
      { name: "Sea-Dar: Gramercy Park Townhouse", url: "https://seadar.com/projects/gramercy-park-townhouse/" },
      { name: "I-Grace: NYC Penthouse Renovation", url: "https://igrace.com/portfolio/featured-projects/nyc-penthouse-renovation/" },
    ],
  },

  /* ---------------------------------------------------------- 2026-10-20 */
  {
    slug: "market-insight-new-york-vs-miami-office-demand",
    title: "Market Insight: New York vs Miami Office Demand",
    date: "2026-10-20",
    market: "New York & Miami",
    type: "Market Insight",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7518282642954543104",
    carousel: {
      label: "Slides from the LinkedIn post: New York vs Miami office demand",
      images: ["market-insight-new-york-vs-miami-office-demand-1.jpg", "market-insight-new-york-vs-miami-office-demand-2.jpg", "market-insight-new-york-vs-miami-office-demand-3.jpg", "market-insight-new-york-vs-miami-office-demand-4.jpg", "market-insight-new-york-vs-miami-office-demand-5.jpg"],
      alts: [
        "Slide 1 of 5, Where the office work is going: 32.9 million square feet leased in Manhattan through Q3, the strongest year to date since 2000, and 12 office spaces over 50,000 square feet on the market across Miami-Dade County.",
        "Slide 2 of 5, New York leasing: 78% of Manhattan office leasing in 2026 is new leases and expansions, and renewals have fallen to their lowest share in more than a decade. Source: Avison Young, Manhattan Office Q3 2026.",
        "Slide 3 of 5, New York conversions: 9.5 million square feet of office-to-residential conversions planned to start in 2026, more than double the 4.3 million square feet that began in 2025. Source: Cushman & Wakefield via Bisnow.",
        "Slide 4 of 5, Miami supply: the first new office tower in Miami's urban core since the pandemic, Santander's 1401 Brickell, is due for completion in 2029. Citadel's follows in 2031. Source: Bisnow, September 2026.",
        "Slide 5 of 5, More fit-outs, more conversions, the same people. Miami office pipeline: 2.2 million square feet under construction, the fourth-largest pipeline in the US, and 4.8 million square feet more in planning, led by Citadel's 1.7 million square foot headquarters.",
      ],
    },
    summary:
      "Manhattan office leasing is at its strongest since 2000 and conversions are set to more than double, while Miami has too little office space for demand. Fit-out, conversion and high-rise delivery draw on the same pool of project leaders.",
    intro: [
      "Manhattan has leased 32.9 million square feet of office space through the third quarter of 2026, its strongest year to date since 2000, according to Colliers. Availability has fallen to 12.4%, the lowest level since August 2020.",
      "The nature of the demand matters. New leases and expansions account for 78% of activity this year, and renewals are at their lowest share in more than a decade. Tenants moving into new space need new interiors.", // CONFIRM: 78% figure not found in published coverage
      "At the same time, older stock is leaving the office market. Cushman & Wakefield expects 9.5 million square feet of office-to-residential conversions to start construction in 2026, more than double the 4.3 million square feet that began in 2025.",
      "Miami has the opposite problem. Across Miami-Dade County, only about a dozen office spaces larger than 50,000 square feet are on the market, even as availability falls to 14.6% and asking prices have risen by 8.4% to $68.50 per square foot. The first new office tower in the urban core since the pandemic, Santander's 1401 Brickell, is not due until 2029. Apollo Global Management, Inc. looked for around 250,000 square feet in Miami earlier this year and chose Austin due to limited supply.", // CONFIRM: 1401 Brickell 2029 and Apollo/Austin not found in published coverage
      "The pipeline is growing. Miami had 2.2 million square feet of office space under construction at the end of August, the fourth largest total of the 25 major US markets tracked by CommercialCafe, with another 4.8 million square feet in planning, according to Yardi Matrix. The largest is Citadel's 1.7 million square foot headquarters on Brickell Bay Drive.", // CONFIRM: 2.2M / 4.8M / fourth-largest ranking not found in published coverage
    ],
    hiringView: [
      "Fit-out, conversion and high-rise delivery draw from the same pool of project managers, superintendents and MEP leads. Many are moving from New York to Miami as demand increases.",
      "If you are one of them and want a view of what is coming next, reach out.",
    ],
    sources: [
      { name: "Traded: Manhattan office availability hits lowest level since 2020 as leasing stays strong (Colliers)", url: "https://traded.co/blog/manhattan-office-availability-hits-lowest-level-since-2020-as-leasing-stays-strong/" },
      { name: "CRE Daily: Manhattan office leasing nears pre-Covid availability levels", url: "https://www.credaily.com/?p=222417" },
      { name: "Bisnow: Thanks to an 'alignment of stars', NYC conversions to more than double in 2026 (Cushman & Wakefield)", url: "https://www.bisnow.com/news/new-york/office/alignment-of-stars-cause-nyc-conversions-to-double-in-2026-132414" },
      { name: "Commercial Observer: Miami-Dade office market, Q3 2026 (Savills)", url: "https://commercialobserver.com/2026/10/miami-dade-office-q3/" },
      { name: "CRE Daily: Miami-Dade office rents rise 8.4% as availability falls", url: "https://www.credaily.com/?p=223711" },
      { name: "CRE Daily: Miami office towers target a major supply shortage", url: "https://www.credaily.com/briefs/miami-office-towers-target-a-major-supply-shortage/" },
      { name: "Commercial Observer: Ken Griffin unveils plans for 54-story Citadel HQ in Miami", url: "https://commercialobserver.com/2024/08/ken-griffin-citadel-securities-hq-miami-brickell-bay-drive/" },
    ],
  },

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
